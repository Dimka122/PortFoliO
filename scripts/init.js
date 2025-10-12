$(document).ready(function() {
    if($.fn.circliful) {
        // Очищаем контейнеры перед инициализацией
        $('[id^="test-circle"]').empty();
        
        // Инициализация с настройками
        $('#test-circle1').circliful({
            percent: 82,
            foregroundColor: '#f8b410',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle2').circliful({
            percent: 77,
            foregroundColor: '#3498DB',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle3').circliful({
            percent: 80,
            foregroundColor: '#333',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle4').circliful({
            percent: 91,
            foregroundColor: '#f8b410',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle5').circliful({
            percent: 79,
            foregroundColor: '#3498DB',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle6').circliful({
            percent: 84,
            foregroundColor: '#333',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle7').circliful({
            percent: 77,
            foregroundColor: '#f8b410',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
        
        $('#test-circle8').circliful({
            percent: 87,
            foregroundColor: '#3498DB',
            backgroundColor: '#eee',
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            animation: 1
        });
    }
});