export class ChangeSubjectScheduleRequest{
    constructor(courseName,oldDate, date,shift,subjectScheduleIndex) {
        this.courseName = courseName;
        this.oldDate=oldDate;
        this.date = date;
        this.shift=shift;
        this.subjectScheduleIndex=subjectScheduleIndex
      }
}