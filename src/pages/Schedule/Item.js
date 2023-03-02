import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "./data/types";

const Item = ({ item, index, moveItem, status }) => {
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

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

    drag(drop(ref));
    const translateWord =(word)=>{
        let result=word;
        if(word=="current"){
            result= "Lịch thi hiện tại."
        }else if(word=="CHANGE"){
            result=  "Thay đổi"
        }else if(word=="DELETE"){
            result=  "Xóa"
        }else if(word=="NEW"){
            result=  "Mới"
        }else if(word=="ESSAY"){
            result=  "Lý thuyết"
        }else if(word=="COMPUTATIONAL"){
            result=  "Thực hành"
        }else if(word=="ORAL"){
            result=  "Vấn đáp"
        }
        return result ;
    }
    return (
        <Fragment>
            <div
                ref={ref}
                style={{ opacity: isDragging ? 0 : 1 }}
                className={"item"}
                onClick={onOpen}
            >
                {/* <div className={"color-bar"} style={{ backgroundColor: status.color }}/> */}
                <p className={"item-title"}>Id: {item.subject.id}</p>
                <p className={"item-title"}>Tên: {item.subject.name}</p>
                <p className={"item-title"}>Hình thức thi: {translateWord(item.subject.examType)}</p>
                <p className={"item-title"}>Số tiết thi: {item.subject.examTime}</p>
                <p className={"item-title"}>Số tín chỉ: {item.subject.credit}</p>
                {/* <p className={"item-status"}>{item.icon}</p> */}
            </div>
            {/* <Window
                item={item}
                onClose={onClose}
                show={show}
            /> */}
        </Fragment>
    );
};

export default Item;