import React from "react";

const CurrenciesForm = (props) => {
    return (
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
    );
}

export default CurrenciesForm;