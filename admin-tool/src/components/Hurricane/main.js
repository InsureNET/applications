import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';


const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 700,
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: 936,
		},
	},
	searchBar: {
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
	},
	block: {
		display: 'block',
	},
	addUser: {
		marginRight: theme.spacing.unit,
	},
	contentWrapper: {
		height: 368,
	},
	container: {
		padding: '48px 36px 48px',
	},
})

/** @dev main page - default home page */
function HurricaneMainContent({ classes , account, onClick, loading}) {
	let content
	if (loading) {
		content = <p id="loader" className="text-center">Loading...</p>
	} else {
		content = <>Put here</>
	}

	return (
		<div className={classes.container}>
			<Paper className={classes.paper}>
			<Grid lg={6} xs={12} item align="center">
						
					</Grid>
				<Grid
					container
					spacing={16}
					className={classes.contentWrapper}
					wrap
					alignItems="center"
					justify="center"
				>					
					<Grid lg={6} xs={12} item>
						<Typography component="h2" color="textSecondary" align="center">
							Buy a Hurricane policy for {account}
						</Typography>						
					</Grid>
					<Grid>
					{/* if/else if there are items to list or fresh start... */}
						<Button variant="contained" 
							color="primary"
							onClick={onClick}
						>Buy Policy</Button>
					</Grid>

				</Grid>
			</Paper>
		</div>
	)
}

HurricaneMainContent.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HurricaneMainContent)
