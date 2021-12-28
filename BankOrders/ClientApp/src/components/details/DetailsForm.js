import React, { useEffect } from "react";
import { Grid, withStyles } from "@material-ui/core";
import useForm from "../common/useForm";
import { connect } from "react-redux";
import * as detailActions from "../../actions/detailsAction";
import * as currencyActions from "../../actions/currenciesAction";

const initialFieldValues = {
    branch: '',
    costCenter: '',
    project: '',
    reason: '',
    account: '',
    accountType: '',
    sum: '',
    currencyId: '',
    sumBGN: '',
    orderOrTemplateRefNum: ''
}

const DetailsForm = ({ detailsList, currenciesList, orderOrTemplateRefNum, ...props }) => {
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('reason' in fieldValues)
            temp.reason = fieldValues.reason ? "" : "This field is required."
        if ('account' in fieldValues)
            temp.account = fieldValues.account ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //console.log(props)

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {
            // props.createCurrency(values, () => {window.alert('inserted.')})

            const onSuccess = () => {
                resetForm()
            }
            if (props.currentId == 0) {
                props.createDetail(values, onSuccess)
            }
            else {
                props.updateDetail(props.currentId, values, onSuccess)
            }
        }
    }

    useEffect(() => {
        //props.fetchAllCurrencies()
        if (props.currentId != 0) {
            setValues({
                ...detailsList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                <form id="search-form" onSubmit={handleSubmit}>
                    <label className="control-label"><strong>{props.currentId != 0 ? "Edit" : "Add"} a detail:</strong></label>
                    <div className="form-row mr-auto">
                        <div className="form-group col-md-2">
                            <input
                                className="form-control"
                                id="branch"
                                name="branch"
                                value={values.branch == undefined ? "" : values.branch}
                                onChange={handleInputChange}
                                placeholder="branch" />
                            <br />
                            <input
                                className="form-control"
                                id="costCenter"
                                name="costCenter"
                                value={values.costCenter == undefined ? "" : values.costCenter}
                                onChange={handleInputChange}
                                placeholder="costCenter" />
                        </div>
                        <div className="form-group col-md-3">
                            <textarea
                                className="form-control h-100"
                                id="reason"
                                name="reason"
                                value={values.reason == undefined ? "" : values.reason}
                                onChange={handleInputChange}
                                placeholder="reason" />
                        </div>
                        <div className="form-group col-md-3">
                            <select
                                className="form-control"
                                id="accountType"
                                name="accountType"
                                value={values.accountType == undefined ? "" : values.accountType}
                                onChange={handleInputChange}>
                                <option>Debit (DT)</option>
                                <option>Credit (KT)</option>
                            </select>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                id="account"
                                name="account"
                                value={values.account == undefined ? "" : values.account}
                                onChange={handleInputChange}
                                placeholder="account" />
                        </div>
                        <div className="form-group col-md-2">
                            <select
                                className="form-control"
                                id="currencyId"
                                name="currencyId"
                                value={values.currencyId == undefined ? "" : values.currencyId}
                                onChange={handleInputChange}>
                                {
                                    currenciesList.map(c => {
                                        return (
                                            <option>Debit (DT)</option>
                                        );
                                    })
                                }
                            </select>
                            <br />
                            <input
                                className="form-control"
                                id="sum"
                                name="sum"
                                value={values.sum == undefined ? "0" : values.sum}
                                onChange={handleInputChange}
                                placeholder="sum" />
                        </div>
                        <div className="form-group col-md-2">
                            <input
                                className="form-control"
                                id="exchangeRate"
                                value="1.00000"
                                onChange={handleInputChange}
                                readOnly />
                            <br />
                            <input
                                className="form-control"
                                id="sumBGN"
                                name="sumBGN"
                                value={values.sumBGN == undefined ? "0" : values.sumBGN}
                                onChange={handleInputChange}
                                placeholder="sumBGN" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button onClick={resetForm} className="btn btn-cancel btn-sm">{props.currentId != 0 ? "Cancel" : "Clear"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}


const mapStateToProps = state => ({
    //detailsList: state.detailsReducer.detailsList,
    //currenciesList: state.currenciesReducer.list
})

const mapActionToProps = {
    createDetail: detailActions.create,
    updateDetail: detailActions.update,
    //fetchAllCurrencies: currencyActions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(DetailsForm);