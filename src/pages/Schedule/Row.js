import React from "react";

const Row = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";
    return (
        <div className={`cell ${className}`}>
            {children}
        </div>
    );
};

export default Row;