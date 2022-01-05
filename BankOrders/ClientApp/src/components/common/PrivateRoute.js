import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, ...props }) => {
    return props.currentUser.isLoggedIn ? component : <Redirect to="/login" />;
};

const mapStateToProps = state => ({
    currentUser: state.usersReducer
})

export default connect(mapStateToProps)(PrivateRoute);