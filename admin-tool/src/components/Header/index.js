import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import HelpIcon from '@material-ui/icons/Help'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Web3 from 'web3'
import Onboard from 'bnc-onboard'

let web3

const onboard = Onboard({
    dappId: '8e84cd42-1282-4e65-bcd0-da4f7b6ad7a4',
    networkId: 5777,
    subscriptions: {
        wallet: wallet => {
            web3 = new Web3(wallet.provider)
            console.log(`${wallet.name} is now connected!`)
        }
    }
})

const lightColor = 'rgba(230, 230, 230, 0.7)'

const styles = theme => ({
	secondaryBar: {
		zIndex: 0,
	},
	menuButton: {
		marginLeft: -theme.spacing.unit,
	},
	iconButtonAvatar: {
		padding: 8,
	},
	link: {
		color: lightColor,
		'&:hover': {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
	},
	avatar: {
		img: {
			margin: 5,
		},
	},
})

/** 
 * @dev Connect Wallet => MetaMask for now
 *
 */
async function connectWallet() {
	await onboard.walletSelect();
    await onboard.walletCheck(); 
	
}




function Header({ classes, onDrawerToggle, title }) {
	return (
		<>
			<AppBar color="primary" position="sticky" elevation={0}>
				<Toolbar>
					<Grid container spacing={4} alignItems="center">
					<Grid item xs>
							<Typography 
								style={{ textTransform: 'capitalize' }} 
								color="inherit" 
								variant="h5"
							>
								{title}
							</Typography>
						</Grid>
						<Grid item>
							<Button 
								className={classes.button} 
								variant="outlined" 
								color="inherit" 
								size="small"
								onClick={connectWallet}
							>
								Connect Wallet
							</Button>
						</Grid>
						<Grid item>
							<Tooltip title="Help">
								<IconButton color="inherit">
									<HelpIcon />
								</IconButton>
							</Tooltip>
						</Grid>
							<Hidden smUp>
								<Grid item>
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={onDrawerToggle}
										className={classes.menuButton}
									>
										<MenuIcon />
									</IconButton>
								</Grid>
							</Hidden>
						<Grid item xs />
						<Grid item>
							<Typography className={classes.link} component="a" href="/document">
								Go to docs
							</Typography>
						</Grid>
						<Grid item>
							<Typography className={classes.link} component="a" href="/messages">
								<Tooltip title="Alerts • No alters">
									<IconButton color="inherit">
										<NotificationsIcon />
									</IconButton>
								</Tooltip>
							</Typography>
						</Grid>
						<Grid item>
							<Typography className={classes.link} component="a" href="/account">
								<IconButton color="inherit" className={classes.iconButtonAvatar}>
									<Avatar className={classes.avatar} src="/images/mockup4.jpg" />
								</IconButton>
							</Typography>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{/*<AppBar component="div" className={classes.secondaryBar} color="primary" position="static" elevation={0}>
				<Toolbar>
					<Grid container alignItems="center" spacing={8}>
						 <Grid item xs>
							<Typography style={{ textTransform: 'capitalize' }} color="inherit" variant="h5">
								{title}
							</Typography>
						</Grid> */}
						{/* <Grid item>
							<Button className={classes.button} variant="outlined" color="inherit" size="small">
								Web setup
							</Button>
						</Grid>
						<Grid item>
							<Tooltip title="Help">
								<IconButton color="inherit">
									<HelpIcon />
								</IconButton>
							</Tooltip>
						</Grid> 
					</Grid>
				</Toolbar>
			</AppBar>*/}
		</>
	)
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	onDrawerToggle: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
}

export default withStyles(styles)(Header)
