// firebase-orders.js
// Functions to save orders and addresses to Firebase

import { db } from './firebase-config.js';
import { 
    collection,
    addDoc,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
    query,
    where,
    getDocs,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========================================
// ORDER FUNCTIONS
// ========================================

/**
 * Create order and save to Firebase
 * @param {string} userId - User's UID
 * @param {Object} orderData - Order details
 * @returns {Promise<Object>} - Result with order ID
 */
export async function createOrder(userId, orderData) {
    try {
        console.log('📝 Creating order in Firebase...');
        
        // Generate order ID
        const orderId = 'TB' + Date.now().toString().slice(-8);
        
        // Prepare order object
        const order = {
            orderId: orderId,
            userId: userId,
            
            // Customer details
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,
            
            // Shipping address
            shippingAddress: {
                fullName: orderData.shippingAddress.fullName,
                phone: orderData.shippingAddress.phone,
                addressLine1: orderData.shippingAddress.addressLine1,
                addressLine2: orderData.shippingAddress.addressLine2 || '',
                city: orderData.shippingAddress.city,
                state: orderData.shippingAddress.state,
                pincode: orderData.shippingAddress.pincode,
                landmark: orderData.shippingAddress.landmark || ''
            },
            
            // Order items
            items: orderData.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image || ''
            })),
            
            // Pricing
            itemsPrice: orderData.itemsPrice,
            taxPrice: orderData.taxPrice,
            shippingPrice: orderData.shippingPrice || 0,
            totalPrice: orderData.totalPrice,
            
            // Payment
            paymentMethod: orderData.paymentMethod || 'cod',
            paymentStatus: 'pending',
            
            // Order status
            orderStatus: 'pending',
            
            // Timestamps
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            
            // Additional info
            deliveryDate: calculateDeliveryDate(),
            trackingNumber: null
        };
        
        // Add order to Firestore
        const orderRef = await addDoc(collection(db, "orders"), order);
        
        console.log('✅ Order created with ID:', orderId);
        
        // Save address to user's saved addresses
        await saveAddressToUser(userId, orderData.shippingAddress);
        
        // Update user's order count
        await incrementOrderCount(userId);
        
        return {
            success: true,
            orderId: orderId,
            firestoreId: orderRef.id,
            message: 'Order placed successfully!'
        };
        
    } catch (error) {
        console.error("❌ Create order error:", error);
        return {
            success: false,
            message: 'Failed to create order. Please try again.',
            error: error.message
        };
    }
}

/**
 * Save address to user's saved addresses (if not already saved)
 * @param {string} userId - User's UID
 * @param {Object} address - Address object
 */
async function saveAddressToUser(userId, address) {
    try {
        console.log('📍 Saving address to user profile...');
        
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            console.warn('⚠️ User document not found');
            return;
        }
        
        const userData = userDoc.data();
        const existingAddresses = userData.addresses || [];
        
        // Check if address already exists (compare essential fields)
        const addressExists = existingAddresses.some(addr => 
            addr.addressLine1 === address.addressLine1 &&
            addr.city === address.city &&
            addr.pincode === address.pincode
        );
        
        if (!addressExists) {
            // Add new address with metadata
            const addressToSave = {
                ...address,
                id: Date.now().toString(),
                isDefault: existingAddresses.length === 0, // First address is default
                addedAt: new Date().toISOString()
            };
            
            await updateDoc(userRef, {
                addresses: arrayUnion(addressToSave),
                updatedAt: serverTimestamp()
            });
            
            console.log('✅ Address saved to user profile');
        } else {
            console.log('ℹ️ Address already exists in user profile');
        }
        
    } catch (error) {
        console.error('❌ Save address error:', error);
        // Don't fail the order if address save fails
    }
}

/**
 * Increment user's order count
 */
async function incrementOrderCount(userId) {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            const currentCount = userDoc.data().orderCount || 0;
            await updateDoc(userRef, {
                orderCount: currentCount + 1,
                lastOrderAt: serverTimestamp()
            });
            console.log('✅ Order count updated');
        }
    } catch (error) {
        console.error('❌ Update order count error:', error);
    }
}

/**
 * Calculate estimated delivery date (5-7 days from now)
 */
function calculateDeliveryDate() {
    const today = new Date();
    const deliveryDays = 5 + Math.floor(Math.random() * 3); // 5-7 days
    const deliveryDate = new Date(today.getTime() + (deliveryDays * 24 * 60 * 60 * 1000));
    return deliveryDate.toISOString();
}

// ========================================
// RETRIEVE ORDERS
// ========================================

/**
 * Get all orders for a user
 * @param {string} userId - User's UID
 * @returns {Promise<Object>} - User's orders
 */
export async function getUserOrders(userId) {
    try {
        console.log('📦 Fetching user orders...');
        
        const q = query(
            collection(db, "orders"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({
                firestoreId: doc.id,
                ...doc.data()
            });
        });
        
        console.log(`✅ Found ${orders.length} orders`);
        
        return {
            success: true,
            orders: orders
        };
        
    } catch (error) {
        console.error("❌ Get orders error:", error);
        return {
            success: false,
            orders: [],
            error: error.message
        };
    }
}

/**
 * Get single order by order ID
 * @param {string} userId - User's UID
 * @param {string} orderId - Order ID (e.g., TB12345678)
 * @returns {Promise<Object>} - Order details
 */
export async function getOrder(userId, orderId) {
    try {
        console.log('📦 Fetching order:', orderId);
        
        const q = query(
            collection(db, "orders"),
            where("userId", "==", userId),
            where("orderId", "==", orderId)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return {
                success: false,
                message: 'Order not found'
            };
        }
        
        const orderDoc = querySnapshot.docs[0];
        
        console.log('✅ Order found');
        
        return {
            success: true,
            order: {
                firestoreId: orderDoc.id,
                ...orderDoc.data()
            }
        };
        
    } catch (error) {
        console.error("❌ Get order error:", error);
        return {
            success: false,
            error: error.message
        };
    }
}

// ========================================
// ADDRESS FUNCTIONS
// ========================================

/**
 * Get user's saved addresses
 * @param {string} userId - User's UID
 * @returns {Promise<Object>} - User's addresses
 */
export async function getUserAddresses(userId) {
    try {
        console.log('📍 Fetching user addresses...');
        
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            return {
                success: false,
                addresses: [],
                message: 'User not found'
            };
        }
        
        const addresses = userDoc.data().addresses || [];
        
        console.log(`✅ Found ${addresses.length} saved addresses`);
        
        return {
            success: true,
            addresses: addresses
        };
        
    } catch (error) {
        console.error("❌ Get addresses error:", error);
        return {
            success: false,
            addresses: [],
            error: error.message
        };
    }
}

/**
 * Add new address to user's profile
 * @param {string} userId - User's UID
 * @param {Object} address - Address object
 * @returns {Promise<Object>} - Result
 */
export async function addAddress(userId, address) {
    try {
        console.log('📍 Adding new address...');
        
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        
        const existingAddresses = userDoc.data().addresses || [];
        
        const newAddress = {
            ...address,
            id: Date.now().toString(),
            isDefault: existingAddresses.length === 0,
            addedAt: new Date().toISOString()
        };
        
        await updateDoc(userRef, {
            addresses: arrayUnion(newAddress),
            updatedAt: serverTimestamp()
        });
        
        console.log('✅ Address added successfully');
        
        return {
            success: true,
            message: 'Address saved successfully',
            address: newAddress
        };
        
    } catch (error) {
        console.error("❌ Add address error:", error);
        return {
            success: false,
            message: 'Failed to save address',
            error: error.message
        };
    }
}

/**
 * Delete address from user's profile
 * @param {string} userId - User's UID
 * @param {string} addressId - Address ID to delete
 * @returns {Promise<Object>} - Result
 */
export async function deleteAddress(userId, addressId) {
    try {
        console.log('🗑️ Deleting address...');
        
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        
        const addresses = userDoc.data().addresses || [];
        const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
        
        await updateDoc(userRef, {
            addresses: updatedAddresses,
            updatedAt: serverTimestamp()
        });
        
        console.log('✅ Address deleted successfully');
        
        return {
            success: true,
            message: 'Address deleted successfully'
        };
        
    } catch (error) {
        console.error("❌ Delete address error:", error);
        return {
            success: false,
            message: 'Failed to delete address',
            error: error.message
        };
    }
}

// ========================================
// ORDER STATUS UPDATES (for admin)
// ========================================

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} newStatus - New status
 * @returns {Promise<Object>} - Result
 */
export async function updateOrderStatus(orderId, newStatus) {
    try {
        console.log('📝 Updating order status...');
        
        const q = query(
            collection(db, "orders"),
            where("orderId", "==", orderId)
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return {
                success: false,
                message: 'Order not found'
            };
        }
        
        const orderDoc = querySnapshot.docs[0];
        const orderRef = doc(db, "orders", orderDoc.id);
        
        await updateDoc(orderRef, {
            orderStatus: newStatus,
            updatedAt: serverTimestamp()
        });
        
        console.log('✅ Order status updated to:', newStatus);
        
        return {
            success: true,
            message: 'Order status updated successfully'
        };
        
    } catch (error) {
        console.error("❌ Update order status error:", error);
        return {
            success: false,
            message: 'Failed to update order status',
            error: error.message
        };
    }
}

// Export all functions
export default {
    createOrder,
    getUserOrders,
    getOrder,
    getUserAddresses,
    addAddress,
    deleteAddress,
    updateOrderStatus
};
