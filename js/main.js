window.onload = function() {
    var input = document.getElementById('input');
    var clear = document.getElementById('clear');
    var numbers = document.getElementsByClassName('number');

    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function() {
            if (input.value === '0') {
                input.value = this.innerHTML;
            } else {
                input.value += this.innerHTML;
            }
        });
    }

    clear.addEventListener('click', function() {
        input.value = 0;
    });
};