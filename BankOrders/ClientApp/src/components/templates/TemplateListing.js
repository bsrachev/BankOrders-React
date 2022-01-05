import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from 'react-router-dom';
import * as templateActions from "../../actions/templatesAction";
import * as detailActions from "../../actions/detailsAction";
import * as currencyActions from "../../actions/currenciesAction";

import DetailsTable from "../details/DetailsTable";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import './custom-table-templates.css';

const initialFieldValues = {
    name: '',
    system: '',
    userCreate: '',
}

const TemplateListing = ({ ...props }) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const params = useParams();
    const { id } = params;
    const history = useHistory();

    const validate = (fieldValues = values) => {
        let err = { ...errors }
        if ('name' in fieldValues) {
            err.name = fieldValues.name ? "" : "Name is required."
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

    const onCreateTemplate = (e) => {
        e.preventDefault();

        validate(values);

        if (validate()) {
            props.createTemplate(values);
            setValues({
                name: initialFieldValues.name,
                userCreate: props.user.employeeNumber,
                system: initialFieldValues.system
            })
            setErrors({
                ...errors,
                success: "Template created successfully."
            })
            //history.push("/templates");
        }
    }

    useEffect(() => {
        if (id === undefined) {
            setValues({
                name: initialFieldValues.name,
                userCreate: props.user.employeeNumber,
                system: initialFieldValues.system
            })
        }
        else {
            props.fetchCurrentTemplate(id);
            props.fetchAllDetails();
            props.fetchAllCurrencies();

            if (props.currentTemplate) {
                setValues({
                    name: props.currentTemplate.name,
                    system: props.currentTemplate.system,
                    userCreate: props.currentTemplate.userCreate
                });
            }
        }
        setErrors({});
    }, [props.currentTemplate.id])

    //console.log(id)

    return (
        <>
            <div className="container text-center">
                <div className="row section-container-spacer justify-content-md-center">
                    <div className="col-xs-12 col-md-12">
                        <div className="col-lg-12">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body text-center">
                                    {
                                        errors.success && <div className="alert alert-success" role="alert">{errors.success} <a href="/templates">Back to Templates.</a></div>
                                    }
                                    <form autoComplete="off" noValidate onSubmit={onCreateTemplate}>
                                        <div className="form-row mr-auto">
                                            <div className={"form-group col-md-6"}>
                                                <label className="control-label">Name:</label>
                                                <input
                                                    type="text"
                                                    className="form-control text-center"
                                                    readOnly={id ? true : false}
                                                    id="name"
                                                    name="name"
                                                    value={values.name === undefined ? "" : values.name}
                                                    onChange={handleInputChange}
                                                />
                                                {
                                                    errors.name && <div className="alert alert-info" role="alert">{errors.name}</div>
                                                }
                                            </div>
                                            <div className={"form-group col-md-3"}>
                                                <label className="control-label">Created by:</label>
                                                <input
                                                    className="form-control text-center"
                                                    readOnly
                                                    id="userCreate"
                                                    value={values.userCreate === undefined ? "" : values.userCreate}
                                                />
                                            </div>
                                            <div className={"form-group col-md-3"}>
                                                <label className="control-label">System:</label>
                                                <select
                                                    className="form-control text-center"
                                                    disabled={id ? true : false}
                                                    id="system"
                                                    name="system"
                                                    value={values.system === undefined ? "" : values.system}
                                                    onChange={handleInputChange}>
                                                    <option value="" disabled defaultChecked>Choose a system:</option>
                                                    <option>Internal</option>
                                                    <option>External</option>
                                                </select>
                                                {
                                                    errors.system && <div className="alert alert-info" role="alert">{errors.system}</div>
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
                        {
                            id &&
                            <>
                                <div className="text-center">
                                    <h2>Details</h2>

                                </div>
                                <div className="col-lg-12">
                                    <DetailsTable
                                        detailsList={
                                            props.detailsList
                                        }
                                        currenciesList={
                                            props.currenciesList
                                        }
                                        currentDoc={
                                            props.currentTemplate
                                        }
                                        currentUser={
                                            props.user
                                        }
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div >
        </>
    );
}

const mapStateToProps = state => ({
    user: state.usersReducer.user,
    currentTemplate: state.templatesReducer.singleTemplate,
    detailsList: state.detailsReducer.detailsList,
    currenciesList: state.currenciesReducer.currenciesList
})

const mapActionToProps = {
    fetchAllTemplates: templateActions.fetchAll,
    fetchCurrentTemplate: templateActions.fetchById,
    createTemplate: templateActions.create,
    fetchAllDetails: detailActions.fetchAll,
    fetchAllCurrencies: currencyActions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(TemplateListing);