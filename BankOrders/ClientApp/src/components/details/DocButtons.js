import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { error } from "jquery";
import * as orderActions from "../../actions/ordersAction";

const initialFieldValues = {
    id: ''
}

const DocButtons = ({ detailsList, currenciesList, currentDoc, ...props }) => {
    const history = useHistory();

    const handleSendForApproval = e => {
        e.preventDefault();

        let model = {
            userId: props.user.id,
            status: 1
        }

        props.statusChangeOrder(currentDoc.id, model);
        history.push("/orders");
    }

    const handleApprove = e => {
        e.preventDefault();

        let model = {
            userId: props.user.id,
            status: 2
        }

        props.statusChangeOrder(currentDoc.id, model);
        history.push("/orders");
    }

    const handleSendForCorrection = e => {
        e.preventDefault();

        let model = {
            userId: props.user.id,
            status: 5
        }

        props.statusChangeOrder(currentDoc.id, model);
        history.push("/orders");
    }

    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                <div className="form-row mr-auto">
                    {
                        props.user.employeeNumber == currentDoc.userCreate && (currentDoc.status == "Draft" || currentDoc.status == "ForCorrection") &&
                        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSendForApproval}>Send for approval</button>
                    }
                    {
                        props.user.employeeNumber != currentDoc.userCreate && currentDoc.status == "ForApproval" &&
                        <button type="submit" className="btn btn-success btn-lg" onClick={handleApprove}>Approve</button>
                    }
                    {
                        props.user.employeeNumber != currentDoc.userCreate && currentDoc.status == "ForApproval" &&
                        <button type="submit" className="btn btn-warning btn-lg" onClick={handleSendForCorrection}>Send for correction</button>
                    }
                </div>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    user: state.usersReducer.user
})

const mapActionToProps = {
    statusChangeOrder: orderActions.update
}

export default connect(mapStateToProps, mapActionToProps)(DocButtons);