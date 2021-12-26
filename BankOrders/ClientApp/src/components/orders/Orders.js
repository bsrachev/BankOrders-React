import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { OrdersTable } from "./OrdersTable";
import * as actions from "../../actions/ordersAction";

import '../shared/custom-box-bg.css';

const initialFieldValues = {
    refNumber: '',
    accountingDateFrom: '',
    accountingDateTo: '',
    system: '',
    userCreate: '',
    userApprove: '',
    userPosting: '',
    userApprovePosting: '',
    postingNumber: '',
    status: '',
}

const Orders = ({ ...props }) => {
    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
    }

    const onFocusDateField = e => {
        e.currentTarget.type = "date";
    }

    const onBlurDateField = (e, placeholder) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = placeholder;
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        });
    }

    const searchOrders = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        setValues({
            refNumber: formData.get('refNumber'),
            accountingDateFrom: formData.get('accountingDateFrom'),
            accountingDateTo: formData.get('accountingDateTo'),
            system: formData.get('system'),
            userCreate: formData.get('userCreate'),
            userApprove: formData.get('userApprove'),
            userPosting: formData.get('userPosting'),
            userApprovePosting: formData.get('userApprovePosting'),
            postingNumber: formData.get('postingNumber'),
            status: formData.get('status')
        });

        props.fetchAllOrders(values)
    }

    useEffect(() => {
        props.fetchAllOrders(values)
    }, [])

    console.log(props.ordersList)

    return (
        <div className="container text-center">
            <div className="row section-container-spacer">
                <div className="col-xs-12 col-md-12">
                    <div className="col-lg-12">
                        <section className="custom-box-bg">
                            <div className="custom-box-bg-body">
                                <form id="search-form" onSubmit={searchOrders}>
                                    <label className="control-label"><strong>Search:</strong></label>
                                    <div className="form-row mr-auto">
                                        <div className="form-group col-md-2">
                                            <input
                                                className="form-control"
                                                id="refNumber"
                                                name="refNumber"
                                                value={values.refNumber}
                                                onChange={handleInputChange}
                                                placeholder="Reference &#8470;" />
                                            <br />
                                            <select
                                                className="form-control"
                                                id="status"
                                                name="status"
                                                value={values.status}
                                                onChange={handleInputChange}>
                                                <option value="">All Statuses</option>
                                                <option>Draft</option>
                                                <option>For approval</option>
                                                <option>For correction</option>
                                                <option>For posting</option>
                                                <option>For posting approval</option>
                                                <option>For posting correction</option>
                                                <option>Finished</option>
                                                <option>Canceled</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="accountingDateFrom"
                                                name="accountingDateFrom"
                                                value={values.accountingDateFrom}
                                                onChange={handleInputChange}
                                                onFocus={onFocusDateField}
                                                onBlur={(e) => { onBlurDateField(e, "Accounting Date From") }}
                                                placeholder="Accounting Date From" />
                                            <br />
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="accountingDateTo"
                                                name="accountingDateTo"
                                                value={values.accountingDateTo}
                                                onChange={handleInputChange}
                                                onFocus={onFocusDateField}
                                                onBlur={(e) => { onBlurDateField(e, "Accounting Date To") }}
                                                placeholder="Accounting Date To" />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input
                                                className="form-control"
                                                id="userCreate"
                                                name="userCreate"
                                                value={values.userCreate}
                                                onChange={handleInputChange}
                                                placeholder="Created by" />
                                            <br />
                                            <input
                                                className="form-control"
                                                id="userApprove"
                                                name="userApprove"
                                                value={values.userApprove}
                                                onChange={handleInputChange}
                                                placeholder="Approved By" />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <input
                                                className="form-control"
                                                id="userPosting"
                                                name="userPosting"
                                                value={values.userPosting}
                                                onChange={handleInputChange}
                                                placeholder="Posting by" />
                                            <br />
                                            <input
                                                className="form-control"
                                                id="userApprovePosting"
                                                name="userApprovePosting"
                                                value={values.userApprovePosting}
                                                onChange={handleInputChange}
                                                placeholder="Posting Approved By" />
                                        </div>
                                        <div className="form-group col-md-2">
                                            <select
                                                className="form-control"
                                                id="system"
                                                name="system"
                                                value={values.system}
                                                onChange={handleInputChange}>
                                                <option value="">All Systems</option>
                                                <option>Internal</option>
                                                <option>External</option>
                                            </select>
                                            <br />
                                            <input
                                                className="form-control"
                                                id="postingNumber"
                                                name="postingNumber"
                                                value={values.postingNumber}
                                                onChange={handleInputChange}
                                                placeholder="Posting Number" />
                                        </div>
                                        <div className="form-group col-md-1">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary">Search</button>
                                                <button onClick={resetForm} className="btn btn-cancel btn-sm">Clear</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div className="col-lg-12">
                        <OrdersTable ordersList={props.ordersList} />
                    </div>
                </div>
            </div>
        </div >
    );
}

const mapStateToProps = state => {
    return {
        ordersList: state.ordersReducer.list
    }
}

const mapActionToProps = {
    fetchAllOrders: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(Orders);