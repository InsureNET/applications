import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import CustomizedTabs from 'components/Utility/CustomizedTabs'

const tabNames = ['Marketplace', 'Contracts', 'Delivered'];

function TransportationPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<CustomizedTabs tabNames={tabNames} />
		</Layout>
	)
}
TransportationPage.propTypes = {
	location: PropTypes.object,
}
export default TransportationPage