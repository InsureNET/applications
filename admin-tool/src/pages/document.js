import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
import BrowserContent from 'components/BrowserContent';

function DocumentPage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}

DocumentPage.PropTypes = {
    location: PropTypes.object,
}

export default DocumentPage;