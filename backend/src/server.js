const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables with better error handling
try {
  // Try to load from parent directory first (if running from src folder)
  require('dotenv').config({ path: '../.env' });
} catch (error) {
  try {
    // Try to load from current directory
    require('dotenv').config();
  } catch (error) {
    console.warn('No .env file found. Using default environment variables.');
  }
}

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Check if environment variables are loading
console.log('Environment check:');
console.log('- PORT:', process.env.PORT);
console.log('- MONGODB_URI exists:', !!process.env.MONGODB_URI);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

// Serve HTML files
app.get('/admin.html', (req, res) => {
  res.sendFile('admin.html', { root: __dirname });
});

// Add other category pages as needed

// MongoDB Connection with better error handling
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  console.error('Please check your .env file or set the environment variable');
  
  // Provide helpful instructions
  console.log('\nTo fix this:');
  console.log('1. Create a .env file in your project root');
  console.log('2. Add this line: MONGODB_URI=your_mongodb_connection_string');
  console.log('3. Or set the environment variable: set MONGODB_URI=your_connection_string');
  
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.error('MongoDB connection failed:', err.message);
  process.exit(1);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  description: String,
  image: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  badge: String,
  rating: Number,
  reviewCount: Number,
  reviews: [{
    text: String,
    author: String,
    rating: Number
  }],
  brand: String,
  features: [String]
});

const Product = mongoose.model('Product', productSchema);

// Authentication middleware
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminToken = process.env.ADMIN_TOKEN || 'admin123';
  
  if (authHeader === `Bearer ${adminToken}`) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// API Routes
app.get('/api/products/search', async (req, res) => {
  try {
    // Your search logic here
    res.json({ message: 'Search endpoint - implement your logic here' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes
app.get('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});