import React from 'react'
import PropTypes from 'prop-types'
import Identicon from 'identicon.js';
import Web3 from 'web3'
import { Paper, Grid, Button } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'

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
	

    return (
        <div>
          
          <div className="container-fluid mt-5">
            <div className="row">
            {/* <TabBar tabNames={tabNames}></TabBar> */}
            <Grid container item lg={12} sm={12}>
				<Grid  item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<label>HBAR Account Balance: </label>

					</Paper>
				</Grid>
				<Grid item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<Button className={classes.root} color='primary' variant='contained'>
							Buy
						</Button>

					</Paper>
				</Grid>
				<Grid item lg={4} sm={12}>
					<Paper className={classes.paper} elevation={5}>
						<Button className={classes.root} color='secondary' variant='contained'>
							Sell
						</Button>

			  		</Paper>
				</Grid>
			</Grid>
			
            </div>
          </div>
        </div>
      );
}

HederaWalletContent.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(HederaWalletContent);