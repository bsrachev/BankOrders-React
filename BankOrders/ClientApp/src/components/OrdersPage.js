import React from "react";
import PageHeader from "./shared/PageHeader";
import Orders from "./orders/Orders";

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