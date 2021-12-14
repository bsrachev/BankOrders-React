import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import { Footer } from './components/Footer';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './components/Home';
import Currencies from './components/Currencies';
import Orders from './components/Orders';
import Templates from './components/Templates';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";

/* import './custom.css'
 * import { Home } from './components/Home';
 * import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Orders } from './components/Orders';
import { Navbar } from './components/Navbar'; */

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
                <Provider store={store}>
                    <ToastProvider autoDismiss={true}>
                        <header>
                            <Navbar />
                            <Header />
                        </header>

                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/currencies" exact component={Currencies} />
                            <Route path="/orders" component={Orders} />
                            <Route path="/templates" component={Templates} />
                        </Switch>

                        <footer className="footer-container white-text-container">
                            <Footer />
                        </footer>
                    </ToastProvider>
                </Provider>
            </>
        );
    }
}
