import React from 'react'
import PropTypes from 'prop-types'
import Identicon from 'identicon.js';
import Web3 from 'web3'
import Token from '../../abis/Token.json'
import EthSwap from '../../abis/EthSwap.json'
import Navbar from '../Navbar/index'
import Main from '../Exchange/main'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TabBar from 'components/TabBar'
import AccidentMainContent from 'components/Accident/main'

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

const tabNames = ['My Policies', 'Pending'];

function addPolicy(event) {
    console.log(event.target)
}

function AccidentContent({ classes }) {
    return (
        <div>
          
          <div className="container-fluid mt-5">
            <div className="row">
            <TabBar tabNames={tabNames}></TabBar>
            <Paper className='paper'>
              
            </Paper>
              <main 
                role="main" 
                className="col-lg-12 ml-auto mr-auto" 
                style={{ maxWidth: '600px' }}
              >
                <div className="content mr-auto ml-auto">
                  <AccidentMainContent />
                </div>
              </main>
            </div>
          </div>
        </div>
      );
}

AccidentContent.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AccidentContent);