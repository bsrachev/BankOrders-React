import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TemplatesTable } from "./TemplatesTable";
import * as actions from "../../actions/templatesAction";

import '../shared/custom-box-bg.css';

const initialFieldValues = {
    name: '',
    refNumber: '',
    createdBy: '',
    system: ''
}

const Templates = ({ ...props }) => {
    const [values, setValues] = useState(initialFieldValues)

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        });
    }

    const searchTemplates = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        setValues({
            name: formData.get('name'),
            refNumber: formData.get('refNumber'),
            createdBy: formData.get('createdBy'),
            system: formData.get('system')
        });

        props.fetchAllTemplates(values)
    }

    useEffect(() => {
        props.fetchAllTemplates(values)
    }, [])

    return (
        <div className="container text-center">
            <div className="row section-container-spacer">
                <div className="col-xs-12 col-md-12">
                    <div className="row">
                        <div className="col-lg-3">
                            <section className="custom-box-bg">
                                <div className="custom-box-bg-body">
                                    <form id="search-form" onSubmit={searchTemplates}>
                                        <label className="control-label"><strong>Search:</strong></label>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="refNumber"
                                                name="refNumber"
                                                value={values.refNumber}
                                                onChange={handleInputChange}
                                                placeholder="Reference &#8470;" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                value={values.name}
                                                onChange={handleInputChange}
                                                placeholder="Name" />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="createdBy"
                                                name="createdBy"
                                                value={values.createdBy}
                                                onChange={handleInputChange}
                                                placeholder="Created by" />
                                        </div>
                                        <div className="form-group">
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
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">Search</button>
                                            <button onClick={resetForm} className="btn btn-cancel btn-sm">Clear</button>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-9">
                            <TemplatesTable templatesList={props.templatesList} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        templatesList: state.templatesReducer.templatesList
    }
}

const mapActionToProps = {
    fetchAllTemplates: actions.fetchAll,
    deleteTemplate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(Templates);