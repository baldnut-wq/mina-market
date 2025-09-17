
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    

    
// Toggle filter section
    document.getElementById('filterToggle').addEventListener('click', function() {
      const filterSection = document.querySelector('.filter-section');
      filterSection.classList.toggle('collapsed');
    });
    
    // freshproducts data (fallback)
    const freshProducts = [
        
        {
        
        id: "b1",
        name: "Mineral Water - 24 Pack",
        category: "water",
        description: "Pure mineral water with essential electrolytes. Perfect for daily hydration.",
        image: "https://images.unsplash.com/photo-1544003484-3cd181d17917?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        price: 8.99,
        originalPrice: 10.99,
        badge: "Best Value",
        rating: 4.6,
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
        brand: "aquafina",
        features: []
      },
      {
        id: "b2",
        name: "Orange Juice - Fresh Squeezed",
        category: "juice",
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
        features: ["organic"]
      },
      {
        id: "b3",
        name: "Sports Drink - Variety Pack",
        category: "sports",
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
        features: ["low-calorie"]
      },
        // Add more fresh products here as needed
    ];

    // MongoDB connection status
    let isMongoDBConnected = false;
    let currentPage = 1;
    let currentFilters = {
        category: 'fresh', // Set to fresh to filter only fresh products
        subcategory: 'all',
        searchQuery: '',
        priceRange: 50,
        ratings: [],
        brands: [],
        features: []
    };


    
    // Backend URL - use your Render backend URL directly
const BACKEND_URL = 'https://mina-market-2.onrender.com';



    // Safely check MongoDB connection
    async function checkMongoDBConnection() {
    try {
        // Use a timeout to prevent hanging if server isn't responding
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        // Use BACKEND_URL instead of localhost
        const response = await fetch(`${BACKEND_URL}/api/products/search?category=cleancare&limit=1`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            isMongoDBConnected = true;
            console.log('Connected to MongoDB backend');
            updateDBStatusIndicator(true);
            return true;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('MongoDB connection timeout - using local data');
        } else {
            console.log('MongoDB not available - using local data:', error.message);
        }
    }
    
    isMongoDBConnected = false;
    updateDBStatusIndicator(false);
    return false;
}{
        try {
            // Use a timeout to prevent hanging if server isn't responding
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch('https://mina-market-2.onrender.com/api/products/search?category=fresh&limit=1', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                isMongoDBConnected = true;
                console.log('Connected to MongoDB backend');
                updateDBStatusIndicator(true);
                return true;
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('MongoDB connection timeout - using local data');
            } else {
                console.log('MongoDB not available - using local data:', error.message);
            }
        }
        
        isMongoDBConnected = false;
        updateDBStatusIndicator(false);
        return false;
    }

    // Update MongoDB status indicator
    function updateDBStatusIndicator(connected) {
        const dbStatus = document.getElementById('dbStatus');
        const dbTooltip = document.getElementById('dbTooltip');
        
        if (dbStatus && dbTooltip) {
            if (connected) {
                dbStatus.classList.add('connected');
                dbTooltip.textContent = 'Connected to MongoDB';
            } else {
                dbStatus.classList.remove('connected');
                dbTooltip.textContent = 'Using local data';
            }
        }
    }

  // Safely fetch products from MongoDB
async function fetchProductsFromMongoDB(filters, page = 1) {
  const grid = document.getElementById('products');
  grid.classList.add('loading');
  
  try {
    // Build query string - always include category filter
    const params = new URLSearchParams({
      q: filters.searchQuery,
      category: filters.category, // Use the specific category for each page
      subcategory: filters.subcategory,
      minPrice: 0,
      maxPrice: filters.priceRange,
      minRating: filters.ratings.length ? Math.min(...filters.ratings) : 0,
      brands: filters.brands.join(','),
      features: filters.features.join(','),
      page: page,
      limit: 10
    });

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(`${BACKEND_URL}/api/products/search?${params}`, {      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return JSON');
    }
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    
    const data = await response.json();
    
    // Clear grid if it's the first page
    if (page === 1) {
      grid.innerHTML = '';
    }
    
    // Hide load more button if we've reached the end
    document.getElementById('loadMoreContainer').style.display = 
      (data.products.length === 0 || data.currentPage >= data.totalPages) ? 'none' : 'block';
    
    // Populate the grid
    if (data.products.length === 0 && page === 1) {
      showNoProductsMessage();
    } else {
      populateProductsGrid(data.products);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    
    // On error, switch to local mode
    isMongoDBConnected = false;
    updateDBStatusIndicator(false);
    
    // Fall back to local data
    if (page === 1) {
      const filteredProducts = filterLocalProducts(filters);
      grid.innerHTML = '';
      populateProductsGrid(filteredProducts);
    }
    
    return { products: [], totalPages: 0, currentPage: 1, total: 0 };
  } finally {
    grid.classList.remove('loading');
  }
}

    // Show no products message
    function showNoProductsMessage() {
        const grid = document.getElementById('products');
        grid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--muted); margin-bottom: 20px;"></i>
                <h3>No products found</h3>
                <p>Try different search terms or filters</p>
            </div>
        `;
    }

    // Filter local products (fallback)
    function filterLocalProducts(filters) {
        return freshProducts.filter(product => {
            // Always filter by fresh category for this page
            if (product.category !== 'fresh') {
                return false;
            }
            
            // Subcategory filter
            if (filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) {
                return false;
            }
            
            // Search query filter
            if (filters.searchQuery && 
                !product.name.toLowerCase().includes(filters.searchQuery) &&
                !product.description.toLowerCase().includes(filters.searchQuery)) {
                return false;
            }
            
            // Price filter
            if (product.price > filters.priceRange) {
                return false;
            }
            
            // Rating filter
            if (filters.ratings.length > 0) {
                const minRating = Math.min(...filters.ratings);
                if (product.rating < minRating) {
                    return false;
                }
            }
            
            return true;
        });
    }

    // Populate products grid
    function populateProductsGrid(products) {
        const grid = document.getElementById('products');
        
        if (products.length === 0) {
            showNoProductsMessage();
            document.getElementById('loadMoreContainer').style.display = 'none';
            return;
        }
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            let priceHTML = `<div class="product-price">$${product.price.toFixed(2)}</div>`;
            if (product.originalPrice) {
                priceHTML = `<div class="product-price"><s>$${product.originalPrice.toFixed(2)}</s> $${product.price.toFixed(2)}</div>`;
            }
            
            // Generate star rating
            let ratingHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= Math.floor(product.rating)) {
                    ratingHTML += '<i class="fas fa-star"></i>';
                } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                    ratingHTML += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    ratingHTML += '<i class="far fa-star"></i>';
                }
            }
            
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-content">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-rating">
                        ${ratingHTML}
                        <span class="review-count">(${product.reviewCount})</span>
                    </div>
                    ${priceHTML}
                    <div class="product-actions">
                        <button class="btn btn-secondary" aria-label="Add to wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="btn btn-secondary" aria-label="View details">
                            <i class="far fa-eye"></i>
                        </button>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }

    // Perform search
    async function performSearch() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
        currentFilters.searchQuery = searchQuery;
        
        // Get selected ratings
        const ratingFilters = document.querySelectorAll('.rating-filter:checked');
        currentFilters.ratings = Array.from(ratingFilters).map(r => parseInt(r.value));
        
        // Get selected brands
        const brandFilters = document.querySelectorAll('.brand-filter:checked');
        currentFilters.brands = Array.from(brandFilters).map(b => b.value);
        
        // Get selected features
        const featureFilters = document.querySelectorAll('.feature-filter:checked');
        currentFilters.features = Array.from(featureFilters).map(f => f.value);
        
        // Get price range
        currentFilters.priceRange = parseInt(document.getElementById('priceRange').value);
        
        // Reset to page 1
        currentPage = 1;
        
        if (isMongoDBConnected) {
            await fetchProductsFromMongoDB(currentFilters, currentPage);
        } else {
            const filteredProducts = filterLocalProducts(currentFilters);
            const grid = document.getElementById('products');
            grid.innerHTML = '';
            populateProductsGrid(filteredProducts);
            document.getElementById('loadMoreContainer').style.display = 'none';
        }
    }

    // Set up event listeners
    function setupEventListeners() {
        // Search button
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
        }
        
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performSearch();
            });
        }
        
        // Subcategory buttons
        const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
        if (subcategoryButtons.length > 0) {
            subcategoryButtons.forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.subcategory-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    this.classList.add('active');
                    currentFilters.subcategory = this.getAttribute('data-subcategory');
                    performSearch();
                });
            });
        }
        
        // Filter changes
        const priceRange = document.getElementById('priceRange');
        if (priceRange) {
            priceRange.addEventListener('change', performSearch);
        }
        
        const filters = document.querySelectorAll('.rating-filter, .brand-filter, .feature-filter');
        if (filters.length > 0) {
            filters.forEach(filter => {
                filter.addEventListener('change', performSearch);
            });
        }
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentPage++;
                if (isMongoDBConnected) {
                    fetchProductsFromMongoDB(currentFilters, currentPage);
                } else {
                    // For local data, just show all products (no pagination)
                    const filteredProducts = filterLocalProducts(currentFilters);
                    const grid = document.getElementById('products');
                    grid.innerHTML = '';
                    populateProductsGrid(filteredProducts);
                    document.getElementById('loadMoreContainer').style.display = 'none';
                }
            });
        }
    }

    // Initialize the page
    async function initializePage() {
        // Setup event listeners first
        setupEventListeners();
        
        // Then check MongoDB connection (won't block UI)
        try {
            await checkMongoDBConnection();
        } catch (error) {
            console.error('Error checking MongoDB connection:', error);
        }
        
        // Load products based on connection status
        if (isMongoDBConnected) {
            await fetchProductsFromMongoDB(currentFilters, currentPage);
        } else {
            populateProductsGrid(freshProducts);
        }
    }

    // Start the application when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }
// If DOM is already loaded, initialize immediately
    if (document.readyState !== 'loading' && !window.appInitialized) {
      window.appInitialized = true;
      initializePage();
    }
