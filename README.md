# Apex Electronics 🛒⚡

Modern e-commerce website for premium electronics with Firebase authentication and real-time cart management.

![Apex Electronics](src/apex.png)

## 🌟 Features

### User Authentication
- 🔐 Email/Password authentication with Firebase
- 🔑 Google Sign-In integration
- 👁️ Password visibility toggle
- 🔄 Password reset functionality
- ✉️ Email verification

### Shopping Experience
- 🛒 Real-time shopping cart
- 🔍 Advanced product search and filtering
- 💰 Dynamic pricing with discounts
- ⭐ Product ratings and reviews
- 📱 Fully responsive design

### Product Management
- 📦 Multiple product categories (Smartphones, Laptops, Audio, Cameras, Wearables, Accessories)
- 🏷️ Product badges (Hot Deal, New, Best Seller)
- 🖼️ High-quality product images
- 💳 Checkout system with order summary

### User Interface
- 🎨 Modern, clean design
- 🌈 Smooth animations and transitions
- 📊 Interactive product cards
- 🔔 Toast notifications for user feedback
- 🎯 Intuitive navigation

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Icons**: SVG icons
- **Fonts**: Google Fonts (Archivo Black, DM Sans)
- **Design**: Custom CSS with modern UI/UX principles

## 📋 Prerequisites

Before running this project, make sure you have:

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A Firebase account (free tier is sufficient)
- Basic knowledge of HTML/CSS/JavaScript
- A local web server (Python, Node.js, or VS Code Live Server)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/apex-electronics.git
cd apex-electronics
```

### 2. Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password and Google Sign-In)
3. Create a Firestore database
4. Get your Firebase config from Project Settings
5. Update `firebase-config.js` with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run the Project

#### Option 1: Using Python
```bash
python -m http.server 8000
# Open http://localhost:8000
```

#### Option 2: Using Node.js
```bash
npx http-server
# Open the URL shown in terminal
```

#### Option 3: Using VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
apex-electronics/
├── index.html              # Homepage
├── login.html              # Login/Signup page
├── products.html           # Products listing page
├── checkout.html           # Checkout page
├── app.js                  # Main application logic
├── firebase-config.js      # Firebase configuration
├── firebase-auth.js        # Firebase authentication functions
├── auth-handler.js         # Global auth handler (login/logout)
├── styles.css              # Main stylesheet
├── .gitignore             # Git ignore file
├── README.md              # This file
└── src/                   # Images and assets
    ├── apex.png
    ├── cart1.png
    ├── profile1.png
    ├── Smartphones/
    ├── Laptops/
    ├── Audio/
    ├── Cameras/
    ├── Wearables/
    └── Accessories/
```

## 🎯 Key Features Breakdown

### Authentication System
- User registration with email verification
- Secure login with Firebase Authentication
- Google OAuth integration
- Password reset via email
- Persistent login with localStorage
- Dynamic login/logout button

### Product Catalog
- 15+ premium products across 6 categories
- Detailed product information (name, price, rating, reviews)
- Product images and badges
- Real-time stock status
- Discount calculations

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time price calculations
- GST (18%) calculation
- Cart persistence with localStorage
- Sidebar cart display

### Checkout Process
- Billing information form
- Order summary with itemized list
- Total calculation (Subtotal + GST)
- Order confirmation modal
- Unique order ID generation

## 🔒 Security Features

- Firebase Authentication for secure user management
- Client-side form validation
- Password strength requirements (minimum 6 characters)
- Password confirmation matching
- Secure password storage (handled by Firebase)
- Firebase Security Rules (configure in Firebase Console)

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Laptops (1024px and up)
- 🖥️ Desktops (1440px and up)

## 🎨 Design Highlights

- Modern gradient backgrounds
- Smooth hover effects and animations
- Clean typography with Google Fonts
- Intuitive color scheme
- Professional product cards
- User-friendly forms with validation feedback

## 📊 Product Categories

1. **Smartphones** - iPhone, Samsung, OnePlus
2. **Laptops** - MacBook, Dell, HP
3. **Audio** - Headphones, Speakers, Earbuds
4. **Cameras** - DSLR, Mirrorless cameras
5. **Wearables** - Smartwatches
6. **Accessories** - Chargers, Power banks

## 🚀 Deployment

### Deploy to GitHub Pages (Free!)

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select "main" branch as source
4. Your site will be live at `https://yourusername.github.io/apex-electronics`

### Deploy to Netlify

1. Connect your GitHub repository
2. Build command: (leave empty for static site)
3. Publish directory: `/`
4. Deploy!

### Deploy to Vercel

1. Import your GitHub repository
2. Configure build settings
3. Deploy with one click

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can register with email/password
- [ ] User can login with credentials
- [ ] User can sign in with Google
- [ ] Password toggle works on all fields
- [ ] Products display correctly
- [ ] Search functionality works
- [ ] Filters work (category, price, brand)
- [ ] Add to cart functionality
- [ ] Cart updates properly
- [ ] Checkout form validation
- [ ] Order placement works
- [ ] Logout functionality
- [ ] Responsive design on mobile

## 🐛 Known Issues

- None at the moment! 🎉

## 🔮 Future Enhancements

- [ ] User profile page
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Payment gateway integration
- [ ] Admin panel for product management
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- GitHub: https://github.com/gobu01/
- Email: mgobu413@gmail.com

## 🙏 Acknowledgments

- Firebase for authentication and database services
- Google Fonts for typography
- Unsplash for product images (if used)
- Inspiration from modern e-commerce platforms

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Email: support@apexelectronics.com
- Check the documentation

## ⭐ Show Your Support

Give a ⭐ if you like this project!

---

**Made with ❤️ for the electronics community**

**Last Updated**: February 2026
