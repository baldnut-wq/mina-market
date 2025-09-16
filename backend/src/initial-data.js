

const mongoose = require('mongoose');
require('dotenv').config();
const productSchema = new mongoose.Schema({
  // Remove the custom id field
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
})

// Your product data array - Add ALL your products here
const products = [
  // ==== Baby Care Products ====
  {
    //id: "p1",
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
    brand: "pampers",
    features: ["hypoallergenic"]
  },
  {
   // id: "p2",
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
   // id: "p3",
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
    //id: "p4",
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
    features: ["eco-friendly", "hypoallergenic"],
  },
  {
    //id: "p5",
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
    //id: "p6",
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


// Grains & Goodness products data with reviews

      {
   //     id: "g1",
        name: "Organic Basmati Rice - 5kg",
        category: "grains",
        subcategory: "grains",
        description: "Premium long-grain organic Basmati rice with a delicate aroma and fluffy texture when cooked.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 15.99,
        originalPrice: 18.99,
        badge: "Organic",
        rating: 4.8,
        reviewCount: 342,
        reviews: [
          {
            text: "This is the best Basmati rice I've ever cooked with. The grains are long and fragrant!",
            author: "Sarah T.",
            rating: 5
          },
          {
            text: "Excellent quality rice that cooks perfectly every time.",
            author: "Michael R.",
            rating: 4
          }
        ],
        brand: "organic-valley",
        features:["organic","grains"]
      },
      {
   //     id: "g2",
        name: "Organic Quinoa - 2kg",
        category: "grains",
        subcategory: "Organic",
        description: "Protein-rich organic quinoa, a complete protein source with all nine essential amino acids.",
        image: "https://images.unsplash.com/photo-1598965678185-dc2d8c2b6caf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 12.99,
        originalPrice: null,
        badge: "Superfood",
        rating: 4.7,
        reviewCount: 287,
        reviews: [
          {
            text: "This quinoa cooks up fluffy and has a lovely nutty flavor. My whole family enjoys it!",
            author: "Jennifer L.",
            rating: 5
          }
        ],
        brand: "bobs-red-mill",
        features: "organic",
      },
      {
   //     id: "g3",
        name: "Raw Almonds - 1kg",
        category: "grains",
        subcategory: "nuts",
        description: "Premium raw California almonds, packed with nutrients and healthy fats.",
        image: "https://images.unsplash.com/photo-1619538189315-58ce35e5c2e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 18.99,
        originalPrice: 22.99,
        badge: "Popular",
        rating: 4.9,
        reviewCount: 423,
        reviews: [
          {
            text: "These almonds are fresh, crunchy, and delicious. Perfect for snacking or adding to recipes.",
            author: "Amanda S.",
            rating: 5
          }
        ],
        brand: "bobs-red-mill",
        features: "nuts",
      },
      {
   //     id: "g4",
        name: "Pure Acacia Honey - 500g",
        category: "grains",
        subcategory: "honey",
        description: "100% pure acacia honey with a light color and delicate floral flavor. Never processed or heated.",
        image: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 14.99,
        originalPrice: null,
        badge: "Pure",
        rating: 4.8,
        reviewCount: 256,
        reviews: [
          {
            text: "This honey is incredible! The flavor is delicate and not overly sweet like some commercial honeys.",
            author: "David P.",
            rating: 5
          }
        ],
        brand: "local",
        features: "organic",
      },
      {
   //     id: "g5",
        name: "Extra Virgin Olive Oil - 1L",
        category: "grains",
        subcategory: "oils",
        description: "Cold-pressed extra virgin olive oil with low acidity. Rich in antioxidants and healthy fats.",
        image: "https://images.unsplash.com/photo-1546552768-9e3a5e790aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 22.99,
        originalPrice: 26.99,
        badge: "Premium",
        rating: 4.7,
        reviewCount: 389,
        reviews: [
          {
            text: "This olive oil has a wonderful fruity flavor and aroma. Perfect for dressings and finishing dishes.",
            author: "Robert K.",
            rating: 5
          }
        ],
        brand: "organic-valley",
        features: "organic",
      },
      {
  //      id: "g6",
        name: "Organic Chia Seeds - 500g",
        category: "grains",
        subcategory: "seeds",
        description: "Nutrient-dense organic chia seeds, rich in omega-3 fatty acids, fiber, and antioxidants.",
        image: "https://images.unsplash.com/photo-1596363500725-22f1c9f5866c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 9.99,
        originalPrice: 12.99,
        badge: "Superfood",
        rating: 4.6,
        reviewCount: 312,
        reviews: [
          {
            text: "These chia seeds are excellent quality. They plump up nicely when soaked and have a mild, nutty flavor.",
            author: "Thomas W.",
            rating: 5
          }
        ],
        brand: "bobs-red-mill",
        features: "nuts",
      },
      {
  //      id: "g7",
        name: "Organic Rolled Oats - 2kg",
        category: "grains",
        subcategory: "grains",
        description: "100% organic rolled oats, perfect for breakfast porridge, baking, or adding to smoothies.",
        image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 8.99,
        originalPrice: 10.99,
        badge: "Organic",
        rating: 4.5,
        reviewCount: 198,
        reviews: [
          {
            text: "These oats are so versatile and have a great texture. Perfect for my morning oatmeal!",
            author: "Emily R.",
            rating: 5
          }
        ],
        brand: "bobs-red-mill",
        features: "organic",
      },
      {
  //      id: "g8",
        name: "Wildflower Honey - 500g",
        category: "grains",
        subcategory: "honey",
        description: "Raw wildflower honey collected from diverse floral sources, with a rich and complex flavor profile.",
        image: "https://images.unsplash.com/photo-1558308094-cc61367a1215?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 12.99,
        originalPrice: null,
        badge: "Natural",
        rating: 4.7,
        reviewCount: 167,
        reviews: [
          {
            text: "The flavor of this wildflower honey is incredible - so much better than supermarket honey!",
            author: "Lisa M.",
            rating: 5
          }
        ],
        brand: "local",
        features: "natural",
      },


// Swimming products data
       
            {
  //              id: "s1",
                name: "Women's One-Piece Swimsuit",
                category: "swimming",
                subcategory: "swimwear",
                description: "Elegant one-piece swimsuit with tummy control and adjustable straps for maximum comfort.",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                price: 39.99,
                originalPrice: 49.99,
                badge: "Bestseller",
                rating: 4.7,
                reviewCount: 156,
                ageGroup: "adults",
                brand: "speedo",
                reviews: [
                    {
                        text: "Fits perfectly and very comfortable. The material is high quality!",
                        author: "Jessica M.",
                        rating: 5
                    }
                ]
            },
            {
  //              id: "s2",
                name: "Beach bags combo",
                category: "swimming",
                subcategory: "accessories",
                description: "Quick-dry swim shorts with built-in liner and secure pocket for essentials.",
                image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                price: 29.99,
                originalPrice: 34.99,
                badge: "New",
                rating: 5,
                reviewCount: 89,
                ageGroup: "adults",
                brand: "arena",
                reviews: [
                    {
                        text: "Great shorts for swimming and beach activities. Dries quickly!",
                        author: "Michael T.",
                        rating: 4
                    }
                ]
            },
            {
  //              id: "s3",
                name: "Kids' Swim Shorts",
                category: "swimming",
                subcategory: "swimwear",
                description: "Colorful and fun swim shorts for boys with elastic waistband for comfortable fit.",
                image: "https://images.unsplash.com/photo-1591047138183-6b4d31d4e5df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                price: 19.99,
                originalPrice: 24.99,
                badge: "Popular",
                rating: 4.6,
                reviewCount: 78,
                ageGroup: "kids",
                brand: "speedo",
                reviews: [
                    {
                        text: "My son loves these shorts! They dry quickly and don't irritate his skin.",
                        author: "Sarah L.",
                        rating: 5
                    }
                ]
            },

            
            {
  //              id: "s4",
                name: "Pool Float with Cup Holders",
                category: "swimming",
                subcategory: "pool",
                description: "Large inflatable pool float with built-in cup holders and headrest for ultimate relaxation.",
                image: "https://images.unsplash.com/photo-1571799313565-dee4c46ef398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
                price: 29.99,
                originalPrice: 34.99,
                badge: "Fun",
                rating: 4.4,
                reviewCount: 178,
                ageGroup: "adults",
                brand: "arena",
                reviews: [
                    {
                        text: "So much fun! The cup holders are genius. Holds up well.",
                        author: "Jason P.",
                        rating: 4
                    }
                ]
            },



// Clean & Care products data with reviews
  
      {
  //      id: "cc1",
        name: "Laundry Liquid Detergent - 3L",
        category:"cleancare",
        subcategory: "laundry",
        description: "Concentrated laundry liquid that removes tough stains while caring for your fabrics.",
        image: "https://images.unsplash.com/photo-1600857062240-7ed9285c0ef2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 18.99,
        originalPrice: 22.99,
        badge: "Popular",
        rating: 4.7,
        reviewCount: 428,
        reviews: [
          {
            text: "This detergent gets out even the toughest stains. My clothes smell fresh and feel clean!",
            author: "Sarah M.",
            rating: 5
          },
          {
            text: "A little goes a long way. Very economical and effective.",
            author: "James T.",
            rating: 4
          }
        ],
        brand: "pearl",
        features: "laundry",
      },
      {
  //      id: "cc2",
        name: "Dishwashing Liquid - Lemon Scent",
        category: "cleancare",
        subcategory: "dishwashing",
        description: "Powerful grease-cutting formula with natural lemon scent for sparkling clean dishes.",
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 4.99,
        originalPrice: null,
        badge: "Best Seller",
        rating: 4.8,
        reviewCount: 736,
        reviews: [
          {
            text: "Cuts through grease like magic and smells amazing!",
            author: "Emma L.",
            rating: 5
          }
        ],
        brand: "fairy",
        features: "dishwashing",
      },
      {
  //      id: "cc3",
        name: "Multi-Surface Cleaner - Citrus",
        category: "cleancare",
        subcategory: "cleaners",
        description: "All-purpose cleaner that disinfects and deodorizes various surfaces without harsh chemicals.",
        image: "https://images.unsplash.com/photo-1595079835355-2c5c5f4b0e33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 7.49,
        originalPrice: 8.99,
        badge: "Eco-Friendly",
        rating: 4.5,
        reviewCount: 287,
        reviews: [
          {
            text: "Love the fresh citrus scent and it cleans everything effectively!",
            author: "Michelle R.",
            rating: 5
          }
        ],
        brand: "comfort",
        features: "cleaners",
      },
      {
  //      id: "cc4",
        name: "Microfiber Cleaning Cloths - 12 Pack",
        category: "cleancare",
        subcategory: "tools",
        description: "Highly absorbent microfiber cloths perfect for dusting, cleaning, and polishing surfaces.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 14.99,
        originalPrice: null,
        badge: "Value Pack",
        rating: 4.6,
        reviewCount: 342,
        reviews: [
          {
            text: "These cloths are fantastic! They absorb well and don't leave streaks on glass.",
            author: "David K.",
            rating: 5
          }
        ],
        brand: "pearl",
        features: "laundry",
      },
      {
        //id: "cc5",
        name: "Roach Killer Spray - Baygon",
        category: "cleancare",
        subcategory: "disinfectants",
        description: "Effective insecticide spray that kills roaches and other crawling insects on contact.",
        image: "https://images.unsplash.com/photo-1585232264248-65cd293ded6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 9.99,
        originalPrice: 12.99,
        badge: "Effective",
        rating: 5,
        reviewCount: 516,
        reviews: [
          {
            text: "This really works! Had a roach problem and this spray solved it in days.",
            author: "Amanda S.",
            rating: 4
          }
        ],
        brand: "baygon",
        features: "killers",
      },
      {
  //      id: "cc6",
        name: "Fabric Softener - Spring Fresh",
        category: "cleancare",
        subcategory: "laundry",
        description: "Liquid fabric softener that leaves clothes soft, static-free, and smelling fresh.",
        image: "https://images.unsplash.com/photo-1600857062241-0c3a0b5a1253?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 6.99,
        originalPrice: null,
        badge: "Fresh Scent",
        rating: 4.7,
        reviewCount: 204,
        reviews: [
          {
            text: "Makes my towels so soft and the scent lasts for days!",
            author: "Thomas W.",
            rating: 5
          }
        ],
        brand: "comfort",
        features: "laundry",
      },
      {
  //      id: "cc7",
        name: "Spin Mop with Bucket",
        category: "cleancare",
        subcategory: "tools",
        description: "Innovative spin mop system with wringer bucket for efficient floor cleaning.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 39.99,
        originalPrice: 49.99,
        badge: "Innovative",
        rating: 4.7,
        reviewCount: 178,
        reviews: [
          {
            text: "This mop is a game changer! So much easier to wring out than traditional mops.",
            author: "Robert K.",
            rating: 5
          }
        ],
        brand: "comfort",
        features: "tools",
      },

          



    // Foods & Snacks products data with reviews
  
      {
     //   id: "f1",
        name: "Lay's Potato Chips - Classic",
        category: "foods",
        subcategory: "snacks",
        description: "Crispy, golden potato chips with just the right amount of salt. Perfect for snacking anytime.",
        image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 3.99,
        originalPrice: 4.49,
        badge: "Popular",
        rating: 5,
        reviewCount: 289,
        reviews: [
          {
            text: "These chips are always fresh and perfectly salted. My go-to snack!",
            author: "Michael T.",
            rating: 5
          }
        ],
        brand: "lays",
        features: ["gluten-free","snacks"]
      },
      {
     //   id: "f2",
        name: "Oreo Chocolate Sandwich Cookies",
        category: "foods",
        subcategory: "biscuits",
        description: "Chocolate wafer cookies with sweet cream filling. Perfect with milk or as a standalone treat.",
        image: "https://images.unsplash.com/photo-1616627563234-255d5f3c7d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 4.49,
        originalPrice: null,
        badge: "Favorite",
        rating: 5,
        reviewCount: 452,
        reviews: [
          {
            text: "Classic cookies that never disappoint. The cream filling is perfect!",
            author: "Sarah L.",
            rating: 5
          }
        ],
        brand: "nestle",
        features: "snacks",
      },
      {
     //   id: "f3",
        name: "Coca-Cola Classic ",
        category:  "foods",
        subcategory: "beverages",
        description: "The refreshing, iconic taste of Coca-Cola. Perfect for parties, meals, or anytime refreshment.",
        image: "https://images.unsplash.com/photo-1561758033-48d52648ae8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 5.99,
        originalPrice: 6.49,
        badge: "Classic",
        rating: 4.9,
        reviewCount: 367,
        reviews: [
          {
            text: "Nothing beats an ice-cold Coke on a hot day!",
            author: "James R.",
            rating: 5
          }
        ],
        brand: "coca-cola",
        features: "beverages",
      },
      {
     //   id: "f4",
        name: "Mixed Nuts - 500g",
        category: "foods",
        subcategory: "nuts",
        description: "A delicious blend of roasted almonds, cashews, walnuts, and pecans. No salt added.",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 12.99,
        originalPrice: 14.99,
        badge: "Healthy",
        rating: 5,
        reviewCount: 198,
        reviews: [
          {
            text: "Great quality nuts, fresh and crunchy. Perfect for snacking!",
            author: "Amanda K.",
            rating: 4
          }
        ],
        brand: "nestle",
        features: ["vegan","organic"]
      },
      {
     //   id: "f5",
        name: " Tomato Ketchup - 500g",
        category: "foods",
        subcategory: "sauces",
        description: "Thick, rich tomato ketchup made from ripe tomatoes. Perfect for burgers, fries, and more.",
        image: "https://images.unsplash.com/photo-1591628666707-83512731285c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 4.29,
        originalPrice: null,
        badge: "Essential",
        rating: 5,
        reviewCount: 321,
        reviews: [
          {
            text: "The only ketchup we use in our house. Perfect consistency and flavor.",
            author: "Robert F.",
            rating: 5
          }
        ],
        brand: "heinz",
        features: "cooking",
      },
      {
     //   id: "f6",
        name: "Italian Pasta - 1kg",
        category: "foods",
        subcategory: "cooking",
        description: "High-quality durum wheat pasta. Cooks up perfectly al dente every time.",
        image: "https://images.unsplash.com/photo-1605522867157-380f6e1eeda8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 5,
        originalPrice: 3.99,
        badge: "Quality",
        rating: 4.4,
        reviewCount: 187,
        reviews: [
          {
            text: "Excellent pasta that holds sauce well and has great texture.",
            author: "Maria D.",
            rating: 5
          }
        ],
        brand: "local",
        features: ["gluten-free","cooking"]
      },



         // Beverage products data with reviews
   
      {
    //    id: "b1",
        name: "Mineral Waters ",
        category: "fresh",
        subcategory: "water",
        description: "Pure mineral water with essential electrolytes. Perfect for daily hydration.",
        image: "https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 8.99,
        originalPrice: 10.99,
        badge: "Best Value",
        rating: 5,
        reviewCount: 542,
        reviews: [
          {
            text: "Great tasting water at an affordable price. Always have a pack in my fridge.",
            author: "Michael R.",
            rating: 5
          },
          {
            text: "Good quality water, but the bottles could be more sturdy.",
            author: "Sarah T.",
            rating: 4
          }
        ],
        brand: "water",
        features: "water",
      },
      {
    //    id: "b2",
        name: "Orange Juice - Fresh Squeezed",
        category: "fresh",
        subcategory: "juice",
        description: "100% pure squeezed oranges with no added sugars or preservatives.",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 5.99,
        originalPrice: null,
        badge: "Fresh",
        rating: 4.8,
        reviewCount: 387,
        reviews: [
          {
            text: "Tastes just like fresh squeezed oranges! My family loves it.",
            author: "Jennifer L.",
            rating: 5
          }
        ],
        brand: "local",
        features: ["organic","juice"]
      },
      {
    //    id: "b3",
        name: "Sports Drink - Variety Pack",
        category: "fresh",
        subcategory: "sports",
        description: "Electrolyte-rich sports drink to replenish nutrients after exercise.",
        image: "https://images.unsplash.com/photo-1622484206476-3f228b6ec8e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 12.99,
        originalPrice: 15.99,
        badge: "Sale",
        rating: 4.5,
        reviewCount: 289,
        reviews: [
          {
            text: "Perfect for post-workout recovery. Love the variety of flavors.",
            author: "David P.",
            rating: 5
          }
        ],
        brand: "coca-cola",
        features: ["calorie","energy","soda"]
      },
      {
    //    id: "b4",
        name: "Sparkling Water - Lemon Lime",
        category: "fresh",
        subcategory: "water",
        description: "Refreshing sparkling water with natural lemon lime flavor. Zero calories.",
        image: "https://images.unsplash.com/photo-1593503918106-954ee7c46ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 4.99,
        originalPrice: null,
        badge: "Sugar-Free",
        rating: 4.3,
        reviewCount: 423,
        reviews: [
          {
            text: "My favorite sparkling water! Not too sweet with just the right amount of fizz.",
            author: "Amanda S.",
            rating: 5
          }
        ],
        brand: "pepsi",
        features: ["sugar", "calorie"]
      },
      {
    //    id: "b5",
        name: "Iced Tea - Peach Flavor",
        category: "fresh",
        subcategory: "tea",
        description: "Refreshing peach flavored iced tea. Perfect for summer days.",
        image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 3.99,
        originalPrice: 4.99,
        badge: "New",
        rating: 4.7,
        reviewCount: 156,
        reviews: [
          {
            text: "The peach flavor is amazing! Not too sweet and very refreshing.",
            author: "Robert K.",
            rating: 5
          }
        ],
        brand: "coca-cola",
        features: ["juice","sugar"]
      },
      {
    //    id: "b6",
        name: "Energy Drink - Tropical",
        category: "fresh",
        subcategory: "energy",
        description: "Tropical flavored energy drink with natural caffeine from green tea.",
        image: "https://images.unsplash.com/photo-1616128417747-49e5d5c5b53d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 2.99,
        originalPrice: null,
        badge: "Popular",
        rating: 4.4,
        reviewCount: 478,
        reviews: [
          {
            text: "Gives me the energy boost I need without the crash later.",
            author: "Thomas W.",
            rating: 4
          }
        ],
        brand: "pepsi",
        features: "energy",
      },





    // Kids play products data with reviews
    
      {
       // id: "k1",
        name: "Basketball Set - Size 3 & 5",
        category: "kidsplay",
        subcategory: "sports",
        description: "Complete basketball set with size 3 and 5 balls. Perfect for young players to practice their skills.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 29.99,
        originalPrice: 39.99,
        badge: "Popular",
        rating: 4.7,
        reviewCount: 342,
        reviews: [
          {
            text: "My son loves this basketball set! The balls are the perfect size for kids.",
            author: "Michael R.",
            rating: 5
          },
          {
            text: "Good quality for the price. The pump included is a nice bonus.",
            author: "Sarah T.",
            rating: 4
          }
        ],
        brand: "nerf",
        features: ["outdoor", "sports"]
      },
      {
       // id: "k2",
        name: "Remote Control Car - Sports Edition",
        category: "kidsplay",
        subcategory: "toys",
        description: "Fast remote control car with realistic sports car design. Easy controls for kids ages 6+.",
        image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 24.99,
        originalPrice: null,
        badge: "New",
        rating: 4.5,
        reviewCount: 187,
        reviews: [
          {
            text: "This RC car is fast and durable! My grandson plays with it for hours.",
            author: "Robert K.",
            rating: 5
          }
        ],
        brand: "hasbro",
        features: ["remote control", "indoor"]
      },
      {
       // id: "k3",
        name: "Doctor Costume Set for Kids",
        category: "kidsplay",
        subcategory: "costumes",
        description: "Complete doctor role-play set with coat, stethoscope, and medical tools. Encourages imaginative play.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 19.99,
        originalPrice: 24.99,
        badge: "Educational",
        rating: 4.8,
        reviewCount: 289,
        reviews: [
          {
            text: "My daughter loves playing doctor with this set! The quality is much better than expected.",
            author: "Amanda S.",
            rating: 5
          }
        ],
        brand: "hasbro",
        features: ["toys", "educational"]
      },
      {
     //   id: "k4",
        name: "School Backpack with Supplies",
        category: "kidsplay",
        subcategory: "school",
        description: "Durable school backpack complete with pencil case, pens, pencils, and other essential supplies.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 34.99,
        originalPrice: null,
        badge: "Back to School",
        rating: 4.6,
        reviewCount: 423,
        reviews: [
          {
            text: "Perfect backpack for my son's first year of school. Lots of compartments and comes with everything he needs.",
            author: "Jennifer L.",
            rating: 5
          }
        ],
        brand: "nerf",
        features: ["school", "storage"]
      },
      {
     //   id: "k5",
        name: "Foldable Play Mat - Alphabet Theme",
        category: "kidsplay",
        subcategory: "toys",
        description: "Educational play mat with alphabet and numbers. Easy to fold and store when not in use.",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 22.99,
        originalPrice: 29.99,
        badge: "Sale",
        rating: 4.7,
        reviewCount: 256,
        reviews: [
          {
            text: "My toddler loves this mat! It's soft and educational. The folding feature is great for saving space.",
            author: "David P.",
            rating: 5
          }
        ],
        brand: "lego",
        features: ["educational", "indoor"]
      },
      {
     //   id: "k6",
        name: "Kids Scooter - Adjustable Height",
        category: "kidsplay",
        subcategory: "outdoor",
        description: "Three-wheel scooter with adjustable handlebars. Perfect for kids ages 3-8 to develop balance and coordination.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 49.99,
        originalPrice: 59.99,
        badge: "Best Seller",
        rating: 4.9,
        reviewCount: 178,
        reviews: [
          {
            text: "This scooter is very sturdy and well-made. The adjustable height means it will last for years!",
            author: "Thomas W.",
            rating: 5
          }
        ],
        brand: "nerf",
        features: ["outdoor", "adjustable"]
      },

  // ==== Bath & Beauty Products ====
  {
//   id: "b1",
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
    brand: "neutrogena",
    features: ["cruelty-free"]
  },
  {
//    id: "b2",
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
    brand: "loreal",
    features: ["vegan", "Organic"]
  },
  {
   // id: "b3",
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
    brand: "loreal",
    features: ["cruelty-free"]
  },
  {
   // id: "b4",
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
    brand: "nivea",
    features: ["cruelty-free"]
  },
  {
   // id: "b5",
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
    brand: "neutrogena",
    features: ["organic", "vegan"]
  },
  
        
/////////home Corner products

{
    //    id: "h1",
        name: "Memory Foam Pillow - Standard",
        category:"home",
        subcategory: "pillows",
        description: "Premium memory foam pillow that contours to your head and neck for optimal support.",
        image: "https://images.unsplash.com/photo-1541558619145-6a9537c763a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 24.99,
        originalPrice: 34.99,
        badge: "Best Seller",
        rating: 4.7,
        reviewCount: 428,
        reviews: [
          {
            text: "Best pillow I've ever owned! Woke up without neck pain for the first time in years.",
            author: "Sarah M.",
            rating: 5
          },
          {
            text: "Took a few nights to get used to but now I love it.",
            author: "James T.",
            rating: 4
          }
        ],
        brand: "comfort-living",
        features: ["bedroom","memory-foam"]
      },
      {
    //    id: "h2",
        name: "Decorative Bolster Pillow - Floral",
        category: "home",
        subcategory: "pillows",
        description: "Beautiful floral printed bolster pillow perfect for adding accent to your living room or bedroom.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 19.99,
        originalPrice: null,
        badge: "New",
        rating: 4.5,
        reviewCount: 136,
        reviews: [
          {
            text: "Beautiful pattern and high quality fabric. Looks great on my couch!",
            author: "Emma L.",
            rating: 5
          }
        ],
        brand: "decor-style",
        features: ["living", "bedroom","polyester"]
      },
      {
    //    id: "h3",
        name: "Plush Bath Mat Set - 3 Pieces",
        category: "home",
        subcategory: "bath",
        description: "Super soft and absorbent bath mat set with non-slip backing for safety.",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 32.99,
        originalPrice: 39.99,
        badge: "Sale",
        rating: 4.8,
        reviewCount: 287,
        reviews: [
          {
            text: "So soft and absorbent! The non-slip backing works perfectly.",
            author: "Michelle R.",
            rating: 5
          }
        ],
        brand: "home-essentials",
        features: ["bathroom","cotton"]
      },
      {
    //    id: "h4",
        name: "Area Rug - Bohemian Pattern",
        category: "home",
        subcategory: "rugs",
        description: "Handwoven area rug with bohemian pattern, perfect for adding warmth and style to any room.",
        image: "https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 89.99,
        originalPrice: 119.99,
        badge: "Popular",
        rating: 4.6,
        reviewCount: 342,
        reviews: [
          {
            text: "Beautiful rug that really ties my living room together. Great quality for the price.",
            author: "David K.",
            rating: 5
          }
        ],
        brand: "decor-style",
        features: ["living","wool"]
      },
      {
    //    id: "h5",
        name: " Plastic Storage  with Lids",
        category:"home",
        subcategory: "storage",
        description: "Durable plastic storage containers with secure lids in various sizes for organized storage.",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 34.99,
        originalPrice: null,
        badge: "Practical",
        rating: 4.4,
        reviewCount: 516,
        reviews: [
          {
            text: "Perfect for organizing my pantry. The lids seal tightly and keep food fresh.",
            author: "Amanda S.",
            rating: 4
          }
        ],
        brand: "home-essentials",
        features: ["storage","plastic"]
      },
      {
     //   id: "h6",
        name: "Wooden Wall Shelf - Set of 3",
        category: "home",
        subcategory: "decor",
        description: "Set of 3 floating wooden shelves perfect for displaying photos, plants, and decor items.",
        image: "https://images.unsplash.com/photo-1599619585752-c3f01dd27e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 45.99,
        originalPrice: 59.99,
        badge: "Eco-Friendly",
        rating: 4.9,
        reviewCount: 204,
        reviews: [
          {
            text: "Easy to install and look beautiful with my plant collection. Very sturdy!",
            author: "Thomas W.",
            rating: 5
          }
        ],
        brand: "decor-style",
        features: ["living", "bedroom","wood"]
      },
      {
     //   id: "h7",
        name: "Foldable Camp Table - Compact",
        category: "home",
        subcategory: "furniture",
        description: "Lightweight and portable folding table perfect for camping, picnics, or extra table space at home.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 42.99,
        originalPrice: null,
        badge: "Portable",
        rating: 4.3,
        reviewCount: 178,
        reviews: [
          {
            text: "Perfect for my small balcony. Folds up easily when not in use.",
            author: "Robert K.",
            rating: 4
          }
        ],
        brand: "home-essentials",
        features: ["living", "storage","plastic"] 
      },
      {
      //  id: "h8",
        name: "Ceramic Plant Pot with Stand",
        category: "home",
        subcategory: "decor",
        description: "Elegant ceramic plant pot with matching stand, perfect for indoor plants and home decor.",
        image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 29.99,
        originalPrice: 39.99,
        badge: "Trending",
        rating: 4.7,
        reviewCount: 195,
        reviews: [
          {
            text: "Beautiful pot that makes my fiddle leaf fig look even more gorgeous!",
            author: "Jennifer L.",
            rating: 5
          }
        ],
        brand: "decor-style",
        features: ["living", "bedroom","ceramic"]
      
      },




        
  // ==== Cook & Dine Products ====
  {
   // id: "cd1",
    name: "Non-Stick Cookware Set",
    category: "cookdine",
    subcategory: "cookware",
    description: "10-piece non-stick cookware set with durable coating and even heat distribution.",
    image: "/img/cookware-set.jpg",
    price: 149.99,
    originalPrice: 199.99,
    badge: "Sale",
    rating: 4.7,
    reviewCount: 342,
    reviews: [
      {
        text: "Best cookware set I've ever owned! Easy to clean and cooks evenly.",
        author: "Michael T.",
        rating: 5
      }
    ],
    brand: "cuisinart",
    features: ["non-stick", "dishwasher-safe"]
  },
  {
   // id: "cd2",
    name: "Professional Chef's Knife",
    category: "cookdine",
    subcategory: "cutlery",
    description: "8-inch professional chef's knife with high-carbon stainless steel blade.",
    image: "/img/chef-knife.jpg",
    price: 89.99,
    originalPrice: null,
    badge: "Popular",
    rating: 4.9,
    reviewCount: 215,
    reviews: [
      {
        text: "Extremely sharp and well-balanced. A joy to work with!",
        author: "Sarah L.",
        rating: 5
      }
    ],
    brand: "wusthof",
    features: ["dishwasher-safe"]
  },
  {
   // id: "cd3",
    name: "Stand Mixer",
    category: "cookdine",
    subcategory: "appliances",
    description: "5-quart stand mixer with 10-speed settings and multiple attachments.",
    image: "/img/stand-mixer.jpg",
    price: 299.99,
    originalPrice: 349.99,
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 487,
    reviews: [
      {
        text: "Makes baking so much easier. Powerful and reliable.",
        author: "Jennifer K.",
        rating: 5
      }
    ],
    brand: "kitchenaid",
    features: []
  },
  {
  //  id: "cd4",
    name: "Glass Baking Dish Set",
    category: "cookdine",
    subcategory: "bakeware",
    description: "3-piece tempered glass baking dish set, oven and microwave safe.",
    image: "/img/baking-dishes.jpg",
    price: 34.99,
    originalPrice: null,
    badge: "Eco-Friendly",
    rating: 4.6,
    reviewCount: 178,
    reviews: [
      {
        text: "Perfect for casseroles and baking. Cleanup is easy!",
        author: "Robert M.",
        rating: 4
      }
    ],
    brand: "pyrex",
    features: ["dishwasher-safe", "eco-friendly"]
  },
  {
  //  id: "cd5",
    name: "Ceramic Dinnerware Set",
    category: "cookdine",
    subcategory: "dining",
    description: "16-piece ceramic dinnerware set for 4, dishwasher and microwave safe.",
    image: "/img/dinnerware-set.jpg",
    price: 79.99,
    originalPrice: 99.99,
    badge: "Sale",
    rating: 4.5,
    reviewCount: 231,
    reviews: [
      {
        text: "Beautiful design and durable. We use them every day!",
        author: "Amanda P.",
        rating: 5
      }
    ],
    brand: "corelle",
    features: ["dishwasher-safe"]
  },
  {
  //  id: "cd6",
    name: "Food Storage Containers",
    category: "cookdine",
    subcategory: "storage",
    description: "20-piece BPA-free food storage container set with airtight lids.",
    image: "/img/storage-containers.jpg",
    price: 29.99,
    originalPrice: 39.99,
    badge: "Popular",
    rating: 4.4,
    reviewCount: 156,
    reviews: [
      {
        text: "Keeps food fresh and organized. Great value for the price!",
        author: "David W.",
        rating: 4
      }
    ],
    brand: "rubbermaid",
    features: ["eco-friendly", "dishwasher-safe"]
  },
  {
  //  id: "cd7",
    name: "Electric Kettle",
    category: "cookdine",
    subcategory: "appliances",
    description: "1.7-liter electric kettle with automatic shut-off and boil-dry protection.",
    image: "/img/electric-kettle.jpg",
    price: 39.99,
    originalPrice: 49.99,
    badge: "Sale",
    rating: 4.6,
    reviewCount: 189,
    reviews: [
      {
        text: "Heats water quickly and looks great on the counter!",
        author: "Lisa R.",
        rating: 5
      }
    ],
    brand: "hamilton",
    features: ["auto-shutoff"]
  },
  {
  //  id: "cd8",
    name: "Cast Iron Skillet",
    category: "cookdine",
    subcategory: "cookware",
    description: "12-inch pre-seasoned cast iron skillet for even heat distribution.",
    image: "/img/cast-iron.jpg",
    price: 49.99,
    originalPrice: null,
    badge: "Popular",
    rating: 4.8,
    reviewCount: 276,
    reviews: [
      {
        text: "Nothing cooks like cast iron. This one is perfectly seasoned!",
        author: "Thomas K.",
        rating: 5
      }
    ],
    brand: "lodge",
    features: ["non-stick"]
  }
];

async function loadInitialData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check if model already exists to avoid OverwriteModelError
    const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
    
    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new data
    const result = await Product.insertMany(products);
    console.log(`Loaded ${result.length} products successfully`);
    
    // Count products by category
    const categories = await Product.distinct('category');
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`${category} products: ${count}`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error loading initial data:', error);
    process.exit(1);
  }
}