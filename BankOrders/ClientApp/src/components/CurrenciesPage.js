import React from "react";
import PageHeader from "./shared/PageHeader";
import Currencies from "./currencies/Currencies";

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