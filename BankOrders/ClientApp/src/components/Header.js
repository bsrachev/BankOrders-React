import React from 'react';

const Home = () => {
    return (
        <div className="hero-full-container background-image-container white-text-container">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <img src="/assets/images/android-chrome-192x192.png" className="img-fluid centerImage" />
                        <h1>Bank Orders</h1>
                        <p>Accounting made easy. Start using our application now by <a href="#" className="link link-primary">logging in</a>.</p>
                        <br />
                        <a href="./project.html" className="btn btn-default btn-lg" title="">Register</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;