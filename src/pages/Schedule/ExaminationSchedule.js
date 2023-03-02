import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
// import { Row, Col, Card, Table } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Aux from "../../hoc/_Aux";
import Header from './Header';
import Homepage from './Homepage';
import Schedule from './Schedule';
import api from "../../interceptors/axios"
import PropertiesForm from './PropertiesForm';
import { GenerateScheduleRequest } from './Model/GenerateScheduleRequest';
import LoadingOverlay from 'react-loading-overlay';
import PacmanLoader from 'react-spinners/PacmanLoader';

const ExaminationSchedule = () => {
    const [items, setItems] = useState([]);
    const [isCurrent, setIsCurrent] = useState(true)
    const [currentFileName, setCurrentFileName] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [loadingCreateSchedule, setLoadingCreateSchedule] = useState(false)
    const [properties, setProperties] = useState([100, 500, 10, 10, 10, 10, 10, 10]);
    // render() {
    const scheduleRef = useRef();
    const subjectSchedule = useRef();
    var propertiesForm = <PropertiesForm properties={properties} />
    const fetchScheduleFile = async () => {
        const data = await api.get("subjects/schedule-files")
            .then(res => res.data)
            .then((res) => {
                setItems(res.data);
                console.log(res.data);
            })
    }
    useEffect(() => {

        fetchScheduleFile()
    }, [])
    const generateNewSchedule = async () => {
        setLoadingCreateSchedule(true)
        const data = await api.post("subjects/newSchedule",JSON.stringify(new GenerateScheduleRequest(properties)))
            .then(response => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            })
        setLoadingCreateSchedule(false)
    }


    const setDefaultSchedule = async (fileName) => {
        setIsLoading(true)
        const data = await api.post("subject-schedules/as-default/" + fileName)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setIsLoading(false)
            },
                (error) => {
                    console.log(error)
                }
            );
    }
    const openForm = () => {
        var editOwnerModal = document.getElementById("editModal");
        console.log(editOwnerModal)
        editOwnerModal.style.display = "block";
        propertiesForm = <PropertiesForm properties={properties} />
    }
    const onDownload = async () => {
        setIsLoading(true)
        let fileName = 'current';
        if (currentFileName != null) {
            fileName = currentFileName;
        }
        await api.get("subjects/export-schedule/" + fileName, { responseType: 'blob' })

            .then(res => {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(res.data)
                link.download = 'lich-thi.xlsx'
                link.click()
                link.remove()
                setIsLoading(false)
            })

    }
    const override = {
        marginTop: 3,
        borderColor: "white",
     
        // left: -12
    };
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
        <Aux>
            {/* {propertiesForm} */}
            <DndProvider backend={HTML5Backend}>
                <DropdownButton id="dropdown-basic-button" title="Lịch thi">

                    {items.map((i, idx) => <Dropdown.Item onClick={() => {
                        scheduleRef.current.reLoadSchedule(i.fileStatus, i.name)
                        subjectSchedule.current.reLoadSubjectSchedule(i.fileStatus, i.name)
                        if (i.fileStatus !== 'USED') {
                            setCurrentFileName(i.name)
                            setIsCurrent(false)
                        } else {
                            setIsCurrent(true)
                        }
                    }}>
                        {i.fileStatus == 'USED' ? "Lịch thi hiện tại." : i.name} - {translateWord(i.fileStatus)}
                    </Dropdown.Item>)
                    }
                </DropdownButton>
                {/* <Button onClick={generateNewSchedule}>
                    {loadingCreateSchedule ?
                        <>
                           <span>Đang tạo lịch thi...</span>
                        </>
                        : "Tạo lịch thi mới"}
                </Button> */}
                <Button onClick={() => onDownload()}>Tải lịch thi.</Button>
                {/* <Button onClick={() => openForm()}>Điều chỉnh thông số.</Button>
                <Button onClick={() => console.log(properties)}>kiểm tra thông số.</Button> */}
                {!isCurrent ? <Button onClick={() => setDefaultSchedule(currentFileName)}>Áp dụng lịch thi này.</Button> : null}
                <div className={"row"}>
                    <h3 className={"page-header"}>Lịch thi theo môn học</h3>
                </div>
                <Homepage ref={scheduleRef} />
                <div className={"row"}>
                    <h3 className={"page-header"}>Lịch thi chi tiết</h3>
                </div>
                <Schedule ref={subjectSchedule} />

            </DndProvider>
        </Aux>
    );
    // }
}

export default ExaminationSchedule;