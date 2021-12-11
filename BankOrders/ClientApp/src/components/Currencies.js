import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/currenciesAction";
import CurrenciesForm from './CurrenciesForm';
import CurrencyDetails from './CurrencyDetails';
import { Grid, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        "& .MuiTableCell-root": {
            fontSize:"1.5rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Currencies = ({ classes, ...props }) => {

    useEffect(() => {
        props.fetchAllCurrencies()
    }, [])

    return (
        <>
            <Paper className={classes.paper} elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <CurrenciesForm />
                    </Grid>
                    <Grid item xs={6}>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Currency</TableCell>
                                        <TableCell>Exchange Rate</TableCell>
                                        <TableCell>Remove</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.currenciesList.map(currency => {
                                            return (
                                                <TableRow key={currency.id} hover className={classes.root}>
                                                    <TableCell>{currency.code}</TableCell>
                                                    <TableCell>{currency.exchangeRate.toFixed(5)}</TableCell>
                                                    <TableCell><a className="nav-link text-danger">X</a></TableCell>
                                                </TableRow>
                                            );
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>

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
                                                        <tr key={currency.id} hover>
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
        </>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Currencies));