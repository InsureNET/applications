import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Grid, Avatar } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
//import Button from '@material-ui/core/Button';
//import TabBar from 'components/TabBar'
//import CustomTabs from '../Utility/CustomizedTabs'
//import MoneyButton from '@moneybutton/react-money-button'
//import backgroundImage from '../../inetLogo.png' 
import { Container, CssBaseline, Typography } from '@material-ui/core'
import { Table, TableBody, TableCell,
		 TableContainer, TableHead, TableRow } from '@material-ui/core';


/**
 * @dev AnnuityContent Page Class Component
 * 
 */
class AnnuityContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: ''
        }


    }

    render(){
        return(
            <div>
                Hello There 
            </div>
        )
    }

}

AnnuityContent.propTypes = {

}

export default AnnuityContent;