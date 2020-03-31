/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Web3 from 'web3'
import Marketplace from '../../abis/Marketplace.json';
import TabBar from 'components/TabBar'
import Navbar from '../Navbar'
import Main from '../Marketplace/main'
import uuid from 'uuid';
import { withStyles } from '@material-ui/core/styles'

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


const tabNames = [ 'My Policies', 'Pending', 'Bidding' ];


class MarketplaceContent extends Component {

  async componentWillMount() {
    console.group('componentWillMount')
    console.log('Mounting')
    await this.loadWeb3()
    //this.runSetup()
    await this.loadBlockchainData()
    console.groupEnd();
  }

  async runSetup() {
    console.group('Run Setup:')
    // Detect MetaMask
    if(typeof web3 !== 'undefined') {
      // continue execution
      console.log('Welcome!')
      await this.loadBlockchainData()

      // test account
      //const account = "0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533";
      
      const web3 = await this.loadWeb3(dispatch)
      //const account = await loadAccount(web3, dispatch)
      const account = await web3.eth.getAccounts()
      console.log(account)
      //this.checkAuthorization(account)
    } else {
      console.log('User does not have MetaMask installed')
      window.alert('Please install MetaMask!')
      // todo: don't show page content here...

    }
    console.groupEnd()
  }

  async checkAuthorization(account){
    // ToTo: check against actual token holders
    // Call a smart contract to fetch token holders
    // Test accounts from Ganache
    const tokenHolders = [
      "0x27F3ce6b96b20c86428de0bB599eb8329810Ca80",
      "0xf64135024e473060c4189B1523Fb822Af48BE09a",
      "0xa2809013eed89816485b0a8490DEE85A23Cd8499",
      "0x759384650FB21ed72640df092Be19Fa2b6513014",
      "0x99db1d75760437afA3347E7BFD4888278A4c154c",
      "0xDbb9C9A77aa4E260E2CE67644D358f2717D59A8B",
      "0x90b20DeDB343cee2243a5ff1ccc96B5401CC8143",
      "0x6F7d7d68c3Eed4Df81CF5F97582deef8ABC51533", // MetaMask Account
    ]

    const authorized = tokenHolders.includes(account)
    if(authorized) {
      // todo: show website content
      //window.alert("You're Authorized! :)")
      console.log("You're Authorized! :)")
    } else {
      // todo: show login content
      window.alert("You're not Authorized! :(")
    }
  }

  async componentDidMount() {
    //alert('Hey Jaxcoder, I am mounted!')
    console.group('componentDidMount')
    console.log('Mounted')
    console.groupEnd();
  }

  async loadWeb3() {
    console.group('Web3');
    console.info('Loading Web3');
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      console.groupEnd();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      console.groupEnd();
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      console.groupEnd();
    }
  }

  async loadBlockchainData() {
    console.group('Blockchain Data');
    console.log('loading blockchain data')
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    //await this.checkAuthorization(this.state.account)
    const networkId = await web3.eth.net.getId()
    this.setState({ networkId })
    const networkData = Marketplace.networks[networkId]
    this.setState({ networkData })

    // const policyNetworkData = PolicyMarketplace.networks[networkId]
    // console.log(policyNetworkData);

    if(networkData) {
      const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address)
      //const policyMarketplace = new web3.eth.Contract(PolicyMarketplace.abi, networkData.address)
      this.setState({ marketplace })
      const productCount = await marketplace.methods.productCount().call()
      const policyCount = await marketplace.methods.policyCount().call()
      this.setState({ productCount, policyCount })
      // Load products
      for (var i = 1; i <= productCount; i++) {
        const product = await marketplace.methods.products(i).call()
        const policy = await marketplace.methods.policies(i).call()
        this.setState({
          products: [...this.state.products, product],
          policies: [...this.state.policies, policy]
        })
      }
      this.setState({ loading: false})
      console.log('blockchain data loaded')
      console.groupEnd();
    } else {
      console.error('[Error]::Marketplace contract not deployed to detected network.')
      window.alert('[Error]::Marketplace contract not deployed to detected network.')
      console.groupEnd();
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      id : uuid.v4(),
      account: '',
      productCount: 0,
      policyCount: 0,
      products: [],
      policies: [],
      loading: false // I changed to false to see what happens
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
    this.createPolicy = this.createPolicy.bind(this)
    console.group('App Component')
  }

  createPolicy(name, policyNumber, price){
    this.setState({ loading: true })
    this.state.marketplace.methods.createPolicy(name, policyNumber, price)
        .send({ from: this.state.account })
        .once('receipt', (receipt) => {
            console.log(receipt)
            this.setState({ loading: false })
        })
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price)
        .send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ loading: false })
        })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id)
        .send({ from: this.state.account, value: price })
        .once('receipt', (receipt) => {
            this.setState({ loading: false })
        })
  }

  render() {
    return (    
      <div>
        <div className="container-fluid mt-5">         
          <div className="row">
          <TabBar tabNames={tabNames}></TabBar>          
          <Navbar account={this.state.account} id={this.state.id}/>
          <p>&nbsp;</p>
            {/* <img src={logo} alt='Agency Logo' height='50' width='50' /> */}
            <main role="main" className="col-lg-12 d-flex">
            
              { this.state.loading
                ? <div id="loader" 
                        className="text-center">
                      <p className="text-center">Loading...</p>
                  </div>
                : <Main
                    products={this.state.products}
                    policies={this.state.policies}
                    createProduct={this.createProduct}
                    purchaseProduct={this.purchaseProduct}
                    createPolicy={this.createPolicy} 
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

function componentWillUnmount () {
    console.log('Unmounting')
}

MarketplaceContent.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(styles)(MarketplaceContent);
