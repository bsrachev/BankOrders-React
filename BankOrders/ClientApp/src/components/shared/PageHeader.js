import React from 'react';

const PageHeader = ({ title, subtitle }) => {

    return (
        <div className="hero-full-container background-image-container white-text-container">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;