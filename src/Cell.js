import React from 'react';
import CellState from "./Models/CellState";


class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            backgroundColor: this.props.state == CellState.Alive ? "#91C5FF" : "white"
        };

        return <div className="cell" style={style} onClick={this.switchSelection}></div>
    }

    switchSelection = () => {
        this.props.cellIsSelected(this.props.state === CellState.Dead ? CellState.Alive : CellState.Dead);
    }
}

export default Cell;
