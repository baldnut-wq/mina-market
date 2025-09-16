
    // Header scroll effect
    const header = document.querySelector('.header');
    addEventListener('scroll', () => { 
      header.style.boxShadow = scrollY > 10 ? '0 8px 20px rgba(0,0,0,0.1)' : 'none'; 
      header.style.background = scrollY > 10 ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.92)';
    });
    
    // Drawer menu functionality
    const drawer = document.getElementById('drawer');
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const scrim = document.getElementById('scrim');
    
    function openDrawer(){ 
      drawer.classList.add('open'); 
      drawer.setAttribute('aria-hidden','false'); 
      document.body.style.overflow='hidden'; 
    }
    
    function closeDrawer(){ 
      drawer.classList.remove('open'); 
      drawer.setAttribute('aria-hidden','true'); 
      document.body.style.overflow=''; 
    }
    
    menuBtn.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    scrim.addEventListener('click', closeDrawer);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if(id.length > 1 && id !== '#'){
          e.preventDefault();
          document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          closeDrawer();
        }
      });
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // Contact form success message
    function showSuccess() {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('successMessage').style.display = 'block';
    }
    
    function resetForm() {
      document.getElementById('contactForm').style.display = 'block';
      document.getElementById('successMessage').style.display = 'none';
      document.getElementById('contactForm').reset();
    }
    
    // Countdown timer for special offer here !! muuse la soco html kiisa wad hysataa
  
    
    // Card hover effect enhancement
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
    
    // ========== NEW FUNCTIONALITY ==========
    
    // Category data - programmer can add/remove categories here
    const categories = [
      { id: "Foods", name: "Foods", icon: "fas fa-apple-alt", image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: "Cosmetics", name: "Bath & Beauty", icon: "fas fa-spa", image: "./img2/makeup.webp " },
      { id: "baby-care", name: "Baby Care", icon: "fas fa-baby", image: "./img/babycare.jpg" },
      { id: "household", name: "Home Corner", icon: "fas fa-home", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: "cookndine", name: "cook & dine", icon: "fas fa-coffee", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      { id: "kid'splay", name: "Kids play", icon: "fas fa-cookie", image: "/img/playground.jpg" },
      { id: "swimming", name: "Swimming", icon: "fas fa-swimmer", image: "/img/splashSwim.jpg" },
      
      { id: "bakery", name: "Grains & Goodness", icon: "fas fa-wheat-alt", image: "/img/grains12.jpg" }
    ];
    
    // Populate categories in drawer
    function populateCategoriesMenu() {
      const menu = document.getElementById('categoriesMenu');
      menu.innerHTML = '';
      
      categories.forEach(category => {
        const link = document.createElement('a');
        link.href = `#${category.id}`;
        link.innerHTML = `<i class="${category.icon}"></i> ${category.name}`;
        menu.appendChild(link);
      });
    }
    
    // Populate carousel
    function populateCarousel() {
      const container = document.getElementById('carouselContainer');
      const nav = document.getElementById('carouselNav');
      container.innerHTML = '';
      nav.innerHTML = '';
      
      categories.forEach((category, index) => {
        // Create carousel card
        const card = document.createElement('a');
        card.className = 'carousel-card card';
        card.href = `#${category.id}`;
        card.setAttribute('aria-label', category.name);
        card.innerHTML = `
          <div class="media">
            <i class="${category.icon} category-icon"></i>
            <img src="${category.image}" alt="${category.name}">
          </div>
          <div class="body"><h4>${category.name}</h4></div>
        `;
        container.appendChild(card);
        
        // Create navigation dot
        const dot = document.createElement('button');
        dot.className = index === 0 ? 'active' : '';
        dot.setAttribute('data-index', index);
        dot.addEventListener('click', () => {
          scrollToCard(index);
        });
        nav.appendChild(dot);
      });
    }
    
    // Scroll to specific card in carousel
    function scrollToCard(index) {
      const container = document.getElementById('carouselContainer');
      const cards = container.querySelectorAll('.carousel-card');
      if (cards[index]) {
        cards[index].scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', 
          inline: 'start' 
        });
        
        // Update active dot
        document.querySelectorAll('.carousel-nav button').forEach((btn, i) => {
          btn.className = i === index ? 'active' : '';
        });
      }
    }
    
    // Initialize carousel scrolling behavior
    function initCarousel() {
      const container = document.getElementById('carouselContainer');
      const cards = container.querySelectorAll('.carousel-card');
      const dots = document.querySelectorAll('.carousel-nav button');
      
      // Intersection Observer to update active dot
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(cards).indexOf(entry.target);
            dots.forEach((dot, i) => {
              dot.className = i === index ? 'active' : '';
            });
          }
        });
      }, {
        root: container,
        threshold: 0.5
      });
      
      cards.forEach(card => {
        observer.observe(card);
      });
    }
    
    // Initialize everything
    document.addEventListener('DOMContentLoaded', () => {
      populateCategoriesMenu();
      populateCarousel();
      initCarousel();
    });
