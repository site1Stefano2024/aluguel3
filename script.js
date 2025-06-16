
// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Testimonials Carousel
const testimonials = [
    {
        name: "Carlos Eduardo",
        text: "Consegui reduzir minha dívida em 50%! Atendimento nota 10.",
        image: "https://randomuser.me/api/portraits/men/55.jpg"
    },
    {
        name: "Juliana Souza",
        text: "Serviço rápido e eficiente, recomendo de olhos fechados!",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Fernando Oliveira",
        text: "Me ajudaram a quitar meu carro com total tranquilidade e segurança.",
        image: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
        name: "Patrícia Lima",
        text: "Tirei toda dúvida, processo transparente do início ao fim.",
        image: "https://randomuser.me/api/portraits/women/78.jpg"
    }
];

let currentTestimonialIndex = 0;

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    const card = document.getElementById('testimonialCard');
    const image = card.querySelector('.testimonial-image');
    const text = document.getElementById('testimonialText');
    const name = document.getElementById('testimonialName');
    const dots = document.querySelectorAll('.dot');
    
    image.src = testimonial.image;
    image.alt = testimonial.name;
    text.textContent = `"${testimonial.text}"`;
    name.textContent = testimonial.name;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    updateTestimonial();
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial();
}

function currentTestimonial(index) {
    currentTestimonialIndex = index;
    updateTestimonial();
}

// FAQ Toggle
let openFaqIndex = null;

function toggleFaq(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqItem = faqItems[index];
    
    if (openFaqIndex === index) {
        faqItem.classList.remove('active');
        openFaqIndex = null;
    } else {
        // Close previously open FAQ
        if (openFaqIndex !== null) {
            faqItems[openFaqIndex].classList.remove('active');
        }
        
        faqItem.classList.add('active');
        openFaqIndex = index;
    }
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
    
    // Initialize testimonials
    updateTestimonial();
});

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.benefit-card, .step-card, .question-card, .differential-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});
