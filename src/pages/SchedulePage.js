import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions';
import api from "../interceptors/axios"
import Aux from "../hoc/_Aux";
import Breadcrumb from '../App/layout/AdminLayout/Breadcrumb';


class SchedulePage extends React.Component {
    state = {
        scheduleData: [],
        loadingDownload: false,
        semesterSelected: {
            year: 2021,
            semester: 1
        },
        semester: [
            {
                year: 2022,
                semester: 1
            },
            {
                year: 2021,
                semester: 2
            },
            {
                year: 2021,
                semester: 1
            },
        ],
        sortField: null,
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState);
        if (this.state.semesterSelected.year !== prevState.semesterSelected.year ||
            this.state.semesterSelected.semester !== prevState.semesterSelected.semester) {
                this.fetchData()
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({
            scheduleData: []
        })
        const data = await api.get("/subject-schedules/schedule", {
            params: {
                year: this.state.semesterSelected.year,
                semester: this.state.semesterSelected.semester
            }
        })
            .then(res => res.data)
            .catch(e => e)
        console.log(data);
        this.setState({
            scheduleData: data.data
        })
    }

    onDownload = async () => {
        try {
            this.setState({
                loadingDownload: true
            })
            await api.get("/subject-schedules/export-schedule", {
                params: {
                    year: this.state.semesterSelected.year,
                    semester: this.state.semesterSelected.semester
                },
                responseType: 'blob'
            })
                .then(res => {
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(res.data)
                    link.download = 'lich-thi.xlsx'
                    link.click()

                    link.remove()
                })
            this.setState({
                loadingDownload: false
            })
        } catch {
            this.setState({
                loadingDownload: false
            })
        }
    }

    sortData = (sortField) => {
        let data = this.state.scheduleData
        if (sortField == 'day') {
            data = data.sort((a, b) => {
                if (a.dateExam[2] == b.dateExam[2]) {
                    return a.dateExam[1] - b.dateExam[1]
                }
                return a.dateExam[2] - b.dateExam[2]
            })
        }
        if (sortField == 'subject') {
            data = data.sort((a, b) => {
                if (a.subjectId == b.subjectId) {
                    return a.lessonStart - b.lessonStart
                }
                return a.subjectId - b.subjectId
            })
        }
        this.setState({
            scheduleData: data
        })
    }

    render() {

        return (
            <Aux>
                <Breadcrumb />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Row className='justify-content-start'>
                                    <Card.Title as="h5">L???ch thi</Card.Title>
                                </Row>
                                <Row style={{ marginTop: 10 }} className='justify-content-start'>
                                    <DropdownButton
                                        size="sm"
                                        title={this.state.semesterSelected ? `H???c k??? ${this.state.semesterSelected.semester} n??m ${this.state.semesterSelected.year}` : 'H???c k???'}
                                    >
                                        {this.state.semester?.map((e, index) => {
                                            return (
                                                <Dropdown.Item onSelect={() => {
                                                    this.setState({ semesterSelected: { year: e.year, semester: e.semester } })
                                                }}>
                                                    H???c k??? {e.semester} n??m {e.year}
                                                </Dropdown.Item>
                                            )
                                        })}
                                    </DropdownButton>

                                    <DropdownButton
                                        size="sm"
                                        title="S???p x???p"
                                    >
                                        <Dropdown.Item onSelect={() => { this.sortData('day') }}>Theo ng??y</Dropdown.Item>
                                        <Dropdown.Item onSelect={() => { this.sortData('subject') }}>Theo m??n h???c</Dropdown.Item>
                                    </DropdownButton>

                                    {this.state.scheduleData && this.state.scheduleData.length > 0 &&
                                        <Button size='sm' onClick={this.onDownload}> {this.state.loadingDownload ? <i className="feather icon-loader" /> : <i className="feather icon-download" />}T???i xu???ng l???ch thi</Button>
                                    }
                                </Row>


                            </Card.Header>
                            <Card.Body>
                                <Table responsive striped size='sm'>
                                    <thead>
                                        <tr style={{ color: "black" }}>
                                            <th>#</th>
                                            <th>M?? MH</th>
                                            <th>T??n MH</th>
                                            <th>Nh??m HP</th>
                                            <th>Ng??y thi</th>
                                            <th>Ph??ng thi</th>
                                            <th>Ti???t b???t ?????u</th>
                                            <th>S??? ti???t</th>
                                            <th>H??nh th???c thi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.scheduleData?.map((e, index) => {
                                            return (
                                                <tr key={index} style={{ color: "black" }}>
                                                    <th scope="row">{++index}</th>
                                                    <td>{e.subjectId}</td>
                                                    <td>{e.subjectName}</td>
                                                    <td>{e.courseName}</td>
                                                    <td>{`${e.dateExam[2]}-${e.dateExam[1]}-${e.dateExam[0]}`}</td>
                                                    <td>{e.classroomName}</td>
                                                    <td>{e.lessonStart}</td>
                                                    <td>{e.lessonEnd}</td>
                                                    <td>{e.examType}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SchedulePage);