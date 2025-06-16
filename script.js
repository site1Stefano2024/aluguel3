// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        menuBtn.innerHTML = '<i data-lucide="menu"></i>';
    } else {
        mobileMenu.classList.add('show');
        menuBtn.innerHTML = '<i data-lucide="x"></i>';
    }
    
    // Re-initialize lucide icons
    lucide.createIcons();
}

// WhatsApp Functions
function openWhatsApp(service) {
    const phoneNumber = '551151924444';
    const message = `Olá, Hyundai! Gostaria de saber mais sobre ${service}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function sendSimulationToWhatsApp(formData, result) {
    const phoneNumber = '551151924444';
    const message = `Olá, Hyundai! Fiz uma simulação no site com os seguintes dados:

Nome: ${formData.name}
CPF/CNPJ: ${formData.cpfCnpj}
Valor: ${formData.value}
Serviço: ${formData.service}

Resultado da Simulação:
Valor Original: ${formatCurrency(result.original)}
Valor com Desconto: ${formatCurrency(result.withDiscount)}
Economia: ${formatCurrency(result.savings)}

Gostaria de mais informações sobre o processo.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Currency Formatting
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Currency Input Mask
function formatCurrencyInput(input) {
    let value = input.value.replace(/\D/g, '');
    if (value === '') {
        input.value = '';
        return;
    }
    
    value = (parseInt(value) / 100).toFixed(2);
    value = value.replace('.', ',');
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    input.value = 'R$ ' + value;
}

// CPF/CNPJ Mask
function formatCpfCnpj(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        // CPF Format
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
        // CNPJ Format
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    input.value = value;
}

// Simulator Logic
function calculateDiscount(originalValue) {
    const discountPercentage = 5; // 5% discount
    const withDiscount = originalValue * (1 - discountPercentage / 100);
    const savings = originalValue - withDiscount;
    
    return {
        original: originalValue,
        withDiscount,
        savings,
        discountPercentage
    };
}

function showSimulationResult(formData, result) {
    const resultContainer = document.getElementById('simulatorResult');
    
    resultContainer.innerHTML = `
        <div class="result-content">
            <div class="result-header">
                <i data-lucide="trending-down"></i>
                <h3>Sua Economia</h3>
            </div>
            
            <div class="result-item">
                <label>Valor Original</label>
                <div class="value">${formatCurrency(result.original)}</div>
            </div>
            
            <div class="result-item">
                <label>Valor da Quitação</label>
                <div class="value">${formatCurrency(result.withDiscount)}</div>
            </div>
            
            <div class="result-item highlight">
                <label>Você Economiza</label>
                <div class="value">${formatCurrency(result.savings)}</div>
                <div class="discount">Desconto de ${result.discountPercentage}%</div>
            </div>
            
            <button type="button" class="btn btn-primary btn-full" onclick="sendSimulationToWhatsApp(currentFormData, currentResult)">
                <i data-lucide="phone"></i>
                Enviar para WhatsApp
            </button>
        </div>
    `;
    
    // Re-initialize lucide icons
    lucide.createIcons();
}

// Global variables to store form data and result
let currentFormData = null;
let currentResult = null;

// Form Submission Handler
function handleSimulatorSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        cpfCnpj: document.getElementById('cpfCnpj').value,
        value: document.getElementById('value').value,
        service: document.getElementById('service').value
    };
    
    // Validate form
    if (!formData.name || !formData.cpfCnpj || !formData.value || !formData.service) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Parse currency value
    const originalValue = parseFloat(formData.value.replace(/[^\d,]/g, '').replace(',', '.'));
    
    if (isNaN(originalValue) || originalValue <= 0) {
        alert('Por favor, insira um valor válido.');
        return;
    }
    
    // Calculate discount
    const result = calculateDiscount(originalValue);
    
    // Store data globally
    currentFormData = formData;
    currentResult = result;
    
    // Show result
    showSimulationResult(formData, result);
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('show')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// WhatsApp Tooltip Logic
function initWhatsAppTooltip() {
    const tooltip = document.getElementById('whatsappTooltip');
    
    // Show tooltip after 3 seconds
    setTimeout(() => {
        if (tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.animation = 'fadeIn 0.3s ease-out';
            
            // Hide tooltip after 5 seconds
            setTimeout(() => {
                if (tooltip) {
                    tooltip.style.display = 'none';
                }
            }, 5000);
        }
    }, 3000);
}

function closeTooltip() {
    const tooltip = document.getElementById('whatsappTooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(`
        .certification-card,
        .service-card,
        .process-step,
        .benefit-card,
        .testimonial-card,
        .contact-card
    `);
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Input Event Listeners
function initInputMasks() {
    const valueInput = document.getElementById('value');
    const cpfCnpjInput = document.getElementById('cpfCnpj');
    
    if (valueInput) {
        valueInput.addEventListener('input', function() {
            formatCurrencyInput(this);
        });
    }
    
    if (cpfCnpjInput) {
        cpfCnpjInput.addEventListener('input', function() {
            formatCpfCnpj(this);
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Initialize all functionality
    initSmoothScroll();
    initScrollAnimations();
    initInputMasks();
    initHeaderScroll();
    initWhatsAppTooltip();
    
    // Add form submit handler
    const simulatorForm = document.getElementById('simulatorForm');
    if (simulatorForm) {
        simulatorForm.addEventListener('submit', handleSimulatorSubmit);
    }
    
    // Add click handlers for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // This will be handled by the onclick attribute in HTML
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenu.classList.contains('show') && 
            !mobileMenu.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    console.log('QuitVeicular website initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    
    // Hide mobile menu on desktop
    if (window.innerWidth > 768 && mobileMenu.classList.contains('show')) {
        toggleMobileMenu();
    }
});

// Utility function to detect mobile devices
function isMobile() {
    return window.innerWidth <= 768;
}

// Add loading states for better UX
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i data-lucide="loader-2"></i> Carregando...';
    button.disabled = true;
    
    // Re-initialize lucide icons
    lucide.createIcons();
    
    return function hideLoading() {
        button.innerHTML = originalText;
        button.disabled = false;
        lucide.createIcons();
    };
}

// Error handling for WhatsApp redirects
function handleWhatsAppError() {
    alert('Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado ou entre em contato pelo telefone (11) 9 9999-9999.');
}

// Add error handling to WhatsApp functions
const originalOpenWhatsApp = openWhatsApp;
openWhatsApp = function(service) {
    try {
        originalOpenWhatsApp(service);
    } catch (error) {
        console.error('Erro ao abrir WhatsApp:', error);
        handleWhatsAppError();
    }
};

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('show')) {
            toggleMobileMenu();
        }
        
        // Close tooltip
        closeTooltip();
    }
});

// Add accessibility features
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #1e40af';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Call accessibility initialization
document.addEventListener('DOMContentLoaded', function() {
    initAccessibility();
});
