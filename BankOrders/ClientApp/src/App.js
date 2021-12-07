import React, { Component } from 'react';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Orders } from './components/Orders';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';


/* import './custom.css' */

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
            <Provider store={store}>

            </Provider>

            
                <header>
                    <Navbar />
                </header>

                <div className="hero-full-container background-image-container white-text-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <img src="/assets/images/android-chrome-192x192.png" className="img-fluid centerImage"/>
                                <h1>Bank Orders</h1>
                                <p>Accounting made easy. Start using our application now by <a href="#" className="link link-primary">logging in</a>.</p>
                                <br />
                                <a href="./project.html" className="btn btn-default btn-lg" title="">Register</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-8 col-md-offset-2">
                                <div className="text-center">
                                    <h2>About Us</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus at sem quis varius.
                                        <br />
                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus iaculis magna sagittis elit sagittis, at hendrerit lorem venenatis. Morbi accumsan iaculis blandit. Cras ultrices hendrerit nisl.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">


                                <div id="carousel-example-generic" className="carousel carousel-fade slide" data-ride="carousel">

                                    <div className="carousel-inner" role="listbox">

                                        <div className="item active">
                                            <img className="img-responsive" src="/assets/images/img-06.jpg" alt="First slide" />
                                            <div className="carousel-caption card-shadow reveal">

                                                <h3>Moon</h3>
                                                <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                                <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                                <p>
                                                    Sed id tellus in risus pre
                                                    tium imperdiet eu lobortis dolor. Sed pellentesque, urna ac viverra lacinia, erat mauris venenatis purus, mollis egestas urna purus ac ex.
                                                    Aenean nunc sem, lobortis at elit non, lobortis laoreet nibh. Maecenas at mi ipsum.
                                                </p>

                                                <p>
                                                    Quisque tempor, ligula pharetra luctus elementum, arcu nisl suscipit ante, pharetra commodo dui est et enim. Sed eu vestibulum elit. Donec ut libero non.
                                                </p>
                                                <a href="./project.html" className="btn btn-primary" title="">
                                                    Discover
                                                </a>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <img className="img-responsive" src="/assets/images/img-07.jpg" alt="First slide" />
                                            <div className="carousel-caption card-shadow reveal">

                                                <h3>Lbortis</h3>
                                                <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                                    <span className="sr-only">Previous</span>
                                                </a>
                                                <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                                <p>
                                                    Pre id tellus in risus pre
                                                    tium imperdiet eu lobortis dolor. Sed pellentesque, urna ac viverra lacinia, erat mauris venenatis purus, mollis egestas urna purus ac ex.
                                                    Aenean nunc sem, lobortis at elit non, lobortis laoreet nibh. Maecenas at mi ipsum.
                                                </p>

                                                <p>
                                                    Quisque tempor, ligula pharetra luctus elementum, arcu nisl suscipit ante, pharetra commodo dui est et enim. Sed eu vestibulum elit. Donec ut libero non.
                                                </p>
                                                <a href="./project.html" className="btn btn-primary" title="">
                                                    Discover
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>
                </div>

                <div className="section-container">
                    <div className="container text-center">
                        <div className="row section-container-spacer">
                            <div className="col-xs-12 col-md-12">
                                <h2>Partners</h2>
                                <p>Praesent at feugiat est, at faucibus ipsum. Aenean condimentum mauris vel malesuada pulvinar. <br />Vestibulum sit amet hendrerit leo, quis vehicula mi.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/profil-01.jpg" alt="" className="reveal img-responsive reveal-content image-center" />
                                <h3>John Snow</h3>
                                <h4>UX designer</h4>
                                <p>Sed elementum vehicula nisl, a egestas velit rhoncus nec.Cras vel sapien tincidunt, lacinia risus vel, imperdiet neque.</p>
                                <p>
                                    <a href="https://facebook.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://twitter.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                </p>
                            </div>

                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/profil-02.jpg" alt="" className="reveal img-responsive reveal-content image-center" />
                                <h3>Sansa Stark</h3>
                                <h4>UI designer</h4>
                                <p>Praesent at feugiat est, at faucibus ipsum. Aenean condimentum mauris vel malesuadav pulvinar. Vestibulum sit amet hendrerit leo, quis vehicula mi.</p>
                                <p>
                                    <a href="https://facebook.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://twitter.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                </p>
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/profil-03.jpg" alt="" className="reveal img-responsive reveal-content image-center" />
                                <h3>Gregor Clegane</h3>
                                <h4>Developer</h4>
                                <p>Busce rutrum nisi non dui placerat sodales. Vivamus feugiat rutrum malesuada. Nulla volutpat sapien ac gravida varius</p>
                                <p>
                                    <a href="https://facebook.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-facebook" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://twitter.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="https://www.linkedin.com/" className="social-round-icon fa-icon" title="">
                                        <i className="fa fa-linkedin" aria-hidden="true"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Orders />

                <div className="section-container">
                    <div className="container text-center">
                        <div className="row section-container-spacer">
                            <div className="col-xs-12 col-md-12">
                                <h2 className="text-center">Customers</h2>
                                <p>Praesent at feugiat est, at faucibus ipsum. Aenean condimentum mauris vel malesuada pulvinar. <br />Vestibulum sit amet hendrerit leo, quis vehicula mi.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/logo-01.png" alt="" className="img-responsive reveal-content image-center" />

                            </div>

                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/logo-02.png" alt="" className="img-responsive reveal-content image-center" />
                            </div>
                            <div className="col-xs-12 col-md-4">
                                <img src="/assets/images/logo-03.png" alt="" className="img-responsive reveal-content image-center" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="section-container contact-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-12">
                                <div className="section-container-spacer">
                                    <h2 className="text-center">Get in touch</h2>
                                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                                <div className="card-container">
                                    <div className="card card-shadow col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 reveal">
                                        <form action="" className="reveal-content">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" id="email" placeholder="Email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" id="subject" placeholder="Subject" />
                                                    </div>
                                                    <div className="form-group">
                                                        <textarea className="form-control" rows="3" placeholder="Enter your message"></textarea>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary">Send message</button>
                                                </div>
                                                <div className="col-md-5">
                                                    <ul className="list-unstyled address-container">
                                                        <li>
                                                            <span className="fa-icon">
                                                                <i className="fa fa-phone" aria-hidden="true"></i>
                                                            </span>
                                                            + 33 9 07 45 12 65
                                                        </li>
                                                        <li>
                                                            <span className="fa-icon">
                                                                <i className="fa fa fa-map-o" aria-hidden="true"></i>
                                                            </span>
                                                            42 rue Moulbert 75016 Paris
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-image col-xs-12" style={{ backgroundImage: 'url(/assets/images/img-01.jpg)' }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <footer className="footer-container white-text-container">
                    <Footer />
                </footer>
            </>

        );
    }
}
