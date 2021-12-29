import React from "react";
import { Link } from 'react-router-dom';
import PreviewIcon from "@material-ui/icons/PageviewTwoTone";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import './custom-table-templates.css';

export function TemplatesTable({ templatesList }) {
    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                <table className="table custom-table custom-table-templates">
                    <thead>
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
                            templatesList.map(template => {
                                return (
                                    template &&
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
    );
}