// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-item, .course-card, .about-content > div').forEach(el => {
    observer.observe(el);
});

// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate nav items
        navLinksItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
            }
        });
    });
}

// Smooth Scrolling with progress indication
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Remove active class from all links
            document.querySelectorAll('a[href^="#"]').forEach(a => 
                a.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            target.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Enhanced Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Add floating label animation
    inputs.forEach(input => {
        // Initial check for pre-filled inputs
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            // Add ripple effect to form group
            const ripple = document.createElement('div');
            ripple.className = 'form-ripple';
            input.parentElement.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    function validateInput(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Remove existing error message
        if (errorMessage) {
            errorMessage.remove();
        }
        
        // Validate based on input type
        let isValid = true;
        let message = '';
        
        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(input.value.trim());
                message = 'Please enter a valid email address';
                break;
            case 'tel':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                isValid = phoneRegex.test(input.value.trim());
                message = 'Please enter a valid phone number';
                break;
            default:
                isValid = input.value.trim() !== '';
                message = 'This field is required';
        }
        
        if (!isValid && input.value.trim() !== '') {
            formGroup.classList.add('error');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = message;
            formGroup.appendChild(error);
        } else {
            formGroup.classList.remove('error');
        }
        
        return isValid;
    }
    
    // Handle contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Format the message for WhatsApp
        const whatsappMessage = `*New Message from Commerce Mentor Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
        
        // Redirect to WhatsApp with the formatted message
        window.open(`https://wa.me/8801676383613?text=${whatsappMessage}`, '_blank');
        
        // Reset the form
        this.reset();
    });
    
    // Enhanced form submission
    // contactForm.addEventListener('submit', async function(e) {
    //     e.preventDefault();
        
    //     // Validate all inputs
    //     let isValid = true;
    //     inputs.forEach(input => {
    //         if (!validateInput(input)) {
    //             isValid = false;
    //         }
    //     });
        
    //     if (isValid) {
    //         // Show loading state
    //         submitBtn.disabled = true;
    //         submitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
            
    //         // Simulate form submission
    //         await new Promise(resolve => setTimeout(resolve, 1500));
            
    //         // Show success message
    //         submitBtn.innerHTML = '<span><i class="fas fa-check"></i> Sent Successfully!</span>';
    //         submitBtn.style.background = 'var(--success-color)';
            
    //         // Create success message
    //         const successMessage = document.createElement('div');
    //         successMessage.className = 'success-message';
    //         successMessage.innerHTML = `
    //             <i class="fas fa-check-circle"></i>
    //             <p>Thank you for your message! We will get back to you soon.</p>
    //         `;
            
    //         contactForm.insertAdjacentElement('afterend', successMessage);
            
    //         // Reset form
    //         contactForm.reset();
            
    //         // Reset button after delay
    //         setTimeout(() => {
    //             submitBtn.disabled = false;
    //             submitBtn.innerHTML = '<span>Send Message <i class="fas fa-paper-plane"></i></span>';
    //             submitBtn.style.background = '';
    //             successMessage.remove();
    //         }, 5000);
    //     } else {
    //         // Shake the form if invalid
    //         contactForm.style.animation = 'formShake 0.5s ease';
    //         setTimeout(() => {
    //             contactForm.style.animation = '';
    //         }, 500);
    //     }
    // });
    
    // WhatsApp Integration
    // function sendToWhatsApp(event) {
    //     event.preventDefault();
        
    //     // Get form values
    //     const name = document.getElementById('name').value;
    //     const phone = document.getElementById('phone').value;
    //     const subject = document.getElementById('subject').value;
    //     const message = document.getElementById('message').value;
        
    //     // Format the message for WhatsApp
    //     const whatsappMessage = `*New Inquiry from Website*%0A%0A` +
    //         `*Name:* ${name}%0A` +
    //         `*Phone:* ${phone}%0A` +
    //         `*Subject:* ${subject}%0A` +
    //         `*Message:* ${message}`;
        
    //     // WhatsApp number (your number)
    //     const whatsappNumber = '8801676383613';
        
    //     // Create WhatsApp URL
    //     const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
    //     // Open WhatsApp in new tab
    //     window.open(whatsappURL, '_blank');
        
    //     // Reset form
    //     document.getElementById('contactForm').reset();
    // }
    
    // const whatsappBtn = document.createElement('button');
    // whatsappBtn.textContent = 'Send to WhatsApp';
    // whatsappBtn.addEventListener('click', sendToWhatsApp);
    // contactForm.appendChild(whatsappBtn);
}

// Update Facebook link
document.querySelector('.social-links a[href="#"]').href = 'https://www.facebook.com/groups/1753592928204513';

// Add scroll reveal for contact cards
const contactCards = document.querySelectorAll('.info-card');
contactCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 200 * (index + 1));
});

// Add hover effect for contact cards
contactCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Enhanced Scroll to Top with smooth animation
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Course Cards Hover Effect
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Testimonials Carousel (if added)
class Carousel {
    constructor(element) {
        this.element = element;
        this.items = element.querySelectorAll('.carousel-item');
        this.currentIndex = 0;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        // Add navigation buttons
        const nav = document.createElement('div');
        nav.className = 'carousel-nav';
        
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '←';
        prevBtn.addEventListener('click', () => this.prev());
        
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '→';
        nextBtn.addEventListener('click', () => this.next());
        
        nav.appendChild(prevBtn);
        nav.appendChild(nextBtn);
        this.element.appendChild(nav);
        
        // Show first item
        this.show(0);
        
        // Auto advance
        setInterval(() => this.next(), 5000);
    }
    
    show(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        this.items[this.currentIndex].classList.remove('active');
        this.items[index].classList.add('active');
        
        this.currentIndex = index;
        
        setTimeout(() => {
            this.isAnimating = false;
        }, 500);
    }
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.items.length;
        this.show(nextIndex);
    }
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.show(prevIndex);
    }
}

// Initialize carousels if they exist
document.querySelectorAll('.carousel').forEach(carousel => {
    new Carousel(carousel);
});

// Enhanced Website Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay after page loads
    window.addEventListener('load', () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => loadingOverlay.remove(), 500);
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight);
        scrollProgress.style.transform = `scaleX(${scrolled})`;
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Section animations on scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Enhanced form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            
            try {
                // Format message for WhatsApp
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                const whatsappMessage = `*New Message from Commerce Mentor Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;
                
                // Open WhatsApp with formatted message
                window.open(`https://wa.me/8801676383613?text=${whatsappMessage}`, '_blank');
                
                // Show success message
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.classList.add('success');
                
                // Reset form
                this.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('success');
                }, 3000);
                
            } catch (error) {
                console.error('Error:', error);
                submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error';
                submitBtn.classList.add('error');
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.classList.remove('error');
                }, 3000);
            }
        });
    }

    // Add touch device detection
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // Enhanced image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add parallax effect for desktop devices
    if (!('ontouchstart' in window)) {
        window.addEventListener('scroll', () => {
            const parallaxElements = document.querySelectorAll('.parallax');
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(window.scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
});

// Preload images for smooth transitions
function preloadImages(images) {
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}

// Initialize preloading of important images
preloadImages([
    'images/a-logo-for-a-coaching-center-named-comme_T_o9i_bXTbCMqB5Sw9zqGw_0LIbuS8TTJWNZx1QOHuHag.jpeg',
    'images/459940202_8569921539719811_7302687212580446031_n.jpg'
]);

// App-like Features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading state
    const loader = document.querySelector('.app-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Bottom Navigation
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Pull to Refresh
    let touchStart = 0;
    let touchEnd = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        touchEnd = e.touches[0].clientY;
        const pullDistance = touchEnd - touchStart;
        
        if (window.scrollY === 0 && pullDistance > 50) {
            document.querySelector('.pull-to-refresh').style.transform = 
                `translateY(${Math.min(pullDistance / 2, 50)}px)`;
        }
    }, { passive: true });

    document.addEventListener('touchend', () => {
        if (window.scrollY === 0 && touchEnd - touchStart > 50) {
            location.reload();
        }
        document.querySelector('.pull-to-refresh').style.transform = '';
    });

    // App Install Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installPrompt').classList.add('show');
    });

    document.querySelector('.install-button').addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                console.log('App installed');
            }
            deferredPrompt = null;
        }
        document.getElementById('installPrompt').classList.remove('show');
    });

    document.querySelector('.close-prompt').addEventListener('click', () => {
        document.getElementById('installPrompt').classList.remove('show');
    });

    // Native-like Scrolling
    const scrollableElements = document.querySelectorAll('.scrollable-content');
    scrollableElements.forEach(element => {
        let startY;
        let startScrollTop;
        let momentumID;

        element.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
            startScrollTop = element.scrollTop;
            
            if (momentumID) {
                cancelAnimationFrame(momentumID);
            }
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            const y = e.touches[0].pageY;
            const delta = startY - y;
            element.scrollTop = startScrollTop + delta;
        }, { passive: true });
    });

    // Active Section Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a, .bottom-nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

// Student Login System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const loginBtn = document.getElementById('loginBtn');
    const studentLoginModal = document.getElementById('studentLoginModal');
    const studentDashboardModal = document.getElementById('studentDashboardModal');
    const studentLoginForm = document.getElementById('studentLoginForm');
    const togglePasswordBtn = document.getElementById('toggleStudentPassword');
    const passwordInput = document.getElementById('studentPassword');
    const loginError = document.getElementById('loginError');

    // Bootstrap Modal instances
    const loginModalInstance = new bootstrap.Modal(studentLoginModal);
    const dashboardModalInstance = new bootstrap.Modal(studentDashboardModal);

    // Event Listeners
    loginBtn.addEventListener('click', () => {
        loginModalInstance.show();
    });

    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
        togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
    });

    studentLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const studentId = document.getElementById('studentId').value;
        const password = passwordInput.value;
        const submitBtn = studentLoginForm.querySelector('button[type="submit"]');
        const spinner = submitBtn.querySelector('.spinner-border');

        // Show loading state
        submitBtn.disabled = true;
        spinner.classList.remove('d-none');
        loginError.classList.add('d-none');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, check if credentials match
            if (studentId === 'demo' && password === 'password') {
                loginModalInstance.hide();
                dashboardModalInstance.show();
                studentLoginForm.reset();
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            loginError.textContent = error.message;
            loginError.classList.remove('d-none');
        } finally {
            submitBtn.disabled = false;
            spinner.classList.add('d-none');
        }
    });

    // Load demo data for the dashboard
    loadDemoDashboardData();
});

function loadDemoDashboardData() {
    const coursesList = document.getElementById('studentCoursesList');
    const classesList = document.getElementById('upcomingClassesList');

    // Demo courses data
    const courses = [
        { name: 'Advanced Accounts', progress: 75 },
        { name: 'Business Studies', progress: 60 },
        { name: 'Economics', progress: 90 }
    ];

    // Demo classes data
    const classes = [
        { subject: 'Advanced Accounts', topic: 'Final Accounts', date: '2024-01-15', time: '10:00 AM' },
        { subject: 'Business Studies', topic: 'Marketing Management', date: '2024-01-16', time: '11:30 AM' },
        { subject: 'Economics', topic: 'Monetary Policy', date: '2024-01-17', time: '09:00 AM' }
    ];

    // Render courses
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.className = 'list-group-item';
        courseItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>${course.name}</strong>
                <span class="badge bg-primary">${course.progress}%</span>
            </div>
            <div class="progress" style="height: 5px;">
                <div class="progress-bar" role="progressbar" style="width: ${course.progress}%"></div>
            </div>
        `;
        coursesList.appendChild(courseItem);
    });

    // Render classes
    classes.forEach(classItem => {
        const classElement = document.createElement('div');
        classElement.className = 'list-group-item';
        classElement.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">${classItem.subject}</h6>
                    <small class="text-muted">${classItem.topic}</small>
                </div>
                <div class="text-end">
                    <div>${classItem.date}</div>
                    <small class="text-muted">${classItem.time}</small>
                </div>
            </div>
        `;
        classesList.appendChild(classElement);
    });
}

// Student Login Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.querySelector('i').classList.toggle('fa-eye');
            togglePasswordBtn.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Handle form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('password').value;

            // Add loading state to button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Logging in...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual authentication)
            setTimeout(() => {
                if (studentId === "demo" && password === "demo123") {
                    // Success animation
                    submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Success!';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        alert('Login successful! Welcome to Commerce Mentor.');
                        // Hide modal
                        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                        if (modal) {
                            modal.hide();
                        }
                        // Reset form
                        loginForm.reset();
                        // Reset button
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-primary');
                        submitBtn.disabled = false;
                    }, 1000);
                } else {
                    // Error animation
                    submitBtn.innerHTML = '<i class="fas fa-times me-2"></i>Failed';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('btn-danger');
                    
                    setTimeout(() => {
                        alert('Invalid credentials. Please try again.');
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.classList.remove('btn-danger');
                        submitBtn.classList.add('btn-primary');
                        submitBtn.disabled = false;
                    }, 1000);
                }
            }, 1500);
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Popup Functionality
const aboutImage = document.getElementById('aboutImage');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

aboutImage.addEventListener('click', function(e) {
    e.preventDefault();
    modalImage.src = this.src;
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

imageModal.addEventListener('click', function() {
    this.style.display = 'none';
    document.body.style.overflow = 'auto';
});
