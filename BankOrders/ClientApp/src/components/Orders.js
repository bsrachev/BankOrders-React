import React, { useState, useEffect, Suspense } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/ordersAction";
import OrdersForm from './OrdersForm';
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

const Orders = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllOrders()
    }, [])

    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Delete the order?'))
            props.deleteOrder(id, () => addToast("Deleted successfully", { appearance: 'error', placement: 'bottom-center' }))
    }

    return (
        <div className="section-container">
            <div className="container text-center">
                <div className="row section-container-spacer">
                    <div className="col-xs-12 col-md-12">
                        <h2 className="text-center">Orders</h2>
                        <div className="row col-md-offset-2">
                            <OrdersForm {...({ currentId, setCurrentId })} />
                        </div>
                        <div className="col-md-5">
                            <table className="table">
                                <thead className="thead-light table-head-standart">
                                    <tr>
                                        <th scope="col" style={{ textAlign: "center" }}>Ref. Number</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Accounting Date</th>
                                        <th scope="col" style={{ textAlign: "center" }}>System</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Created by</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Approved by</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Posting by</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Posting approved<br />by</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Posting number</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Status</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.ordersList.map(order => {
                                            console.log(order)
                                            return (
                                                <tr key={order.id} className="table-row-standart">
                                                    <td>{order.refNumber}</td>
                                                    <td>{order.accountingDate}</td>
                                                    <td>{order.system}</td>
                                                    <td>{order.userCreate}</td>
                                                    <td>{order.userApprove}</td>
                                                    <td>{order.userPosting}</td>
                                                    <td>{order.userApprovePosting}</td>
                                                    <td>{order.postingNumber.toString().replace(0, '-')}</td>
                                                    <td>{order.status}</td>
                                                    <td>
                                                        <Button>
                                                            <EditIcon color="primary" onClick={() => { setCurrentId(order.id) }} />
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
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ordersList: state.ordersReducer.list
    }
}

const mapActionToProps = {
    fetchAllOrders: actions.fetchAll,
    deleteOrder: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Orders));