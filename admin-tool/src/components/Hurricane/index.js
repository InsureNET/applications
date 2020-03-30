import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Web3 from 'web3'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TabBar from 'components/TabBar'
import Main from 'components/Hurricane/main'

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
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		margin: '40px 16px',
	},
	container: {
		padding: '48px 36px 0',
	},
});

const tabNames = ['Buy', 'Sell', 'Claims'];

function HurricaneContent({classes}) {
    return (
        <>
            <TabBar tabNames={tabNames} />
            <div className='container'>
                <Paper className='paper'>
                    <Main />
                </Paper>
            </div>
        </>
    )
};

export default HurricaneContent;