import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar, Form } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
//import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'
//import backgroundImage from '../../inetLogo.png' 
import { Container, CssBaseline, Typography } from '@material-ui/core'
import { Table, TableBody, TableCell,
         TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Button } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import './index.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    table: {
        minWidth: 700,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: '',
      color: '#9400d3',
      backgroundColor: '#282c34'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  

/**
 * @dev IncomeStreamContent Page Class Component
 * 
 */
class IncomeStreamContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            loading: true,
        }

        //this.loadWeb3()
        //this.loadBlockchainData()    
    }

    async loadBlockchainData() {
        this.setState({ loading: true })
        const web3 = window.web3
        // get the accounts
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })

    
        const ethBalance = await web3.eth.getBalance(this.state.account)
        //ethBalance = web3.utils.fromWei(ethBalance, 'ether')
        this.setState({ ethBalance })
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


    render(){
        return(
            <Container className='app-container'>
            <Grid container spacing={1} className='app-content'>
                <FormPanel data={{ name: 'Jason Romero', x: '5000' }}/>
                  
              </Grid>
              {/* <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid> */}
          </Container>
        )
    }

}

function FormPanel({data}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {data.name} | {data.x}
                    <form>
                        <Grid item xs={4}>
                            <div>
                                <label>
                                    label 1
                                </label>

                        
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <label>
                                    label 2
                                </label>

                        
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>
                                <label>
                                    label 3
                                </label>

                        
                            </div>
                        </Grid>
                        
                    </form>
                </Paper>
            </Grid>
        </React.Fragment>
    )

}

function FormRow(props) {
    const classes = useStyles();
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>{props.name}</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  

IncomeStreamContent.propTypes = {

}

export default IncomeStreamContent;