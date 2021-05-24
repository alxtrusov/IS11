import React from 'react';

import Graph from './Graph';
import UI from './UI';

class Graph2DComponent extends React.Component {

    constructor(props) {
        super(props);
        this.funcs = [];
        this.WINDOW = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
        };
        this.ZOOM_STEP = 0.2;
        this.canScroll = false;
        // позиция мышки
        this.mouseX = 0;
        //this.mouseY = 0;
    }

    componentDidMount() {
        this.graph = new Graph({
            id: 'canvas',
            width: 800,
            height: 800,
            WINDOW: this.WINDOW,
            callbacks: {
                wheel: event => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mousemove: event => this.mousemove(event),
                mouseleave: () => this.mouseleave()
            }
        });
        this.ui = new UI({
            callbacks: {
                addFunction: (f, num) => this.addFunction(f, num),
                delFunction: num => this.delFunction(num),
                setDerivative: (value, num) => this.setDerivative(value, num),
                setIntegral: (value, num) => this.setIntegral(value, num)
            }
        });
        this.renderGraph();
    }

    /************************/
    /* about event handlers */
    /************************/
    addFunction(f, num) {
        this.funcs[num] = {
            f,
            color: '#f23',
            width: 3,
            derivative: false,
            integral: false
        };
        this.renderGraph();
    }
    delFunction(num) {
        this.funcs[num] = null;
        this.renderGraph();
    }
    setDerivative(value, num) {
        if (this.funcs[num]) {
            this.funcs[num].derivative = value;
            this.renderGraph();
        }
    }
    setIntegral(value, num) {
        if (this.funcs[num]) {
            this.funcs[num].integral = value;
            this.renderGraph();
        }
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? -this.ZOOM_STEP : this.ZOOM_STEP;
        if (this.WINDOW.WIDTH - this.ZOOM_STEP > 0) {
            this.WINDOW.WIDTH += delta;
            this.WINDOW.HEIGHT += delta;
            this.WINDOW.LEFT -= delta / 2;
            this.WINDOW.BOTTOM -= delta / 2;
            this.renderGraph();
        }
    }

    mousedown() {
        this.canScroll = true;
    }
    mouseup() {
        this.canScroll = false;
    }
    mouseleave() {
        this.canScroll = false;
    }
    mousemove(event) {
        if (this.canScroll) {
            this.WINDOW.LEFT -= this.graph.sx(event.movementX);
            this.WINDOW.BOTTOM -= this.graph.sy(event.movementY);
        }
        // позиция мышки
        this.mouseX = this.graph.sx(event.offsetX) + this.WINDOW.LEFT;
        //this.mouseY = this.WINDOW.HEIGHT + (this.graph.sy(event.offsetY) + this.WINDOW.BOTTOM);
        this.renderGraph();
    }

    /**************/
    /* about math */
    /**************/
    getZero(f, a, b, eps) {
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (Math.abs(f(a) - f(b)) <= eps) {
            return (a + b) / 2;
        }
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return this.getZero(f, a, half, eps);
        }
        if (f(half) * f(b) <= 0) {
            return this.getZero(f, half, b, eps);
        }
    }

    // вычислить производную функции в точке
    getDerivative(f, x0) {
        const dx = 0.000001;
        return (f(x0 + dx) - f(x0)) / dx;
    }

    // вычислить интеграл на отрезке
    getIntegral(f, a, b) {
        const dx = (b - a) / 1000;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
            x += dx;
        }
        return S;
    }

    /***************/
    /* about print */
    /***************/
    printOXY() {
        const { WIDTH, LEFT, BOTTOM, HEIGHT } = this.WINDOW;
        // рисочки
        // по Х
        for (let i = 1; i < WIDTH + LEFT; i++) {
            this.graph.line(i, BOTTOM, i, HEIGHT + BOTTOM, '#ddd');
            this.graph.line(i, 0.1, i, -0.1, '#000');
        }
        for (let i = -1; i > LEFT; i--) {
            this.graph.line(i, BOTTOM, i, HEIGHT + BOTTOM, '#ddd');
            this.graph.line(i, 0.1, i, -0.1, '#000');
        }
        // по Y
        for (let i = 1; i < HEIGHT + BOTTOM; i++) {
            this.graph.line(LEFT, i, WIDTH + LEFT, i, '#ddd');
            this.graph.line(0.1, i, -0.1, i, '#000');
        }
        for (let i = -1; i > BOTTOM; i--) {
            this.graph.line(LEFT, i, WIDTH + LEFT, i, '#ddd');
            this.graph.line(0.1, i, -0.1, i, '#000');
        }
        // OX
        this.graph.line(LEFT, 0, WIDTH + LEFT, 0, '#000');
        // OY
        this.graph.line(0, BOTTOM, 0, HEIGHT + BOTTOM, '#000');
    }

    printFunction(f, color, width) {
        let x = this.WINDOW.LEFT;
        const dx = this.WINDOW.WIDTH / 200;
        while (x < this.WINDOW.WIDTH + this.WINDOW.LEFT) {
            try {
                this.graph.line(x, f(x), x + dx, f(x + dx), color, width);
            } catch (e) { }
            x += dx;
        }
    }

    printFunctionSection(f, a, b, color, width) {
        let x = a;
        const dx = (b - a) / 200;
        while (x < b) {
            this.graph.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    printVerticalAsymptote(x1, x2) {
        this.graph.line(x1, this.WINDOW.BOTTOM, x2, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM, '#aaa', 3, true);
    }

    // нарисовать ноль функции с подсветкой и выделением
    printZero(f, a, b) {
        const x = this.getZero(f, a, b, 0.0001);
        if (x !== null) {
            // нарисовать вертикальные ассимптоты
            this.printVerticalAsymptote(a, a);
            this.printVerticalAsymptote(b, b);
            // выделить график функции другим цветом
            this.printFunctionSection(f, a, b, '#ffa0cb', 3);
            // нарисовать точку
            this.graph.point(x, 0);
        }
    }

    // провести касательную к графику функции в точке x0
    printDerivative(f, x0) {
        const der = this.getDerivative(f, x0); // вычислить производную функции в точке
        if (der) {
            const x1 = this.WINDOW.LEFT;
            const x2 = this.WINDOW.LEFT + this.WINDOW.WIDTH;
            this.graph.line(x1 + x0, der * x1 + f(x0), x2 + x0, der * x2 + f(x0), '#aaa', 1, true);
        }
    }

    // нарисовать область определенного интеграла и вывести его значение
    printIntegral(f) {
        const { a, b } = this.ui.getAB();
        if (!isNaN(a) && !isNaN(b) && a !== b) {
            const dx = (b - a) / 100;
            let x = a;
            const points = [];
            points.push({ x: a, y: 0 })
            while (x <= b) {
                points.push({ x, y: f(x) });
                x += dx;
            }
            points.push({ x: b, y: 0 })
            this.graph.polygon(points);
            const S = this.getIntegral(f, a, b);
            this.graph.text(S.toFixed(3), 1, -1);
        }
    }

    renderGraph() {
        this.graph.clear();
        this.printOXY();
        this.funcs.forEach(func => {
            if (func) {
                if (func.derivative) { // рисовать касательную
                    this.printDerivative(func.f, this.mouseX);
                }
                if (func.integral) { // рисовать касательную
                    this.printIntegral(func.f);
                }
                this.printFunction(func.f, func.color, func.width);
            }
        });
    }    

    render() {
        return (
            <div className="graph2D">
                <div>
                    <button id="showHide">Скрыть/Показать</button>
                </div>
                <div className="overlay hide">
                    <button id="addFunction">Добавить функцию</button>
                    <div>
                        <input id="a" placeholder="a"></input>
                        <input id="b" placeholder="b"></input>
                    </div>
                    <div id="funcInputs"></div>
                </div>
                <canvas id="canvas"></canvas>
            </div>
        );
    }
}

export default Graph2DComponent;