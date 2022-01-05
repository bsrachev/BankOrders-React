import React from "react";
import { Link } from 'react-router-dom';
import PageHeader from "../components/shared/PageHeader";

export function UnauthorizedPage() {
    return (
        <>
            <PageHeader title="Unauthorized" subtitle="You must be an Admin to see this page." link="/" linkLabel="Back to Home" />

            <div className="container">
                <div className="row section-container-spacer justify-content-md-center">
                    <img src="/assets/images/unauthorized_alt.svg" className="img-fluid centerImage" />
                </div>
            </div>
        </>
    );
}