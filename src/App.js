import React from 'react';
import './App.css';
import Board from './Board';
import ControlPanel from './ControlPanel';
import CellState from "./Models/CellState";
import LifeGame from "./Models/LifeGame";

class App extends React.Component {
    inProgress = false;

    constructor(props) {
        super(props)
        this.rows = 20;
        this.columns = 20;        
        this.game = new LifeGame(this.rows, this.columns);
        this.intervalId = null;
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
                        <ControlPanel startGame={this.startGame} resetGame={this.resetGame}/>
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
        this.inProgress = true;
        this.intervalId = setInterval(() => {
            this.tick()
        }, 100);
    }

    tick() {
        this.setState((state, props) => {
            let newIteration = this.game.getNextIteration(this.state.nextIterationBoard);
            if (newIteration == null) {
                this.stopGame();
                return this.GenerateInitialState();
            }

            return { 
                nextIterationBoard: newIteration
            }
        });
    }

    stopGame = () => {
        this.inProgress = false;
        clearTimeout(this.intervalId);
    }

    resetGame = () => {
        this.stopGame();
        this.setState(this.GenerateInitialState())
    }

    GenerateInitialState() {
        return {
            nextIterationBoard: this.createEmptyBoard()
        };
    }
}

export default App;
