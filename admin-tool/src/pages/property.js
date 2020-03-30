import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

function PropertyProductPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
PropertyProductPage.propTypes = {
	location: PropTypes.object,
}
export default PropertyProductPage