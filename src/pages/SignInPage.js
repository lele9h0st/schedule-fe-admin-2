import React from 'react';
import { NavLink, } from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import { login } from '../redux/auth/actions';
import { connect } from 'react-redux';
import PacmanLoader from "react-spinners/PacmanLoader";

class SignUp1 extends React.Component {
    state = {
        username: '',
        password: ''
    }

    componentDidMount() {
        if (this.props.auth.user) {
            window.location.href = "/"
        }
    }
    componentDidUpdate() {
        if (this.props.auth.user) {
            window.location.href = "/"
        }
    }
    componentWillUnmount(){
        
    }
    render() {

        const login = () => {
            this.props.login(this.state.username, this.state.password)
        }

        const override = {
            display: "block",
            margin: "0 auto",
            borderColor: "white",
            left: -12
        };

        return (
            <Aux>
                {/* <Breadcrumb /> */}
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r" />
                            <span className="r s" />
                            <span className="r s" />
                            <span className="r" />
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon" />
                                </div>
                                <h3 className="mb-4">Đăng nhập</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"
                                        onInput={(e) => { this.setState({ username: e.target.value }) }} />
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password"
                                        onInput={(e) => { this.setState({ password: e.target.value }) }} />
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                        <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={login}>
                                    {this.props.auth.loading ?
                                        <PacmanLoader
                                            cssOverride={override}
                                            size={11}
                                            color='white'
                                            loading={this.props.auth.loading}
                                            speedMultiplier={1.5}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        /> : "Đăng nhập"}
                                </button>

                                <p className="mb-2 text-muted">Quên mật khẩu? <NavLink to="/forgot-password">Cấp lại</NavLink></p>
                                {/* <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/auth/signup-1">Signup</NavLink></p> */}
                            </div>
                        </div>
                    </div>



                </div>
            </Aux>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password)),
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);