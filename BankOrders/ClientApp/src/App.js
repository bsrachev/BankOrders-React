import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import AdminRoute from './components/common/AdminRoute';
import PrivateRoute from './components/common/PrivateRoute';
import { Footer } from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

import { HomePage } from './pages/HomePage';
import { CurrenciesPage } from './pages/CurrenciesPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { OrderCreatePage } from './pages/OrderCreatePage';
import { TemplatesPage } from './pages/TemplatesPage';
import { TemplateDetailsPage } from './pages/TemplateDetailsPage';
import { TemplateCreatePage } from './pages/TemplateCreatePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

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
        const user = this.props.user;

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
                        <AdminRoute exact path="/templates/create" component={<TemplateCreatePage />} />
                        <Route path="/templates/:id" component={TemplateDetailsPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute exact path="/profile" component={<ProfilePage currentUser={user} />} />
                        <Route path='/unauthorized' component={UnauthorizedPage} />
                        <Route path='/404' component={NotFoundPage} />
                        <Redirect from='*' to='/404' />
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
