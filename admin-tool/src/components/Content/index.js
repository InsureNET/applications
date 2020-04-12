import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
//import CustomTabs from '../Utility/CustomizedTabs'
import MoneyButton from '@moneybutton/react-money-button'
//import backgroundImage from '../../inetLogo.png' 
import { Container, CssBaseline, Typography } from '@material-ui/core'
import { Table, TableBody, TableCell,
		 TableContainer, TableHead, TableRow } from '@material-ui/core';

//ai-blockchain-iot-in-insurance.jpg'
const useStyles = makeStyles((theme) => ({
	root: {
	  	flexGrow: 1,
	  	...theme.typography.subtitle2,
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(1),
	},
	paper: {
	  padding: theme.spacing(2),
	  textAlign: 'left',
	  color: theme.palette.text.secondary,
	},
}));

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
		padding: 15,
		height: 1200,
		//backgroundImage: `url(${backgroundImage})`,
	},
})

//const tabNames = ['Home', 'Profile', 'Membership'];

/** @dev main page - default home page */
function Content({ classes, account }) {
	return (
		<div className={classes.container}>
			{/* <CustomTabs tabNames={tabNames}></CustomTabs>	 */}
			<div>
				{/** @dev ToDo: Need to create the landing page content** */}				
				<React.Fragment>
					<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					>
						{account}
					</Grid>
				</React.Fragment>
			</div>
		</div>
	)
}

Content.propTypes = {
	classes: PropTypes.object,
}

export default withStyles(styles)(Content)
