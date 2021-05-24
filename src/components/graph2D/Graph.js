function Graph({ id, width, height, WINDOW, callbacks = {}}) {
    var id = id;
    var width = width || 300;
    var height = height || 300;
    var WINDOW = WINDOW || {};
    var canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild('canvas');
    }
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mousemove', callbacks.mousemove);
    canvas.addEventListener('mouseleave', callbacks.mouseleave);
    var PI2 = 2 * Math.PI;

    function xs(x) {
        return (x - WINDOW.LEFT) / WINDOW.WIDTH * canvas.width;
    }
    function ys(y) {
        return canvas.height - (y - WINDOW.BOTTOM) / WINDOW.HEIGHT * canvas.height;
    }

    this.sx = function (x) {
        return x * WINDOW.WIDTH / canvas.width;
    };
    this.sy = function (y) {
        return -y * WINDOW.HEIGHT / canvas.height;
    };

    this.clear = function () {
        context.fillStyle = '#efe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color, width, isDash) {
        context.beginPath();
        context.strokeStyle = color || '#48D1CC';
        context.lineWidth = width || 2;
        if (isDash) {
            context.setLineDash([10, 10]);
        } else {
            context.setLineDash([]);
        }
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
    }

    this.point = function (x, y, color, size) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.arc(xs(x), ys(y), size || 3, 0, PI2);
        context.stroke();
    };

    this.text = function(text, x, y, color) {
        context.font = "24px arial";
        context.fillStyle = color || '#000';
        context.fillText(text, xs(x), ys(y));
    };

    this.polygon = function(points, color) {
        context.fillStyle = color || '#FF800055';
        context.beginPath();
        context.moveTo(xs(points[0].x), ys(points[0].y));
        for (var i = 1; i < points.length; i++) {
            context.lineTo(xs(points[i].x), ys(points[i].y));
        }
        context.lineTo(xs(points[0].x), ys(points[0].y)); // чтобы замкнуть
        context.closePath();
        context.fill();
    };
}

export default Graph;