import React from 'react';

export default React.memo(function EmptyMsg() {

    return (
        <p style={{ color: "rgba(151, 147, 147, 0.5)", width: "70%", fontSize: 20, position: "absolute", top: "25%", left: "25%" }}>Drag and Drop Nodes from Side Panel</p>
    )
});
