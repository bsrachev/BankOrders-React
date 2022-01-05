import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { register } from "../../actions/usersAction";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-info" role="alert">
                This field is required!
            </div>
        );
    }
};

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-info" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-info" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-info" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmployeeNumber = this.onChangeEmployeeNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            employeeNumber: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            email: "",
            successful: false,
        };
    }

    onChangeEmployeeNumber(e) {
        this.setState({
            employeeNumber: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value,
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            this.props
                .dispatch(
                    register(this.state)
                )
                .then(() => {
                    this.setState({
                        successful: true,
                    });
                })
                .catch(() => {
                    this.setState({
                        successful: false,
                    });
                });
        }
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if (isLoggedIn) {
            return <Redirect to="/profile" />;
        }

        return (
            <div className="container text-center">
                <div className="row section-container-spacer justify-content-md-center">
                    <div className="col-xs-12 col-md-12">
                        <div className="col-md-12">
                            <h2 className="text-center">Register</h2>
                            <div className="card card-container">
                                <Form
                                    onSubmit={this.handleRegister}
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                >
                                    {!this.state.successful && (
                                        <div>
                                            <div className="form-group">
                                                <label htmlFor="employeeNumber">Employee Number</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="employeeNumber"
                                                    value={this.state.employeeNumber}
                                                    onChange={this.onChangeEmployeeNumber}
                                                    validations={[required, vusername]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="fullName">Full Name</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="fullName"
                                                    value={this.state.fullName}
                                                    onChange={this.onChangeFullName}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChangeEmail}
                                                    validations={[required, email]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChangePassword}
                                                    validations={[required, vpassword]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <Input
                                                    type="password"
                                                    className="form-control"
                                                    name="confirmPassword"
                                                    value={this.state.confirmPassword}
                                                    onChange={this.onChangeConfirmPassword}
                                                    validations={[required, vpassword]}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <button className="btn btn-primary btn-block btn-no-margin">Sign Up</button>
                                            </div>
                                        </div>
                                    )}

                                    {message && (
                                        <div className="form-group">
                                            <div className={this.state.successful ? "alert alert-success" : "alert alert-info"} role="alert">
                                                {message}
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.usersReducer;
    const { message } = state.usersReducer;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Register);