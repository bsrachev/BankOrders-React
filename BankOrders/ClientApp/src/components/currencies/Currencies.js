import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/currenciesAction";
import CurrenciesForm from './CurrenciesForm';
import { withStyles, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import PageHeader from '../shared/PageHeader';

const styles = theme => ({
    root: {
        "& .MuiTableCell-root": {
            fontSize: "1.5rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Currencies = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllCurrencies()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Delete the currency?'))
            props.deleteCurrency(id, () => addToast("Deleted successfully", { appearance: 'error', placement: 'bottom-center' }))
    }

    return (
        <>
            <PageHeader title="Currencies" subtitle="Bank Orders" />

            <div className="section-container">
                <div className="container text-center">
                    <div className="row section-container-spacer">
                        <div className="col-xs-12 col-md-12">
                            <h2 className="text-center">Currencies</h2>
                            <div className="row">
                                <div className="row col-md-offset-2">
                                    <CurrenciesForm {...({ currentId, setCurrentId })} />
                                </div>
                                <div className="col-md-5 col-md-offset-2">
                                    <table className="table">
                                        <thead className="thead-light table-head-standart">
                                            <tr>
                                                <th scope="col" style={{ textAlign: "center" }}>Currency</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Exchange Rate</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Edit</th>
                                                <th scope="col" style={{ textAlign: "center" }}>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.currenciesList.map(currency => {
                                                    return (
                                                        <tr key={currency.id} className="table-row-standart">
                                                            <td>
                                                                {currency.code}
                                                            </td>
                                                            <td>
                                                                {currency.exchangeRate}
                                                            </td>
                                                            <td>
                                                                <Button>
                                                                    <EditIcon color="primary" onClick={() => { setCurrentId(currency.id) }} />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        currenciesList: state.currenciesReducer.list
    }
}

const mapActionToProps = {
    fetchAllCurrencies: actions.fetchAll,
    deleteCurrency: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Currencies));