// mobile-menu.js
// Mobile responsive navigation menu

document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on mobile devices
    if (window.innerWidth <= 768) {
        initMobileMenu();
    }

    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            initMobileMenu();
        } else {
            removeMobileMenu();
        }
    });
});

function initMobileMenu() {
    const header = document.querySelector('.header-content');
    const nav = document.querySelector('.nav');
    
    if (!header || !nav) return;

    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;

    // Create hamburger menu button
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '☰';
    menuBtn.setAttribute('aria-label', 'Toggle menu');
    
    // Insert menu button after logo
    const logo = document.querySelector('.logo');
    if (logo && logo.parentNode) {
        logo.parentNode.insertBefore(menuBtn, logo.nextSibling);
    }

    // Initially hide nav on mobile
    nav.classList.add('mobile-hidden');
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function() {
        if (nav.classList.contains('mobile-hidden')) {
            nav.classList.remove('mobile-hidden');
            nav.classList.add('mobile-visible');
            menuBtn.innerHTML = '✕';
            menuBtn.style.fontSize = '28px';
        } else {
            nav.classList.add('mobile-hidden');
            nav.classList.remove('mobile-visible');
            menuBtn.innerHTML = '☰';
            menuBtn.style.fontSize = '24px';
        }
    });

    // Close menu when clicking a nav link
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.add('mobile-hidden');
            nav.classList.remove('mobile-visible');
            menuBtn.innerHTML = '☰';
            menuBtn.style.fontSize = '24px';
        });
    });
}

function removeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (menuBtn) {
        menuBtn.remove();
    }
    
    if (nav) {
        nav.classList.remove('mobile-hidden', 'mobile-visible');
        nav.style.display = '';
    }
}

// Add mobile search functionality
document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth <= 480) {
        addMobileSearch();
    }
});

function addMobileSearch() {
    const headerActions = document.querySelector('.header-actions');
    const searchBox = document.querySelector('.search-box');
    
    if (!headerActions || searchBox) return;

    // Create mobile search button
    const searchBtn = document.createElement('button');
    searchBtn.className = 'icon-btn mobile-search-btn';
    searchBtn.innerHTML = '🔍';
    searchBtn.setAttribute('aria-label', 'Search');
    searchBtn.style.cssText = 'background: none; border: none; font-size: 20px; cursor: pointer;';
    
    // Insert search button in header actions
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn && headerActions) {
        headerActions.insertBefore(searchBtn, cartBtn);
    }
    
    // Create mobile search overlay
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'mobile-search-overlay';
    searchOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    searchOverlay.innerHTML = `
        <div style="width: 100%; max-width: 500px; position: relative;">
            <input 
                type="text" 
                placeholder="🔍  Search for gadgets..."
                id="mobileSearchInput"
                style="width: 100%; padding: 16px 50px 16px 20px; font-size: 16px; border: none; border-radius: 8px;"
            >
            <button 
                id="closeMobileSearch"
                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 24px; cursor: pointer; padding: 10px;"
            >✕</button>
        </div>
    `;
    
    document.body.appendChild(searchOverlay);
    
    // Toggle search overlay
    searchBtn.addEventListener('click', function() {
        searchOverlay.style.display = 'flex';
        document.getElementById('mobileSearchInput').focus();
    });
    
    // Close search overlay
    document.getElementById('closeMobileSearch').addEventListener('click', function() {
        searchOverlay.style.display = 'none';
    });
    
    // Search on enter
    document.getElementById('mobileSearchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}
