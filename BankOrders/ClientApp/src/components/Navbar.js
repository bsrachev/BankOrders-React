import React, { Component } from 'react';

export class Navbar extends Component {
    static displayName = Navbar.name;

    render() {
        return (
            <nav className="navbar navbar-default active">
                <div className="container">
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
                            <li><a href="./index.html" title="">Home</a></li>
                            <li><a href="./project.html" title="">Project</a></li>
                            <li>
                                <p>
                                    <a href="./components.html" className="btn btn-default navbar-btn" title="">Components</a>
                                </p>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
