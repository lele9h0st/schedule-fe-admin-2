import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { data2, statuses, shifts } from "./data"
import Aux from "../../hoc/_Aux";
import ScheduleItem from "./ScheduleItem";
import ScheduleCol from "./ScheduleCol";
import api from "../../interceptors/axios"
const Schedule = forwardRef((props, ref) => {

    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadSubjectSchedule(null);
    }, [])
    const  loadSubjectSchedule = async (name)=> {
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
    function reformatDate(dateStr)
    {
      var dArr = dateStr.split("-");  // ex input: "2010-01-18"
      return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex output: "18/01/10"
    }
    return (
        <div className={"row schedule"} >
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

                                            <ScheduleCol>
                                                {items
                                                    .filter(i => (i.dateExam.join('-') === s.status && (i.shift + 1) === shift.shift))
                                                    .map((i, idx) => <ScheduleItem item={i} />)
                                                }
                                            </ScheduleCol>
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