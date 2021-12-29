import React, { useEffect } from "react";
import useForm from "../common/useForm";
import { connect } from "react-redux";
import * as detailActions from "../../actions/detailsAction";
import { error } from "jquery";

const initialFieldValues = {
    branch: '',
    costCenter: '',
    project: '',
    reason: '',
    account: '',
    accountTypeName: '',
    sum: '',
    currencyId: '',
    sumBGN: '',
    exchangeRate: '',
    orderOrTemplateRefNum: ''
}

const DetailsForm = ({ detailsList, currenciesList, system, orderOrTemplateRefNum, ...props }) => {
    const validate = (fieldValues = values) => {
        if (errors.formReset == true) {
            setErrors({})
        }
        else {
            let temp = { ...errors }
            if ('branch' in fieldValues) {
                temp.branch = fieldValues.branch ? "" : "Branch is required."
            }
            if ('costCenter' in fieldValues && system == "Internal") {
                temp.costCenter = fieldValues.costCenter ? "" : "Cost Center is required."
            }
            if ('project' in fieldValues && system == "External") {
                temp.project = fieldValues.project ? "" : "Project is required."
            }
            if ('reason' in fieldValues) {
                temp.reason = fieldValues.reason ? "" : "Reason is required."
            }
            if ('account' in fieldValues) {
                temp.account = values.account.length == 12 ? "" : "Account must have 12 characters."
            }
            if ('accountTypeName' in fieldValues) {
                temp.accountTypeName = fieldValues.accountTypeName ? "" : "Account Type is required."
            }
            if ('sum' in fieldValues) {
                temp.sum = fieldValues.sum ? "" : "Sum is required."
            }
            if ('currencyId' in fieldValues) {
                temp.currencyId = fieldValues.currencyId ? "" : "Currency is required."
            }

            setErrors({
                ...temp
            })

            if (fieldValues == values)
                return Object.values(temp).every(x => x == "")
        }
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)


    const handleCurrencyChange = e => {
        let currencyId;
        let sum;
        let exchangeRate;

        if (e.target.name === "sum") {
            currencyId = values.currencyId;
            sum = e.target.value;
            exchangeRate = currencyId ? currenciesList.find(c => c.id == currencyId).exchangeRate : 1
        }
        else {
            currencyId = e.target.value;
            exchangeRate = currencyId ? currenciesList.find(c => c.id == currencyId).exchangeRate : 1
            sum = values.sum
        }

        const fieldValue = {
            "currencyId": currencyId,
            "sum": sum,
            "sumBGN": Number(sum * exchangeRate).toFixed(2),
            "exchangeRate": exchangeRate
        }
        setValues({
            ...values,
            ...fieldValue
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (validate()) {
            const onSuccess = () => {
                resetForm()
            }
            if (props.currentId == 0) {
                setValues({
                    ...values
                })

                let detailData = values;
                detailData.orderOrTemplateRefNum = orderOrTemplateRefNum

                props.createDetail(detailData, onSuccess)
            }
            else {
                props.updateDetail(props.currentId, values, onSuccess)
            }
            resetForm()
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...detailsList.find(x => x.id == props.currentId),
                exchangeRate: currenciesList.find(c => c.id == detailsList.find(x => x.id == props.currentId).currencyId).exchangeRate
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                <form id="search-form" onSubmit={handleSubmit}>
                    <label className="control-label"><strong>{props.currentId != 0 ? "Edit" : "Add"} a detail:</strong></label>
                    {
                        errors &&
                        Object.values(errors).join("").length > 0 &&
                        <div className="alert alert-info" role="alert">
                            <div>Errors:</div>
                            {
                                Object.keys(errors).map(key => {
                                    if (errors[key].length > 0) {
                                        return (
                                            <div key={key}>{errors[key]}</div>
                                        );
                                    }
                                })
                            }
                        </div>
                    }
                    <div className="form-row mr-auto">
                        <div className="form-group col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                id="branch"
                                name="branch"
                                value={values.branch == undefined ? "" : values.branch}
                                onChange={handleInputChange}
                                placeholder="Branch" />
                            <br />
                            {
                                system === "Internal" &&
                                <input
                                    type="number"
                                    className="form-control"
                                    id="costCenter"
                                    name="costCenter"
                                    value={values.costCenter == undefined ? "" : values.costCenter}
                                    onChange={handleInputChange}
                                    placeholder="Cost Center" />
                            }
                            {
                                system === "External" &&
                                <input
                                    type="number"
                                    className="form-control"
                                    id="project"
                                    name="project"
                                    value={values.project == undefined ? "" : values.project}
                                    onChange={handleInputChange}
                                    placeholder="Project" />
                            }
                        </div>
                        <div className="form-group col-md-3">
                            <textarea
                                className="form-control h-100"
                                id="reason"
                                name="reason"
                                value={values.reason == undefined ? "" : values.reason}
                                onChange={handleInputChange}
                                placeholder="Reason" />
                        </div>
                        <div className="form-group col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                id="account"
                                name="account"
                                value={values.account == undefined ? "" : values.account}
                                onChange={handleInputChange}
                                placeholder="Account" />
                            <br />
                            <select
                                className="form-control"
                                id="accountTypeName"
                                name="accountTypeName"
                                value={values.accountTypeName == undefined ? "" : values.accountTypeName}
                                onChange={handleInputChange}>
                                <option value="" defaultChecked disabled>Account Type:</option>
                                <option value="DT">Debit (DT)</option>
                                <option value="KT">Credit (KT)</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                id="sum"
                                name="sum"
                                value={values.sum == undefined ? "" : values.sum}
                                onChange={handleCurrencyChange}
                                placeholder="Sum" />
                            <br />
                            <select
                                className="form-control"
                                id="currencyId"
                                name="currencyId"
                                value={values.currencyId == undefined ? "" : values.currencyId}
                                onChange={handleCurrencyChange}>
                                <option value="" defaultChecked disabled>Currency:</option>
                                {
                                    currenciesList.map(c => {
                                        return (
                                            <option key={c.id} value={c.id}>{c.code}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <input
                                className="form-control"
                                id="exchangeRate"
                                value={values.exchangeRate == undefined ? "" : values.exchangeRate}
                                onChange={handleInputChange}
                                placeholder="Exchange Rate"
                                readOnly />
                            <br />
                            <input
                                className="form-control"
                                id="sumBGN"
                                name="sumBGN"
                                value={values.sumBGN == undefined ? "" : Number(values.sumBGN).toFixed(2)}
                                onChange={handleInputChange}
                                placeholder="Sum in BGN"
                                readOnly />
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


const mapStateToProps = state => ({})

const mapActionToProps = {
    createDetail: detailActions.create,
    updateDetail: detailActions.update
}

export default connect(mapStateToProps, mapActionToProps)(DetailsForm);