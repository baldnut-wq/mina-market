


        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();
        

// Toggle filter section
    document.getElementById('filterToggle').addEventListener('click', function() {
      const filterSection = document.querySelector('.filter-section');
      filterSection.classList.toggle('collapsed');
    });
    


        // Swimming products data (fallback)
        const swimmingProducts = [
            {
                id: "s1",
                name: "Women's One-Piece Swimsuit",
                category: "swimming",
                subcategory: "swimwear",
                description: "Elegant one-piece swimsuit with tummy control and adjustable straps for maximum comfort.",
                image: "./img/swimsuit1.jpg",
                price: 39.99,
                originalPrice: 49.99,
                badge: "Bestseller",
                rating: 4.7,
                reviewCount: 156,
                reviews: [
                    {
                        text: "Fits perfectly and very comfortable. The material is high quality!",
                        author: "Jessica M.",
                        rating: 5
                    }
                ],
                brand: "speedo",
                features: ["chlorine-resistant", "quick-dry"]
            },
            {
                id: "s2",
                name: "Men's Swim Shorts",
                category: "swimming",
                subcategory: "swimwear",
                description: "Quick-dry swim shorts with built-in liner and secure pocket for essentials.",
                image: "./img/swim-shorts.jpg",
                price: 29.99,
                originalPrice: 34.99,
                badge: "New",
                rating: 4.5,
                reviewCount: 89,
                reviews: [
                    {
                        text: "Great shorts for swimming and beach activities. Dries quickly!",
                        author: "Michael T.",
                        rating: 4
                    }
                ],
                brand: "nike",
                features: ["quick-dry", "uv-protection"]
            },
            {
                id: "s3",
                name: "Professional Swim Goggles",
                category: "swimming",
                subcategory: "accessories",
                description: "Anti-fog, UV protection swim goggles with adjustable strap for comfortable fit.",
                image: "./img/swim-goggles.jpg",
                price: 19.99,
                originalPrice: 24.99,
                badge: "Popular",
                rating: 4.8,
                reviewCount: 203,
                reviews: [
                    {
                        text: "Best goggles I've ever used. No leaking and great visibility!",
                        author: "David R.",
                        rating: 5
                    }
                ],
                brand: "arena",
                features: ["uv-protection", "anti-fog"]
            },
            {
                id: "s4",
                name: "Silicone Swim Cap",
                category: "swimming",
                subcategory: "accessories",
                description: "Durable silicone swim cap that protects hair and reduces drag in water.",
                image: "./img/swim-cap.jpg",
                price: 12.99,
                originalPrice: null,
                badge: "Essential",
                rating: 4.3,
                reviewCount: 97,
                reviews: [
                    {
                        text: "Comfortable and stays in place during my swim sessions.",
                        author: "Sarah L.",
                        rating: 4
                    }
                ],
                brand: "speedo",
                features: ["silicone", "durable"]
            },
            {
                id: "s5",
                name: "Beach Towel with Poncho",
                category: "swimming",
                subcategory: "poolside",
                description: "Large, absorbent beach towel with matching poncho for quick cover-up.",
                image: "./img/beach-towel.jpg",
                price: 34.99,
                originalPrice: 39.99,
                badge: "Luxury",
                rating: 4.6,
                reviewCount: 124,
                reviews: [
                    {
                        text: "Super soft and absorbent. The poncho is a great addition!",
                        author: "Emma K.",
                        rating: 5
                    }
                ],
                brand: "tyr",
                features: ["absorbent", "quick-dry"]
            },
            {
                id: "s6",
                name: "Pool Float with Cup Holders",
                category: "swimming",
                subcategory: "pool",
                description: "Large inflatable pool float with built-in cup holders and headrest for ultimate relaxation.",
                image: "./img/pool-float.jpg",
                price: 29.99,
                originalPrice: 34.99,
                badge: "Fun",
                rating: 4.4,
                reviewCount: 178,
                reviews: [
                    {
                        text: "So much fun! The cup holders are genius. Holds up well.",
                        author: "Jason P.",
                        rating: 4
                    }
                ],
                brand: "generic",
                features: ["inflatable", "cup-holders"]
            }
        ];

        // MongoDB connection status
        let isMongoDBConnected = false;
        let currentPage = 1;
        let currentFilters = {
            category: 'swimming', // Set to swimming to filter only swimming products
            subcategory: 'all',
            searchQuery: '',
            priceRange: 50,
            ratings: [],
            brands: [],
            features: []
        };

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
                    category: filters.category,
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
                
                const response = await fetch(`${BACKEND_URL}/api/products/search?${params}`, {                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
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
            return swimmingProducts.filter(product => {
                // Always filter by swimming category for this page
                if (product.category !== 'swimming') {
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
                
                // Brand filter
                if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
                    return false;
                }
                
                // Features filter
                if (filters.features.length > 0) {
                    const hasFeature = filters.features.some(feature => 
                        product.features && product.features.includes(feature)
                    );
                    if (!hasFeature) {
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
                
                // Add a random review excerpt if available
                let reviewHTML = '';
                if (product.reviews && product.reviews.length > 0) {
                    const randomReview = product.reviews[Math.floor(Math.random() * product.reviews.length)];
                    reviewHTML = `
                        <div class="product-reviews">
                            <div class="review-excerpt">"${randomReview.text}"</div>
                            <div class="review-author">- ${randomReview.author}</div>
                        </div>
                    `;
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
                        ${reviewHTML}
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
                
                // Add click event to track recently viewed
                card.addEventListener('click', () => {
                    addToRecentlyViewed(product);
                });
                
                grid.appendChild(card);
            });
        }

        // Recently viewed products (initially empty)
        let recentlyViewed = [];
        
        // Add to recently viewed
        function addToRecentlyViewed(product) {
            // Check if product is already in recently viewed
            if (!recentlyViewed.some(p => p.id === product.id)) {
                // Add to beginning of array
                recentlyViewed.unshift(product);
                
                // Keep only the 4 most recent items
                if (recentlyViewed.length > 4) {
                    recentlyViewed = recentlyViewed.slice(0, 4);
                }
                
                // Update UI
                updateRecentlyViewed();
            }
        }

        // Update recently viewed section
        function updateRecentlyViewed() {
            const grid = document.getElementById('recentlyViewed');
            
            if (recentlyViewed.length === 0) {
                grid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 20px; color: var(--muted);">
                        <i class="fas fa-history" style="font-size: 2rem; margin-bottom: 10px;"></i>
                        <p>Your recently viewed items will appear here</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = '';
            
            recentlyViewed.forEach(product => {
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
                populateProductsGrid(swimmingProducts);
            }
            
            // Initialize recently viewed
            updateRecentlyViewed();
        }

        // Start the application when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializePage);
        } else {
            initializePage();
        }

