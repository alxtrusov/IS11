// получить массив из поля ввода
function getArray() {
    var strArray = document.getElementById('array').value;
    if (strArray) {
        var arr = strArray.split(' ');
        for (var i = 0; i < arr.length; i++) {
            arr[i] -= 0;
        }
        return arr;
    }
    return [];
}

// вывести массив на экран
function printArray(arr) {
    document.getElementById('array').value = arr.join(' ');
}

// отсортировать массив
function sortArray() {
    var arr = getArray();
    arr.sort(function(a, b) {
        return a - b;
    });
    printArray(arr);
}

// повесить обработчики на кнопки
document.getElementById('sortArray').addEventListener('click', sortArray);