import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import IncomeStreamContent from '../components/IncomeStream'
import '../components/IncomeStream/index.css'

function AnnuityPage({ data, location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';
    
	





	return (
		<Layout classnam='app-container' location={location} title={pageTitle}>
			<IncomeStreamContent />
		</Layout>
	)
}


AnnuityPage.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}


export default AnnuityPage
