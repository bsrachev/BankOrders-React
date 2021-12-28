import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../../actions/templatesAction";

const TemplateListing = ({ ...props }) => {
    const params = useParams();
    const { id } = params;

    if (id === undefined) {
        console.log("tekae vernoe")
    }
    else {
        console.log("id is " + id)
    }

    return (
        <div>
            <p>Id is:</p>
            <p>{id}</p>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        templatesList: state.templatesReducer.templatesList,
        templateSingle: state.templatesReducer.singleTemplate
    }
}

const mapActionToProps = {
    fetchAllTemplates: actions.fetchAll,
    fetchTemplate: actions.fetchById
}

export default connect(mapStateToProps, mapActionToProps)(TemplateListing);