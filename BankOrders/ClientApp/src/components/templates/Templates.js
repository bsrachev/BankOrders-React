import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/templatesAction";
import TemplatesForm from './TemplatesForm';
import PageHeader from '../shared/PageHeader';
import { withStyles, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        "& .MuiTableCell-root": {
            fontSize: "1.5rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Templates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllTemplates()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Delete the template?'))
            props.deleteTemplate(id, () => addToast("Deleted successfully", { appearance: 'error', placement: 'bottom-center' }))
    }

    return (
        <>
            <PageHeader title="Templates" subtitle="Bank Orders" />

            <div className="section-container">
                <div className="container text-center">
                    <div className="row section-container-spacer">
                        <div className="col-xs-12 col-md-12">
                            <table className="table">
                                <thead className="thead-light table-head-standart">
                                    <tr>
                                        <th scope="col" style={{ textAlign: "center" }}>Ref. Number</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Name</th>
                                        <th scope="col" style={{ textAlign: "center" }}>System</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Created by</th>
                                        <th scope="col" style={{ textAlign: "center" }}>TimesUsed</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.templatesList.map(template => {
                                            console.log(template)
                                            return (
                                                <tr key={template.id} className="table-row-standart">
                                                    <td>{template.refNumber}</td>
                                                    <td>{template.name}</td>
                                                    <td>{template.system}</td>
                                                    <td>{template.userCreate}</td>
                                                    <td>{template.timesUsed}</td>
                                                    <td>
                                                        <Button>
                                                            <EditIcon color="primary" onClick={() => { setCurrentId(template.id) }} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Templates));