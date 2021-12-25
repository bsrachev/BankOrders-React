import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/usersAction";

//const { user: currentUser } = this.props;

const Navbar = ({ ...props }) => {

    useEffect(() => {
        props.getUser()
    }, [])

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
                    <Link className="navbar-brand" to="/" title="">
                        <img src="assets/images/mashup-icon.svg" className="navbar-logo-img" alt="" />
                        Bank Orders
                    </Link>
                </div>

                <div className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/orders" title="">Orders</Link></li>
                        <li><Link to="/templates" title="">Templates</Link></li>
                        {props.currentUser.isLoggedIn ? (
                            <>
                                {props.currentUser.user.isAdmin &&
                                    <li><Link href="/currencies" to="/currencies">Currencies</Link></li>
                                }
                                <li>
                                    <p>
                                        <Link onClick={props.logOut} to="/logout" className="btn btn-default navbar-btn">Log Out</Link>
                                    </p>
                                </li>
                            </>
                        ) : (
                            <li>
                                <p>
                                    <Link className="btn btn-default navbar-btn" to="/login">Sign In</Link>
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
