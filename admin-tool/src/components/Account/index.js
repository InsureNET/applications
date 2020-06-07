import React from 'react'
import PropTypes from 'prop-types'
import Identicon from 'identicon.js';
import Web3 from 'web3'
import Token from '../../abis/Token.json'
import Navbar from '../Navbar/index'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TabBar from 'components/TabBar'
import AccountPageContent from 'components/Account'

const styles = theme => ({
	paper: {
		maxWidth: 936,
		margin: 'auto',
		overflow: 'hidden',
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
	addPolicy: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},
})

const tabNames = ['My Policies', 'Pending', 'Profile', 'Transactions', 'Sellng'];


function AccountContent({ classes, account, id }) {
    return (
        <div>          
          <div className="container-fluid mt-5">
            <div className="row">
            <TabBar tabNames={tabNames}></TabBar>
			<Navbar account={account} id={id}/>
			
              <main 
                role="main" 
                className="col-lg-12 ml-auto mr-auto" 
                style={{ maxWidth: '600px' }}
              >
                <div className="content mr-auto ml-auto">
                  <AccountPageContent account={account} />
                  


                </div>
              </main>
            </div>
          </div>
        </div>
      );
}

AccountContent.propTypes = {
    classes: PropTypes.object,
}

export default withStyles(styles)(AccountContent);