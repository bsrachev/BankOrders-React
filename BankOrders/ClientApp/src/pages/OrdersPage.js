import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Orders from "../components/orders/Orders";

export function OrdersPage() {
    return (
        <>
            <PageHeader title="Orders" link="/orders/create" linkLabel="Create" />

            <div className="section-container">
                <Orders />
            </div>
        </>
    );
}