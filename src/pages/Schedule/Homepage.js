import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import Col from "./Col";
import { data, statuses, shifts } from "./data"
import Aux from "../../hoc/_Aux";
import { Button } from 'react-bootstrap';
import { ChangeScheduleRequest } from "./Model/ChangeScheduleRequest"
import api from "../../interceptors/axios"
const Homepage = forwardRef((props, ref) => {
    const [items, setItems] = useState([]);
    const [change, setChange] = useState([]);
    const [isChange, setIsChange] = useState(false);
    const [canChange, setCanChange] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
   
    const onDrop = (item, monitor, date, shift) => {
        const mapping = statuses.find(si => si.status === date);
        setChange(prevState => {
            const newItems = prevState;
            newItems.push(new ChangeScheduleRequest(item.subject.id, date))
            return [...newItems];
        });

        date = date.split("-")

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.subject.id !== item.subject.id)
                .concat({ ...item, date });
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    useImperativeHandle(ref, () => ({

        reLoadSchedule(status, fileName) {
            if (status == 'USED') {
                loadSchedule(null);
              
            }
            else {
                loadSchedule(fileName);
               
            }
        }

    }));


    const changeSchedule = async(csr) =>{
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(csr)
        };
       
        const data = await api.post('/subject-schedules/change',JSON.stringify(csr))
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                setChange(prevState => {
                    return []
                });
                console.log(requestOptions.body);
           
                window.location.reload();

            },
                (error) => {
                    alert("không thể thay đổi lịch thi như trên!!!!");
                    window.location.reload();
                }
            );
    }


    
    useEffect(() => {
        loadSchedule(null);
    }, [])
    const loadSchedule = async(name)=> {
        setIsLoading(true)
        let path = "/subjects/schedule/";
        if (name !== null) {
            path = "/subjects/schedule/" + name;
        }
        const data = await api.get(path)
            .then(res => res.data)
            .then(
                (result) => {
                    setIsLoading(false);
                    setItems(result.data);
                    console.log(result.data);
                    if (name != null) {

                        setIsChange(false);
                        setCanChange(false);
                    } else {
                        setCanChange(true);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoading(false);
                    setError(error);
                }
            )
    }

    function reformatDate(dateStr)
    {
      var dArr = dateStr.split("-");  // ex input: "2010-01-18"
      return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex output: "18/01/10"
    }
    return (
        <div>
            {isLoading?<div className="loading"> <img src="./src/assets/images/rolling-1s-200px.svg"></img></div>:null}
            {/* <div className="loading"> </div> */}
            <div className={"row schedule"} >
                <div className="line-shift">

                    {statuses.map(s => {
                        return (<div key={s.status} className={"col-header"}>
                            <span >{ reformatDate(s.status)}</span>
                        </div>)
                    })}
                </div>
                <div className="line-shift">
                    {statuses.map(s => {
                        return (
                            <div key={s.status} className={"col-wrapper"}>

                                <DropWrapper onDrop={onDrop} date={s.status} >
                                    <Col>
                                        {items
                                            .filter(i => (i.date.join('-') === s.status))
                                            .map((i, idx) => <Item id={i.subject.id} item={i} index={idx} moveItem={moveItem} status={s} />)
                                        }
                                    </Col>
                                </DropWrapper>
                            </div>
                        );
                    })
                    }
                </div>

            </div>
            <div>
                {canChange ? <Button onClick={() => changeSchedule(change)}>Thay đổi lịch thi.</Button> : null}
                

            </div>
          
        </div>
    );

});

export default Homepage;