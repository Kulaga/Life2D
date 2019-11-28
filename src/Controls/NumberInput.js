import React from 'react';

class NumberInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="input-group mb-4">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">{this.props.name}</span>
                </div>
                <input 
                    type="number" 
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={this.props.value} 
                    className="form-control" 
                    onChange={(event) => this.props.onValueChange(parseInt(event.target.value, 10))}/>
            </div>
        );
    }
}

export default NumberInput;