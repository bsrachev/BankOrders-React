import React from "react";
import PageHeader from "./shared/PageHeader";
import OrderListing from "./orders/OrderListing";

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