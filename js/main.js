window.onload = function() {
    var input = document.getElementById('input');
    var clear = document.getElementById('clear');
    var numbers = document.getElementsByClassName('js-number');
    var operands = document.getElementsByClassName('js-operand');
    var calculator = new Calculator();

    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function() {
            input.value = calculator.setValue(this.innerHTML);
        });
    }

    for (var i = 0; i < operands.length; i++) {
        operands[i].addEventListener('click', function() {
            input.value = calculator[this.dataset.operand]();
        });
    }

    clear.addEventListener('click', function() {
        input.value = calculator.clear();
    });

    console.log(1231322);
};