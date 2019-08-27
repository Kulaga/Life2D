import React from 'react';
import Cell from "./Cell";
import Key from "./Models/Key"
import CellState from "./Models/CellState";

class Board extends React.Component {
    constructor(props) {
        super(props);

        this.rows = 5;
        this.columns = 5;
        this.nextIterationBoard = this.createEmptyBoard();

        this.state = {
            isInitial: true,
            board: this.createEmptyBoard(),
        }
    }

    createEmptyBoard() {
        let initialBoard = new Array(this.rows);
        for (let i = 0; i < this.columns; i++) {
            initialBoard[i] = new Array(this.columns).fill(CellState.Dead)
        }
        return initialBoard;
    }

    render() {
        let board = this.generateBoard();
        return ( <div id="board">{board}</div> );
    }

    generateBoard() {
        let rows = [];

        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.columns; j++) {
                row.push(this.createCell(new Key(i, j)));
            }
            rows.push((<div className="board-row" key={i} style={{display: "inline-block"}}>{row}</div>))
        }

        return rows;
    }

    createCell(key) {
        return (<Cell key={key} cellIsSelected = { (cellState) => this.cellIsSelected(key, cellState)} />);
    }

    cellIsSelected = (key, cellState) => {
        this.nextIterationBoard[key.rowNum, key.colNum] = cellState;
    }
}

export default Board;