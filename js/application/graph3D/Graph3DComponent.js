class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        this.WINDOW = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50)
        }
        this.sur = new Surface;
        this.graph2D = new Graph({ 
            id: 'canvas3D', 
            WINDOW: this.WINDOW, 
            width: 700,
            height: 700,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mouseleave: () => this.mouseleave(),
                mousedown: event => this.mousedown(event),
                mousemove: event => this.mousemove(event),
            } 
        });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.cube = this.sur.cube(-5, -5);

        this.canRotate = false;
        this.dx = 0;
        this.dy = 0;
        this.printScene();
    }

    wheel(event) {
        const delta = event.wheelDelta > 0 ? 0.9 : 1.1;
        this.cube.points.forEach(point => this.graph3D.zoom(delta, point));
        this.printScene();
    }

    mouseup() {
        this.canRotate = false;
    }
    mouseleave() {
        this.canRotate = false;
    }
    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }
    mousemove(event) {
        if (this.canRotate) {
            const gradus = 2 * Math.PI / 360 / 10;
            this.cube.points.forEach(point => {
                this.graph3D.rotateOy((this.dx - event.offsetX) * gradus, point);
                //...
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.printScene();
        }
    }

    clear() {
        this.graph2D.clear();
    }

    printSubject(subject) {
        for (let i = 0; i < subject.edges.length; i++) {
            const edge = subject.edges[i];
            const p1 = subject.points[edge.p1];
            const p2 = subject.points[edge.p2];
            this.graph2D.line(
                this.graph3D.xs(p1), this.graph3D.ys(p1),
                this.graph3D.xs(p2), this.graph3D.ys(p2)
            );
        }
        for (let i = 0; i < subject.points.length; i++) {
            const point = subject.points[i];
            this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point));
        }
    }

    printScene() {
        this.clear();
        this.printSubject(this.cube);
    }
}