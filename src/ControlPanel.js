import React from 'react';
import NumberInput from './Controls/NumberInput'

class ControlPanel extends React.Component {
    constructor(props){
        super(props)
        this.gridConfig = {...props.gridConfig}
    }

    render() {
        return (
            <div className="control-panel">                
                <NumberInput name="Rows" 
                    value={this.props.gridConfig.selectedRows} 
                    onValueChange={this.onRowsValueUpdate}
                    min={this.props.gridConfig.minRows}
                    max={this.props.gridConfig.maxRows}/>
                <NumberInput name="Columns" 
                    value={this.props.gridConfig.selectedColumns} 
                    onValueChange={this.onColumnsValueUpdate}
                    min={this.props.gridConfig.minColumns}
                    max={this.props.gridConfig.maxColumns}/>
                <button type="button" className="btn btn-outline-primary m-1" onClick={this.props.startGame}>Start</button>
                <button type="button" className="btn btn-outline-secondary m-1" onClick={this.props.resetGame}>Reset</button>
            </div>
        )
    }

    onRowsValueUpdate = (value) => {
        if (value < this.props.gridConfig.maxRows && value > this.gridConfig.minRows) {
            this.gridConfig.selectedRows = value;
            this.props.onGridConfigChange(this.gridConfig);
        }
    }

    onColumnsValueUpdate = (value) => {
        if (value < this.props.gridConfig.maxColumns && value > this.gridConfig.minColumns) {
            this.gridConfig.selectedColumns = value;
            this.props.onGridConfigChange(this.gridConfig);
        }
    }
}

export default ControlPanel;