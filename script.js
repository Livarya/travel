/**
 * Livarya Travel - Premium Travel Booking Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTabs();
    initPassengerSelect();
    initGuestSelect();
    initDatePickers();
    initTestimonialSlider();
    initStickyHeader();
    initAnimations();
    initNavigation();
});

/**
 * Tabs Component for Booking Forms
 */
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const bookingForms = document.querySelectorAll('.booking-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the tab ID
            const tabId = this.getAttribute('data-tab');
            
            // Hide all booking forms
            bookingForms.forEach(form => form.classList.remove('active'));
            
            // Show the selected booking form
            document.getElementById(`${tabId}-form`).classList.add('active');
        });
    });
}

/**
 * Passenger Selection Component
 */
function initPassengerSelect() {
    const passengerSelect = document.querySelector('.passenger-select');
    if (!passengerSelect) return;

    const passengerDisplay = passengerSelect.querySelector('.passenger-display');
    const counterBtns = passengerSelect.querySelectorAll('.counter-btn');
    const applyBtn = passengerSelect.querySelector('.btn-apply');
    
    // Toggle dropdown
    passengerDisplay.addEventListener('click', function() {
        passengerSelect.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!passengerSelect.contains(e.target)) {
            passengerSelect.classList.remove('open');
        }
    });
    
    // Handle counter buttons
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const countElement = this.parentElement.querySelector('.count');
            let count = parseInt(countElement.textContent);
            
            if (this.classList.contains('plus')) {
                count++;
            } else if (this.classList.contains('minus') && count > 0) {
                count--;
            }
            
            countElement.textContent = count;
        });
    });
    
    // Apply button
    applyBtn.addEventListener('click', function() {
        const adults = passengerSelect.querySelector('.passenger-type:nth-child(1) .count').textContent;
        const children = passengerSelect.querySelector('.passenger-type:nth-child(2) .count').textContent;
        const infants = passengerSelect.querySelector('.passenger-type:nth-child(3) .count').textContent;
        const cabinClass = passengerSelect.querySelector('.cabin-class select').value;
        
        const totalPassengers = parseInt(adults) + parseInt(children) + parseInt(infants);
        
        passengerDisplay.querySelector('span').textContent = 
            `${totalPassengers} Passenger${totalPassengers !== 1 ? 's' : ''}, ${cabinClass}`;
        
        passengerSelect.classList.remove('open');
    });
}

/**
 * Guest Selection Component for Hotels
 */
function initGuestSelect() {
    const guestSelect = document.querySelector('.guest-select');
    if (!guestSelect) return;

    const guestDisplay = guestSelect.querySelector('.guest-display');
    const counterBtns = guestSelect.querySelectorAll('.counter-btn');
    const applyBtn = guestSelect.querySelector('.btn-apply');
    
    // Toggle dropdown
    guestDisplay.addEventListener('click', function() {
        guestSelect.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!guestSelect.contains(e.target)) {
            guestSelect.classList.remove('open');
        }
    });
    
    // Handle counter buttons
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const countElement = this.parentElement.querySelector('.count');
            let count = parseInt(countElement.textContent);
            
            if (this.classList.contains('plus')) {
                count++;
            } else if (this.classList.contains('minus') && count > 0) {
                count--;
            }
            
            countElement.textContent = count;
        });
    });
    
    // Apply button
    applyBtn.addEventListener('click', function() {
        const adults = guestSelect.querySelector('.guest-type:nth-child(1) .count').textContent;
        const children = guestSelect.querySelector('.guest-type:nth-child(2) .count').textContent;
        const rooms = guestSelect.querySelector('.guest-type:nth-child(3) .count').textContent;
        
        guestDisplay.querySelector('span').textContent = 
            `${adults} Adult${adults !== '1' ? 's' : ''}, ${children} Child${children !== '1' ? 'ren' : ''}, ${rooms} Room${rooms !== '1' ? 's' : ''}`;
        
        guestSelect.classList.remove('open');
    });
}

/**
 * Date Picker Enhancement
 */
function initDatePickers() {
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        // Set min date to today
        input.min = today;
        
        // For return dates, set them to day after departure by default
        if (input.parentElement.querySelector('label').textContent.includes('Return') ||
            input.parentElement.querySelector('label').textContent.includes('Check-out')) {
            
            const departureInput = input.closest('.booking-grid').querySelector('input[type="date"]:not([min="' + today + '"])');
            
            if (departureInput) {
                departureInput.addEventListener('change', function() {
                    const departureDate = new Date(this.value);
                    departureDate.setDate(departureDate.getDate() + 1);
                    const nextDay = departureDate.toISOString().split('T')[0];
                    
                    input.min = nextDay;
                    
                    // If current return date is before new departure date, update it
                    if (input.value && new Date(input.value) <= new Date(this.value)) {
                        input.value = nextDay;
                    }
                });
            }
        }
    });
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const testimonials = [
        {
            name: 'Sophia Anderson',
            avatar: 'images/avatar-1.jpg',
            rating: 5,
            text: 'The service provided by Livarya Travel exceeded all my expectations. Our trip to the Maldives was flawlessly planned with every detail taken care of. The private island experience was absolutely breathtaking.'
        },
        {
            name: 'James Wilson',
            avatar: 'images/avatar-2.jpg',
            rating: 5,
            text: 'From the moment we booked our luxury safari in Tanzania, Livarya Travel ensured every aspect of our journey was perfect. The exclusive accommodations and private guides made this the trip of a lifetime.'
        },
        {
            name: 'Emma Thompson',
            avatar: 'images/avatar-3.jpg',
            rating: 5,
            text: 'Our family vacation to the French Riviera was meticulously arranged by Livarya Travel. The VIP transfers, yacht charter, and personal chef at our villa created memories we\'ll cherish forever.'
        }
    ];
    
    const sliderContainer = document.querySelector('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    
    if (!sliderContainer) return;
    
    let currentIndex = 0;
    
    // Update the testimonial content
    function updateTestimonial() {
        const current = testimonials[currentIndex];
        
        const testimonialHTML = `
            <div class="testimonial-header">
                <div class="testimonial-avatar">
                    <img src="${current.avatar}" alt="${current.name}">
                </div>
                <div class="testimonial-info">
                    <h3>${current.name}</h3>
                    <div class="testimonial-rating">
                        ${Array(current.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                </div>
            </div>
            <p>"${current.text}"</p>
        `;
        
        sliderContainer.innerHTML = testimonialHTML;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial();
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateTestimonial();
        });
    });
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}

/**
 * Sticky Header
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (!header || !hero) return;
    
    const heroHeight = hero.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Scroll Animations
 */
function initAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.featured-card, .experience-content, .experience-image, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

/**
 * Simulate the Autocomplete Feature
 */
document.addEventListener('DOMContentLoaded', function() {
    const airportInputs = document.querySelectorAll('input[placeholder="City or Airport"]');
    
    airportInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Show dropdown for demo purposes
            const dropdown = this.parentElement.querySelector('.autocomplete-dropdown');
            if (dropdown) dropdown.style.display = 'block';
        });
        
        input.addEventListener('blur', function() {
            // Hide dropdown with a slight delay to allow selection
            const dropdown = this.parentElement.querySelector('.autocomplete-dropdown');
            if (dropdown) {
                setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 200);
            }
        });
    });
    
    // Handle autocomplete item selection
    const autocompleteItems = document.querySelectorAll('.autocomplete-item');
    
    autocompleteItems.forEach(item => {
        item.addEventListener('click', function() {
            const airportCode = this.querySelector('.airport-code').textContent;
            const airportName = this.querySelector('.airport-name').textContent;
            
            // Update the input value
            const input = this.closest('.form-group').querySelector('input');
            input.value = `${airportCode} - ${airportName}`;
            
            // Hide the dropdown
            this.closest('.autocomplete-dropdown').style.display = 'none';
        });
    });
});

/**
 * Search Form Submission
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchButtons = document.querySelectorAll('.btn-search');
    
    searchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the form data
            const form = this.closest('.booking-form');
            const formType = form.id.split('-')[0]; // flights, trains, or hotels
            
            // Navigation mapping
            const pageMapping = {
                'flights': 'flights.html',
                'trains': 'trains.html',
                'hotels': 'hotels.html'
            };
            
            // Show a brief loading message
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            
            // Navigate to the respective results page after a brief delay
            setTimeout(() => {
                window.location.href = pageMapping[formType];
            }, 1000);
        });
    });
});

/**
 * Navigation Functionality
 * Ensures the current page link in navigation is marked as active
 */
function initNavigation() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // If the link's href matches the current page, add active class
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
} 