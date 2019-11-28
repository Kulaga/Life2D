import React from 'react';
import Cell from "./Cell";
import Key from "./Models/Key"
import CellState from "./Models/CellState";

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let board = this.generateBoard();
        return ( <div id="board">{board}</div> );
    }

    generateBoard() {
        let rows = [];

        for (let i = 0; i < this.getRows(); i++) {
            let row = [];
            for (let j = 0; j < this.getColumns(); j++) {
                row.push(this.createCell(new Key(i, j), this.props.board[i][j]));
            }
            rows.push((<div key={i} className="board-row">{row}</div>))
        }

        return rows;
    }

    getColumns() {
        return this.props.columns;
    }

    getRows() {
        return this.props.rows;
    }

    createCell(key, state) {
        return (<Cell
            state={state}
            key={key}
            cellIsSelected = { (cellState) => this.cellIsSelected(key, cellState)} />);
    }

    cellIsSelected = (key, cellState) => {
        let newState = this.props.board.slice();
        newState[key.rowNum][key.colNum] = cellState;
        this.props.onBoardChange(newState);
    }
}

export default Board;
