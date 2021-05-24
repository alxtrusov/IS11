import React from 'react';
import './App.css';

import HeaderComponent from './components/header/HeaderComponent';
import Graph2DComponent from './components/graph2D/Graph2DComponent';
import Graph3DComponent from './components/graph3D/Graph3DComponent';
import CalculatorComponent from './components/calculator/CalculatorComponent';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: null
        };
    }

    showComponent(name) {
        this.setState({ showComponent: name });
    }

    render() {
        return (
            <div className="App">
                <HeaderComponent showComponent={name => this.showComponent(name)}></HeaderComponent>
                {
                    this.state.showComponent === 'CalculatorComponent' ? 
                        <CalculatorComponent></CalculatorComponent> : 
                        this.state.showComponent === 'Graph3DComponent' ? 
                            <Graph3DComponent></Graph3DComponent> : <Graph2DComponent></Graph2DComponent>
                }
            </div>
        );
    }
}

export default App;
