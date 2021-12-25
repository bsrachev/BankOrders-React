import React from 'react';
import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, link, linkLabel }) => {

    return (
        <div className="hero-full-container background-image-container white-text-container">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>{title}</h1>
                        {
                            subtitle && <p>{subtitle}</p>
                        }
                        {
                            link && linkLabel && <Link to={link} className="btn btn-default btn-lg">{linkLabel}</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;