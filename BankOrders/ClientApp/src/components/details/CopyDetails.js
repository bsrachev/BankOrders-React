import React, { useEffect } from "react";
import useForm from "../common/useForm";
import { connect } from "react-redux";
import { error } from "jquery";
import * as detailActions from "../../actions/detailsAction";
import * as templateActions from "../../actions/templatesAction";

const initialFieldValues = {
    id: ''
}

const CopyDetails = ({ detailsList, currenciesList, currentDoc, ...props }) => {
    const validate = (fieldValues = values) => {
        if (errors.formReset == true) {
            setErrors({})
        }
        else {
            let temp = { ...errors }
            /*if ('id' in fieldValues) {
                temp.branch = fieldValues.branch ? "" : "This field is required."
            }*/

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

    const handleSubmit = e => {
        e.preventDefault();

        props.copyDetailsToOrder(currentDoc.id, values);

        resetForm();

        setErrors({
            success: "Details copied successfully."
        })
    }

    useEffect(() => {
        let criteria = {
            name: '',
            refNumber: '',
            createdBy: '',
            system: currentDoc.system
        }

        props.fetchAllTemplates(criteria)
    }, [currentDoc.system])

    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                {
                    errors.success && <div className="alert alert-success" role="alert">{errors.success} <a href="/templates">Back to Templates.</a></div>
                }
                <form id="copy-details-form" onSubmit={handleSubmit}>
                    <label className="control-label"><strong>Copy details from template:</strong></label>
                    <div className="form-row mr-auto">
                        <div className="form-group col-md-10">
                            <select
                                className="form-control"
                                id="id"
                                name="id"
                                value={values.id == undefined ? "" : values.id}
                                onChange={handleInputChange}>
                                <option value="" defaultChecked disabled>Template:</option>
                                {
                                    props.templatesList.map(t => {
                                        return (
                                            <option key={t.id} value={t.id}>{t.name}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <button type="submit" className="btn btn-primary mt-0">Copy Details</button>
                        </div>
                    </div>
                    <div className="form-group">
                    </div>
                </form>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    templatesList: state.templatesReducer.templatesList
})

const mapActionToProps = {
    createDetail: detailActions.create,
    updateDetail: detailActions.update,
    fetchAllTemplates: templateActions.fetchAll,
    copyDetailsToOrder: templateActions.update
}

export default connect(mapStateToProps, mapActionToProps)(CopyDetails);