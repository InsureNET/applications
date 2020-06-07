import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'

function HelpPage({ data, location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
HelpPage.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}
export default HelpPage
