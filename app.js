let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Product Database
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        category: "smartphones",
        brand: "apple",
        price: 159900,
        originalPrice: 179900,
        discount: 11,
        rating: 4.8,
        reviews: 234,
        image: "src/Smartphones/15promax.png",
        badge: "Hot Deal",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        category: "smartphones",
        brand: "samsung",
        price: 124999,
        originalPrice: 139999,
        discount: 11,
        rating: 4.7,
        reviews: 189,
        image: "src/Smartphones/s24.png",
        badge: "New",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "OnePlus 12",
        category: "smartphones",
        brand: "oneplus",
        price: 64999,
        originalPrice: 69999,
        discount: 7,
        rating: 4.6,
        reviews: 156,
        image: "src/Smartphones/oneplus12.png",
        inStock: true,
        featured: false
    },
    {
        id: 4,
        name: "MacBook Pro 14-inch M3",
        category: "laptops",
        brand: "apple",
        price: 199900,
        originalPrice: 219900,
        discount: 9,
        rating: 4.9,
        reviews: 312,
        image: "src/Laptops/macbook.png",
        badge: "Hot Deal",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Dell XPS 15",
        category: "laptops",
        brand: "dell",
        price: 149999,
        originalPrice: 169999,
        discount: 12,
        rating: 4.7,
        reviews: 198,
        image: "src/Laptops/dellxps.png",
        inStock: true,
        featured: true
    },
    {
        id: 6,
        name: "HP Pavilion Gaming",
        category: "laptops",
        brand: "hp",
        price: 84999,
        originalPrice: 99999,
        discount: 15,
        rating: 4.5,
        reviews: 145,
        image: "src/Laptops/hp.png",
        badge: "Sale",
        inStock: true,
        featured: false
    },
    {
        id: 7,
        name: "Sony WH-1000XM5",
        category: "audio",
        brand: "sony",
        price: 29990,
        originalPrice: 34990,
        discount: 14,
        rating: 4.8,
        reviews: 423,
        image: "src/Audio/sony.png",
        badge: "Best Seller",
        inStock: true,
        featured: true
    },
    {
        id: 8,
        name: "AirPods Pro (2nd Gen)",
        category: "audio",
        brand: "apple",
        price: 24900,
        originalPrice: 26900,
        discount: 7,
        rating: 4.7,
        reviews: 567,
        image: "src/Audio/airpods2.png",
        inStock: true,
        featured: false
    },
    {
        id: 9,
        name: "Canon EOS R6 Mark II",
        category: "cameras",
        brand: "canon",
        price: 249999,
        originalPrice: 279999,
        discount: 11,
        rating: 4.9,
        reviews: 89,
        image: "src/Cameras/canon.png",
        badge: "Pro",
        inStock: true,
        featured: true
    },
    {
        id: 10,
        name: "Sony Alpha A7 IV",
        category: "cameras",
        brand: "sony",
        price: 239999,
        originalPrice: 259999,
        discount: 8,
        rating: 4.8,
        reviews: 102,
        image: "src/Cameras/sonyalpha.png",
        inStock: true,
        featured: false
    },
    {
        id: 11,
        name: "Apple Watch Series 9",
        category: "wearables",
        brand: "apple",
        price: 41900,
        originalPrice: 45900,
        discount: 9,
        rating: 4.7,
        reviews: 234,
        image: "src/Wearables/applewatch.png",
        inStock: true,
        featured: true
    },
    {
        id: 12,
        name: "Samsung Galaxy Watch 6",
        category: "wearables",
        brand: "samsung",
        price: 30999,
        originalPrice: 34999,
        discount: 11,
        rating: 4.6,
        reviews: 178,
        image: "src/Wearables/watch6.png",
        badge: "New",
        inStock: true,
        featured: false
    },
    {
        id: 13,
        name: "Anker PowerCore 20000mAh",
        category: "accessories",
        brand: "anker",
        price: 3499,
        originalPrice: 4499,
        discount: 22,
        rating: 4.5,
        reviews: 890,
        image: "src/Accessories/anker.png",
        badge: "Best Value",
        inStock: true,
        featured: false
    },
    {
        id: 14,
        name: "Belkin 3-in-1 Wireless Charger",
        category: "accessories",
        brand: "belkin",
        price: 8999,
        originalPrice: 10999,
        discount: 18,
        rating: 4.6,
        reviews: 345,
        image: "src/Accessories/belkin.png",
        inStock: true,
        featured: false
    },
    {
        id: 15,
        name: "JBL Flip 6 Bluetooth Speaker",
        category: "audio",
        brand: "jbl",
        price: 11999,
        originalPrice: 14999,
        discount: 20,
        rating: 4.7,
        reviews: 456,
        image: "src/Audio/jbl.png",
        badge: "Popular",
        inStock: true,
        featured: true
    }
];

// User Authentication
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let users = JSON.parse(localStorage.getItem('users')) || [];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUserButton();
    updateCartCount();
    
    // Load products on home page
    if (document.getElementById('dealsGrid')) {
        loadDeals();
    }
    
    if (document.getElementById('featuredGrid')) {
        loadFeatured();
    }
    
    // Load products on products page
    if (document.getElementById('productsGrid')) {
        loadAllProducts();
    }
    
    // Load cart items in checkout
    if (document.getElementById('summaryItems')) {
        loadCheckoutSummary();
    }
    
    // Add event listener for cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
});

// Authentication Functions
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = users.find(u => 
        (u.email === email || u.phone === email) && u.password === password
    );
    
    if (user) {
        currentUser = { name: user.name, email: user.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showToast("Login successful! Welcome back, " + user.name + " 🎉", "success");
        
        // Redirect after showing toast
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast("Invalid credentials. Please try again ❌", "error");
    }
    
    return false;
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast("Passwords do not match! ❌", "error");
        return false;
    }
    
    if (users.find(u => u.email === email)) {
        showToast("Email already registered. Please login 📧", "error");
        return false;
    }
    
    const newUser = { name, email, phone, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    currentUser = { name, email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    showToast("Account created successfully! Welcome, " + name + " 🎉", "success");
    
    // Redirect after showing toast
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

function updateUserButton() {
    const userBtn = document.getElementById('userBtn');
    if (userBtn && currentUser) {
        userBtn.innerHTML = '<span>👤</span>';
        userBtn.title = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}



// Product Display Functions
function createProductCard(product) {
    return `
        <div class="product-card" onclick="viewProduct(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>

            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>

                <div class="product-rating">
                    <span class="stars">
                        ${'★'.repeat(Math.floor(product.rating))}
                        ${'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span class="rating-count">(${product.reviews})</span>
                </div>

                <div class="product-price">
                    <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
                    <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    <span class="price-discount">${product.discount}% OFF</span>
                </div>

                <div class="product-actions">
                    <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="btn-wishlist ${wishlist.some(w => w.id === product.id) ? 'active' : ''}" 
    onclick="event.stopPropagation(); toggleWishlist(${product.id})">
    ♥
</button>

                    

                </div>
            </div>
        </div>
    `;
}



function loadDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    const dealProducts = products.filter(p => p.badge === 'Hot Deal').slice(0, 4);
    dealsGrid.innerHTML = dealProducts.map(p => createProductCard(p)).join('');
}

function loadFeatured() {
    const featuredGrid = document.getElementById('featuredGrid');
    const featuredProducts = products.filter(p => p.featured).slice(0, 6);
    featuredGrid.innerHTML = featuredProducts.map(p => createProductCard(p)).join('');
}

function loadAllProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(p => createProductCard(p)).join('');
    updateResultsCount(products.length);
}

function viewProduct(id) {
    // In a real app, this would navigate to product detail page
    //const product = products.find(p => p.id === id);
    //alert(`Product: ${product.name}\nPrice: ₹${product.price.toLocaleString('en-IN')}\n\nThis would open a detailed product page.`);
    return;
}

// Filter and Search Functions
function filterByCategory(category) {
    window.location.href = `products.html?category=${category}`;
}

function filterProducts() {
    const categoryChecks = document.querySelectorAll('.filter-options input[value="smartphones"], .filter-options input[value="laptops"], .filter-options input[value="audio"], .filter-options input[value="cameras"], .filter-options input[value="wearables"], .filter-options input[value="accessories"]');
    const priceChecks = document.querySelectorAll('.filter-options input[value="0-10000"], .filter-options input[value="10000-25000"], .filter-options input[value="25000-50000"], .filter-options input[value="50000-100000"], .filter-options input[value="100000-999999"]');
    const brandChecks = document.querySelectorAll('.filter-options input[value="apple"], .filter-options input[value="samsung"], .filter-options input[value="oneplus"], .filter-options input[value="sony"], .filter-options input[value="dell"], .filter-options input[value="hp"]');
    
    const selectedCategories = Array.from(categoryChecks).filter(c => c.checked).map(c => c.value);
    const selectedPrices = Array.from(priceChecks).filter(c => c.checked).map(c => c.value);
    const selectedBrands = Array.from(brandChecks).filter(c => c.checked).map(c => c.value);
    
    let filtered = products;
    
    // Filter by category
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Filter by price range
    if (selectedPrices.length > 0) {
        filtered = filtered.filter(p => {
            return selectedPrices.some(range => {
                const [min, max] = range.split('-').map(Number);
                return p.price >= min && p.price <= max;
            });
        });
    }
    
    // Filter by brand
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');
    updateResultsCount(filtered.length);
}

function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query)
    );
    
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');
        updateResultsCount(filtered.length);
    }
}

function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const value = sortSelect.value;
    
    let sorted = [...products];
    
    switch(value) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sorted.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
            sorted.sort((a, b) => b.reviews - a.reviews);
            break;
    }
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = sorted.map(p => createProductCard(p)).join('');
}

function clearFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox input');
    checkboxes.forEach(cb => cb.checked = false);
    loadAllProducts();
}

function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${count} product${count !== 1 ? 's' : ''}`;
    }
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    
    // Show feedback
    showToast(`${product.name} added to cart 🛒`);

}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '₹0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>

            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        </div>

        <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
    </div>
`).join('');

    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        updateCartDisplay();
    }
}

// Checkout Functions
function loadCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryGst = document.getElementById('summaryGst');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (!summaryItems || cart.length === 0) {
        if (summaryItems) {
            summaryItems.innerHTML = '<p style="text-align: center; color: #6C757D;">No items in cart</p>';
        }
        return;
    }
    
    summaryItems.innerHTML = cart.map(item => `
    <div class="summary-item">
        <div class="summary-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>

        <div class="summary-item-details">
            <div class="summary-item-name">${item.name}</div>
            <div class="summary-item-qty">
                Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}
            </div>
        </div>
    </div>
`).join('');


    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    
    summarySubtotal.textContent = '₹' + subtotal.toLocaleString('en-IN');
    summaryGst.textContent = '₹' + gst.toLocaleString('en-IN');
    summaryTotal.textContent = '₹' + Math.round(total).toLocaleString('en-IN');
}

async function placeOrder() {
    // 1. Check if user is logged in
    if (!currentUser || !currentUser.uid) {
        showToast('Please login to place an order', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    // 2. Validate cart
    if (!cart || cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        return;
    }
    
    // 3. Get form data
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address1 = document.getElementById('address1').value.trim();
    const address2 = document.getElementById('address2').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value.trim();
    const landmark = document.getElementById('landmark')?.value.trim() || '';
    
    // 4. Validate required fields
    if (!fullName || !phone || !address1 || !city || !state || !pincode) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    // 5. Validate phone number (10 digits)
    if (!/^[0-9]{10}$/.test(phone)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // 6. Validate pincode (6 digits)
    if (!/^[0-9]{6}$/.test(pincode)) {
        showToast('Please enter a valid 6-digit pincode', 'error');
        return;
    }
    
    // 7. Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (!paymentMethod) {
        showToast('Please select a payment method', 'error');
        return;
    }
    
    // 8. Calculate order totals
    const itemsPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxPrice = Math.round(itemsPrice * 0.18); // 18% GST
    const shippingPrice = 0; // Free shipping
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    
    // 9. Prepare order data for Firebase
    const orderData = {
        // Customer info
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        customerPhone: currentUser.phone || phone,
        
        // Shipping address
        shippingAddress: {
            fullName: fullName,
            phone: phone,
            addressLine1: address1,
            addressLine2: address2,
            city: city,
            state: state,
            pincode: pincode,
            landmark: landmark
        },
        
        // Order items
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        
        // Pricing
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
        
        // Payment
        paymentMethod: paymentMethod.value
    };
    
    console.log('📦 Placing order...', orderData);
    
    try {
        // 10. Show loading state
        const placeOrderBtn = document.querySelector('button[onclick="placeOrder()"]');
        if (!placeOrderBtn) {
            // Try alternative selector
            placeOrderBtn = document.querySelector('.btn-primary');
        }
        
        if (placeOrderBtn) {
            const originalText = placeOrderBtn.textContent;
            placeOrderBtn.textContent = 'Processing...';
            placeOrderBtn.disabled = true;
        }
        
        // 11. Create order in Firebase
        let result;
        
        if (typeof createOrder === 'function') {
            console.log('🔥 Creating order in Firebase...');
            result = await createOrder(currentUser.uid, orderData);
        } else {
            // Fallback: Generate order ID locally
            console.log('📦 Firebase not available, using localStorage');
            result = {
                success: true,
                orderId: 'TB' + Date.now().toString().slice(-8),
                message: 'Order placed successfully!'
            };
            
            // Save to localStorage as backup
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push({
                ...orderData,
                orderId: result.orderId,
                createdAt: new Date().toISOString(),
                orderStatus: 'pending'
            });
            localStorage.setItem('orders', JSON.stringify(orders));
        }
        
        if (result.success) {
            console.log('✅ Order created successfully:', result.orderId);
            
            // 12. Clear cart in Firebase
            if (typeof saveCart === 'function') {
                await saveCart(currentUser.uid, []);
            }
            
            // 13. Clear cart from localStorage
            cart = [];
            localStorage.removeItem('cart');
            updateCartCount();
            
            // 14. Show success modal
            showOrderConfirmation(result.orderId, totalPrice);
            
            // 15. Show success toast
            showToast(result.message, 'success');
            
        } else {
            // Error creating order
            console.error('❌ Order creation failed:', result.message);
            showToast(result.message || 'Failed to place order. Please try again.', 'error');
            
            // Restore button
            if (placeOrderBtn) {
                placeOrderBtn.textContent = originalText;
                placeOrderBtn.disabled = false;
            }
        }
        
    } catch (error) {
        console.error('❌ Order placement error:', error);
        showToast('An error occurred. Please try again.', 'error');
        
        // Restore button
        const placeOrderBtn = document.querySelector('.btn-primary');
        if (placeOrderBtn) {
            placeOrderBtn.textContent = 'Place Order';
            placeOrderBtn.disabled = false;
        }
    }
}

// Make function globally available
window.placeOrder = placeOrder;

// Order confirmation modal
function showOrderConfirmation(orderId, totalPrice) {
    const modal = document.getElementById('confirmationModal');
    const orderIdSpan = document.getElementById('orderId');
    const orderTotalSpan = document.getElementById('orderTotal');
    
    if (modal && orderIdSpan && orderTotalSpan) {
        orderIdSpan.textContent = orderId;
        orderTotalSpan.textContent = '₹' + totalPrice.toLocaleString('en-IN');
        modal.style.display = 'flex';
        
        // Auto-redirect after 5 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    } else {
        // Fallback: redirect immediately
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showToast(`Thank you for subscribing! We'll send updates to ${email} 📧`, 'success');
    event.target.reset();
    return false;
}


function handleSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const query = input.value.trim();
    if (query === "") {
        showToast("Please enter a product name 🔍", "error");
        return;
    }

    // Redirect to products page with query
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}
// Handle search query from URL

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", e => {
            if (e.key === "Enter") handleSearch();
        });
    }
});
if (document.getElementById('productsGrid')) {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );

        document.getElementById("productsGrid").innerHTML =
            filtered.map(p => createProductCard(p)).join("");

        updateResultsCount(filtered.length);
    } else {
        loadAllProducts();
    }
}
function handleSearch() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const query = input.value.trim();
    if (!query) {
        showToast("Please enter a product name 🔍", "error");
        return;
    }

    // Optional UX feedback
    input.blur();

    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}


function toggleWishlist(productId) {
    const index = wishlist.findIndex(item => item.id === productId);

    if (index === -1) {
        // add to wishlist
        const product = products.find(p => p.id === productId);
        wishlist.push(product);
        showToast("Added to wishlist ❤️");
    } else {
        // remove from wishlist
        wishlist.splice(index, 1);
        showToast("Removed from wishlist 💔");
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // 🔁 re-render UI
    reloadCurrentProducts();
}
function reloadCurrentProducts() {
    if (document.getElementById('dealsGrid')) loadDeals();
    if (document.getElementById('featuredGrid')) loadFeatured();
    if (document.getElementById('productsGrid')) loadAllProducts();
}
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}
