import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import TabBar from 'components/TabBar'
import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'
import backgroundImage from '../../ai-blockchain-iot-in-insurance.jpg'

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
		padding: '0',
		height: 1200,
		backgroundImage: `url(${backgroundImage})`,
	},
})
const BackgroundImagePage = () => {
	return (
		<div className="bg"></div>
	);
  }

const tabNames = ['Home', 'Profile', 'Membership'];

/** @dev main page - default home page */
function Content({ classes }) {
	return (
		<div className={classes.container}>
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
