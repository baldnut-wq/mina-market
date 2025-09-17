
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    

    
// Toggle filter section
    document.getElementById('filterToggle').addEventListener('click', function() {
      const filterSection = document.querySelector('.filter-section');
      filterSection.classList.toggle('collapsed');
    });
    
    // Cook & Dine products data (fallback)
    const cookDineProducts = [
      {
        id: "cd1",
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
        id: "cd2",
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
        id: "cd3",
        name: "Blender Set",
        category: "cookdine",
        subcategory: "appliances",
        description: "5-quart stand mixer with 10-speed settings and multiple attachments.",
        image: "/img/blender.jpg",
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
    ];

    // MongoDB connection status
    let isMongoDBConnected = false;
    let currentPage = 1;
    let currentFilters = {
      category: 'cookdine', // Set to cookdine to filter only cook & dine products
      subcategory: 'all',
      searchQuery: '',
      priceRange: 100,
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
      limit: 8
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
      return cookDineProducts.filter(product => {
        // Always filter by cookdine category for this page
        if (product.category !== 'cookdine') {
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
        populateProductsGrid(cookDineProducts);
      }
    }

    // Start the application when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      // Ensure we don't duplicate initialization if script loads after DOM is ready
      if (!window.appInitialized) {
        window.appInitialized = true;
        initializePage();
      }
    });

    // If DOM is already loaded, initialize immediately
    if (document.readyState !== 'loading' && !window.appInitialized) {
      window.appInitialized = true;
      initializePage();
    }
