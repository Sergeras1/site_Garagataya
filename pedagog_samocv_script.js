// Обработчик события на кнопку "Домой"
document.getElementById('homeButton').addEventListener('click', function () {
    // Переход на главную страницу index.html
    window.location.href = 'index.html';
});

$(function () {
	$('#scroll_top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});
});
