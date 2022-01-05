import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;

        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <div className="row section-container-spacer justify-content-md-center">
                    <div className="col-xs-8 col-md-8">
                        <section className="custom-box-bg">
                            <div className="custom-box-bg-body">
                                <div className="row">
                                    <img src="assets/images/account.png" className="navbar-logo-img" alt="" />
                                    <div className="pl-5">
                                        <h3 class="text-gray-custom">
                                            {currentUser.isAdmin ? "Admin " : "Employee "} {currentUser.employeeNumber}
                                        </h3>
                                        <p>
                                            <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
                                            {currentUser.token.substr(currentUser.token.length - 20)}
                                        </p>
                                        <p>
                                            <strong>Id:</strong> {currentUser.id}
                                        </p>
                                        <p>
                                            <strong>Email:</strong> {currentUser.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.usersReducer;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);
