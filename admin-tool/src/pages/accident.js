import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'

function AccidentPage({ data, location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<Content />
		</Layout>
	)
}
AccidentPage.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
}

export default AccidentPage