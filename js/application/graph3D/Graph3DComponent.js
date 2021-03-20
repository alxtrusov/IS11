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
        this.graph2D;
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.printScene();
    }
    clear() {}
    printSubject(subject) {}
    printScene() {
        this.clear();
        this.printSubject(this.sur.cube(-5, -5));
    }
}