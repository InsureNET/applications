import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
// ToDo: Add wallet to site and working.
//import HbarExchangeContent from 'components/BrowserContent';

function HbarExchangePage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}

HbarExchangePage.PropTypes = {
    location: PropTypes.object,
}

export default HbarExchangePage;