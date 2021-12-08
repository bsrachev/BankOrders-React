import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/currenciesAction";
import CurrenciesForm from './CurrenciesForm';
import CurrencyDetails from './CurrencyDetails';

const Currencies = (props) => {
    useEffect(() => {
        props.fetchAllCurrencies()
    }, [])

    return (
        <div className="section-container">
            <div className="container text-center">
                <div className="row section-container-spacer">
                    <div className="col-xs-12 col-md-12">
                        <h2 className="text-center">Currencies</h2>
                        <div className="row">
                            <div className="col-md-8">
                                <CurrenciesForm />
                            </div>
                            <div className="col-md-4">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Currency</th>
                                            <th>Exchange Rate</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.currenciesList.map(currency => {
                                                return (
                                                    <tr key={currency.id}>
                                                        <td>
                                                            {currency.code}
                                                        </td>
                                                        <td>
                                                            {currency.exchangeRate}
                                                        </td>
                                                        <td>
                                                            <a className="nav-link text-danger">X</a>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currenciesList: state.currenciesReducer.list
    }
}

const mapActionToProps = {
    fetchAllCurrencies: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Currencies);