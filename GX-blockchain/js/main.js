import { loadContent, initializeContentLoader } from './contentloader.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const menuItems = document.querySelectorAll('.submenu a');
    const contentSections = document.querySelectorAll('.content-section');
    const connectBtn = document.querySelector('.connect-btn');

        // Menu toggle functionality
        menuToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            sidebar?.classList.toggle('active');
            overlay?.classList.toggle('active');
        });

            // Overlay click handler
    overlay?.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        sidebar?.classList.remove('active');
        overlay?.classList.remove('active');
    });

        // Connect button handler
        connectBtn?.addEventListener('click', () => {
            console.log('Connect button clicked');
        });

            // Submenu toggle functionality
    const menuToggles = document.querySelectorAll('.menu-toggle-btn');

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
    
            const submenuId = this.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);
            const submenuWrapper = this.closest('.menu-item');
    
            // Toggle active classes
            this.classList.toggle('active');
            if (submenu) {
                submenu.classList.toggle('active');
                submenuWrapper?.classList.toggle('expanded');
                
                // Remove fixed height for mobile
                if (submenu.classList.contains('active')) {
                    submenu.style.maxHeight = 'none';
                } else {
                    submenu.style.maxHeight = '0px';
                }
                
                // Close other submenus
                document.querySelectorAll('.submenu.active').forEach(other => {
                    if (other.id !== submenuId) {
                        other.classList.remove('active');
                        other.style.maxHeight = '0px';
                        const otherToggle = document.querySelector(`[data-submenu="${other.id}"]`);
                        const otherWrapper = other.closest('.menu-item');
                        otherToggle?.classList.remove('active');
                        otherWrapper?.classList.remove('expanded');
                    }
                });
            }
        });
    });

        // Menu items click handlers
        menuItems.forEach(item => {
            item.addEventListener('click', async (event) => {
                event.preventDefault();
                const page = item.getAttribute('data-page');
                if (page) {
                    console.log('Loading page:', page);
                    await loadContent(page);
                    contentSections.forEach(section => {
                        section.classList.remove('active');
                    });
                    const targetSection = document.getElementById(page);
                    if (targetSection) {
                        targetSection.classList.add('active');
                        targetSection.classList.add('fade');
                    }
                    menuToggle?.classList.remove('active');
                    sidebar?.classList.remove('active');
                    overlay?.classList.remove('active');
                }
            });
        });


    // Handle clicks outside menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-item') && !e.target.closest('.menu-toggle')) {
            document.querySelectorAll('.submenu.active').forEach(submenu => {
                submenu.classList.remove('active');
                submenu.style.maxHeight = '0px';
                const toggle = document.querySelector(`[data-submenu="${submenu.id}"]`);
                const wrapper = submenu.closest('.menu-item');
                if (toggle) {
                    toggle.classList.remove('active');
                }
                if (wrapper) {
                    wrapper.classList.remove('expanded');
                }
            });
        }
    });

    // Gear menu functionality
    const gearToggle = document.querySelector('.gear-toggle');

    const gearMenu = document.querySelector('.gear-menu');

    gearToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const submenuId = gearToggle.getAttribute('data-submenu');
        const submenu = document.getElementById(submenuId);
        
        gearToggle.classList.toggle('active');
        submenu?.classList.toggle('active');
    });
    // Close gear menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.gear-menu')) {
            const gearSubmenu = document.querySelector('.gear-submenu');

            gearSubmenu?.classList.remove('active');
            gearToggle?.classList.remove('active');
        }

    });

        // Initialize content loader
        try {
            initializeContentLoader();
        } catch (error) {
            console.error('Error initializing content loader:', error);
        }
    });