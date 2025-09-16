const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Product Schema
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,      // Main category: "babycare" or "bathbeauty"
  subcategory: String,   // Subcategory: "diapers", "formula", "skincare", etc.
  description: String,
  image: String,
  price: Number,
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

// Create Product Model
const Product = mongoose.model('Product', productSchema);

// Product Data - Updated with proper category structure
const products = [
  // ==== Baby Care Products ====
  {
    id: "p1",
    name: "Premium Baby Diapers",
    category: "babycare",
    subcategory: "diapers",
    description: "Super absorbent diapers with wetness indicator. Hypoallergenic and gentle on baby's skin.",
    image: "/img/nunadiaper.jpg",
    price: 24.99,
    originalPrice: 29.99,
    badge: "Popular",
    rating: 4.8,
    reviewCount: 1245,
    reviews: [
      {
        text: "These diapers are amazing! My baby sleeps through the night without any leaks.",
        author: "Sarah M.",
        rating: 5
      }
    ],
    brand: "nuna",
    features: ["hypoallergenic"]
  },
  {
    id: "p7",
    name: "Premium Adult Diapers",
    category: "babycare",
    subcategory: "diapers",
    description: "Super absorbent diapers with wetness indicator. Hypoallergenic and gentle on baby's skin.",
    image: "/img/confydiaper.jpg",
    price: 19.99,
    originalPrice: 29.99,
    badge: "Popular",
    rating: 4.8,
    reviewCount: 1245,
    reviews: [
      {
        text: "These diapers are amazing! My baby sleeps through the night without any leaks.",
        author: "muuse ahmed M.",
        rating: 5
      }
    ],
    brand: "confy",
    features: ["hypoallergenic"]
  },
  {
    id: "p2",
    name: "Baby Wipes - Sensitive Skin",
    category: "babycare",
    subcategory: "diapers",
    description: "Alcohol-free, fragrance-free wipes with aloe vera. Perfect for sensitive baby skin.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
    price: 8.99,
    originalPrice: null,
    badge: "Eco-Friendly",
    rating: 4.5,
    reviewCount: 867,
    reviews: [
      {
        text: "Perfect for my newborn's sensitive skin. No rashes at all!",
        author: "Jennifer L.",
        rating: 5
      }
    ],
    brand: "huggies",
    features: ["eco-friendly", "hypoallergenic"]
  },
  {
    id: "p3",
    name: "Baby Bath Wipes",
    category: "babycare",
    subcategory: "bath",
    description: "Alcohol-free, fragrance-free wipes with aloe vera. Perfect for sensitive baby skin.",
    image: "/img/snickers.jpg",
    price: 8.99,
    originalPrice: null,
    badge: "Eco-Friendly",
    rating: 5,
    reviewCount: 867,
    reviews: [
      {
        text: "Perfect for my newborn's sensitive skin. No rashes at all!",
        author: "Jennifer L.",
        rating: 5
      }
    ],
    brand: "huggies",
    features: ["eco-friendly", "hypoallergenic"]
  },
  {
    id: "p4",
    name: "Baby Food Cereal",
    category: "babycare",
    subcategory: "food",
    description: "Wholesome cereals and creamy yogurts made with natural ingredients for happy tummies!.",
    image: "/img/bledinaminilactes.jpg",
    price: 8.99,
    originalPrice: null,
    badge: "Eco-Friendly",
    rating: 5,
    reviewCount: 867,
    reviews: [
      {
        text: "Perfect for my newborn's sensitive skin. No rashes at all!",
        author: "Jennifer L.",
        rating: 5
      }
    ],
    brand: "bledina",
    features: ["eco-friendly", "hypoallergenic","organic"],
  },
  {
    id: "p5",
    name: "Baby Bottles Set",
    category: "babycare",
    subcategory: "feeding",
    description: "Ergonomic feeding bottles and BPA-free utensiles for stress free,Happy meal times!.",
    image: "/img/babybottles.jpg",
    price: 2.99,
    originalPrice: 3.99,
    badge: "Popular",
    rating: 4.8,
    reviewCount: 1245,
    reviews: [
      {
        text: "These baby bottles are amazing! My baby sleeps through the night without any leaks.",
        author: "mohamed Haashi.",
        rating: 5
      }
    ],
    brand: "pampers",
    features: ["hypoallergenic"],
  },
  {
    id: "p6",
    name: "Formula Milk",
    category: "babycare",
    subcategory: "formula",
    description: "Premium formula milk with essential nutrients for baby's growth and development.",
    image: "/img/aptamil.jpg",
    price: 19.99,
    originalPrice: null,
    badge: "Popular",
    rating: 4.8,
    reviewCount: 1245,
    reviews: [
      {
        text: "My baby loves this formula! No digestion issues at all.",
        author: "Lisa T.",
        rating: 5
      }
    ],
    brand: "aptamil",
    features: ["hypoallergenic"]
  },

  // ==== Bath & Beauty Products ====
  {
    id: "b1",
    name: "Hydrating Face Moisturizer",
    category: "bathbeauty",
    subcategory: "skincare",
    description: "24-hour hydration with hyaluronic acid. Absorbs quickly.",
    image: "/img/moisturizer.jpg",
    price: 24.99,
    originalPrice: 29.99,
    badge: "Bestseller",
    rating: 4.7,
    reviewCount: 845,
    brand: "Neutrogena",
    features: ["cruelty-free"]
  },
  {
    id: "b2",
    name: "Nourishing Shampoo & Conditioner Set",
    category: "bathbeauty",
    subcategory: "haircare",
    description: "Sulfate-free with argan oil. Restores shine and softness.",
    image: "/img/shampoo.jpg",
    price: 32.99,
    originalPrice: null,
    badge: "New",
    rating: 4.5,
    reviewCount: 523,
    brand: "L'Oreal",
    features: ["vegan", "cruelty-free"]
  },
  {
    id: "b3",
    name: "Matte Lipstick Set - 6 Colors",
    category: "bathbeauty",
    subcategory: "makeup",
    description: "Long-lasting matte finish with intense color payoff.",
    image: "/img/lipstick.jpg",
    price: 29.99,
    originalPrice: 39.99,
    badge: "Sale",
    rating: 4.8,
    reviewCount: 1124,
    brand: "L'Oreal",
    features: ["cruelty-free"]
  },
  {
    id: "b4",
    name: "Hair Cream - 6 Types",
    category: "bathbeauty",
    subcategory: "haircare",
    description: "Professional hair cream for all hair types with natural ingredients.",
    image: "/img/lipstick.jpg",
    price: 12.99,
    originalPrice: 20.99,
    badge: "Sale",
    rating: 4.8,
    reviewCount: 1124,
    brand: "L'Oreal",
    features: ["cruelty-free"]
  },
  {
    id: "b5",
    name: "Organic Face Serum",
    category: "bathbeauty",
    subcategory: "skincare",
    description: "100% organic face serum with vitamin C for brightening and anti-aging.",
    image: "/img/serum.jpg",
    price: 34.99,
    originalPrice: 44.99,
    badge: "Organic",
    rating: 4.9,
    reviewCount: 789,
    brand: "The Ordinary",
    features: ["organic", "vegan", "cruelty-free"]
  }
];

async function populateDatabase() {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables. Please check your .env file');
    }
    
    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB successfully!');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    await Product.insertMany(products);
    
    console.log('Database populated successfully with', products.length, 'products!');
    
    // Count products by category
    const babycareCount = await Product.countDocuments({ category: 'babycare' });
    const bathbeautyCount = await Product.countDocuments({ category: 'bathbeauty' });
    
    console.log(`Babycare products: ${babycareCount}`);
    console.log(`Bath & Beauty products: ${bathbeautyCount}`);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error.message);
    
    // Close connection on error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    
    process.exit(1);
  }
}

// Only run if called directly (not when required as module)
if (require.main === module) {
  populateDatabase();
}

module.exports = products;