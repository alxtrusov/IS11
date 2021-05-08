import React from 'react';

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.showComponent = props.showComponent;
    }

    render() {
        return (
            <div className="header">
                <h1>Я очень люблю программирование!</h1>
                <button onClick={() => this.showComponent('Graph2DComponent')}>Графика 2D</button>
                <button onClick={() => this.showComponent('Graph3DComponent')}>Графика 3D</button>
                <button onClick={() => this.showComponent('CalculatorComponent')}>Калькулятор</button>
            </div>
        );
    }
}

export default HeaderComponent;