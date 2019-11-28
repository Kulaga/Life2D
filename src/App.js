import React from 'react';
import './App.css';
import Board from './Board';
import ControlPanel from './ControlPanel';
import CellState from "./Models/CellState";
import LifeGame from "./Models/LifeGame";
import BoardHistory from "./BoardHistory";
import { thisExpression } from '@babel/types';

class App extends React.Component {
    inProgress = false;

    constructor(props) {
        super(props);
        this.intervalId = null;
        let gridConfig = {
            minRows: 10,
            maxRows: 50,
            minColumns: 10,
            maxColumns: 50,
            selectedRows: 10,
            selectedColumns: 10
        };
        this.game = new LifeGame(gridConfig.selectedRows, gridConfig.selectedColumns);
        this.state = {
            historyStates: [],
            gridConfig: gridConfig,
            nextIterationBoard: this.createEmptyBoard(gridConfig)
        }
    }

    createEmptyBoard(gridConfig) {
        let initialBoard = new Array(gridConfig.selectedRows);
        for (let i = 0; i < gridConfig.selectedRows; i++) {
            initialBoard[i] = new Array(gridConfig.selectedColumns).fill(CellState.Dead)
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
            <div className="container-fluid mt-5">
                <div className="row justify-content-center">
                    <div><BoardHistory boardStates={this.state.historyStates}/></div>
                    <div>
                        <Board
                            rows={this.state.gridConfig.selectedRows}
                            columns={this.state.gridConfig.selectedColumns}
                            board={this.state.nextIterationBoard}
                            onBoardChange={this.onBoardChange}/>
                    </div>
                    <div className="ml-3">
                        <ControlPanel 
                            startGame={this.startGame} 
                            resetGame={this.resetGame} 
                            gridConfig={this.state.gridConfig}
                            onGridConfigChange={this.onGridConfigChange} />
                    </div>
                </div>
            </div>
        );
    }

    onGridConfigChange = (gridConfig) => {
        this.game = new LifeGame(gridConfig.selectedRows, gridConfig.selectedColumns)
        this.setState({
            gridConfig: gridConfig,
            nextIterationBoard: this.createEmptyBoard(gridConfig)
        });
    }

    startGame = () => {
        this.inProgress = true;
        this.intervalId = setInterval(() => {
            this.tick()
        }, 100);
    }

    tick() {
        this.setState((state, props) => {
            let newIteration = this.game.getNextIteration(state.nextIterationBoard);
            if (newIteration == null) {
                this.stopGame();
                return this.GenerateInitialState();
            }

            return {
                historyStates: this.updateHistory(state),
                nextIterationBoard: newIteration
            }
        });
    }

    updateHistory = (state) => {
        var newHistoryStates = [...state.historyStates];
        newHistoryStates.unshift(state.nextIterationBoard);
        return newHistoryStates.slice(0, 5);
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
            historyStates: [],
            nextIterationBoard: this.createEmptyBoard(this.state.gridConfig)
        };
    }
}

export default App;
