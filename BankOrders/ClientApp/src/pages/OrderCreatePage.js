import React from "react";
import PageHeader from "../components/shared/PageHeader";
import OrderListing from "../components/orders/OrderListing";

export function OrderCreatePage() {
    return (
        <>
            <PageHeader title="Create an Order" link="/orders" linkLabel="Cancel" />

            <div className="section-container">
                <OrderListing />
            </div>
        </>
    );
}