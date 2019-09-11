import React from 'react';
import './App.css';
import Board from './Board'
import ControlPanel from './ControlPanel'
import CellState from "./Models/CellState";
import LifeGame from "./Models/LifeGame";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.rows = 10;
        this.columns = 10;
        this.state = {
            nextIterationBoard: this.createEmptyBoard()
        }
    }

    createEmptyBoard() {
        let initialBoard = new Array(this.rows);
        for (let i = 0; i < this.columns; i++) {
            initialBoard[i] = new Array(this.columns).fill(CellState.Dead)
        }
        return initialBoard;
    }

    onBoardChange = (newState) => {
        this.setState({
            nextIterationBoard: newState
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div>
                        <ControlPanel startGame={this.startGame}/>
                        <Board
                            rows={this.rows}
                            columns={this.columns}
                            board={this.state.nextIterationBoard}
                            onBoardChange={this.onBoardChange}/>
                    </div>
                </div>
            </div>
        );
    }

    startGame = () => {
        let game = new LifeGame(this.rows , this.columns);
        let newIteration = game.getNextIteration(this.state.nextIterationBoard);

        if(newIteration == null) {
            this.setState({
                nextIterationBoard: this.createEmptyBoard()
            });
            return;
        }

        console.log(newIteration)
        setTimeout(() => {
            this.setState({
                nextIterationBoard: newIteration
            });
            this.startGame();
        }, 100);
    }
}

export default App;
