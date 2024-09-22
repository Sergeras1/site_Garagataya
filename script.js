let duration = 0.8;
let delay = 0.3;
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
window.onload = function () {
    const img = document.getElementById('profileImage');
    img.classList.add('visible'); //                                             
};
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

document.addEventListener("DOMContentLoaded", function () {
    const fadeInSection = document.querySelector('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fadeInSection.classList.add('visible');
                observer.unobserve(fadeInSection); // Отключаем наблюдение после срабатывания
            }
        });
    });

    observer.observe(fadeInSection); // Начинаем наблюдение за элементом
});

 

