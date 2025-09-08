// Sign In Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Optional: URL auto-login with site access code, e.g. /signin.html?code=GUEST123
    const urlCode = new URLSearchParams(location.search).get('code');
    if (urlCode && urlCode === SITE_ACCESS_CODE) {
        try { localStorage.setItem('userLoggedIn', 'true'); } catch (e) {}
        window.location.href = 'dashboard.html';
        return;
    }

    // Initialize all functionality
    initSignInForm();
    initFloatingAnimations();
    initFormValidation();
    initPasswordToggle();
    initRippleEffect();
    initLoadingAnimation();
});

// Single shared site access code (change value as you like)
const SITE_ACCESS_CODE = 'GUEST123';

// Sign In Form Handler
function initSignInForm() {
    const signinForm = document.getElementById('signinForm');
    const signinBtn = document.querySelector('.signin-btn');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');
    
    // Site-access-code login: require any username + the shared code in the password field
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Show loading state
        showLoadingState();
        
        setTimeout(() => {
            const hasUsername = username.length > 0;
            const isAccessCode = password === SITE_ACCESS_CODE;

            if (hasUsername && isAccessCode) {
                showSuccessMessage('Login successful! Redirecting...');
                
                setTimeout(() => {
                    // Mark user as logged in so protected pages can be opened directly
                    try {
                        localStorage.setItem('userLoggedIn', 'true');
                    } catch (err) {}
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                showErrorMessage('Invalid site access code. Please try again.');
                hideLoadingState();
            }
        }, 1500);
    });
    
    function showLoadingState() {
        signinBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
    }
    
    function hideLoadingState() {
        signinBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
    }
}

// Form Validation
function initFormValidation() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    
    // Real-time validation
    usernameInput.addEventListener('input', function() {
        validateEmail(this);
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword(this);
    });
    
    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        
        if (input.value.length > 0) {
            if (isValid) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.remove('success');
                input.classList.add('error');
            }
        } else {
            input.classList.remove('error', 'success');
        }
    }
    
    function validatePassword(input) {
        // For site access code, we just check length here; actual check happens on submit
        const isValid = input.value.length >= 4;
        
        if (input.value.length > 0) {
            if (isValid) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.remove('success');
                input.classList.add('error');
            }
        } else {
            input.classList.remove('error', 'success');
        }
    }
}

// Password Toggle
function initPasswordToggle() {
    const toggleBtn = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            this.textContent = type === 'password' ? '👁' : '🙈';
        });
    }
}

// Global password toggle function (for onclick attribute)
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    if (toggleBtn) {
        toggleBtn.textContent = type === 'password' ? '👁' : '🙈';
    }
}

// Floating Animations
function initFloatingAnimations() {
    const floatingIcons = document.querySelectorAll('.crypto-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`;
        }, 4000 + index * 600);
        
        // Add hover effects
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.zIndex = '10';
            this.style.background = 'rgba(0, 255, 136, 0.3)';
            this.style.borderColor = '#00ff88';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.zIndex = '1';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Add click effects
        icon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(1.5) rotate(360deg)';
            
            setTimeout(() => {
                this.style.animation = 'float 6s ease-in-out infinite';
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 1000);
        });
    });
}

// Ripple Effect
function initRippleEffect() {
    const signinBtn = document.querySelector('.signin-btn');
    
    signinBtn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Loading Animation
function initLoadingAnimation() {
    // Add entrance animation to form elements
    const formElements = document.querySelectorAll('.form-group, .signin-btn, .form-options');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + index * 100);
    });
}

// Message Display Functions
function showErrorMessage(message) {
    hideMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    const form = document.getElementById('signinForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.remove();
        }, 300);
    }, 5000);
}

function showSuccessMessage(message) {
    hideMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    const form = document.getElementById('signinForm');
    form.insertBefore(successDiv, form.firstChild);
}

function hideMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Enter key on form
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const form = document.getElementById('signinForm');
        const submitBtn = form.querySelector('.signin-btn');
        if (!submitBtn.disabled) {
            submitBtn.click();
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        clearForm();
    }
});

// Clear Form Function
function clearForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('remember').checked = false;
    
    // Remove validation classes
    document.querySelectorAll('.form-group input').forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    hideMessages();
}

// Auto-fill for demo purposes (remove in production)
function autoFillDemo() {
    document.getElementById('username').value = 'guest@example.com';
    document.getElementById('password').value = SITE_ACCESS_CODE; // Prefill with site access code
    
    // Trigger validation
    document.getElementById('username').dispatchEvent(new Event('input'));
    document.getElementById('password').dispatchEvent(new Event('input'));
}

// Initialize demo button (for testing)
addDemoButton();

// Parallax Effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const floatingIcons = document.querySelectorAll('.crypto-icon');
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.2 + (index * 0.05);
        const yPos = -(scrolled * speed);
        icon.style.transform += ` translateY(${yPos}px)`;
    });
});

// Form Auto-save (localStorage)
function initAutoSave() {
    const usernameInput = document.getElementById('username');
    const rememberCheckbox = document.getElementById('remember');
    
    // Load saved data
    const savedUsername = localStorage.getItem('savedUsername');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (savedUsername && rememberMe) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
    
    // Save on change
    usernameInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('savedUsername', this.value);
        }
    });
    
    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('savedUsername', usernameInput.value);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedUsername');
            localStorage.removeItem('rememberMe');
        }
    });
}

// Initialize auto-save
initAutoSave();

// Add smooth transitions to all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('input, button, a, .crypto-icon');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Console welcome message
console.log('🔐 Sign In page with Site Access Code loaded successfully!');
console.log('🔑 Current SITE_ACCESS_CODE:', SITE_ACCESS_CODE);
