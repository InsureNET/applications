import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
// ToDo: Add Chat to site and working.
//import HederaConsensusContent from 'components/BrowserContent';

function HederaConsensusPage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}

HederaConsensusPage.PropTypes = {
    location: PropTypes.object,
}

export default HederaConsensusPage;