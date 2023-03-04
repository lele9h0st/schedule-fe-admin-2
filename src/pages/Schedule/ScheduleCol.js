import React from "react";

const ScheduleCol = ({ isOver, children }) => {
 
    const className = isOver ? " highlight-region" : "";
    return (
        <div className={`schedule-col ${className}`}>
            {children}
        </div>
    );
};

export default ScheduleCol;