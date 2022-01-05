import React from "react";
import PageHeader from "../components/shared/PageHeader";
import Profile from "../components/users/Profile";

export function ProfilePage(currentUser) {
    return (
        <>
            <PageHeader title={(currentUser.currentUser.isAdmin ? "Admin " : "Employee ") + "Profile"} />

            <div className="section-container">
                <Profile />
            </div>
        </>
    );
}