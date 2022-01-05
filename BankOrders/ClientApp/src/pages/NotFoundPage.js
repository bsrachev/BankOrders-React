import React from "react";
import { Link } from 'react-router-dom';
import PageHeader from "../components/shared/PageHeader";

export function NotFoundPage() {
    return (
        <>
            <PageHeader title="404: Not Found" subtitle="The page you are looking for does not exist." link="/" linkLabel="Back to Home" />

            <div className="container">
                <div className="row section-container-spacer justify-content-md-center">
                    <img src="/assets/images/notfound.svg" className="img-fluid centerImage" />
                </div>
            </div>
        </>
    );
}