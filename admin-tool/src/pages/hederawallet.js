import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
// ToDo: Add wallet to site and working.
import HederaWalletContent from 'components/HederaWalletContent';

function HederaWalletPage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            <HederaWalletContent />
        </Layout>
    )
}

HederaWalletPage.PropTypes = {
    location: PropTypes.object,
}

export default HederaWalletPage;