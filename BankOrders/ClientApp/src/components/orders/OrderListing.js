import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from 'react-router-dom';
import * as orderActions from "../../actions/ordersAction";
import * as detailActions from "../../actions/detailsAction";
import * as currencyActions from "../../actions/currenciesAction";

import DetailsTable from "../details/DetailsTable";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import './custom-table-orders.css';

const initialFieldValues = {
    accountingDate: '',
    system: '',
    userCreate: '',
}

const OrderListing = ({ ...props }) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const params = useParams();
    const { id } = params;
    const history = useHistory();

    const validate = (fieldValues = values) => {
        let err = { ...errors }
        if ('accountingDate' in fieldValues) {
            err.accountingDate = fieldValues.accountingDate ? "" : "Accounting Date is required."
        }
        if ('system' in fieldValues) {
            err.system = fieldValues.system ? "" : "System is required."
        }
        setErrors({
            ...err
        })

        if (fieldValues == values) {
            return Object.values(err).every(x => x == "")
        }
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const onCreateOrder = (e) => {
        e.preventDefault();

        validate(values);

        if (validate()) {
            props.createOrder(values);
            setValues({
                accountingDate: initialFieldValues.accountingDate,
                userCreate: props.user.employeeNumber,
                system: initialFieldValues.system
            })
            setErrors({
                ...errors,
                success: "Order created successfully."
            })
            //history.push("/orders");
        }
    }

    useEffect(() => {
        if (id === undefined) {
            setValues({
                accountingDate: initialFieldValues.accountingDate,
                userCreate: props.user.employeeNumber,
                system: initialFieldValues.system
            })
        }
        else {
            props.fetchCurrentOrder(id);
            props.fetchAllDetails();
            props.fetchAllCurrencies();

            if (props.currentOrder) {
                setValues({
                    accountingDate: props.currentOrder.accountingDate,
                    system: props.currentOrder.system,
                    userCreate: props.currentOrder.userCreate
                });
            }
        }
        setErrors({});
    }, [props.currentOrder.id])

    //console.log(props.currentOrder)

    return (
        <>
            <div className="container text-center">
                <div className="row section-container-spacer justify-content-md-center">
                    <div className="col-xs-12 col-md-12">
                        <div className="col-lg-12">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body text-center">
                                    {
                                        errors.success && <div className="alert alert-success" role="alert">{errors.success} <a href="/orders">Back to Orders.</a></div>
                                    }
                                    <form autoComplete="off" noValidate onSubmit={onCreateOrder}>
                                        <div className="form-row mr-auto">
                                            <div className={id ? "form-group col-md-3" : "form-group col-md-4"}>
                                                <label className="control-label">Accounting Date:</label>
                                                <input
                                                    type={id ? "text" : "date"}
                                                    className="form-control text-center"
                                                    readOnly={id ? true : false}
                                                    id="accountingDate"
                                                    name="accountingDate"
                                                    value={id ? new Date(values.accountingDate).toLocaleDateString() : values.accountingDate}
                                                    onChange={handleInputChange}
                                                />
                                                {
                                                    errors.accountingDate && <div className="alert alert-info" role="alert">{errors.accountingDate}</div>
                                                }
                                            </div>
                                            <div className={id ? "form-group col-md-3" : "form-group col-md-4"}>
                                                <label className="control-label">Created by:</label>
                                                <input
                                                    className="form-control text-center"
                                                    readOnly
                                                    id="userCreate"
                                                    value={values.userCreate === undefined ? "" : values.userCreate}
                                                />
                                            </div>
                                            <div className={id ? "form-group col-md-3" : "form-group col-md-4"}>
                                                <label className="control-label">System:</label>
                                                <select
                                                    className="form-control text-center"
                                                    disabled={id ? true : false}
                                                    id="system"
                                                    name="system"
                                                    value={values.system}
                                                    onChange={handleInputChange}>
                                                    <option value="" disabled defaultChecked>Choose a system:</option>
                                                    <option>Internal</option>
                                                    <option>External</option>
                                                </select>
                                                {
                                                    errors.system && <div className="alert alert-info" role="alert">{errors.system}</div>
                                                }
                                            </div>
                                            {
                                                id &&
                                                props.currentOrder &&
                                                <div className="form-group col-md-3">
                                                    <label className="control-label">Status:</label>
                                                    <input
                                                        className="form-control text-center"
                                                        readOnly
                                                        id="status"
                                                        value={props.currentOrder.status === undefined ? "" : props.currentOrder.status}
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            {
                                                !id &&
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-lg">Continue</button>
                                                </div>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        {
                            id &&
                            <>
                                <div className="text-center">
                                    <h2>Details</h2>

                                </div>
                                <div className="col-lg-12">
                                    <DetailsTable
                                        detailsList={
                                            props.detailsList
                                        }
                                        currenciesList={
                                            props.currenciesList
                                        }
                                        currentDoc={
                                            props.currentOrder
                                        }
                                        currentUser={
                                            props.user
                                        }
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div >
        </>
    );
}

const mapStateToProps = state => ({
    user: state.usersReducer.user,
    currentOrder: state.ordersReducer.singleOrder,
    detailsList: state.detailsReducer.detailsList,
    currenciesList: state.currenciesReducer.currenciesList
})

const mapActionToProps = {
    fetchCurrentOrder: orderActions.fetchById,
    createOrder: orderActions.create,
    fetchAllDetails: detailActions.fetchAll,
    fetchAllCurrencies: currencyActions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(OrderListing);