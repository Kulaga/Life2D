import React from 'react';
import CellState from "./Models/CellState";


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: CellState.Dead
        }
    }

    render() {
        var style = {
            width: 30,
            height: 30,
            border: "1px solid #AEC1FF",
            borderRadius: "2px",
            backgroundColor: this.state.state == CellState.Alive ? "#91C5FF" : "white",
            margin: "1px"
        };

        return <div style={style} onClick={this.switchSelection}></div>
    }

    switchSelection = () => {
        this.setState({
            state: this.state.state === CellState.Dead ? CellState.Alive : CellState.Dead
        });

        this.props.cellIsSelected(this.state.state);
    }
}

export default Cell;
