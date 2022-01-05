import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Currencies from "../components/currencies/Currencies";

export function CurrenciesPage() {
    return (
        <>
            <PageHeader title="Currencies" />

            <div className="section-container">
                <Currencies />
            </div>
        </>
    );
}