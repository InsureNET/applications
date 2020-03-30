import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'

function SupportPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
SupportPage.propTypes = {
	location: PropTypes.object,
}
export default SupportPage