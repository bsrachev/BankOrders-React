import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/currenciesAction";
import CurrenciesForm from './CurrenciesForm';
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteForever";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';

const Currencies = ({ ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllCurrencies()
    }, [])

    const onDelete = id => {
        if (window.confirm('Delete the currency?')) {
            props.deleteCurrency(id);
        }
    }

    return (
        <div className="container text-center">
            <div className="row section-container-spacer justify-content-md-center">
                <div className="col-xs-12 col-md-12">
                    <div className="row">
                        <div className="col-lg-7 ml-auto">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body">
                                    <table className="table custom-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Currency</th>
                                                <th scope="col">Exchange Rate</th>
                                                <th scope="col">Edit</th>
                                                <th scope="col">Remove</th>
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
                                                                {currency.exchangeRate && currency.exchangeRate.toFixed(5)}
                                                            </td>
                                                            <td>
                                                                <Button>
                                                                    <EditIcon onClick={() => { setCurrentId(currency.id) }} />
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <Button>
                                                                    <DeleteIcon color="secondary" onClick={() => onDelete(currency.id)} />
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>

                        <div className="col-lg-3 mr-auto">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body">
                                    <CurrenciesForm {...({ currentId, setCurrentId })} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        currenciesList: state.currenciesReducer.currenciesList
    }
}

const mapActionToProps = {
    fetchAllCurrencies: actions.fetchAll,
    deleteCurrency: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(Currencies);