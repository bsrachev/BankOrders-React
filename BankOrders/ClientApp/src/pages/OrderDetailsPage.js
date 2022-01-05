import React from "react";
import PageHeader from "../components/shared/PageHeader";
import OrderListing from "../components/orders/OrderListing";

export function OrderDetailsPage() {
    return (
        <>
            <PageHeader title="Order Details" link="/orders" linkLabel="Back" />

            <div className="section-container">
                <OrderListing />
            </div>
        </>
    );
}