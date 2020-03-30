import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

function LiabilityProductPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
LiabilityProductPage.propTypes = {
	location: PropTypes.object,
}
export default LiabilityProductPage