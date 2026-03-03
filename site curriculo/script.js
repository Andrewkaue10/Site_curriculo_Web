
const siteConfig = {
    nome: 'Andrew Kauê',
    cargo: 'Desenvolvedor Web',
    email: 'andrewkaue13@gmail.com',
    telefone: '(81) 98811-5610',
    anoAtual: new Date().getFullYear()
};


function formatTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}


function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function updateVisitCount() {
    let visits = localStorage.getItem('visitCount');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('visitCount', visits);
    
    const counterElement = document.getElementById('visitCounter');
    if (counterElement) {
        counterElement.textContent = visits;
    }
    
    return visits;
}

let startTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // em segundos
    console.log(` Tempo na página: ${timeSpent} segundos`);
});

function setupFormValidation() {
    const form = document.getElementById('formularioContato');
    if (!form) return;
    
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', () => formatTelefone(telefoneInput));
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
                showNotification('Email inválido!', 'error');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    }
    
    const arquivoInput = document.getElementById('arquivo');
    if (arquivoInput) {
        arquivoInput.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const fileSize = (file.size / 1024).toFixed(2); // KB
                showNotification(`Arquivo "${file.name}" (${fileSize} KB) selecionado!`, 'info');
            }
        });
    }
    
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const today = new Date().toISOString().split('T')[0];
        dataInput.setAttribute('min', today);
    }
}


document.addEventListener('DOMContentLoaded', function() {
    console.log(' Site de Andrew Kauê inicializado!');
    
    loadTheme();
    

    const visits = updateVisitCount();
    console.log(` Visitas: ${visits}`);
    
    setupFormValidation();
    
    if (!document.getElementById('themeToggle')) {
        const themeBtn = document.createElement('button');
        themeBtn.id = 'themeToggle';
        themeBtn.className = 'theme-toggle';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeBtn.addEventListener('click', toggleTheme);
        document.body.appendChild(themeBtn);
        
        // Estilo do botão
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--gradient, linear-gradient(135deg, #4361ee, #3a0ca3));
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                transition: all 0.3s ease;
            }
            
            .theme-toggle:hover {
                transform: scale(1.1);
            }
            
            body.dark-theme {
                background: linear-gradient(135deg, #1e1e2f, #2d2d44);
            }
            
            body.dark-theme .container {
                background: rgba(30, 30, 47, 0.95) !important;
                color: white;
            }
            
            body.dark-theme .nav {
                background: #2d2d44;
            }
            
            body.dark-theme .nav-link {
                color: #fff !important;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 10000;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                border-left: 4px solid #4cc9f0;
            }
            
            .notification-error {
                border-left: 4px solid #f72585;
            }
            
            .notification-info {
                border-left: 4px solid #4361ee;
            }
            
            .iframe-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255,255,255,0.9);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                z-index: 100;
            }
        `;
        document.head.appendChild(style);
    }
    
    const socialLinks = document.querySelectorAll('.d-flex a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const title = this.getAttribute('title');
            if (title) {
                const tooltip = document.createElement('div');
                tooltip.className = 'social-tooltip';
                tooltip.textContent = title;
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--gradient);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: 0.8rem;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    white-space: nowrap;
                    z-index: 1000;
                `;
                this.style.position = 'relative';
                this.appendChild(tooltip);
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.social-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
});


window.siteUtils = {
    formatTelefone,
    isValidEmail,
    showNotification,
    smoothScroll,
    toggleTheme
};