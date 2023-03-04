import { forwardRef } from "react";

const PropertiesForm = forwardRef((props, ref) => {
 
    let properties=props.properties;
    let oldProperties=[...properties];
    const change = () => {
        
        close()
    }

    const close = () => {
        //console.log(changeData)

        properties=oldProperties
        document.getElementsByName("population").value=properties[0]
        var editModal = document.getElementById("editModal");
        editModal.style.display = "none";
    }
    const handleInputChange = (e) => {

        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        if (name === "population") {
            properties[0] = value;
        
        }else if(name==="iteration"){
            properties[1] = value;
        }else if(name==="sc1"){
            properties[2]=value;
        }else if(name==="sc2"){
            properties[3]=value;
        }else if(name==="sc3"){
            properties[4]=value;
        }else if(name==="sc4"){
            properties[5]=value;
        }else if(name==="sc5"){
            properties[6]=value;
        }else if(name==="sc6"){
            properties[7]=value;
        }

    }
    return (<div id="editModal" class="custom-modal" >
        <div class="custom-modal-content">
            <div class="custom-modal-header">
                <span class="custom-close" onClick={() => close()}>&times;</span>
                <h6>Thay đổi thông số lập lịch thi</h6>
            </div>
            <div class="custom-modal-body" hotel={null}>

                <label>Số cá thể:</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[0]} /> */}
                     <select  name="population" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value={100}>100</option>
                        <option value={200}>200</option>
                        <option value={500}>500</option>
                    </select>

                </div>
                <label>Số lần lặp</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[1]} /> */}
                    <select  name="iteration" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="200">200</option>
                        <option  value="500">500</option>
                        <option value="1000">1000</option>
                     
                    </select>
                </div>
                <label>Hạn chế xếp 1 khóa phải thi lớn hơn 1 môn trong cùng 1 ngày</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[2]} /> */}
                    <select  name="sc1" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option defaultValue value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <label>Không xếp các thi rời rạc làm khó cán bộ coi thi</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[3]} /> */}
                    <select  name="sc2" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <label>Một môn thi không chia quá ít phòng thi trong một ca thi làm phát sinh nhiều ca thi</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[4]} /> */}
                    <select  name="sc3" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <label>Một ca thi hạn chế xếp nhiều hơn 2 môn học tránh bị trùng lịch thi của sinh viên</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[5]} /> */}
                    <select  name="sc4" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <label>Số lượng sinh viên xếp vào một phòng thi phải lớn hơn 50% sức chứa của phòng thi đó</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[6]} /> */}
                    <select  name="sc5" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <label>Một lớp đăng kí học phần ưu tiên xếp trong 1 ca</label>
                <div class="input-group mb-3">
                    {/* <input type="text" class="form-control" name="maKS" disabled="disabled" onChange={(e) => handleInputChange(e)} defaultValue={properties[7]} /> */}
                    <select  name="sc6" className={"select-box"} onChange={(e) => handleInputChange(e)}>
                        <option  value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
            <div class="custom-modal-footer">
                <button type="button" class="btn btn-secondary " onClick={() => close()}>Hủy</button>
                <button type="submit" class="btn btn-primary" onClick={() => change()}>Lưu</button>
            </div>
        </div>
    </div>)
});
export default PropertiesForm;