import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import HurricaneContent from 'components/Hurricane'

function HurricanePage({ data, location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<HurricaneContent />
		</Layout>
	)
}
HurricanePage.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
}
export default HurricanePage
