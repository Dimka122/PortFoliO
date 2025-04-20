// Плавная прокрутка для навигации с учетом фиксированных header и nav
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        const fixedOffset = window.innerWidth <= 768 ? 120 : 180; // 120px на мобильных, 180px на десктопе
        const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: sectionPosition - fixedOffset,
            behavior: 'smooth'
        });
    });
});

// Логика карусели
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
});

// Переключение видимости резюме
const resumeToggle = document.querySelector('.resume-toggle');
const resumeContent = document.querySelector('.resume-content');

resumeToggle.addEventListener('click', () => {
    resumeContent.classList.toggle('show');
    resumeToggle.textContent = resumeContent.classList.contains('show') ? 'Скрыть резюме' : 'Прочитать резюме';
});