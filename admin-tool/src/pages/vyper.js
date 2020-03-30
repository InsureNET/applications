import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'

function VyperContractPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
VyperContractPage.propTypes = {
	location: PropTypes.object,
}
export default VyperContractPage