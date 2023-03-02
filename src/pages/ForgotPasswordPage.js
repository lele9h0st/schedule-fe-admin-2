import React from 'react';
import { NavLink, } from 'react-router-dom';

import '../assets/scss/style.scss';
import Aux from "../hoc/_Aux";
import Breadcrumb from "../App/layout/AdminLayout/Breadcrumb";
import { login } from '../redux/auth/actions';
import { connect } from 'react-redux';
import PacmanLoader from "react-spinners/PacmanLoader";
import api from '../interceptors/axios'
import { NotificationManager } from 'react-notifications';

class ForgotPassword extends React.Component {
    state = {
        username: '',
        loading: false
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
    componentWillUnmount() {

    }
    render() {

        const submitEmail = async () => {
            // this.props.login(this.state.username, this.state.password)


            this.setState({ loading: true })
            try {
                await api
                    .get(`/auths/forgot-password?email=${this.state.username}`)
                    .then((res) => {
                        console.log(res);
                        return res?.data;
                    })
                    .then((res) => {
                        console.log(res);
                        if (res?.status === 1) {
                            window.location.href = `/update-password?email=${this.state.username}`;
                        } else {
                            NotificationManager.error(res?.message);
                        }
                    })
                    .catch((e) => {
                        // NotificationManager.error(e);

                    });

            } catch (error) {

            }

            this.setState({ loading: false })

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
                                <h3 className="mb-4">Quên mật khẩu</h3>
                                <p className="">Nhập email tài khoản</p>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email"
                                        onInput={(e) => { this.setState({ username: e.target.value }) }} />
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={submitEmail}>
                                    {this.state.loading ?
                                        <PacmanLoader
                                            cssOverride={override}
                                            size={11}
                                            color='white'
                                            loading={this.state.loading}
                                            speedMultiplier={1.5}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        /> : "Xác nhận"}
                                </button>

                                <p className="mb-2 text-muted">Có tài khoản? <NavLink to="/signin">Đăng nhập</NavLink></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);