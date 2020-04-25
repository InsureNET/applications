import React, { Component } from 'react';
import Identicon from 'identicon.js';
import Web3 from 'web3'
import Token from '../../abis/Token.json'
import EthSwap from '../../abis/EthSwap.json'
import Navbar from '../Navbar/index'
import Main from '../Exchange/main'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withStyles, makeStyles  } from '@material-ui/core/styles'
import TabBar from 'components/TabBar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '../Utility/SimpleBackdrop'
import CustomTabs from '../Utility/CustomizedTabs'

const tabNames = ['Buy', 'Sell', 'Active', 'Pending', 'Completed', 'All']

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function SimpleBackdrop() {
  const classes = useStyles();
  
  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

function PleaseWaitModal() {
  return (
      <div>
          <h3>Processing, please stand by...</h3>
      </div>
  );
}

class Exchange extends Component {
      
      async componentWillMount() {
        this.setState({ loading: true })
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      // load the blockchain data
      async loadBlockchainData() {
        this.setState({ loading: true })
        const web3 = window.web3
        // get the accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    
        const ethBalance = await web3.eth.getBalance(this.state.account)
        //ethBalance = web3.utils.fromWei(ethBalance, 'ether')
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
          tokenBalance = web3.utils.fromWei(tokenBalance, 'ether')
          this.setState({ tokenBalance: tokenBalance })
          this.setState({ loading: false })
        } else {
          window.alert('Token contract not deployed to detected network.')
        }
    
        // Load EthSwap
        const ethSwapData = EthSwap.networks[networkId]
        if(ethSwapData) {
          const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
          this.setState({ ethSwap })
          this.setState({ loading: false })
        } else {
          window.alert('EthSwap contract not deployed to detected network.')
        }
    
        this.setState({ loading: false })
      }
    
      async loadWeb3() {
        this.setState({ loading: true })
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          this.setState({ loading: false })
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
          this.setState({ loading: false })
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      buyTokens = (etherAmount) => {
        this.setState({ loading: true })
        this.state.ethSwap.methods.buyTokens()
          .send({ value: etherAmount, from: this.state.account }).on('transactionHash', (hash) => {
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
          loading: true,
          metadata: {},
          transactions: [],
        }
      }
    
      render() {
        let content
        // Wait until the blockchain data has loaded.
        if(this.state.loading) {
          
          content = <SimpleBackdrop />//<p id="loader" className="text-center">Loading...</p>
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
                {/* <CustomTabs tabNames={tabNames}></CustomTabs>	 */}
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