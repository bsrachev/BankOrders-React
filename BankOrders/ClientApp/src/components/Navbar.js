import React, { useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions/usersAction";

//const { user: currentUser } = this.props;

const Navbar = ({ ...props }) => {

    useEffect(() => {
        props.getUser()
    }, [])

    console.log(props)
    console.log('logged in: ' + props.currentUser.isLoggedIn)

    return (
        <nav className="navbar navbar-default active">
            <div className="container container-header">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="./index.html" title="">
                        <img src="assets/images/mashup-icon.svg" className="navbar-logo-img" alt="" />
                        Bank Orders
                    </a>
                </div>

                <div className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="./orders" title="">Orders</a></li>
                        <li><a href="./templates" title="">Templates</a></li>
                        {props.currentUser.isLoggedIn ? (
                            <>
                                {props.currentUser.user.isAdmin &&
                                    <li><a href="./currencies" title="">Currencies</a></li>
                                }
                                <li>
                                    <p>
                                        <a href="/" onClick={props.logOut} className="btn btn-default navbar-btn" title="">Log Out</a>
                                    </p>
                                </li>
                            </>
                        ) : (
                            <li>
                                <p>
                                    <a href="./login" className="btn btn-default navbar-btn" title="">Sign In</a>
                                </p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
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

export default connect(mapStateToProps, mapActionToProps)(Navbar);
