



    // Category data with individual page links
    const categories = [
      {
        id: "foods",
        name: "Foods ",
        icon: "fas fa-apple-alt",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fresh produce, pantry staples, and cooking essentials for your daily meals.",
        items: "125+ products",
        status: "popular",
        department: "food",
        page: "foods.html" // Individual page for this category
      },
      {
        id: "beverages",
        name: "Beverages",
        icon: "fas fa-coffee",
        image: "/img/splashBeva.jpg",
        description: "Juices, sodas, coffee, tea, and other refreshing drinks for every taste.",
        items: "80+ products",
        status: "in-stock",
        department: "food",
        page: "fresh.html" // Individual page for this category
      },
      {
        id: "snacks",
        name: "Snacks & Sweets",
        icon: "fas fa-cookie",
        image: "/img/splashSnac.jpg",
        description: "Chips, nuts, chocolates, biscuits, and other tasty treats for snacking.",
        items: "95+ products",
        status: "popular",
        department: "food",
        page: "foods.html" // Individual page for this category
      },
      {
        id: "dairy",
        name: "Dairy & Eggs",
        icon: "fas fa-cheese",
        image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Milk, cheese, yogurt, butter, eggs, and other dairy products.",
        items: "45+ products",
        status: "in-stock",
        department: "food",
        page: "dairy-eggs.html" // Individual page for this category
      },
      {
        id: "bakery",
        name: "Bakery",
        icon: "fas fa-bread-slice",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Fresh bread, pastries, cakes, and other baked goods delivered daily.",
        items: "60+ products",
        status: "new",
        department: "food",
        page: "foods.html" // Individual page for this category
      },
      {
        id: "frozen",
        name: "Frozen Foods",
        icon: "fas fa-snowflake",
        image: "/img/splashFro.jpg",
        description: "Frozen vegetables, meals, ice cream, and other frozen convenience foods.",
        items: "75+ products",
        status: "new",
        department: "food",
        page: "frozen.html" // Individual page for this category
      },
      {
        id: "household",
        name: "Household Essentials / Home Corner",
        icon: "fas fa-home",
        image: "/img/splashDecor.jpg",
        description: "Cleaning supplies, laundry detergents, paper products, and home care items.",
        items: "110+ products",
        status: "popular",
        department: "household",
        page: "homecorner.html" // Individual page for this category
      },
      {
        id: "personal-care",
        name: "Bath & Beauty / Personal care",
        icon: "fas fa-pump-soap",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Shampoo, soap, toothpaste, skincare, and other personal hygiene products.",
        items: "150+ products",
        status: "in-stock",
        department: "personal-care",
        page: "personalcare.html" // Individual page for this category
      },
      {
        id: "baby-care",
        name: "Baby Care",
        icon: "fas fa-baby",
        image: "img/baby2.jpg",
        description: "Diapers, baby food, formula, wipes, and other baby essentials.",
        items: "70+ products",
        status: "popular",
        department: "baby",
        page: "babycare.html" // Individual page for this category
      },
      {
        id: "Cookdine",
        name: "Cook & Dine",
        icon: "fa-solid fa-kitchen-set",
        image: "/img/splashDish.jpg",
        description: "Pet food, treats, toys, and accessories for your furry friends.",
        items: "50+ products",
        status: "in-stock",
        department: "household",
        page: "cookdine.html" // Individual page for this category
      },
      {
        id: "cleancare",
        name: "Clean & Care",
        icon: "fa-solid fa-soap",
        image: "/img/splashClean.jpg",
        description: "Vitamins, supplements, over-the-counter medicines, and health products.",
        items: "65+ products",
        status: "popular",
        department: "household",
        page: "cleancare.html" // Individual page for this category
      },
      {
        id: "Electronics",
        name: "Electronics",
        icon: "fas fa-globe-americas",
        image: "/img/splashElec.jpg",
        description: "Specialty ingredients and foods from around the world for diverse cuisines.",
        items: "90+ products",
        status: "popular",
        department: "Electronics",
        page: "Electronics.html" // Individual page for this category
      },



      {
        id: "swimming",
        name: "World Of Swimming",
        icon: "fas fa-swimmer",
        image: "/img/splashSwim.jpg",
        description: "Step into the world of swimming with stylish suits, smart accessories, and everything to make a splash.",
        items: "90+ products",
        status: "popular",
        department: "Electronics",
        page: "swimming.html" // Individual page for this category
      }

    ];

    // Populate categories grid with filtering
    function populateCategoriesGrid() {
      const grid = document.getElementById('categoriesGrid');
      grid.innerHTML = '';
      
      // Get filter values
      const sortBy = document.getElementById('sort-by').value;
      const availability = document.getElementById('availability').value;
      const department = document.getElementById('department').value;
      
      // Filter categories
      let filteredCategories = [...categories];
      
      // Apply department filter
      if (department !== 'all') {
        filteredCategories = filteredCategories.filter(category => category.department === department);
      }
      
      // Apply availability filter
      if (availability !== 'all') {
        if (availability === 'in-stock') {
          filteredCategories = filteredCategories.filter(category => category.status === 'in-stock');
        } else if (availability === 'new-arrivals') {
          filteredCategories = filteredCategories.filter(category => category.status === 'new');
        }
      }
      
      // Apply sorting
      if (sortBy === 'name') {
        filteredCategories.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'newest') {
        // For demo purposes, we'll consider categories with status 'new' as newest
        filteredCategories.sort((a, b) => {
          if (a.status === 'new' && b.status !== 'new') return -1;
          if (a.status !== 'new' && b.status === 'new') return 1;
          return 0;
        });
      } else {
        // Default to popularity (categories with status 'popular' first)
        filteredCategories.sort((a, b) => {
          if (a.status === 'popular' && b.status !== 'popular') return -1;
          if (a.status !== 'popular' && b.status === 'popular') return 1;
          return 0;
        });
      }
      
      // Display categories
      if (filteredCategories.length === 0) {
        grid.innerHTML = `
          <div class="no-results">
            <p>No categories match your filters. Try adjusting your criteria.</p>
            <button class="btn btn-primary" onclick="resetFilters()">Reset Filters</button>
          </div>
        `;
        return;
      }
      
      filteredCategories.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        
        // Determine badge text and color based on status
        let badgeText = '';
        let badgeColor = '';
        
        switch(category.status) {
          case 'new':
            badgeText = 'New';
            badgeColor = 'var(--blue)';
            break;
          case 'popular':
            badgeText = 'Popular';
            badgeColor = 'var(--red)';
            break;
          default:
            badgeText = 'In Stock';
            badgeColor = 'var(--green)';
        }
        
        // Each category now links to its own dedicated page
        card.innerHTML = `
          <div class="category-image">
            <img src="${category.image}" alt="${category.name}" loading="lazy">
            <div class="category-badge" style="background: ${badgeColor}">${badgeText}</div>
          </div>
          <div class="category-content">
            <div class="category-icon">
              <i class="${category.icon}"></i>
            </div>
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <div class="category-stats">
              <span>${category.items}</span>
              <a href="${category.page}" class="category-link">
                Browse <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        `;
        
        grid.appendChild(card);
      });
    }
    
    // Reset filters function
    function resetFilters() {
      document.getElementById('sort-by').value = 'popularity';
      document.getElementById('availability').value = 'all';
      document.getElementById('department').value = 'all';
      populateCategoriesGrid();
    }
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
      populateCategoriesGrid();
      
      // Add filter functionality
      const filterSelects = document.querySelectorAll('.filter-select');
      filterSelects.forEach(select => {
        select.addEventListener('change', populateCategoriesGrid);
      });
      
      // Add reset filters functionality
      document.getElementById('resetFilters').addEventListener('click', resetFilters);
    });
  