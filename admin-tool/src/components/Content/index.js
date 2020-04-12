import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
import CustomTabs from '../Utility/CustomizedTabs'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import MoneyButton from '@moneybutton/react-money-button'
import { Container, CssBaseline, Typography, Backdrop, CircularProgress, Button } from '@material-ui/core'
//import { Table, TableBody, TableCell,
//		 TableContainer, TableHead, TableRow } from '@material-ui/core';

// Connect to HashGraph
// import client
const { Client, CryptoTransferTransaction, AccountId } = require('@hashgraph/sdk');

// Grab the account id and key
const operatorAccountId = '0.0.3792';
const operatorPrivateKey = '302e020100300506032b657004220420bc5b7a6a77dbae570b36fd07a298fd8bf95eb1a3d95fe1adc90a8adce54c57fa';


// Connect to Hedera and get balance of account
async function connectToHedera() {
	console.group('Hedera Connecting')
	// if we cant grab the params then throw an error
	if(operatorAccountId == null || operatorPrivateKey == null){
		throw new Error('environment variables OPERATOR_KEY and OPERATOR_ID must be present');
	}

	// create connection to Hedera network
	const client = Client.forTestnet();
	client.setOperator(operatorAccountId, operatorPrivateKey);

	// attempt to get balance HBAR
	var currentBalance = (await client.getAccountBalance(operatorAccountId)).toString();	
	//console.log("account balance:", currentBalance);

	// console.log("balance before transfer:", (await client.getAccountBalance(operatorAccountId)).toString());
    // const receipt = await (await new CryptoTransferTransaction()
    //     .addSender(operatorAccountId, 1)
    //     .addRecipient("0.0.3", 1)
    //     .setTransactionMemo("sdk example")
    //     .execute(client))
    //     .getReceipt(client);
    // console.log(receipt);
	// console.log("balance after transfer:", (await client.getAccountBalance(operatorAccountId)).toString());
	console.groupEnd();

	return currentBalance;
}
var createCORSRequest = function(method, url) {
	var xhr = new XMLHttpRequest();
	if ("withCredentials" in xhr) {
	  // Most browsers.
	  xhr.open(method, url, true);
	} else if (typeof XDomainRequest != "undefined") {
	  // IE8 & IE9
	  xhr = new XDomainRequest();
	  xhr.open(method, url);
	} else {
	  // CORS not supported.
	  xhr = null;
	}
	return xhr;
};

// ToDo: CORS is not supported! Need to use strict https!
const getTopics = function() {
	var xhr = new XMLHttpRequest();
	var url = 'https://api-testnet.dragonglass.me/hedera/api/v1/topics';
	var method = 'GET';
	var xhr = createCORSRequest(method, url);

	xhr.addEventListener('readystatechange', function () {
		if (this.readyState === 4) {
			
		}
	});

	xhr.onload = function() {
		var responseText = xhr.responseText;
		console.log(`getTopics() respnse ${responseText}`);
		// process the response.
	};
	   
	xhr.onerror = function(error) {
		 console.log(`[ERROR]::${error}`);
	};

	xhr.setRequestHeader('X-API-KEY', '0a17591c-d439-39ac-a497-5b54d857d00b');
	xhr.withCredentials = true;
	xhr.send();	
}

const useStyles = makeStyles((theme) => ({
	backdrop: {
	  zIndex: theme.zIndex.drawer + 1,
	  color: '#fff',
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SimpleBackdrop = function() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
	  setOpen(false);
	};
	const handleToggle = () => {
	  setOpen(!open);
	};
  
	return (
	  <div>
		<Button variant="outlined" color="primary" onClick={handleToggle}>
		  Show backdrop
		</Button>
		<Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
		  <CircularProgress color="inherit" />
		</Backdrop>
	  </div>
	);
}

function Status(props) {
	const [isOnline, setIsOnline] = useState(null);
	
	useEffect(() => {
		if(props.status === 'online'){
			setIsOnline('online');
		}

		function handleStatusChange(status) {
			console.log(`Setting status to ${status}`)
			setIsOnline(status);
		}  
	  
		// Specify how to clean up after this effect:
		return function cleanup() {
			
		};
	});
  
	if (isOnline === null) {
	  return <SimpleBackdrop />;
	}
	return isOnline ? 'Online' : 'Offline';
}

const tabNames = ['Accounts', 'Transactions', 'Consensus', 'Files', 'Contracts'];

/** @dev main page - default home page */
function Content(props) {
	const [operator, setOperator] = useState(operatorAccountId);
	const [accountBalance, setAccountBalance] = useState(0);

	useEffect(() => {
		console.log(`[useEffect()]::Your balance is ${accountBalance}`)
		//getTopics();
		function handleOperatorChange(operator) {

		}

		function handleBalanceChange(balance) {

		}

		return function cleanup() {
			console.log(`Cleanup function`)
		}

	});

	
	var accountInfo = Promise.resolve(connectToHedera());
	accountInfo.then((value) => {
		//console.log(value);
		setAccountBalance(value);
	});

	return (
		<div className='container'>
			<div>
				{/** @dev ToDo: Need to create the landing page content** */}				
				<React.Fragment>
					<CustomTabs tabNames={tabNames} onTabChanged={(e) => { console.log(` ${e} Tab Selected`)}} />
					<Grid container item>
						<Grid lg={4} sm={4} container item direction="row" justify="center" alignItems="center">
							<Paper elevation={3} style={{ padding: '25px' }}>
								<Status status={'online'}/>
								<Typography>
									HBAR Balance: {accountBalance}
								</Typography>


								</Paper>
						</Grid>
						<Grid lg={4} sm={4}
						container item
						direction="row"
						justify="center"
						alignItems="center"
						>
							<Paper elevation={3} style={{ padding: '25px' }}>

								<Typography>
									HBAR Balance: {accountBalance}
								</Typography>


							</Paper>
						</Grid>
						<Grid lg={4} sm={4}
						container item
						direction="row"
						justify="center"
						alignItems="center"
						>
							<Paper elevation={3} style={{ padding: '25px' }}>

								<Typography>
									HBAR Balance: {accountBalance}
								</Typography>


							</Paper>
						</Grid>

						

					</Grid>

				</React.Fragment>
			</div>
		</div>
	)
}

Content.propTypes = {
	//classes: PropTypes.object,
}

export default Content
