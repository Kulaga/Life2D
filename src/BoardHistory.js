import React from 'react';
import Board from './Board'


class BoardHistory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var boards = [];
        for (let i = 0; i < this.props.boardStates.length; i++) {
            const boardState = this.props.boardStates[i];
            boards.push((
                <div>
                    
                </div>
                <Board
                    key={i}
                    rows={10}
                    columns={10}
                    board={boardState}/>
                ))
        }

        return <div className="historyContainer">{boards}</div>;
    }
}

export default BoardHistory;