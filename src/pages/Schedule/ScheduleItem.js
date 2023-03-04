import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "./data/types";
const ScheduleItem = ({ item, index, moveItem }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ITEM_TYPE,
       
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ITEM_TYPE,
        item: {  ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });
    drag(drop(ref));
    return (
        <Fragment>
    <div className={"item"} ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}>
        <p className={"item-title"}>Id: {item.subjectId}</p>
        <p className={"item-title"}>Tên môn học: {item.subjectName}</p>
        <p className={"item-title"}>Khóa thi: {item.className}</p>
        <p className={"item-title"}>Lớp thi: {item.classroomName}</p>
        <p className={"item-title"}>Thứ tự phòng thi: {item.subjectScheduleIndex}</p>
        <p className={"item-title"}>Số Thi sinh: {item.candidateAmount}</p>
    </div></Fragment>)

}

export default ScheduleItem