import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from 'react-router-dom';
import * as orderActions from "../../actions/ordersAction";
import * as detailActions from "../../actions/detailsAction";
import useForm from "../common/useForm";
import PageHeader from '../shared/PageHeader';
import { withStyles, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteForeverTwoTone";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import '../details/custom-table-details.css';
import './custom-table-orders.css';

const initialFieldValues = {
    accountingDate: '',
    system: '',
    userCreate: '',
}

const OrdersDetails = ({ ...props }) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const params = useParams();
    const { id } = params;

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

    return (
        <>
            <div className="container text-center">
                <div className="row section-container-spacer">
                    <div className="col-xs-12 col-md-12">
                        <div className="col-lg-12">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body text-center">
                                    <form autoComplete="off" noValidate onSubmit={onCreateOrder}>
                                        <div className="form-row mr-auto">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Accounting Date:</label>
                                                <input
                                                    type={id ? "text" : "date"}
                                                    className="form-control"
                                                    readOnly={id ? true : false}
                                                    id="accountingDate"
                                                    name="accountingDate"
                                                    value={id ? new Date(values.accountingDate).toLocaleDateString() : values.accountingDate}
                                                    onChange={handleInputChange}
                                                />
                                                {
                                                    errors.accountingDate && <div className="alert alert-danger" role="alert">{errors.accountingDate}</div>
                                                }
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="control-label">Created by:</label>
                                                <input
                                                    className="form-control"
                                                    readOnly
                                                    id="userCreate"
                                                    name="userCreate"
                                                    value={values.userCreate}
                                                />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="control-label">System:</label>
                                                <select
                                                    className="form-control"
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
                                                    errors.system && <div className="alert alert-danger" role="alert">{errors.system}</div>
                                                }
                                            </div>
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
                        <div className="text-center">
                            <h2>Details</h2>

                        </div>
                        <div className="col-lg-12">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body">
                                    <table className="table custom-table custom-table-details">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col" className="col-md-1">Branch</th>
                                                {
                                                    <th scope="col" className="col-md-1">Cost Center</th>
                                                }
                                                {
                                                    1 == 2 &&
                                                    <th scope="col" className="col-md-1">Project</th>
                                                }
                                                <th scope="col" className="col-md-2">Reason</th>
                                                <th scope="col" className="col-md-2">Account</th>
                                                <th scope="col" className="col-md-1">Account Type</th>
                                                <th scope="col" className="col-md-1">Sum</th>
                                                <th scope="col" className="col-md-1">Currency</th>
                                                <th scope="col" className="col-md-1">Sum in BGN</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.detailsList &&
                                                props.currentOrder &&
                                                props.detailsList
                                                    .filter(x => x.orderOrTemplateRefNum === props.currentOrder.refNumber)
                                                    .map(detail => {
                                                    return (
                                                        <tr key={detail.id}>
                                                            <td>
                                                                <a><EditIcon fontSize="large" /></a>
                                                            </td>
                                                            <td>{detail.branch}</td>
                                                            {
                                                                <td>{detail.costCenter}</td>
                                                            }
                                                            {
                                                                1 == 2 &&
                                                                <td>{detail.project}</td>
                                                            }
                                                            <td>{detail.reason}</td>
                                                            <td>{detail.account}</td>
                                                            <td>{detail.accountType}</td>
                                                            <td>{detail.sum && detail.sum.toFixed(2)}</td>
                                                            <td>{detail.currencyId}</td>
                                                            <td>{detail.sumBGN && detail.sumBGN.toFixed(2)}</td>
                                                            <td>
                                                                <a><DeleteIcon color="secondary" fontSize="large" /></a>
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
                    </div>
                </div>
            </div >
        </>
    );
}

const mapStateToProps = state => {
    return {
        user: state.usersReducer.user,
        currentOrder: state.ordersReducer.singleRecord,
        detailsList: state.detailsReducer.list
    }
}

const mapActionToProps = {
    fetchCurrentOrder: orderActions.fetchById,
    createOrder: orderActions.create,
    fetchAllDetails: detailActions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(OrdersDetails);