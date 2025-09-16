const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables with better error handling
try {
  require('dotenv').config({ path: '../.env' });
} catch (error) {
  try {
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

// API Routes - FIXED: Implement proper search functionality
app.get('/api/products/search', async (req, res) => {
  try {
    const {
      q = '',
      category = '',
      subcategory = '',
      minPrice = 0,
      maxPrice = 1000,
      minRating = 0,
      brands = '',
      features = '',
      page = 1,
      limit = 8
    } = req.query;

    // Build the filter object
    const filter = {};

    // Text search
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { subcategory: { $regex: q, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Subcategory filter
    if (subcategory && subcategory !== 'all') {
      filter.subcategory = subcategory;
    }

    // Price filter
    filter.price = { 
      $gte: parseFloat(minPrice) || 0, 
      $lte: parseFloat(maxPrice) || 1000 
    };

    // Rating filter
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }

    // Brand filter
    if (brands) {
      const brandList = brands.split(',').filter(b => b);
      if (brandList.length > 0) {
        filter.brand = { $in: brandList };
      }
    }

    // Features filter
    if (features) {
      const featureList = features.split(',').filter(f => f);
      if (featureList.length > 0) {
        filter.features = { $in: featureList };
      }
    }

    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Error in products search:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all products endpoint
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
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

// Create new product
app.post('/api/admin/products', authenticateAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/admin/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
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