import React from 'react';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component, ...props }) => {
    //const history = useHistory();

    console.log(props.user.isLoggedIn);
    return props.user.isLoggedIn ? component : <Navigate to="/" />;
    //return props.user.isLoggedIn ? component : <div>abc</div>;
};

const mapStateToProps = state => ({
    user: state.usersReducer
})

export default connect(mapStateToProps)(PrivateRoute);