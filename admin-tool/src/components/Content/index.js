import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
//import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'
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

// Table data
function createData(name, regular, our) {
	return { name, regular, our };
}

// table rows
const rows = [
	createData('Speed of Payout', '2-9 Months', '< 24 Hours'),
	createData('Cost', '$600 / Year', '$10'),
	createData('Loss Of Income Protection', 'No', 'Yes'),
	createData('Deductible', '2%', 'None'),
	createData('Transparency', 'No', 'Yes'),
];

// Table styles
const tableStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

function AcccessibleTable() {
	const classes = tableStyles();

	return (
	<TableContainer component={Paper} elevation={3}>
		<Table className={classes.table} aria-label="caption table">
		{/* <caption>Why our product is better than regular insurance</caption> */}
		<TableHead>
			<TableRow>
			<TableCell>Example</TableCell>
			<TableCell align="right">Regular Insurance</TableCell>
			<TableCell align="right">InsureNET Policy</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{rows.map((row) => (
			<TableRow key={row.name}>
				<TableCell component="th" scope="row">
				{row.name}
				</TableCell>
				<TableCell align="right">{row.regular}</TableCell>
				<TableCell align="right">{row.our}</TableCell>
			</TableRow>
			))}
		</TableBody>
		</Table>
	</TableContainer>
	);
}


function AutoGrid({ account }) {
	const classes = useStyles();

	return (
	<div className={classes.root}>
		<Grid container spacing={2}>
			<Grid item lg={12} style={{textAlign: 'center'}}>
				<Typography variant="h3" gutterBottom>
					The problem with current insurance...
				</Typography>				
			</Grid><br />
			<Grid item lg={6} sm={6} xs={12}>
				<Paper className={classes.paper} elevation={3}>
					<Typography variant="body1">
						If you have ever experienced the aftermath of a hurricane you understand how 
						important a fast cash injection can help. With current insurance that never
						happens and we are going to do something about it with this platform and you.
						Automatic claim payments to all policies if wind speeds are
						recorded within 15 miles of your home or business.
					</Typography>
				</Paper>
			</Grid>
			<Grid item lg={6} sm={6} xs={12}>
				<Paper className={classes.paper} elevation={3}>
					<Typography variant="body1">
						An immediate infusion of cash for the most important things you 
						need like food, water, generator, fuel, medicine and other personal needs.
						Using smart contracts on the Etheruem blockchain we can trigger events
						based on advanced weather data. We can issue, track and pay out a policy
						anywhere in the world in a secure and transparent way.
					</Typography>
				</Paper>
			</Grid>
		</Grid>
		<br /><br /><br />
		<div className='table-header' style={{textAlign: 'center'}}>
			<Typography variant="h2" gutterBottom>
			  Not Just Insurance, Better Insurance!
			</Typography>
		</div><br /><br />
		<AcccessibleTable /><br /><br /><hr /><br /><br />
		<Grid container spacing={3}>
		{/* <label>Account: </label>{account} */}
		
		<Grid item xs={12}>
			<Paper className={classes.paper} elevation={3}>
				<Typography variant="h6">
					<label>Opportunity for Insureds</label><br />
					There are a number of decentralized applications and platforms developing 
					alliances and partnerships with many crypto services to achieve capital efficiencies 
					with single global ledgers and to expand our network. Driving automation to capture risk 
					data using smart contract technology to build market knowledge, automate payments
					and attract financing risk. Decisions can be made faster and with full confidence 
					powering innovations in micro-insurance and micro-finance.
				</Typography>						
			</Paper>
		</Grid>
		<Grid item xs={12}>
			<Paper className={classes.paper} elevation={3}>
				<Typography variant="h6">
						<label>Opportunity for Insurers</label><br />
						Expected value of risk is redistribution of capital corresponding to sharing 
						risks among the policy holders. Capital has to be locked for a certain period
						of time, and there is potential risk of losing the capital provided. Capital 
						providers are also compensated for this risk and the compensation is calculated
						based on the time of the ‘lock-up’ of the token and the length of time on which 
						the risk is being insured. We argue that today insurance companies are the 
						predominant way to organize these elements and that blockchain technology provides
						an opportunity to replace insurance firms by decentralized structures using a 
						standardized protocol. Capital and revenue streams can then be represented by tokens.
						
					</Typography>
				</Paper>
		</Grid>
		
		</Grid>
		
	</div>
	);
}

/* <Typography>
	<p>
		<i>Opportunity for Insurers:</i><br />
		With the rise of DeFi (Decentralized Finance), insurance is not far behind.
	</p>
	<ol>
		<li>Fraud detection and risk prevention</li>
		<li>
			<ol>
				Blockchain has the potential to eliminate error, negligence and detect fraud by providing a decentralized digital repository to independently verify the veracity of customers, policies and claims [with a complete underlying transaction history verifiable on public record] so there is no need to duplicate with a typical audit log.
			</ol>
		</li>
	</ol>
</Typography> */
/* <Typography>
	<p>Everything is built in a predictable way using smart contracts to allow underwriting and risk 
		assessment much faster and extremely accurate (Everyone will have the same up-to-date data at 
		the same time).
	</p>
	<ol>
		<li>Expected value of risk</li>
		<li>Capital costs for long tail risks</li>
		<li>Transaction costs</li>
	</ol>
</Typography> */

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
						<AutoGrid account={account} />
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
