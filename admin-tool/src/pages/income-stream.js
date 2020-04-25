import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import IncomeStreamContent from '../components/IncomeStream'

function IncomeStreamPage({ data, location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';
    






	return (
		<Layout location={location} title={pageTitle}>
			<IncomeStreamContent />
		</Layout>
	)
}


IncomeStreamPage.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}


export default IncomeStreamPage
