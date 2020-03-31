import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'
import HurricaneContract from '../../abis/HurricaneCreatePolicy.json'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TabBar from 'components/TabBar'
import Main from 'components/Hurricane/main'

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
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},
});

const tabNames = ['Buy', 'Sell', 'Claims'];

class HurricaneContent extends Component {
	async componentWillMount() {
		console.group('[HurricaneContent]::[ComponentWillMount]')
		this.loadWeb3();

		this.loadBlockchainData()

		console.groupEnd();
	}

	// Load Web3
	async loadWeb3() {
		console.group('[loadWeb3()]::[Checking]')
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
			console.info('[Ethereum enabled]')
		}
		else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
			console.info('[Enabled]::['+ window.web3 +']')
		}
		else {
			window.alert('on-Ethereum browser detected. You should consider trying MetaMask!')
		}
		console.groupEnd()
	}

	// Load the contract and account info
	async loadBlockchainData() {
		console.group('[loadBlockchainData()]::[loading]')
		const web3 = window.web3
		// fetch the accounts
		const accounts = await web3.eth.getAccounts()
		this.setState({ account: accounts[0] })
		console.log('Account :: ', this.state.account)

		// Get their balance
		const accountBalance = await web3.eth.getBalance(this.state.account)
		this.setState({ userBalance: accountBalance})
		console.log('Balance in wei :: ', this.state.userBalance)

		// Get network id
		const networkId = await web3.eth.net.getId()
		console.log('network id: ', networkId)
		const contractData = await HurricaneContract.networks['5777']
		console.log('contract data: ', contractData)

		if (contractData) {
			const contractAbi = HurricaneContract.abi;
			const contractAddress = HurricaneContract.networks['5777'].address //contractData.address;
			const contract = new web3.eth.Contract(contractAbi, contractAddress)
			this.setState({ contract })
			//this.setState({ loaoding: false })
		} else {
			window.alert('Contract is not deployed on current network.')
		}

		this.setState({ loaoding: false })
		console.groupEnd();
	}


	buyPolciy(coverageAmount1, coverageAmount2, coverageAmount3, premiumAmount) {
		console.log('buying policy')
		
	}

	constructor(props){
		super(props)
		// Initial state of the component
		this.state = {
			account: '',
			contract: {},
			member: false,
			loading: false,
			policy: {},
			userBalance: 0,
			metadata: {},
			policies: [],
			transactions: [],
		}
	}


	render(props){
		let content
		if (this.state.loading) {
			content = <p id='loader' className='text-center'>Loading..</p>
		} else {
			content = <Main
				account={this.state.account}
				onClick={this.buyPolciy}
				loading={this.state.loading}
			/>
		}
		return (
			<div>
				<div className="container-fluid mt-5">
				<div className="row">
				<TabBar tabNames={tabNames} />
				<div className='container'>
					<Paper className='paper'>

					</Paper>
					<main 
						role="main" 
						className="col-lg-12 ml-auto mr-auto" 
						style={{ maxWidth: '600px' }}
					>
						<div className="content mr-auto ml-auto">
							{content}
						</div>
					</main>				
				</div>
				</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(HurricaneContent);