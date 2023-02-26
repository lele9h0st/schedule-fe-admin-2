import React from "react";
import { useDrop } from "react-dnd";
import ITEM_TYPE from "./data/types";
import { statuses } from "./data";

const DropWrapper = ({ onDrop, children, date,shift }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        // canDrop: (item, monitor) => {
        //     const itemIndex = statuses.findIndex(si => si.status === item.status);
        //     const statusIndex = statuses.findIndex(si => si.status === status);
        //     return [itemIndex + 2, itemIndex - 2,itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        // },
        drop: (item, monitor) => {
            onDrop(item, monitor, date,shift);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;