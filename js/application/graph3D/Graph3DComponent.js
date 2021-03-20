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
        this.graph2D = new Graph({ id: 'canvas3D', WINDOW: this.WINDOW });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.printScene();
    }
    clear() {
        this.graph2D.clear();
    }
    printSubject(subject) {
        for (let i = 0; i < subject.points.length; i++) {
            const point = subject.points[i];
            this.graph2D.point(this.graph3D.xs(point), this.graph3D.ys(point));
        }
    }
    printScene() {
        this.clear();
        this.printSubject(this.sur.cube(-5, -5));
    }
}