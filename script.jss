 <script>
        // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });

        // Smooth Scroll for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Learning Journey Animation on Scroll
        const journeyItems = document.querySelectorAll('.journey-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        journeyItems.forEach(item => {
            observer.observe(item);
        });

        // Header Shadow on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });

        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            });
        });

        // Visitor Analytics Widget
        const analyticsWidget = document.getElementById('visitor-analytics');
        const analyticsToggle = document.getElementById('analytics-toggle');
        const analyticsIcon = analyticsToggle.querySelector('i');
        
        // Toggle analytics widget
        analyticsToggle.addEventListener('click', () => {
            analyticsWidget.classList.toggle('analytics-minimized');
            if (analyticsWidget.classList.contains('analytics-minimized')) {
                analyticsIcon.classList.remove('fa-chevron-down');
                analyticsIcon.classList.add('fa-chevron-up');
            } else {
                analyticsIcon.classList.remove('fa-chevron-up');
                analyticsIcon.classList.add('fa-chevron-down');
            }
        });

        // Simulate visitor count updates
        function updateVisitorStats() {
            // Simulate increasing visitor count
            const totalVisitorsElement = document.getElementById('total-visitors');
            let currentVisitors = parseInt(totalVisitorsElement.textContent.replace(',', ''));
            
            // Randomly increase visitor count (simulating new visits)
            if (Math.random() > 0.7) {
                currentVisitors += Math.floor(Math.random() * 3) + 1;
                totalVisitorsElement.textContent = currentVisitors.toLocaleString();
            }
            
            // Simulate online users fluctuation
            const onlineUsersElement = document.getElementById('online-users');
            let onlineUsers = parseInt(onlineUsersElement.textContent);
            
            // Randomly change online user count
            if (Math.random() > 0.5) {
                const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                onlineUsers = Math.max(1, onlineUsers + change);
                onlineUsersElement.textContent = onlineUsers;
            }
        }

        // Update stats every 10 seconds
        setInterval(updateVisitorStats, 10000);

        // Initialize with random values for demo
        function initializeVisitorStats() {
            const totalVisitorsElement = document.getElementById('total-visitors');
            const onlineUsersElement = document.getElementById('online-users');
            const visitorCountriesElement = document.getElementById('visitor-countries');
            
            // Set initial values
            totalVisitorsElement.textContent = (Math.floor(Math.random() * 2000) + 1000).toLocaleString();
            onlineUsersElement.textContent = Math.floor(Math.random() * 20) + 5;
            visitorCountriesElement.textContent = Math.floor(Math.random() * 30) + 15;
        }

        // Initialize when page loads
        window.addEventListener('load', initializeVisitorStats);
    </script>