// выстрелить в круглую мишень
function shotToRound(x, y) {
    return Math.sqrt(x*x + y*y) <= 1;
}

// получить координату из инпута по его id
function getCoord(id) {
    return document.getElementById(id).value - 0;
}

// вывести результат стрельбы на экран
function printShotResult(result) {
    var text = (result) ? "Ты попал (на ТВ)" : "Ты промазал!";
    document.getElementById('shotResult').innerHTML = text;
}

// обработчик нажатия на кнопку
var shotToRoundButton = document.getElementById('shotToRound');
shotToRoundButton.addEventListener('click', function() {
    printShotResult(shotToRound(getCoord('x'), getCoord('y')));
});