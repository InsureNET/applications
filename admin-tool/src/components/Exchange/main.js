import React, { Component } from 'react'
import BuyForm from './buy'
import SellForm from './sell'
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});



function CustomizedButton(color){
  const classes = useStyles();
}

class Main extends Component {
  constructor(props) {
    super(props)
    // Set the default state to the 'buy' form
    // Holders have to hold for a certain period of time before sale.
    // ToDo: check how long they have had the tokens and if they have any.
    this.state = {
      currentForm: 'buy',
    }
  }

  render() {
    
    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    } else {
      content = <SellForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
      />
    }

    return (
      <div style={{ marginLeft: 35 }} id="content" className="mt-3">
        <div className="d-flex justify-content-between mb-3">
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary"
            onClick={(event) => {
              console.log('buying')
              this.setState({ currentForm: 'buy' })
            }}
          >
            Buy
          </Button>
        </ThemeProvider>
        <span className="text-muted">&lt; &nbsp; &gt;</span>
        <ColorButton variant="contained" color="primary"
                    onClick={(event) => {
                      console.log('selling')
                      this.setState({ currentForm: 'sell' })
                    }}
        >
          Sell
        </ColorButton>
        </div>
        <hr />
        <div className="card mb-4" >
          <div className="card-body">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
