// ���������� ������� �� ������ "�����"
document.getElementById('homeButton').addEventListener('click', function () {
    // ������� �� ������� �������� index.html
    window.location.href = 'index.html';
});

$(function () {
	$('#scroll_top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 600);
		return false;
	});
});
