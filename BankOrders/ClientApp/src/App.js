import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Currencies from './components/Currencies';
import Orders from './components/Orders';
import Templates from './components/Templates';
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import TemplateListing from './components/TemplateListing';
import { ToastProvider } from "react-toast-notifications";

import EventBus from "./common/EventBus";

import { logout } from "./actions/usersAction";

class App extends Component {
    //static displayName = App.name;

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            //showModeratorBoard: false,
            //showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                //showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                //showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        this.props.dispatch(logout());
        this.setState({
            //showModeratorBoard: false,
            //showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <>

                <ToastProvider autoDismiss={true}>
                    <header>
                        <Navbar logOut={this.logOut} />
                        <Header />
                    </header>

                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/currencies" exact component={Currencies} />
                        <Route path="/orders" component={Orders} />
                        <Route path="/templates/:id" component={TemplateListing} />
                        <Route path="/gosho" component={TemplateListing} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile" component={Profile} />
                    </Switch>

                    <footer className="footer-container white-text-container">
                        <Footer />
                    </footer>
                </ToastProvider>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.usersReducer;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
