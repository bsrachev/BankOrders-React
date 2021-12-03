import React, { Component } from 'react';

export class Orders extends Component {
    static displayName = Orders.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], loading: true };
    }

    componentDidMount() {
        this.getOrdersData();
    }

    static renderordersTable(orders) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Ref ¹</th>
                        <th>System</th>
                        <th>Created by</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order =>
                        <tr key={order.id}>
                            <td>{order.refNumber}</td>
                            <td>{order.system}</td>
                            <td>{order.userCreate}</td>
                            <td>{order.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Orders.renderordersTable(this.state.orders);

        return (
            <div className="section-container">
                <div className="container text-center">
                    <div className="row section-container-spacer">
                        <div className="col-xs-12 col-md-12">
                            <h2 className="text-center">Orders</h2>
                            <p>Praesent at feugiat est, at faucibus ipsum. Aenean condimentum mauris vel malesuada pulvinar. <br />Vestibulum sit amet hendrerit leo, quis vehicula mi.</p>
                            {contents}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    async getOrdersData() {
        const response = await fetch('api/orders');
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }
}
