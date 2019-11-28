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
                <input type="number" className="form-control"/>
            </div>
        );
    }
}

export default NumberInput;