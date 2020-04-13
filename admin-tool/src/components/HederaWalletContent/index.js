import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Identicon from 'identicon.js';
import Web3 from 'web3'
import { Paper, Grid, Button } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

// ToDo: this is breaking the Gatsby build... wtf
//import { Client, CryptoTransferTransaction, AccountId } from '@hashgraph/sdk';

// Connect to HashGraph
// import client
// ToDo: this is breaking the Gatsby build... wtf
//const { Client, CryptoTransferTransaction, AccountId } = require('@hashgraph/sdk');

// Grab the account id and key
const operatorAccountId = '0.0.3792';
const operatorPrivateKey = '302e020100300506032b657004220420bc5b7a6a77dbae570b36fd07a298fd8bf95eb1a3d95fe1adc90a8adce54c57fa';


const styles = theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	paper: {
		maxWidth: 936,
		margin: '15px',
		overflow: 'hidden',
		padding: '25px',
		
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	searchInput: {
		fontSize: theme.typography.fontSize,
	},
	block: {
		display: 'block',
	},
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},

})

//const tabNames = ['My Transactions', 'Topics', 'Balances'];


function HederaWalletContent({ classes }) {
	const [accountBalance, setAccountBalance] = useState(0);


    return (
        <div>
          
          <div className="container-fluid mt-5">
            <div className="row">
            {/* <TabBar tabNames={tabNames}></TabBar> */}
            <Grid container item lg={12} sm={12}>
				<Grid  item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<label>HBAR Account Balance: </label>
						{accountBalance}
					</Paper>
				</Grid>
				<Grid item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<Button className={classes.root} color='primary' variant='contained' elevation={3}>
							Buy
						</Button>

					</Paper>
				</Grid>
				<Grid item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<Button className={classes.root} color='secondary' variant='contained' elevation={3}>
							Sell
						</Button>

			  		</Paper>
				</Grid>
			</Grid>
			<hr />

            </div>
          </div>
        </div>
      );
}

HederaWalletContent.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(HederaWalletContent);