let duration = 0.8;
let delay = 0.3;

// Анимация для текста с классом "reveal"
let revealText = document.querySelector(".reveal");
let letters = revealText.textContent.split("");
revealText.textContent = "";
let middle = letters.filter(e => e !== " ").length / 2;
letters.forEach((letter, i) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${delay + Math.abs(i - middle) * 0.1}s`;
    revealText.append(span);
});

// Анимация для картинки при загрузке
window.onload = function () {
    const img = document.getElementById('profileImage');
    if (img) {
        img.classList.add('visible');
    }
};

// Отправка комментариев с использованием fetch API
document.getElementById('commentForm').onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/add_comment', {
        method: 'POST',
        body: formData
    });
    const newComment = await response.json();
    const commentsList = document.querySelector('#comments ul');
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `<strong>${newComment.name}:</strong> ${newComment.comment}<br>
                             <small>Дата и время: ${newComment.timestamp}</small>`;
    commentsList.appendChild(newListItem);
    this.reset(); // Сбросить форму
};

// Анимация появления элемента при прокрутке
document.addEventListener("DOMContentLoaded", function () {
    const fadeInSection = document.querySelector('.fade-in');
    if (fadeInSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fadeInSection.classList.add('visible');
                    observer.unobserve(fadeInSection); // Отключаем наблюдение после срабатывания
                }
            });
        });
        observer.observe(fadeInSection); // Начинаем наблюдение за элементом
    }
});

// Логика для увеличения картинки при нажатии
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.animated-image'); // Ищем все изображения с классом 'animated-image'
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.querySelector('.close');

    if (images && modal && modalImage && closeModal) {
        images.forEach(image => {
            image.addEventListener('click', function () {
                modal.style.display = 'flex';
                modalImage.src = this.src;
            });
        });

        // Закрытие модального окна при нажатии на крестик
        closeModal.addEventListener('click', function () {
            modal.style.display = 'none';
        });

        // Закрытие модального окна при клике за его пределы
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

//Слайд шоу
// Слайд-шоу 1
let photos1 = document.querySelectorAll('.gallery .photo');
let progress1 = document.getElementById('progress');
let currentIndex1 = 0;
let intervalTime1 = 5000;
let interval1;

function showPhoto1(index) {
    photos1.forEach((photo, i) => {
        photo.classList.remove('active');
        if (i === index) {
            photo.classList.add('active');
        }
    });
}

function nextPhoto1() {
    currentIndex1 = (currentIndex1 + 1) % photos1.length;
    showPhoto1(currentIndex1);
    resetProgress1();
}

function resetProgress1() {
    progress1.style.width = '0';
    progress1.style.transition = 'none'; // Отключаем плавный переход
    setTimeout(() => {
        progress1.style.transition = 'width 5s linear'; // Включаем плавный переход
        progress1.style.width = '100%'; // Заполняем полоску прогресса
    }, 10);
}

// Автоматическое переключение фотографий для слайд-шоу 1
interval1 = setInterval(nextPhoto1, intervalTime1);
resetProgress1();

// Слайд-шоу 2
let photos2 = document.querySelectorAll('.gallery2 .photo2');
let progress2 = document.getElementById('progress2');
let currentIndex2 = 0;
let intervalTime2 = 5000;
let interval2;

function showPhoto2(index) {
    photos2.forEach((photo, i) => {
        photo.classList.remove('active');
        if (i === index) {
            photo.classList.add('active');
        }
    });
}

function nextPhoto2() {
    currentIndex2 = (currentIndex2 + 1) % photos2.length;
    showPhoto2(currentIndex2);
    resetProgress2();
}

function resetProgress2() {
    progress2.style.width = '0';
    progress2.style.transition = 'none'; // Отключаем плавный переход
    setTimeout(() => {
        progress2.style.transition = 'width 5s linear'; // Включаем плавный переход
        progress2.style.width = '100%'; // Заполняем полоску прогресса
    }, 10);
}

// Автоматическое переключение фотографий для слайд-шоу 2
interval2 = setInterval(nextPhoto2, intervalTime2);
resetProgress2();
