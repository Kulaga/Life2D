import React from 'react';


class Cell extends React.Component {
    render() {
        var style = {
            width: 20,
            height: 20,
            border: "1px solid #AEC1FF",
            borderRadius: "2px",
            margin: "1px"
        };

        return <div style={style}></div>
    }
}

export default Cell;