import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@material-ui/core";
import useForm from "./useForm";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
            fontSize: "1.5rem"
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
})

const initialFieldValues = {
    code: ''
}

const CurrenciesForm = ({ classes, ...props }) => {

    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFieldValues);

    /* MUI TextField label
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []) */

    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <div asp-validation-summary="ModelOnly" className="text-danger"></div>
                        <div className="form-group">
                            <label>Currency code</label>
                            <input name="code"
                                   className="form-control"
                                   placeholder="Currency Code"
                                   value={values.code}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withStyles(styles)(CurrenciesForm);