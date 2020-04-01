import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import CustomizedTabs from 'components/Utility/CustomizedTabs'

function TransportationPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<CustomizedTabs />
		</Layout>
	)
}
TransportationPage.propTypes = {
	location: PropTypes.object,
}
export default TransportationPage