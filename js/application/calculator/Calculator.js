class Calculator extends Component {
    constructor(options) {
        super(options);
    }

    addEventListeners() {
        document.getElementById('add').addEventListener('click', () => this.addElements());
        document.getElementById('sub').addEventListener('click', () => this.subElements());
        document.getElementById('mult').addEventListener('click', () => this.multElements());
        document.getElementById('div').addEventListener('click', () => this.divElements());
    }

    addElements() {
    }

    subElements() {
    }

    multElements() {
    }

    divElements() {
    }
}