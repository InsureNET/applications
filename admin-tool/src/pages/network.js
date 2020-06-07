import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import PropTypes from 'prop-types'
import Content from 'components/Content'

function NetworkInfoPage({ location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : ''

    return (
        <Layout location={location} title={pageTitle}>

        </Layout>
    )
}

NetworkInfoPage.propTypes = {
    location: PropTypes.object,
}

/** @dev networkInfoQuery
 * @param network network
 * @description exports the graphql query for the site title and 
 * 				whatever else we want to add.
 */
// export const NetworkInfoQuery = graphql`
//     query {
//         network {
//             networkMetadata {
//                 name,
//                 id
//             }
//         }
//     }
// `

export default NetworkInfoPage