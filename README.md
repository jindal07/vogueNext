# VogueNext - E-commerce Platform

A full-stack e-commerce platform built with React.js, Node.js, Express.js, and MongoDB. VogueNext offers a complete online shopping experience with separate customer and admin interfaces.

## 🌟 Features

### Customer Features
- **Product Browsing**: Browse products by categories (Men, Women, Kids)
- **Product Search**: Search functionality with filters
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Secure login and registration
- **Order Management**: Place orders with multiple payment options
- **Order Tracking**: View order history and status
- **Responsive Design**: Mobile-friendly interface

### Admin Features
- **Product Management**: Add, update, and remove products
- **Order Management**: View and update order status
- **Inventory Control**: Manage product stock and details
- **Admin Dashboard**: Comprehensive overview of business metrics

### Payment Integration
- **Cash on Delivery (COD)**
- **Stripe Payment Gateway**
- **Razorpay Payment Gateway**

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload

### Payment Gateways
- **Stripe** - Online payments
- **Razorpay** - Online payments

## 📁 Project Structure

```
ecommerce/
├── frontend/           # React.js customer interface
│   ├── src/
│   │   ├── assets/     # Static assets
│   │   ├── components/ # Reusable components
│   │   ├── context/    # Context API
│   │   └── pages/      # Page components
│   └── package.json
├── backend/            # Node.js API server
│   ├── config/         # Database and service configs
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── adminPortal/        # React.js admin interface
│   ├── src/
│   │   ├── assets/     # Admin assets
│   │   ├── components/ # Admin components
│   │   └── pages/      # Admin pages
│   └── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Stripe account (optional)
- Razorpay account (optional)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

4. Start the frontend development server:
```bash
npm run dev
```

### Admin Portal Setup

1. Navigate to the admin portal directory:
```bash
cd adminPortal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:5000
```

4. Start the admin portal:
```bash
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add product (Admin)
- `POST /api/product/remove` - Remove product (Admin)

### Cart
- `POST /api/cart/add` - Add to cart
- `POST /api/cart/update` - Update cart
- `POST /api/cart/get` - Get user cart

### Orders
- `POST /api/order/place` - Place order (COD)
- `POST /api/order/stripe` - Stripe payment
- `POST /api/order/razorpay` - Razorpay payment
- `POST /api/order/userorders` - Get user orders
- `POST /api/order/list` - Get all orders (Admin)
- `POST /api/order/status` - Update order status (Admin)

## 📱 Usage

### For Customers
1. Visit the frontend URL (default: http://localhost:5173)
2. Browse products or search for specific items
3. Register/Login to your account
4. Add products to cart
5. Proceed to checkout and place order
6. Track your orders in the Orders section

### For Admins
1. Visit the admin portal URL (default: http://localhost:5174)
2. Login with admin credentials
3. Add new products with images and details
4. Manage existing products
5. View and update order statuses
6. Monitor business analytics

## 🎨 Design Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean and intuitive user interface
- **Dark/Light Theme**: Support for different viewing preferences
- **Fast Loading**: Optimized for performance
- **SEO Friendly**: Structured for search engine optimization

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin resource sharing configuration
- **Payment Security**: Secure payment processing with encrypted transactions

## 🚦 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon (development)
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 📞 Support

For support, email voguenext@gmail.com or create an issue in the GitHub repository.

## 🎯 Future Enhancements

- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced filtering options
- [ ] Email notifications
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Inventory management alerts

---

**VogueNext** - Where great style never fades! 🛍️# vogueNext
