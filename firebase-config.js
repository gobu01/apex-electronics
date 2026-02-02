// firebase-config.js
// Firebase Configuration for Apex Electronics

// Import Firebase SDKs (using CDN version 10.7.1)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ========================================
// YOUR FIREBASE CONFIGURATION
// ========================================
// REPLACE THIS WITH YOUR ACTUAL FIREBASE CONFIG
// Get this from Firebase Console → Project Settings → Your apps → Web app

const firebaseConfig = {
  apiKey: "AIzaSyCUKqj-s_xbwzy-P4coqmRtSdnq_tXzAFA",
  authDomain: "apex-electronics-73f82.firebaseapp.com",
  projectId: "apex-electronics-73f82",
  storageBucket: "apex-electronics-73f82.firebasestorage.app",
  messagingSenderId: "175531948568",
  appId: "1:175531948568:web:29e6b411f88b22afef616d",
  measurementId: "G-Y0R66DZ66C"
};
// ========================================
// EXAMPLE CONFIG (for reference)
// ========================================
// const firebaseConfig = {
//   apiKey: "AIzaSyABC123XYZ-example",
//   authDomain: "apex-electronics.firebaseapp.com",
//   projectId: "apex-electronics",
//   storageBucket: "apex-electronics.appspot.com",
//   messagingSenderId: "123456789012",
//   appId: "1:123456789012:web:abc123def456"
// };

// ========================================
// INITIALIZE FIREBASE
// ========================================

let app, auth, db;

try {
  // Initialize Firebase App
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase initialized successfully");
  
  // Initialize Firebase Authentication
  auth = getAuth(app);
  console.log("✅ Firebase Authentication ready");
  
  // Initialize Cloud Firestore
  db = getFirestore(app);
  console.log("✅ Cloud Firestore ready");
  
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
  console.error("Please check your Firebase configuration in firebase-config.js");
}

// Export Firebase services
export { app, auth, db };

// ========================================
// USAGE INSTRUCTIONS
// ========================================
/*
  1. Go to Firebase Console: https://console.firebase.google.com/
  2. Create a new project (or select existing)
  3. Click "Add app" → Web (</> icon)
  4. Register your app with a nickname
  5. Copy the firebaseConfig object
  6. Replace the firebaseConfig above with your config
  7. Save this file
  8. You're ready to use Firebase!
  
  IMPORTANT: Never share your Firebase config publicly if you have:
  - Billing enabled
  - Sensitive data
  - Production app
  
  For public projects, use Firebase Security Rules to protect your data.
*/
