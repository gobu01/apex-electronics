// firebase-auth.js
// Complete Firebase Authentication System for Apex Electronics

import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
    doc, 
    setDoc, 
    getDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

/**
 * Register new user with email and password
 * @param {string} name - User's full name
 * @param {string} email - User's email
 * @param {string} phone - User's phone number
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Result object with success status and user data
 */
export async function registerUser(name, email, phone, password) {
    try {
        console.log('📝 Starting user registration...');
        
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('✅ User created in Firebase Auth:', user.uid);
        
        // Update user profile with display name
        await updateProfile(user, {
            displayName: name
        });
        
        console.log('✅ User profile updated with name');
        
        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            phone: phone,
            role: 'user',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            emailVerified: false,
            addresses: [],
            wishlist: [],
            orderCount: 0
        });
        
        console.log('✅ User data saved to Firestore');
        
        // Optional: Send email verification
        try {
            await sendEmailVerification(user);
            console.log('📧 Verification email sent');
        } catch (emailError) {
            console.log('⚠️ Could not send verification email:', emailError.message);
        }
        
        return {
            success: true,
            message: `Account created successfully! Welcome, ${name} 🎉`,
            user: {
                uid: user.uid,
                name: name,
                email: email,
                phone: phone,
                role: 'user'
            }
        };
    } catch (error) {
        console.error("❌ Registration error:", error);
        return {
            success: false,
            message: getErrorMessage(error.code),
            error: error.code
        };
    }
}

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Result object with success status and user data
 */
export async function loginUser(email, password) {
    try {
        console.log('🔐 Starting user login...');
        
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        console.log('✅ User authenticated:', user.uid);
        
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (!userDoc.exists()) {
            console.warn('⚠️ User document not found in Firestore, creating...');
            
            // Create user document if it doesn't exist
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName || 'User',
                email: user.email,
                phone: '',
                role: 'user',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                addresses: [],
                wishlist: []
            });
        }
        
        const userData = userDoc.exists() ? userDoc.data() : {
            name: user.displayName || 'User',
            phone: ''
        };
        
        console.log('✅ User data retrieved from Firestore');
        
        return {
            success: true,
            message: `Welcome back, ${userData.name}! 👋`,
            user: {
                uid: user.uid,
                name: userData.name,
                email: user.email,
                phone: userData.phone || '',
                role: userData.role || 'user',
                emailVerified: user.emailVerified
            }
        };
    } catch (error) {
        console.error("❌ Login error:", error);
        return {
            success: false,
            message: getErrorMessage(error.code),
            error: error.code
        };
    }
}

/**
 * Logout current user
 * @returns {Promise<Object>} - Result object with success status
 */
export async function logoutUser() {
    try {
        console.log('👋 Logging out user...');
        
        await signOut(auth);
        
        // Clear local storage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        
        console.log('✅ User logged out successfully');
        
        return {
            success: true,
            message: 'Logged out successfully'
        };
    } catch (error) {
        console.error("❌ Logout error:", error);
        return {
            success: false,
            message: 'Failed to logout',
            error: error.code
        };
    }
}

/**
 * Sign in with Google
 * @returns {Promise<Object>} - Result object with success status and user data
 */
export async function signInWithGoogle() {
    try {
        console.log('🔐 Starting Google sign-in...');
        
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        console.log('✅ Google authentication successful:', user.uid);
        
        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        if (!userDoc.exists()) {
            console.log('📝 New Google user, creating profile...');
            
            // Create new user document for first-time Google sign-in
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName || 'User',
                email: user.email,
                phone: user.phoneNumber || '',
                photoURL: user.photoURL || '',
                role: 'user',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                emailVerified: user.emailVerified,
                authProvider: 'google',
                addresses: [],
                wishlist: [],
                orderCount: 0
            });
            
            console.log('✅ Google user profile created');
        } else {
            console.log('✅ Existing Google user logged in');
            
            // Update last login time
            await updateDoc(doc(db, "users", user.uid), {
                updatedAt: serverTimestamp()
            });
        }
        
        const userData = userDoc.exists() ? userDoc.data() : {
            name: user.displayName,
            phone: user.phoneNumber || ''
        };
        
        return {
            success: true,
            message: `Welcome, ${user.displayName}! 🎉`,
            user: {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                phone: userData.phone || '',
                photoURL: user.photoURL,
                role: userData.role || 'user',
                emailVerified: user.emailVerified
            }
        };
    } catch (error) {
        console.error("❌ Google sign-in error:", error);
        
        if (error.code === 'auth/popup-closed-by-user') {
            return {
                success: false,
                message: 'Sign-in cancelled',
                error: error.code
            };
        }
        
        return {
            success: false,
            message: getErrorMessage(error.code),
            error: error.code
        };
    }
}

/**
 * Send password reset email
 * @param {string} email - User's email
 * @returns {Promise<Object>} - Result object with success status
 */
export async function resetPassword(email) {
    try {
        console.log('📧 Sending password reset email...');
        
        await sendPasswordResetEmail(auth, email);
        
        console.log('✅ Password reset email sent');
        
        return {
            success: true,
            message: 'Password reset email sent! Check your inbox.'
        };
    } catch (error) {
        console.error("❌ Password reset error:", error);
        return {
            success: false,
            message: getErrorMessage(error.code),
            error: error.code
        };
    }
}

/**
 * Monitor authentication state changes
 * @param {Function} callback - Callback function to handle auth state
 * @returns {Function} - Unsubscribe function
 */
export function onAuthChange(callback) {
    console.log('👀 Setting up auth state listener...');
    
    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log('✅ User is signed in:', user.uid);
            
            // Get user data from Firestore
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.exists() ? userDoc.data() : {};
                
                callback({
                    isAuthenticated: true,
                    user: {
                        uid: user.uid,
                        name: userData.name || user.displayName || 'User',
                        email: user.email,
                        phone: userData.phone || '',
                        photoURL: user.photoURL,
                        role: userData.role || 'user',
                        emailVerified: user.emailVerified
                    }
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                callback({
                    isAuthenticated: true,
                    user: {
                        uid: user.uid,
                        name: user.displayName || 'User',
                        email: user.email
                    }
                });
            }
        } else {
            console.log('❌ User is signed out');
            callback({
                isAuthenticated: false,
                user: null
            });
        }
    });
}

/**
 * Get current authenticated user
 * @returns {Object|null} - Current user or null
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
export function isUserLoggedIn() {
    return auth.currentUser !== null;
}

// ========================================
// FIRESTORE DATABASE FUNCTIONS
// ========================================

/**
 * Save user's cart to Firestore
 * @param {string} userId - User's UID
 * @param {Array} cartItems - Array of cart items
 * @returns {Promise<Object>} - Result object
 */
export async function saveCart(userId, cartItems) {
    try {
        await setDoc(doc(db, "carts", userId), {
            userId: userId,
            items: cartItems,
            updatedAt: serverTimestamp()
        });
        
        console.log('✅ Cart saved to Firestore');
        return { success: true };
    } catch (error) {
        console.error("❌ Save cart error:", error);
        return { success: false, message: error.message };
    }
}

/**
 * Get user's cart from Firestore
 * @param {string} userId - User's UID
 * @returns {Promise<Object>} - Cart items
 */
export async function getCart(userId) {
    try {
        const cartDoc = await getDoc(doc(db, "carts", userId));
        
        if (cartDoc.exists()) {
            console.log('✅ Cart loaded from Firestore');
            return {
                success: true,
                cart: cartDoc.data().items || []
            };
        }
        
        return { success: true, cart: [] };
    } catch (error) {
        console.error("❌ Get cart error:", error);
        return { success: false, cart: [] };
    }
}

/**
 * Toggle product in wishlist
 * @param {string} userId - User's UID
 * @param {number} productId - Product ID
 * @returns {Promise<Object>} - Result object with updated wishlist
 */
export async function toggleWishlist(userId, productId) {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        
        let wishlist = userData.wishlist || [];
        const index = wishlist.indexOf(productId);
        
        if (index === -1) {
            wishlist.push(productId);
            console.log('✅ Product added to wishlist');
        } else {
            wishlist.splice(index, 1);
            console.log('✅ Product removed from wishlist');
        }
        
        await updateDoc(userRef, {
            wishlist: wishlist,
            updatedAt: serverTimestamp()
        });
        
        return {
            success: true,
            wishlist: wishlist,
            added: index === -1
        };
    } catch (error) {
        console.error("❌ Toggle wishlist error:", error);
        return {
            success: false,
            message: error.message
        };
    }
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Convert Firebase error codes to user-friendly messages
 * @param {string} errorCode - Firebase error code
 * @returns {string} - User-friendly error message
 */
function getErrorMessage(errorCode) {
    const errorMessages = {
        // Authentication errors
        'auth/email-already-in-use': 'This email is already registered. Please login instead.',
        'auth/invalid-email': 'Invalid email address format.',
        'auth/operation-not-allowed': 'Operation not allowed. Please contact support.',
        'auth/weak-password': 'Password should be at least 6 characters long.',
        'auth/user-disabled': 'This account has been disabled. Please contact support.',
        'auth/user-not-found': 'Invalid email or password.',
        'auth/wrong-password': 'Invalid email or password.',
        'auth/invalid-credential': 'Invalid email or password.',
        'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
        'auth/network-request-failed': 'Network error. Please check your internet connection.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
        'auth/cancelled-popup-request': 'Only one popup request is allowed at a time.',
        'auth/popup-blocked': 'Sign-in popup was blocked by your browser.',
        
        // Firestore errors
        'permission-denied': 'You do not have permission to perform this action.',
        'unavailable': 'Service is currently unavailable. Please try again later.',
        'not-found': 'The requested resource was not found.',
        
        // Default
        'default': 'An error occurred. Please try again.'
    };
    
    return errorMessages[errorCode] || errorMessages['default'];
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid
 */
export function isValidPhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result
 */
export function validatePassword(password) {
    const result = {
        valid: true,
        message: 'Password is strong',
        strength: 'strong'
    };
    
    if (password.length < 6) {
        result.valid = false;
        result.message = 'Password must be at least 6 characters';
        result.strength = 'weak';
        return result;
    }
    
    if (password.length < 8) {
        result.strength = 'medium';
        result.message = 'Password is okay, but could be stronger';
    }
    
    return result;
}

// Export all functions
export default {
    registerUser,
    loginUser,
    logoutUser,
    signInWithGoogle,
    resetPassword,
    onAuthChange,
    getCurrentUser,
    isUserLoggedIn,
    saveCart,
    getCart,
    toggleWishlist,
    isValidEmail,
    isValidPhone,
    validatePassword
};