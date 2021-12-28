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

const DetailsTable = ({ detailsList, currenciesList, orderOrTemplateRefNum, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    const onDelete = id => {
        if (window.confirm('Delete the detail?')) {
            props.deleteDetail(id);
        }
    }

    console.log(currenciesList)

    return (
        <>
            <DetailsForm
                detailsList={detailsList}
                currenciesList={currenciesList}
                orderOrTemplateRefNum={orderOrTemplateRefNum}
                props={({ currentId, setCurrentId })}
            />

            <section className="custom-box-bg">
                <div className="custom-box-bg-body">
                    <table className="table custom-table custom-table-details">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" className="col-md-1">Branch</th>
                                {
                                    <th scope="col" className="col-md-1">Cost Center</th>
                                }
                                {
                                    1 == 2 &&
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
                                    .filter(x => x.orderOrTemplateRefNum === orderOrTemplateRefNum)
                                    .map(detail => {
                                        return (
                                            <tr key={detail.id} className={detail.id === currentId ? "bg-custom-row-highlight" : ""}>
                                            <td>
                                                <Button><EditIcon onClick={() => { setCurrentId(detail.id) }} /></Button>
                                            </td>
                                            <td>{detail.branch}</td>
                                            {
                                                <td>{detail.costCenter}</td>
                                            }
                                            {
                                                1 == 2 &&
                                                <td>{detail.project}</td>
                                            }
                                            <td>{detail.reason}</td>
                                            <td>{detail.account}</td>
                                            <td>{detail.accountTypeName}</td>
                                            <td>{detail.sum && detail.sum.toFixed(2)}</td>
                                            <td>{detail.currencyName}</td>
                                            <td>{detail.sumBGN && detail.sumBGN.toFixed(2)}</td>
                                            <td>
                                                <Button><DeleteIcon color="secondary" onClick={() => onDelete(detail.id)} /></Button>
                                            </td>

                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

const mapStateToProps = state => {
}

const mapActionToProps = {
    deleteDetail: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(DetailsTable);