import React from 'react';
import NumberInput from './Controls/NumberInput'

class ControlPanel extends React.Component {
    render() {
        return (
            <div className="control-panel">                
                <NumberInput name="Rows"/>
                <NumberInput name="Columns"/>
                <button type="button" className="btn btn-outline-primary m-1" onClick={this.props.startGame}>Start</button>
                <button type="button" className="btn btn-outline-secondary m-1" onClick={this.props.resetGame}>Reset</button>
            </div>
        )
    }
}

export default ControlPanel;