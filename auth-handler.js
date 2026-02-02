// auth-handler.js
// Global authentication handler for login/logout functionality

import { logoutUser } from './firebase-auth.js';

// Make toggleAuth function globally available
window.toggleAuth = async function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // User is logged in - perform logout
        if (confirm('Are you sure you want to logout?')) {
            const result = await logoutUser();
            
            if (result.success) {
                // Clear local storage
                localStorage.removeItem('currentUser');
                localStorage.removeItem('cart');
                
                // Show toast if available
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.textContent = 'Logged out successfully! 👋';
                    toast.className = 'toast show success';
                    
                    setTimeout(() => {
                        toast.className = 'toast';
                    }, 1500);
                }
                
                // Redirect to home after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                alert('Failed to logout. Please try again.');
            }
        }
    } else {
        // User is not logged in - redirect to login page
        window.location.href = 'login.html';
    }
};

// Backward compatibility - keep logout function
window.logout = window.toggleAuth;

// Update auth button based on login status
function updateAuthButton() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authBtn = document.getElementById('authBtn');
    
    if (authBtn) {
        if (currentUser) {
            // User is logged in - show logout
            authBtn.textContent = 'Logout';
            authBtn.style.background = '#FF6B35';
            authBtn.title = `Logged in as ${currentUser.name}`;
        } else {
            // User is not logged in - show login
            authBtn.textContent = 'Login';
            authBtn.style.background = '#4285F4';
            authBtn.title = 'Click to login';
        }
    }
}

// Check authentication status on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthButton();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        console.log('User logged in:', currentUser.name);
    } else {
        console.log('No user logged in');
    }
});