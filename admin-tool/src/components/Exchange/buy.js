import React, { Component } from 'react'
import tokenLogo from '../../inetLogo.png'
import ethLogo from '../../eth-logo.png'
import { Button, Paper, Container } from '@material-ui/core';

class BuyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      approvedAllowance: 100,
      transactions: [],
      metadata: {},
      txData: {},
      output: '0',
      action: 'BUY'
    }
  }

  render() {
    return (
      <Container>
        
        <div style={{ marginLeft: 35, textAlign: 'center' }}> 
            <Paper elevation={3}  style={{ padding: 35 }}>
              <form className="mb-3" onSubmit={(event) => {
                  event.preventDefault()
                  let etherAmount
                  etherAmount = this.input.value.toString()
                  etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
                  this.props.buyTokens(etherAmount)
                }}>
                <div>
                  <label className="float-left"><b>Input</b></label><br />
                  
                </div>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    onChange={(event) => {
                      const etherAmount = this.input.value.toString()
                      this.setState({
                        output: etherAmount * 100
                      })
                    }}
                    ref={(input) => { this.input = input }}
                    className="form-control form-control-lg"
                    placeholder="0"
                    required /><br />
                    <span className="float-right text-muted">
                    Balance: {window.web3.utils.fromWei(this.props.ethBalance)}
                  </span>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={ethLogo} height='32' alt=""/>
                      &nbsp;&nbsp;&nbsp; ETH
                    </div>
                  </div>
                </div>
                <div>
                  <label className="float-left"><b>Output</b></label><br />       
                </div>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="0"
                    value={this.state.output}
                    disabled
                  /><br />
                  <span className="float-right text-muted">
                    Balance: {this.props.tokenBalance}
                  </span>
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <img src={tokenLogo} height='32' alt=""/>
                      &nbsp; iNET
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <span className="float-left text-muted">Exchange Rate</span>
                  <span className="float-right text-muted">1 ETH = 100 iNET</span>
                </div>
                <Button type="submit" className="" variant="contained" color="primary" >EXCHANGE!</Button>
                <br />
              </form>
            </Paper>
          </div>
      </Container>
    );
  }
}

export default BuyForm;
