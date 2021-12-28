import React, { useEffect } from "react";
import { Grid, FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import useForm from "../common/useForm";
import * as actions from "../../actions/currenciesAction";

const initialFieldValues = {
    code: '',
    exchangeRate: ''
}

const CurrenciesForm = ({ ...props }) => {
    const validate = (fieldValues = values) => {
        let err = { ...errors }
        if ('code' in fieldValues) {
            err.code = fieldValues.code ? "" : "Code field is required."
        }
        if ('exchangeRate' in fieldValues) {
            err.exchangeRate = fieldValues.exchangeRate ? "" : "Exchange Rate field is required."
        }
        setErrors({
            ...err
        })

        if (fieldValues == values) {
            return Object.values(err).every(x => x == "")
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

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
            }
            if (props.currentId == 0) {
                props.createCurrency(values, onSuccess)
            }
            else {
                props.updateCurrency(props.currentId, values, onSuccess)
            }
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
                        <label className="control-label"><strong>{props.currentId != 0 ? "Edit" : "Add"} a currency:</strong></label>
                        <input name="code"
                            className="form-control"
                            id="code"
                            placeholder="Currency Code"
                            value={values.code}
                            onChange={handleInputChange}
                        />
                        {
                            errors.code && <div className="alert alert-danger" role="alert">{errors.code}</div>
                        }
                    </div>
                    <div className="form-group">
                        <input name="exchangeRate"
                            className="form-control"
                            id="exchangeRate"
                            placeholder="Exchange Rate"
                            value={values.exchangeRate}
                            onChange={handleInputChange}
                        />
                        {
                            errors.exchangeRate && <div className="alert alert-danger" role="alert">{errors.exchangeRate}</div>
                        }
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <a className="btn btn-cancel btn-sm" onClick={resetForm}>Reset</a>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    currenciesList: state.currenciesReducer.currenciesList
})

const mapActionToProps = {
    createCurrency: actions.create,
    updateCurrency: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(CurrenciesForm);