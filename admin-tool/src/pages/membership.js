import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'
import CustomTabs from '../components/Utility/CustomizedTabs'

const tabNames = ['Home']

function MembershipPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			{/* <CustomTabs tabNames={tabNames} /> */}
		</Layout>
	)
}
MembershipPage.propTypes = {
	location: PropTypes.object,
}
export default MembershipPage
