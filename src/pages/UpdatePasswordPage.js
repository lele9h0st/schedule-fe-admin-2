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
        password: '',
        comfirmPassword: "",
        otp: '',
        loading: false,
        messageOTP: "",
        messagePassword: "",
        messageComfirmPassword: "",
    }

    componentDidMount() {
        if (this.props.auth.user) {
            window.location.href = "/"
            return;
        }
        NotificationManager.success("Vui lòng kiểm tra email");
    }
    componentDidUpdate() {
        if (this.props.auth.user) {
            window.location.href = "/"
        }
    }
    componentWillUnmount() {

    }
    render() {



        const onUpdatePassword = async () => {

            if (this.state.messageComfirmPassword || this.state.messageOTP || !this.state.otp || !this.state.password || !this.state.comfirmPassword) {
                NotificationManager.error("Vui lòng nhập đầy đủ thông tin");
                return
            }

            const query = new URLSearchParams(this.props.location.search);
            const email = query.get('email')
            if (!email) {
                NotificationManager.error("Vui lòng thử lại");
                return;
            }

            this.setState({ loading: true })
            try {
                await api
                    .post('/auths/forgot-password', { email, password: this.state.password, otp: parseInt(this.state.otp) })
                    .then((res) => {
                        return res.data;
                    })
                    .then((res) => {
                        if (res.status == 1) {
                            NotificationManager.success('Đã cập nhật mật khẩu mới');
                        } else {
                            NotificationManager.error(res.message);
                        }
                    })
                    .catch((e) => console.log(e));

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

        const onChangeOTP = (e) => {

            try {
                const otp = e.target.value
                if (parseInt(otp).toString().length != otp.length) {
                    this.setState({ messageOTP: "OTP phải là số" })
                    this.setState({ otp: "" })
                } else {
                    this.setState({ messageOTP: "" })
                    this.setState({ otp: e.target.value })
                }
            } catch (error) {
                this.setState({ messageOTP: "OTP là số" })
                this.setState({ otp: "" })
            }
        }

        const onChangePassword = (e) => {

            const password = e.target.value
            if (this.state.confirmPassword && this.state.confirmPassword != password) {
                this.setState({ messageComfirmPassword: "Mật khẩu không khớp" })
            } else {
                this.setState({ messageComfirmPassword: "" })
            }
            this.setState({ password })

        }

        const onChangeComfirmPassword = (e) => {
            const comfirmPassword = e.target.value
            console.log(comfirmPassword, this.state.password);
            if (this.state.password && this.state.password != comfirmPassword) {
                this.setState({ messageComfirmPassword: "Mật khẩu không khớp" })
            } else {
                this.setState({ messageComfirmPassword: "" })
            }
            this.setState({ comfirmPassword })

        }

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
                                <h3 className="mb-4">Đổi mật khẩu mới</h3>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control w-100" placeholder="OTP"
                                        onInput={onChangeOTP} />
                                    <p className="text-danger mb-0">
                                        {this.state.messageOTP}
                                    </p>
                                </div>
                                <div className="input-group mb-3 ">
                                    <input type="password" className="form-control w-100" placeholder="Mật khẩu mới"
                                        onInput={onChangePassword} />
                                    <p className="text-danger mb-0">
                                        {this.state.messagePassword}
                                    </p>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control  w-100" placeholder="Nhập lại mật khẩu"
                                        onInput={onChangeComfirmPassword} />
                                    <p className="text-danger mb-0">
                                        {this.state.messageComfirmPassword}
                                    </p>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={onUpdatePassword}>
                                    {this.state.loading ?
                                        <PacmanLoader
                                            cssOverride={override}
                                            size={11}
                                            color='white'
                                            loading={this.state.loading}
                                            speedMultiplier={1.5}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        /> : "Cập nhật"}
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