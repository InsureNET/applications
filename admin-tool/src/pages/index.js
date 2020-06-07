import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'components/Layout'
import PropTypes from 'prop-types'
import Content from 'components/Content'

function DashboardIndex({ data, location, address }) {
	const { title } = data.site.siteMetadata
	return (
		<Layout location={location} title={title}>
			<Content address={address}/>
		</Layout>
	)
}

/** @dev DashboardIndex PropTypes
 * 
 */
DashboardIndex.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
	address: PropTypes.address,
}

/** @dev pageQuery
 * @param site title
 * @description exports the graphql query for the site title and 
 * 				whatever else we want to add.
 */
export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`

export default DashboardIndex
