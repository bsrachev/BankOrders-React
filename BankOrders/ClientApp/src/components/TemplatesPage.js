import React from "react";
import PageHeader from "./shared/PageHeader";
import Templates from "./templates/Templates";

export function TemplatesPage() {
    return (
        <>
            <PageHeader title="Templates" link="/templates/create" linkLabel="Create" />

            <div className="section-container">
                <Templates />
            </div>
        </>
    );
}