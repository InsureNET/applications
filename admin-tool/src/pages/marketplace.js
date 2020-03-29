import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import MarketplaceContent from '../components/Marketplace/index'

function MarketplacePage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<MarketplaceContent />
		</Layout>
	)
}
MarketplacePage.propTypes = {
	location: PropTypes.object,
}
export default MarketplacePage
