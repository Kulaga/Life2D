import React from 'react';
import './App.css';
import Board from './Board'
import ControlPanel from './ControlPanel'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <ControlPanel/>
                        <Board/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
