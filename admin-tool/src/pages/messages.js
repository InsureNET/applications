import React from 'react';
import PropTypes from 'prop-types';
import Layout from "components/Layout";
import BrowserContent from 'components/BrowserContent';

function MessagePage({location}) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            
        </Layout>
    )
}

MessagePage.PropTypes = {
    location: PropTypes.object,
}

export default MessagePage;