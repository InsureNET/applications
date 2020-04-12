import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
//import LossOfIncomeContent from 'components/Content'

function LossOfIncomePage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			
		</Layout>
	)
}
LossOfIncomePage.propTypes = {
	location: PropTypes.object,
}
export default LossOfIncomePage
