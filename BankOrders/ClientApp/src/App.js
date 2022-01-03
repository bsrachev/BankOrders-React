import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import PrivateRoute from './components/common/PrivateRoute';
import { Footer } from './components/shared/Footer';
import Navbar from './components/shared/Navbar';
import Header from './components/home/HomeHeader';
import { HomePage } from './components/HomePage';
import { CurrenciesPage } from './components/CurrenciesPage';
import { OrdersPage } from './components/OrdersPage';
import { OrderDetailsPage } from './components/OrderDetailsPage';
import { OrderCreatePage } from './components/OrderCreatePage';
import { TemplatesPage } from './components/TemplatesPage';
import { TemplateDetailsPage } from './components/TemplateDetailsPage';
import { TemplateCreatePage } from './components/TemplateCreatePage';
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import Register from "./components/users/Register";
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
                    </header>

                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/currencies" component={<CurrenciesPage />} />
                        <Route exact path="/orders" component={OrdersPage} />
                        <PrivateRoute exact path="/orders/create" component={<OrderCreatePage />} />
                        <Route path="/orders/:id" component={OrderDetailsPage} />
                        <Route exact path="/templates" component={TemplatesPage} />
                        <PrivateRoute exact path="/templates/create" component={<TemplateCreatePage />} />
                        <Route path="/templates/:id" component={TemplateDetailsPage} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <PrivateRoute path="/profile" component={<Profile />} />
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
