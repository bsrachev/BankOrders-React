import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Login from "../components/users/Login";

export function LoginPage() {
    return (
        <>
            <PageHeader title="Sign In" />

            <div className="section-container">
                <Login />
            </div>
        </>
    );
}