import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3'
import Token from '../../abis/Token.json'
import EthSwap from '../../abis/EthSwap.json'
import Navbar from '../Navbar/index'
import Main from '../Exchange/main'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import TabBar from 'components/TabBar'
import Backdrop from '../Utility/SimpleBackdrop'

const tabNames = ['Buy', 'Sell', 'Active', 'Pending', 'Completed', 'All']

class Exchange extends Component {
    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      // load the blockchain data
      async loadBlockchainData() {
        const web3 = window.web3
        // get the accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    
        const ethBalance = await web3.eth.getBalance(this.state.account)
        this.setState({ ethBalance })
    
        // Load Token
        const networkId =  await web3.eth.net.getId()
        const tokenData = Token.networks[networkId]
        if(tokenData) {
          const tokenAbi = Token.abi;
          const tokenAddress = tokenData.address;
          const token = new web3.eth.Contract(tokenAbi, tokenAddress);
          this.setState({ token })
          let tokenBalance = await token.methods.balanceOf(this.state.account).call()
          this.setState({ tokenBalance: tokenBalance.toString() })
        } else {
          window.alert('Token contract not deployed to detected network.')
        }
    
        // Load EthSwap
        const ethSwapData = EthSwap.networks[networkId]
        if(ethSwapData) {
          const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
          this.setState({ ethSwap })
        } else {
          window.alert('EthSwap contract not deployed to detected network.')
        }
    
        this.setState({ loading: false })
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      buyTokens = (etherAmount) => {
        this.setState({ loading: true })
        this.state.ethSwap.methods.buyTokens().send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
      }
    
      sellTokens = (tokenAmount) => {
        this.setState({ loading: true })
        this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.state.ethSwap.methods.sellTokens(tokenAmount).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: false })
          })
        })
      }
    
      constructor(props) {
        super(props)
        this.state = {
          account: '',
          token: {},
          ethSwap: {},
          ethBalance: '0',
          tokenBalance: '0',
          loading: false,
          metadata: {},
          transactions: [],
        }
      }
    
      render() {
        let content
        // Wait until the blockchain data has loaded.
        if(this.state.loading) {
          <Backdrop />
          content = <p id="loader" className="text-center">Loading...</p>
        } else {
          content = <Main
            ethBalance={this.state.ethBalance}
            tokenBalance={this.state.tokenBalance}
            buyTokens={this.buyTokens}
            sellTokens={this.sellTokens}
            account={this.state.account}
          />
        }
    
        return (
          <div>            
            <div className="container-fluid mt-5">
              <div className="row">
                <TabBar tabNames={tabNames}></TabBar>
                <Navbar account={this.state.account} />                
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
        );
      }
}



export default Exchange;