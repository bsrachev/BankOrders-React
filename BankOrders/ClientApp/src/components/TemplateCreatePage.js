import React from "react";
import PageHeader from "./shared/PageHeader";
import TemplateListing from "./templates/TemplateListing";

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