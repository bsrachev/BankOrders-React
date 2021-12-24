﻿import React, { useEffect } from "react";
import { Grid, withStyles } from "@material-ui/core";
import useForm from "../common/useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/ordersAction";

const initialFieldValues = {
    code: '',
    exchangeRate: ''
}

const TemplatesForm = ({ ...props }) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        if ('exchangeRate' in fieldValues)
            temp.exchangeRate = fieldValues.exchangeRate ? "" : "This field is required."
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

    const handleSubmit = e => {
        e.preventDefault()
        console.log(values)
        if (validate()) {
            // props.createCurrency(values, () => {window.alert('inserted.')})

            const onSuccess = () => {
                resetForm()
            }
            if (props.currentId == 0)
                props.createCurrency(values, onSuccess)
            else
                props.updateCurrency(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.currenciesList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <div className="form-group">
                        <label htmlFor="currencyCode">Currency Code</label>
                        <input name="code"
                            className="form-control"
                            id="currencyCode"
                            placeholder="XXX"
                            value={values.code}
                            onChange={handleInputChange}
                            {...(errors.fullName && { error: true, helperText: errors.fullName })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="currencyRate">Currency Rate</label>
                        <input name="exchangeRate"
                            className="form-control"
                            id="currencyRate"
                            placeholder="1.00000"
                            value={values.exchangeRate}
                            onChange={handleInputChange}
                            {...(errors.fullName && { error: true, helperText: errors.fullName })}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button className="btn btn-info" onClick={resetForm}>Reset</button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    currenciesList: state.currenciesReducer.list
})

const mapActionToProps = {
    createCurrency: actions.create,
    updateCurrency: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(TemplatesForm);