import React from "react";
import PageHeader from "./shared/PageHeader";
import TemplateListing from "./templates/TemplateListing";

export function TemplateDetailsPage() {
    return (
        <>
            <PageHeader title="Template Details" link="/templates" linkLabel="Back" />

            <div className="section-container">
                <TemplateListing />
            </div>
        </>
    );
}