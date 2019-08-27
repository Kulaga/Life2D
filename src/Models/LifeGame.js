import CellState from "./CellState";
import Cell from "./Cell";

class LifeGame {
    constructor(rowSize, colSize) {
        this.rowSize = rowSize;
        this.colSize = colSize;
    }

    getNextIteration(currentState) {
        const nextState = currentState.slice();
        const aliveCells = this.getAliveCellIndexes(currentState);
        this.shuffle(aliveCells);

        for (let i = 0; i < aliveCells.length; i++) {
            let cell = aliveCells[i];
            if (this.isOverpopulated(currentState, cell)) {
                nextState[cell.row][cell.col] = CellState.Dead;
                continue;
            }
        }

        return nextState;
    }

    shuffle(array) {
        return array.sort(() => 0.5 - Math.random());
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
        let neighbors = this.getNeighborsIndexes(cell.row, cell.col).map((index) => board[index.row][index.col]);
        return neighbors.filter(c => c == CellState.Alive).length >= 3;
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