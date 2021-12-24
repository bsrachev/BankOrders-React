import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import * as actions from "../../actions/templatesAction";
import TemplatesForm from './TemplatesForm';
import PageHeader from '../shared/PageHeader';
import { withStyles, Button } from "@material-ui/core";
import PreviewIcon from "@material-ui/icons/PageviewTwoTone";
import { useToasts } from "react-toast-notifications";

import './custom-table.css';
import './custom-box-bg.css';

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
        <>
            <div className="hero-full-container background-image-container white-text-container">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <h1>Templates</h1>
                            <Link to="/templates/create" className="btn btn-default btn-lg">Create</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-container">
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
                                    <section className="custom-box-bg">
                                        <div className="custom-box-bg-body">
                                            <table className="table custom-table">
                                                <thead >
                                                    <tr>
                                                        <th scope="col">Reference &#8470;</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Created by</th>
                                                        <th scope="col">System</th>
                                                        <th scope="col">Used</th>
                                                        <th scope="col">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        props.templatesList.map(template => {
                                                            return (
                                                                <tr key={template.id}>
                                                                    <td>&#8470;{template.refNumber}</td>
                                                                    <td>{template.name}</td>
                                                                    <td>{template.userCreate}</td>
                                                                    <td>{template.system}</td>
                                                                    <td>{template.timesUsed} {template.timesUsed == 1 ? "time" : "times"}</td>
                                                                    <td>
                                                                        <Link to={"/templates/" + template.id}><PreviewIcon fontSize="large" /></Link>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        templatesList: state.templatesReducer.list
    }
}

const mapActionToProps = {
    fetchAllTemplates: actions.fetchAll,
    deleteTemplate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(Templates);