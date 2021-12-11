import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import useForm from "./useForm";

const initialCodeValue = {
    code: ''
}

const CurrenciesForm = (props) => {
    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialCodeValue);

    return (
        <>
            <form autoComplete="off" noValidate>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            code="code"
                            variant="outlined"
                            label="Currency Code"
                            value={values.code}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </form>

            <div className="row">
                <div className="col-md-4">
                    <form method="post">
                        <div asp-validation-summary="ModelOnly" className="text-danger"></div>
                        <div className="form-group">
                            <label asp-for="Code" className="control-label"></label>
                            <input asp-for="Code" className="form-control" />
                            <span asp-validation-for="Code" className="text-danger"></span>
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

export default CurrenciesForm;