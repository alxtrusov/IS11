function f(x) {
	return Math.sin(x);
}

function g(x) {
	return x * x - 4;
}

window.onload = function () {
	var WINDOW = {
		LEFT: -10.2,
		BOTTOM: -10,
		WIDTH: 20,
		HEIGHT: 20,
	};
	var graph = new Graph({ id: 'canvas', width: 800, height: 800, WINDOW: WINDOW });

	function printOXY() {
		// рисочки
		// по Х
		for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
			graph.line(i, WINDOW.BOTTOM, i, WINDOW.HEIGHT + WINDOW.BOTTOM, '#ddd');
			graph.line(i, 0.1, i, -0.1, '#000');
		}
		for (var i = -1; i > WINDOW.LEFT; i--) {
			graph.line(i, WINDOW.BOTTOM, i, WINDOW.HEIGHT + WINDOW.BOTTOM, '#ddd');
			graph.line(i, 0.1, i, -0.1, '#000');
		}
		// по Y
		for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
			graph.line(WINDOW.LEFT, i, WINDOW.WIDTH + WINDOW.LEFT, i, '#ddd');
			graph.line(0.1, i, -0.1, i, '#000');
		}
		for (var i = -1; i > WINDOW.BOTTOM; i--) {
			graph.line(WINDOW.LEFT, i, WINDOW.WIDTH + WINDOW.LEFT, i, '#ddd');
			graph.line(0.1, i, -0.1, i, '#000');
		}
		// OX
		graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, '#000');
		// OY
		graph.line(0, WINDOW.BOTTOM, 0, WINDOW.HEIGHT + WINDOW.BOTTOM, '#000');
	}

	function printFunction(f) {
		var x = WINDOW.LEFT;
		var dx = WINDOW.WIDTH / 100;
		while (x < WINDOW.WIDTH + WINDOW.LEFT) {
			graph.line(x, f(x), x + dx, f(x + dx));
			x += dx;
		}
	}

	function render() {
		graph.clear();
		printOXY();
		printFunction(f);
		printFunction(g);
	}

	render();
}