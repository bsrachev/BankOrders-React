import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

const AdminRoute = ({ component, ...props }) => {
    if (props.currentUser.isLoggedIn) {
        return props.currentUser.user.isAdmin ? component : <Redirect to="/unauthorized" />
    }
    else {
        return <Redirect to="/login" />
    }
};

const mapStateToProps = state => ({
    currentUser: state.usersReducer
})

export default connect(mapStateToProps)(AdminRoute);