import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ ...props }) => {

    console.log('tst')
    console.log(props)
    console.log('tst')

    return (
        <div className="hero-full-container background-image-container white-text-container">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <img src="/assets/images/android-chrome-192x192.png" className="img-fluid centerImage" />
                        <h1>Bank Orders</h1>
                        {props.currentUser === undefined ? (
                            <>
                                <p>Accounting made easy. Start using our application now by <Link to="/login" className="link link-primary">logging in</Link>.</p>
                                <br />
                                <Link to="/register" className="btn btn-default btn-lg">Register</Link>
                            </>
                        ) : (
                            <>
                                <div>Logged in</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

// <p>Welcome, {props.currentUser.user.isAdmin ? 'Admin' : 'Employee'} ¹{props.currentUser.employeeNumber}! Would you like to <Link to="/orders">create an order</Link>?</p>