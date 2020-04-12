import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
// ToDo: Add Chat to site and working.
//import HederaChatContent from 'components/BrowserContent';

function HederaChatPage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}

HederaChatPage.PropTypes = {
    location: PropTypes.object,
}

export default HederaChatPage;