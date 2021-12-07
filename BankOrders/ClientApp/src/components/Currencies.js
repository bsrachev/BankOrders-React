import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/currenciesAction";

const Currencies = (props) => {
    useEffect(() => {
        props.fetchAllCurrencies()
    }, [])

    return (<div>form Currencies</div>);
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