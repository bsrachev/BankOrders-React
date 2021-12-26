import React from "react";
import { Link } from 'react-router-dom';
import PreviewIcon from "@material-ui/icons/PageviewTwoTone";

import '../shared/custom-box-bg.css';
import '../shared/custom-table.css';
import './custom-table-orders.css';

export function OrdersTable({ ordersList }) {
    return (
        <section className="custom-box-bg">
            <div className="custom-box-bg-body">
                <table className="table custom-table custom-table-orders">
                    <thead>
                        <tr>
                            <th scope="col">Reference &#8470;</th>
                            <th scope="col">Accounting Date</th>
                            <th scope="col">System</th>
                            <th scope="col">Created<br />by</th>
                            <th scope="col">Approved<br />by</th>
                            <th scope="col">Posting<br />by</th>
                            <th scope="col" className="px-0">Posting approved by</th>
                            <th scope="col">Posting number</th>
                            <th scope="col">Status</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ordersList.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td>&#8470;{order.refNumber}</td>
                                        <td>{new Date(order.accountingDate).toLocaleDateString()}</td>
                                        <td>{order.system}</td>
                                        <td>{order.userCreate}</td>
                                        <td>{order.userApprove == null ? '-' : order.userApprove}</td>
                                        <td>{order.userPosting == null ? '-' : order.userPosting}</td>
                                        <td>{order.userApprovePosting == null ? '-' : order.userApprovePosting}</td>
                                        <td>{order.postingNumber == 0 ? '-' : order.postingNumber}</td>
                                        <td>{order.status}</td>
                                        <td>
                                            <Link to={"/orders/" + order.id}><PreviewIcon fontSize="large" /></Link>
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