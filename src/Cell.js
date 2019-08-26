import React from 'react';


class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        }
    }

    render() {
        var style = {
            width: 20,
            height: 20,
            border: "1px solid #AEC1FF",
            borderRadius: "2px",
            backgroundColor: this.state.isSelected ? "#91C5FF" : "white",
            margin: "1px"
        };

        return <div style={style} onClick={() => this.switchSelection()}></div>
    }

    switchSelection() {
        this.setState({
            isSelected: !this.state.isSelected
        });
    }
}

export default Cell;