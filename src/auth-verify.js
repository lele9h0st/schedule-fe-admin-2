import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class AuthVerify extends Component {
    constructor(props) {
        super()
        props.history.listen(() => {
            const tokenExpDate = localStorage.getItem("tokenExpDate");
            if (tokenExpDate) {
                if (parseInt(tokenExpDate) < Date.now()) {
                    props.logout();
                }
            }
        });
    }
    componentDidMount() {
        const tokenExpDate = localStorage.getItem("tokenExpDate");
        if (tokenExpDate) {
            if (parseInt(tokenExpDate) < Date.now()) {
                this.props.logout();
            }
        }
    }
    render() {
        return <div></div>;
    }
}

export default withRouter(AuthVerify);
