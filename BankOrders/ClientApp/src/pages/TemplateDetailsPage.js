import React from "react";
import PageHeader from "../components/shared/PageHeader";
import TemplateListing from "../components/templates/TemplateListing";

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