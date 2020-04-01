import React, { Component } from 'react'
import tokenLogo from '../../inetLogo.png'
import ethLogo from '../../eth-logo.png'
import CardComponent from '../Utility/CardComponent'

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
      <div style={{ marginLeft: 35 }}> 
        <CardComponent 
          account={this.state.account} 
          metadata={this.state.metadata}
          approvedAllowance={this.state.approvedAllowance}
          action={this.state.action}
        />
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)
        }}>
        <div>
          <label className="float-left"><b>Input</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether' )}
          </span>
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
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height='32' alt=""/>
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>
        <div>
          <label className="float-left"><b>Output</b></label>
          <span className="float-right text-muted">
            Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
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
        <button type="submit" className="btn btn-primary btn-block btn-lg">EXCHANGE!</button>
      </form>
      </div>
    );
  }
}

export default BuyForm;
