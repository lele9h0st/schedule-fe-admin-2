import Aux from "../../hoc/_Aux";
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GenerateScheduleRequest } from "./Model/GenerateScheduleRequest";
import { Button } from 'react-bootstrap';
import api from "../../interceptors/axios"
const GenerateSchedule = () => {
    let properties = [100, 200, 10, 10, 10, 10, 10, 10]
    const [loadingCreateSchedule, setLoadingCreateSchedule] = useState(false)
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
    return (
        <Aux>
                <Button onClick={generateNewSchedule}>
                    {loadingCreateSchedule ?
                        <>
                           <span>Đang tạo lịch thi...</span>
                        </>
                        : "Tạo lịch thi mới"}
                </Button>
            <div id="editModal" class="custom-modal" >
                <div class="custom-modal-content">
                    <div class="custom-modal-header">
                        <h2>Thay đổi thông số lập lịch thi</h2>
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