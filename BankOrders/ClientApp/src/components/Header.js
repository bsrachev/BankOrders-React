import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions/usersAction";

const Header = ({ ...props }) => {

    useEffect(() => {
        props.getUser()
    }, [])

    console.log(props.currentUser);

    return (
        <div className="hero-full-container background-image-container white-text-container">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <img src="/assets/images/android-chrome-192x192.png" className="img-fluid centerImage" />
                        <h1>Bank Orders</h1>
                        {props.currentUser.isLoggedIn ? (
                            <>
                                <p>Welcome, {props.currentUser.user.isAdmin ? 'Admin' : 'Employee'} {props.currentUser.user.employeeNumber}! Would you like to <Link to="/orders">create an order</Link>?</p>
                            </>
                        ) : (
                            <>
                                <p>Accounting made easy. Start using our application now by <Link to="/login" className="link link-primary">logging in</Link>.</p>
                                <br />
                                <Link to="/register" className="btn btn-default btn-lg">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        currentUser: state.usersReducer
    }
}

const mapActionToProps = {
    getUser: actions.getCurrentUser
}

export default connect(mapStateToProps, mapActionToProps)(Header);


// <p>Welcome, {props.currentUser.user.isAdmin ? 'Admin' : 'Employee'} ¹{props.currentUser.employeeNumber}! Would you like to <Link to="/orders">create an order</Link>?</p>