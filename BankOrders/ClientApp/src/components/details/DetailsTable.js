import React, { useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/detailsAction";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/DeleteForeverTwoTone";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import '../shared/bg-custom-row-highlight.css';
import './custom-table-details.css';
import DetailsForm from "./DetailsForm";
import CopyDetails from "./CopyDetails";
import DocButtons from "./DocButtons";

const DetailsTable = ({ detailsList, currenciesList, currentDoc, currentUser, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    const onDelete = id => {
        if (window.confirm('Delete the detail?')) {
            props.deleteDetail(id);
        }

        return (
            <div className="alert alert-warning" role="alert">Detail deleted</div>
        );
    }

    return (
        <>
            {
                (currentDoc.status == "Draft" || currentDoc.status == "For correction") &&
                currentDoc.userCreate == currentUser.employeeNumber &&
                <CopyDetails
                    detailsList={detailsList}
                    currenciesList={currenciesList}
                    currentDoc={currentDoc}
                    {...({ currentId, setCurrentId })}
                />
            }

            {
                (currentDoc.status == "Draft" || currentDoc.status == "For correction" || currentDoc.refNumber > 90000000) &&
                currentDoc.userCreate == currentUser.employeeNumber &&
                <DetailsForm
                    detailsList={detailsList}
                    currenciesList={currenciesList}
                    system={currentDoc.system}
                    orderOrTemplateRefNum={currentDoc.refNumber}
                    {...({ currentId, setCurrentId })}
                />
            }

            <section className="custom-box-bg">
                <div className="custom-box-bg-body">
                    {
                        detailsList.find(x => x.orderOrTemplateRefNum === currentDoc.refNumber)
                            ?
                            (
                                <table className="table custom-table custom-table-details">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col" className="col-md-1">Branch</th>
                                            {
                                                currentDoc.system === "Internal" &&
                                                <th scope="col" className="col-md-1">Cost Center</th>
                                            }
                                            {
                                                currentDoc.system === "External" &&
                                                <th scope="col" className="col-md-1">Project</th>
                                            }
                                            <th scope="col" className="col-md-2">Reason</th>
                                            <th scope="col" className="col-md-2">Account</th>
                                            <th scope="col" className="col-md-1">Account Type</th>
                                            <th scope="col" className="col-md-1">Sum</th>
                                            <th scope="col" className="col-md-1">Currency</th>
                                            <th scope="col" className="col-md-1">Sum in BGN</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            detailsList
                                                .filter(x => x.orderOrTemplateRefNum === currentDoc.refNumber)
                                                .map(detail => {
                                                    return (
                                                        <tr key={detail.id} className={detail.id === currentId ? "bg-custom-row-highlight" : ""}>
                                                            <td>
                                                                <Button><EditIcon onClick={() => { setCurrentId(detail.id) }} /></Button>
                                                            </td>
                                                            <td>{detail.branch}</td>
                                                            {
                                                                currentDoc.system === "Internal" &&
                                                                <td>{detail.costCenter}</td>
                                                            }
                                                            {
                                                                currentDoc.system === "External" &&
                                                                <td>{detail.project}</td>
                                                            }
                                                            <td>{detail.reason}</td>
                                                            <td>{detail.account}</td>
                                                            <td>{detail.accountTypeName}</td>
                                                            <td>{detail.sum && Number(detail.sum).toFixed(2)}</td>
                                                            <td>{detail.currencyName}</td>
                                                            <td>{detail.sumBGN && Number(detail.sumBGN).toFixed(2)}</td>
                                                            <td>
                                                                <Button><DeleteIcon color="secondary" onClick={() => onDelete(detail.id)} /></Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <div>There are no details. Use the form to add the first one.</div>
                            )
                    }
                </div>
            </section>

            {
                (currentDoc.status == "Draft" || currentDoc.status == "For correction") &&
                currentDoc.userCreate == currentUser.employeeNumber &&
                <>
                    <div className="text-center">
                        <h2>Actions</h2>
                    </div>
                    <DocButtons
                        detailsList={detailsList}
                        currenciesList={currenciesList}
                        currentDoc={currentDoc}
                        {...({ currentId, setCurrentId })}
                    />
                </>
            }
        </>
    );
}

const mapStateToProps = state => ({})

const mapActionToProps = {
    deleteDetail: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(DetailsTable);