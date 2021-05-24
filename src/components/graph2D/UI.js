function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function sqrt(x) { return Math.sqrt(x); }
function abs(x) { return Math.abs(x); }
function pow(x, p) { return Math.pow(x, p); }

function UI(options) {
    var callbacks = options.callbacks;
    document.getElementById('showHide').addEventListener('click', showHide);
    document.getElementById('addFunction').addEventListener('click', addFunction);
    var num = 0;

    function showHide() {
        document.querySelector('.overlay').classList.toggle('hide');
    }

    function addFunction() {
        // добавить инпут для функции
        var input = document.createElement('input');
            input.setAttribute('placeholder', `function №${num}`);
            input.dataset.num = num;
            input.addEventListener('keyup', keyup);
        // добавить инпут и надпись для производной в точке
        var inputDer = document.createElement('input');
            inputDer.setAttribute('id', `derivative${num}`);
            inputDer.setAttribute('type', 'checkbox');
            inputDer.addEventListener('change', function() {
                callbacks.setDerivative(this.checked, input.dataset.num);
            });
        var labelDer = document.createElement('label');        
            labelDer.setAttribute('for', `derivative${num}`);
            labelDer.innerHTML = 'Производная';
        // добавить инпут и надпись для интеграла на отрезке
        var inputInt = document.createElement('input');
            inputInt.setAttribute('id', `integral${num}`);
            inputInt.setAttribute('type', 'checkbox');
            inputInt.addEventListener('change', function() {
                callbacks.setIntegral(this.checked, input.dataset.num);
            });
        var labelInt = document.createElement('label');        
            labelInt.setAttribute('for', `integral${num}`);
            labelInt.innerHTML = 'Интеграл';
        // добавить кнопку для удаления
        var button = document.createElement('button');
            button.innerHTML = 'Удалить';
            button.addEventListener('click', function() {
                callbacks.delFunction(input.dataset.num);
                funcInputs.removeChild(input);
                funcInputs.removeChild(inputDer);
                funcInputs.removeChild(labelDer);
                funcInputs.removeChild(inputInt);
                funcInputs.removeChild(labelInt);
                funcInputs.removeChild(button);
            });
        // добавить элементы на страницу
        var funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(inputDer);
        funcInputs.appendChild(labelDer);
        funcInputs.appendChild(inputInt);
        funcInputs.appendChild(labelInt);
        funcInputs.appendChild(button);
        num++;
    }

    function keyup() {
        try {
            var f;
            eval(`f = function(x) { return ${this.value}; }`)
            callbacks.addFunction(f, this.dataset.num);
        } catch (e) {
            console.log('ошибка вода функции', e);
        }
    }

    this.getAB = function() {
        var a = document.getElementById('a').value - 0;
        var b = document.getElementById('b').value - 0;
        return { a, b };
    };
}

export default UI;