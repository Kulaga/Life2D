import CellState from "./CellState";
import Cell from "./Cell";

class LifeGame {
    constructor(rowSize, colSize) {
        this.rowSize = rowSize;
        this.colSize = colSize;
    }

    getNextIteration(currentState) {
        const nextState = this.copyArray(currentState);
        const aliveCells = this.getAliveCellIndexes(currentState);

        for (let i = 0; i < aliveCells.length; i++) {
            let cell = aliveCells[i];
            if (this.isOverpopulated(currentState, cell)) {
                nextState[cell.row][cell.col] = CellState.Dead;
                continue;
            }
            if (this.isUnderpopulated(currentState, cell)) {
                nextState[cell.row][cell.col] = CellState.Dead;
                continue;
            }
        }

        return nextState;
    }

    copyArray(board) {
        let copy = [];
        for (const row of board) {
            copy.push(row.slice())
        }
        return copy;
    }

    getAliveCellIndexes(currentState) {
        let aliveCells = [];
        for (let i = 0; i < this.rowSize; i++) {
            for (let j = 0; j < this.colSize; j++) {
                if (currentState[i][j] === CellState.Alive) {
                    aliveCells.push(new Cell(i, j));
                }
            }
        }
        return aliveCells;
    }

    isOverpopulated(board, cell) {
        let neighbors = this.getNeighbors(cell, board);
        return neighbors.filter(c => c == CellState.Alive).length > 3;
    }

    getNeighborsIndexes(row, col) {
        return [
            new Cell(this.toProjectedRow(row - 1) , this.toProjectedCol(col - 1)),
            new Cell(this.toProjectedRow(row - 1) , this.toProjectedCol(col)),
            new Cell(this.toProjectedRow(row - 1) , this.toProjectedCol(col + 1)),
            new Cell(this.toProjectedRow(row) , this.toProjectedCol(col - 1)),
            new Cell(this.toProjectedRow(row) , this.toProjectedCol(col + 1)),
            new Cell(this.toProjectedRow(row + 1) , this.toProjectedCol(col - 1)),
            new Cell(this.toProjectedRow(row + 1) , this.toProjectedCol(col)),
            new Cell(this.toProjectedRow(row + 1) , this.toProjectedCol(col + 1))
        ]
    }

    getNeighbors(cell, board) {
        return this.getNeighborsIndexes(cell.row, cell.col).map((index) => board[index.row][index.col]);
    }

    isUnderpopulated(board, cell) {
        let neighbors = this.getNeighbors(cell, board);
        return neighbors.filter(c => c == CellState.Alive).length < 2;
    }

    toProjectedRow(number) {
        return (number + this.rowSize) % this.rowSize;
    }

    toProjectedCol(number) {
        return (number + this.colSize) % this.colSize;
    }

    isAlive(board, rowNum, colNum) {
        return board[rowNum][colNum] === CellState.Alive;
    }
}

export default LifeGame;