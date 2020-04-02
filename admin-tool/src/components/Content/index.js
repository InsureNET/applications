import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import ContentGraphic from './ContentGraphic'
import Button from '@material-ui/core/Button';
import TabBar from 'components/TabBar'
import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'

const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 600,
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: 936,
		},
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
		height: 1356,
		backgroundImage: `url(${"src/ai-blockchain-iot-in-insurance.jpg"})`,
	},
})

const tabNames = ['Home', 'Profile', 'Membership'];

/** @dev main page - default home page */
function Content({ }) {
	return (
		<div className={styles.container}>
			<CustomTabs tabNames={tabNames}></CustomTabs>	
			<div>

			</div>
		</div>
	)
}

Content.propTypes = {
	classes: PropTypes.object,
}

export default withStyles(styles)(Content)
