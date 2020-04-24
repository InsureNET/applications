import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import AnnuityContent from '../components/Annuity'

function AnnuityPage({ data, location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';
    






	return (
		<Layout location={location} title={pageTitle}>
			<AnnuityContent />
		</Layout>
	)
}


AnnuityPage.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}


export default AnnuityPage
