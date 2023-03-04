import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { data2, statuses, shifts } from "./data"
import Aux from "../../hoc/_Aux";
import ScheduleItem from "./ScheduleItem";
import ScheduleCol from "./ScheduleCol";
import api from "../../interceptors/axios"
import DropWrapper from "./DropWrapper";
import { Button } from 'react-bootstrap';
import { ChangeSubjectScheduleRequest } from "./Model/ChangeSubjectScheduleRequest";
const Schedule = forwardRef((props, ref) => {

    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [change, setChange] = useState([]);


    const onDrop = (item, monitor, date, shift) => {
        const mapping = statuses.find(si => si.status === date);
        let dateList=date.split("-")
        let filterItems = items.filter(filterItem => filterItem.shift === shift
            && (filterItem.dateExam[0] === dateList[0]
                && filterItem.dateExam[1] === dateList[1]
                && filterItem.dateExam[2] === dateList[2]))
        console.log(filterItems);
        for (let i = 0; i < filterItems.length; i++) {
            let it = filterItems[i];
            if (it.classroomName === item.classroomName) {
                alert("Phòng này đã được sử dụng!");
                return items;
            }


        }

        setChange(prevState => {
            const newItems = prevState;
            for (let i=0;i<newItems.length;i++){
                if(newItems[i].courseName===item.courseName&&newItems[i].subjectScheduleIndex===item.subjectScheduleIndex){
                    newItems[i].oldDate= item.dateExam.join("-");
                    newItems[i].date=date
                    newItems[i].shift=shift+1
                    console.log(newItems);
                    return [...newItems];
                }
               
            }
        
            newItems.push(new ChangeSubjectScheduleRequest(item.courseName, item.dateExam.join("-"), date, shift, item.subjectScheduleIndex))
            console.log(newItems);
            return [...newItems];
        });

        date = date.split("-")

        setItems(prevState => {
            // console.log(prevState);
            const dateExam = date;
            const newItems = prevState
                .filter(i => i.courseName !== item.courseName
                    || i.subjectScheduleIndex !== item.subjectScheduleIndex
                )
                .concat({ ...item, dateExam, shift });
            // console.log(newItems);
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];

        setItems(prevState => {
            console.log(prevState);
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            console.log(newItems);
            return [...newItems];
        });
    };

    useEffect(() => {
        loadSubjectSchedule(null);
    }, [])
    const loadSubjectSchedule = async (name) => {
        let path = "/subject-schedules/using/2021";
        if (name !== null) {
            path = "/subject-schedules/" + name;
        }
        const data = await api.get(path)
            .then(res => res.data)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                    console.log(result.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    useImperativeHandle(ref, () => ({

        reLoadSubjectSchedule(status, fileName) {
            if (status == 'USED') {
                loadSubjectSchedule(null);
            } else {

                loadSubjectSchedule(fileName);
            }
        }

    }));
    const changeSubjectSchedule = async (cssr) => {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cssr)
        };
        console.log(cssr);
        const data = await api.post('/subject-schedules/changeSubjectSchedule', JSON.stringify(cssr))
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                setChange(
                     []
                );
                alert("Đã thay đổi lịch thành công! Lịch mới thay đổi được thêm vào danh sách lịch thi");

                window.location.reload();

            },
                (error) => {
                    alert("không thể thay đổi lịch thi như trên!!!!");
                    window.location.reload();
                }
            );
    }
    function reformatDate(dateStr) {
        var dArr = dateStr.split("-");  // ex input: "2010-01-18"
        return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/10"
    }
    return (
        <div className={"row schedule"} >
                <Button onClick={() => changeSubjectSchedule(change)}>Thay đổi lịch thi.</Button>
            <div className="line-shift">
                <div className={"col-wrapper"}>
                    <h2 className={"col-title"}> </h2>
                </div>
                {statuses.map(s => {
                    return (<div key={s.status} className={"col-header"}>
                        <span >{reformatDate(s.status)}</span>
                    </div>)
                })}
            </div>
            {shifts.map(shift => {
                return (
                    <Aux>
                        <div className="line-shift">
                            <div className={"col-wrapper"} >
                                <div className={"col-title"}>
                                    <span>{(shift.name)}</span></div>
                            </div>
                            {

                                statuses.map(s => {
                                    return (
                                        <div key={s.status} className={"col-wrapper"}>
                                            <DropWrapper onDrop={onDrop} date={s.status} shift={shift.shift}>
                                                <ScheduleCol>
                                                    {items
                                                        .filter(i => (i.dateExam.join('-') === s.status && i.shift === shift.shift))
                                                        .map((i, idx) => <ScheduleItem item={i} index={idx} moveItem={moveItem} />)
                                                    }
                                                </ScheduleCol>
                                            </DropWrapper>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    
                    </Aux>)
            })}

        </div>)
})
export default Schedule