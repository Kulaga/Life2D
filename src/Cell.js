import React from 'react';
import CellState from "./Models/CellState";


class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var style = {
            width: 30,
            height: 30,
            border: "1px solid #AEC1FF",
            borderRadius: "2px",
            backgroundColor: this.props.state == CellState.Alive ? "#91C5FF" : "white",
            margin: "1px"
        };

        return <div style={style} onClick={this.switchSelection}></div>
    }

    switchSelection = () => {
        this.props.cellIsSelected(this.props.state === CellState.Dead ? CellState.Alive : CellState.Dead);
    }
}

export default Cell;
