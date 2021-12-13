import React, { Component } from 'react';
import { store } from "./actions/store";
import { Provider } from "react-redux";

import { Route } from 'react-router';
import { Footer } from './components/Footer'; 
import Currencies from './components/Currencies';
import { Container } from "@material-ui/core"; 

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
                    <Currencies />

                    <footer className="footer-container white-text-container">
                        <Footer />
                    </footer>
                </Provider>  
            </>
        );
    }
}
