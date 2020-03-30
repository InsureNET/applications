import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import HurricaneContent from 'components/Hurricane'

function WeatherPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<HurricaneContent />
		</Layout>
	)
}
WeatherPage.propTypes = {
	location: PropTypes.object,
}
export default WeatherPage