import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions';

import Aux from "../hoc/_Aux";


class LogoutPage extends React.Component {

    componentDidMount() {
        console.log("hvhhh");
        this.props.logout()
        if (!this.props.auth.user) {
            window.location.href = "/"
        }
    }
    componentDidUpdate() {
        if (!this.props.auth.user) {
            window.location.href = "/"
        }
    }

    componentWillUnmount(){
        
    }
    render() {

        return (
            <Aux>
                <Row>

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


export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);