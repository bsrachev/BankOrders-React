import React from "react";
import PageHeader from "../components/shared/PageHeader";
import TemplateListing from "../components/templates/TemplateListing";

export function TemplateCreatePage() {
    return (
        <>
            <PageHeader title="Create an Template" link="/templates" linkLabel="Cancel" />

            <div className="section-container">
                <TemplateListing />
            </div>
        </>
    );
}