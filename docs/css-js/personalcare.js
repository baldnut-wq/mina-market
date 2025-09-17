// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Toggle filter section
document.getElementById('filterToggle').addEventListener('click', function() {
  const filterSection = document.querySelector('.filter-section');
  filterSection.classList.toggle('collapsed');
});

// Bath & Beauty products data (fallback)
const bathBeautyProducts = [
    {
        id: "bb1",
        name: "Hydrating Face Moisturizer",
        category: "bathbeauty",
        subcategory: "skincare",
        description: "24-hour hydration with hyaluronic acid. Absorbs quickly.",
        image: "/img/moisturizer.jpg",
        price: 24.99,
        originalPrice: 29.99,
        badge: "Bestseller",
        rating: 4.7, // Fixed: Changed from 5.7 to 4.7 (ratings should be 0-5)
        reviewCount: 845,
        brand: "nivea",
        features: ["cruelty-free"]
    },
    {
        id: "bb2",
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
        features: ["vegan", "cruelty-free"]
    },
    {
        id: "bb4",
        name: "Hair Straightener",
        category: "bathbeauty",
        subcategory: "tools",
        description: "Sulfate-free with argan oil. Restores shine and softness.",
        image: "/img/hairst.jpg",
        price: 8.99,
        originalPrice: null,
        badge: "Essential",
        rating: 4.5,
        reviewCount: 243,
        brand: "neutrogena",
        features: ["Eco-Friendly"]
    }
];

// MongoDB connection status
let isMongoDBConnected = false;
let currentPage = 1;
let currentFilters = {
    category: 'bathbeauty', // Set to bathbeauty to filter only bath & beauty products
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
        
        // Use BACKEND_URL and the correct category (bathbeauty)
        const response = await fetch(`${BACKEND_URL}/api/products/search?category=bathbeauty&limit=1`, {
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
        
        const response = await fetch(`${BACKEND_URL}/api/products/search?${params}`, {
            signal: controller.signal
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
    return bathBeautyProducts.filter(product => {
        // Always filter by bathbeauty category for this page
        if (product.category !== 'bathbeauty') {
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
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Image+Not+Found'">
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
        populateProductsGrid(bathBeautyProducts);
    }
}

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}