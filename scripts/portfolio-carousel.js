// Инициализация 3D карусели портфолио
class PortfolioCarousel {
    constructor() {
        this.carousel = document.getElementById('portfolioCarousel');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.portfolio-card');
        
        this.currentAngle = 0;
        this.totalCards = this.cards.length;
        this.angleStep = 360 / this.totalCards;
        this.isDragging = false;
        this.startX = 0;
        this.startAngle = 0;
        this.autoRotateInterval = null;
        
        this.init();
    }
    
    init() {
        this.initializeCarousel();
        this.updateIndicators();
        this.setupEventListeners();
        this.startAutoRotate();
        this.add3DFlipStyle();
    }
    
    initializeCarousel() {
        this.cards.forEach((card, index) => {
            const angle = this.currentAngle + (index * this.angleStep);
            card.style.setProperty('--angle', angle);
            card.style.zIndex = this.totalCards - index;
        });
    }
    
    rotateCarousel(direction) {
        this.currentAngle += direction * this.angleStep;
        this.initializeCarousel();
        this.updateIndicators();
    }
    
    updateIndicators() {
        const activeIndex = (Math.round(-this.currentAngle / this.angleStep) + this.totalCards) % this.totalCards;
        
        this.indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    filterCards(category) {
        if (category === 'all') {
            this.cards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
            this.totalCards = document.querySelectorAll('.portfolio-card[style*="display: block"]').length;
            this.angleStep = this.totalCards > 0 ? 360 / this.totalCards : 0;
            this.initializeCarousel();
            return;
        }
        
        this.cards.forEach(card => {
            if (card.dataset.category.includes(category)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        this.totalCards = document.querySelectorAll('.portfolio-card[style*="display: block"]').length;
        this.angleStep = this.totalCards > 0 ? 360 / this.totalCards : 0;
        this.initializeCarousel();
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        this.startAngle = this.currentAngle;
        e.preventDefault();
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const deltaX = currentX - this.startX;
        const sensitivity = 0.5;
        
        this.currentAngle = this.startAngle + (deltaX * sensitivity);
        this.initializeCarousel();
    }
    
    stopDrag() {
        this.isDragging = false;
    }
    
    goToSlide(index) {
        const targetAngle = -index * this.angleStep;
        this.currentAngle = targetAngle;
        this.initializeCarousel();
        this.updateIndicators();
    }
    
    toggleCardFlip(card) {
        card.classList.toggle('flipped');
    }
    
    add3DFlipStyle() {
        // Стили для 3D переворота уже добавлены в CSS
    }
    
    setupEventListeners() {
        // Кнопки навигации
        this.prevBtn.addEventListener('click', () => this.rotateCarousel(-1));
        this.nextBtn.addEventListener('click', () => this.rotateCarousel(1));
        
        // Индикаторы
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Фильтры
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterCards(btn.dataset.filter);
            });
        });
        
        // Клик по карточке для переворота
        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.btn-more')) {
                    this.toggleCardFlip(card);
                }
            });
        });
        
        // Перетаскивание
        this.carousel.addEventListener('mousedown', (e) => this.startDrag(e));
        this.carousel.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
        
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
        
        document.addEventListener('mouseup', () => this.stopDrag());
        document.addEventListener('touchend', () => this.stopDrag());
        
        // Остановка автоповорота при наведении
        this.carousel.addEventListener('mouseenter', () => this.stopAutoRotate());
        this.carousel.addEventListener('mouseleave', () => this.startAutoRotate());
    }
    
    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateInterval = setInterval(() => {
            this.rotateCarousel(1);
        }, 5000);
    }
    
    stopAutoRotate() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
            this.autoRotateInterval = null;
        }
    }
}

// Инициализация карусели при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const portfolioCarousel = new PortfolioCarousel();
    
    // Экспортируем для глобального доступа (опционально)
    window.portfolioCarousel = portfolioCarousel;
});

// Функция для ручной инициализации (если нужно инициализировать из другого места)
function initPortfolioCarousel() {
    return new PortfolioCarousel();
}

// Добавляем поддержку модулей (если используется ES6)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioCarousel, initPortfolioCarousel };
}