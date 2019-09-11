import React from 'react';

class ControlPanel extends React.Component {
    render() {
        return (
            <div className="control-panel">
                <button type="button" className="btn btn-outline-primary m-1" onClick={this.props.startGame}>Start</button>
                <button type="button" className="btn btn-outline-secondary m-1">Reset</button>
            </div>
        )
    }
}

export default ControlPanel;
