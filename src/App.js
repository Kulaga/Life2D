import React from 'react';
import './App.css';
import Cell from './Cell'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.rows = 20;
        this.columns = 20;
    }

    render() {
        let rows = [];

        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let i = 0; i < this.columns; i++) {
                row.push((<Cell/>));
            }
            rows.push((<div className="row" style={{display: "inline-block"}}>{row}</div>))
        }
        
        return (<div id="board">{rows}</div>);
    }
}

export default App;
