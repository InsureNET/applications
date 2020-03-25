import React, { Component } from 'react';
import Identicon from 'identicon.js';

// todo: add react-router and impliment
// import { Router } from 'react-router';

/* Navbar Component */
class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
      account: this.props.account,
    }

    
  }

  render() {
    
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <p> Account:  <small id="account">{this.props.account}</small>
          {/* {this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${ new Identicon(this.props.account, 30).toString() }`}
                alt='Avatar'
              />
              : <span></span>
            } */}
            
        </p>
        
      </nav>
    );
  }
}

export default Navbar;
