
const ScheduleItem = ({ item }) => {
    return (<div className={"item"}>
        <p className={"item-title"}>Id: {item.subjectId}</p>
        <p className={"item-title"}>Tên môn học: {item.subjectName}</p>
        <p className={"item-title"}>Khóa thi: {item.className}</p>
        <p className={"item-title"}>Lớp thi: {item.classroomName}</p>
        <p className={"item-title"}>Thứ tự phòng thi: {item.subjectScheduleIndex}</p>
        <p className={"item-title"}>Số Thi sinh: {item.candidateAmount}</p>
    </div>)

}

export default ScheduleItem