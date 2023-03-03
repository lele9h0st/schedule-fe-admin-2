import Aux from "../../hoc/_Aux";
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GenerateScheduleRequest } from "./Model/GenerateScheduleRequest";
import { Button, Row } from 'react-bootstrap';
import api from "../../interceptors/axios"
import { NotificationManager } from "react-notifications";
const GenerateSchedule = () => {
    let properties = [100, 200, 10, 10, 10, 10, 10, 10]
    const [loadingCreateSchedule, setLoadingCreateSchedule] = useState(false)
    const [loadingCreateScheduleExcel, setLoadingCreateScheduleExcel] = useState(false)

    const [selectedFile, setselectedFile] = useState(undefined)
    const handleInputChange = (e) => {

        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        if (name === "population") {
            properties[0] = value;

        } else if (name === "iteration") {
            properties[1] = value;
        } else if (name === "sc1") {
            properties[2] = value;
        } else if (name === "sc2") {
            properties[3] = value;
        } else if (name === "sc3") {
            properties[4] = value;
        } else if (name === "sc4") {
            properties[5] = value;
        } else if (name === "sc5") {
            properties[6] = value;
        } else if (name === "sc6") {
            properties[7] = value;
        }
    }
    const generateNewSchedule = async () => {
        try {
            setLoadingCreateSchedule(true)
            NotificationManager.info('Đang tạo lịch thi...');
            const data = await api.post("subjects/newSchedule", JSON.stringify(new GenerateScheduleRequest(properties)));
                
            if (data?.data?.status == 1) {
                NotificationManager.success(data?.data?.message);
            } else if (data?.data?.status == 0) {
                NotificationManager.error(data?.data?.message);
            } else {
                NotificationManager.error("Vui lòng thử lại");
            }
            setLoadingCreateSchedule(false)
        } catch (error) {
            setLoadingCreateSchedule(false)
            NotificationManager.error("Vui lòng thử lại");
        }

    }

    const generateNewScheduleExcel = async () => {
        document.getElementById("selectFile").click()
    }

    const selectFile = async (event) => {
        try {
            setselectedFile(event.target.files[0])
            let formData = new FormData();
            formData.append("file", event.target.files[0]);
            formData.append("properties", properties)
            setLoadingCreateScheduleExcel(true)
            NotificationManager.info('Đang tạo lịch thi...');
            const data = await api.post("/subject-schedules/schedule-excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (data?.data?.status == 1) {
                NotificationManager.success(data?.data?.message);
            } else if (data?.data?.status == 0) {
                NotificationManager.error(data?.data?.message);
            } else {
                NotificationManager.error("Vui lòng thử lại");
            }
            setLoadingCreateScheduleExcel(false)

        } catch (error) {
            setLoadingCreateScheduleExcel(false)
            NotificationManager.error("Vui lòng thử lại");
        }

    }
    return (
        <Aux>
            <Row className="justify-content-start">
                <input id="selectFile" style={{ display: "none" }} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" type="file" onChange={selectFile} />
                <Button onClick={generateNewSchedule}>
                    {loadingCreateSchedule ?
                        <>
                            <span>Đang tạo lịch thi...</span>
                        </>
                        : "Tạo lịch thi mẫu trên server"}
                </Button>
                <Button onClick={generateNewScheduleExcel}>
                    {loadingCreateScheduleExcel ?
                        <>
                            <span>Đang tạo lịch thi bằng excel...</span>
                        </>
                        : "Tạo lịch thi bằng excel"}
                </Button>
            </Row>
            <div id="editModal" class="custom-modal" >
                <div class="custom-modal-content">
                    <div class="custom-modal-header">
                        <h4>Thay đổi thông số lập lịch thi</h4>
                    </div>
                    <div class="custom-modal-body" hotel={null}>

                        <label>Population:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[0]} /> */}
                            <select name="population" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value={100}>100</option>
                                <option value={200}>200</option>
                                <option value={500}>500</option>

                            </select>

                        </div>
                        <label>MAX_ITERATION</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[1]} /> */}
                            <select name="iteration" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>

                            </select>
                        </div>
                        <label>sc1:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[2]} /> */}
                            <select name="sc1" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option defaultValue value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <label>sc2:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[3]} /> */}
                            <select name="sc2" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <label>sc3:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[4]} /> */}
                            <select name="sc3" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <label>sc4:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[5]} /> */}
                            <select name="sc4" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <label>sc5:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[6]} /> */}
                            <select name="sc5" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                        <label>sc6:</label>
                        <div class="input-group mb-3">
                            {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[7]} /> */}
                            <select name="sc6" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                    <div class="custom-modal-footer">

                        {/* <button type="submit" class="btn btn-primary" onClick={() => change()}>Lưu</button> */}
                    </div>
                </div>
            </div>
        </Aux>);

}
export default GenerateSchedule;