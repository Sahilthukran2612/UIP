const cardSlider = document.querySelector('.card-slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalCards = document.querySelectorAll('.card').length;

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
        updateSlider();
    }
});

function updateSlider() {
    const offset = -currentIndex * 100;
    cardSlider.style.transform = translateX(${offset}%);
}