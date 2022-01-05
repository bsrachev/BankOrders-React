import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Register from "../components/users/Register";

export function RegisterPage() {
    return (
        <>
            <PageHeader title="Sign Up" />

            <div className="section-container">
                <Register />
            </div>
        </>
    );
}