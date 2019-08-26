import React from 'react';
import './App.css';
import Cell from './Cell'
import ControlPanel from './ControlPanel'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.rows = 20;
        this.columns = 20;
    }

    render() {
        let board = this.generateBoard();

        return (
            <div>
                <div id="board">{board}</div>
                <ControlPanel/>
            </div>
        );
    }

    generateBoard() {
        let rows = [];

        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let i = 0; i < this.columns; i++) {
                row.push((<Cell/>));
            }
            rows.push((<div className="row" style={{display: "inline-block"}}>{row}</div>))
        }

        return rows;
    }
}

export default App;
