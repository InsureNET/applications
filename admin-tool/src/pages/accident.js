import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
//import AccidentContent from 'components/Accident'
//import Web3 from 'web3'

// async function loadWeb3() {
// 	console.group('Web3');
// 	console.info('Loading Web3');
// 	if (window.ethereum) {
// 		window.web3 = new Web3(window.ethereum)
// 		await window.ethereum.enable()
// 		console.groupEnd();
// 	}
// 	else if (window.web3) {
// 		window.web3 = new Web3(window.web3.currentProvider)
// 		console.groupEnd();
// 	}
// 	else {
// 		window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
// 		console.groupEnd();
// 	}
// }
// async function loadBlockchainData() {
// 	console.group('Blockchain Data');
// 	console.log('loading blockchain data')
// 	const web3 = window.web3
// 	// Load account
// 	const accounts = await web3.eth.getAccounts() 
// 	const acct = accounts[0];
// 	console.log('blockchain data loaded')
// 	console.log(acct)
// 	console.groupEnd();
// 	return acct;
// }

function AccidentPage({ data, location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	//loadWeb3();
	//const account = loadBlockchainData();

	return (
		<Layout location={location} title={pageTitle}>
			{/* <AccidentContent account={account} />		
			{data} */}
		</Layout>
	)
}

AccidentPage.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
}

export default AccidentPage