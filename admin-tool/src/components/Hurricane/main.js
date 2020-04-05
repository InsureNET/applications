import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	paper: {
		margin: 'auto',
		overflow: 'hidden',
		[theme.breakpoints.up('sm')]: {
			minWidth: 800,
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

const useStyles = makeStyles((theme) => ({
	root: {
	  width: 300 + theme.spacing(3) * 2,
	},
	margin: {
	  height: theme.spacing(3),
	},
  }));

  function ValueLabelComponent(props) {
	const { children, open, value } = props;
  
	return (
	  <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
		{children}
	  </Tooltip>
	);
  }
  
  ValueLabelComponent.propTypes = {
	children: PropTypes.element.isRequired,
	open: PropTypes.bool.isRequired,
	value: PropTypes.number.isRequired,
  };

  const PolicySlider = withStyles({
	root: {
	  color: '#52af77',
	  height: 25,
	  marginLeft: 50,
	  marginRight: 50,
	},
	thumb: {
	  height: 48,
	  width: 24,
	  backgroundColor: 'purple',
	  border: '2px solid purple',
	  marginTop: -8,
	  marginLeft: -12,
	  '&:focus, &:hover, &$active': {
		boxShadow: 'inherit',
	  },
	},
	active: {},
	valueLabel: {
	  left: 'calc(-50% + 4px)',
	},
	track: {
	  height: 12,
	  borderRadius: 2,
	},
	rail: {
	  height: 12,
	  borderRadius: 2,
	},
  })(Slider);



/** @dev main page - default home page */
function HurricaneMainContent({ classes , account, onClick, onSliderChange, loading, selectedPolicyAmount}) {
	let content
	if (loading) {
		content = <p id="loader" className="text-center">Loading...</p>
	} else {
		content = <>Put here</>
	}

	return (
		<div className={classes.container}>			
			<Grid
				container
				spacing={16}
				className={classes.contentWrapper}
				wrap
				alignItems="center"
				justify="center"
			>					
				<Grid lg={12} xs={12} item>
					<Typography variant="h5" color="textPrimary" align="center">
						Buy a Hurricane policy for account: [{account}]
					</Typography>						
				</Grid>
				<hr />
				<Grid lg={12} xs={12} item>
					<PolicySlider
						min={25}
						max={500}
						step={5}
						track={true}
						valueLabelDisplay="on"
						aria-label="pretto slider" 
						defaultValue={100}
						onChange={onSliderChange}	
					/>
				</Grid>
				<Grid lg={12} xs={12} item>


					<label>Selected Amount: </label>{selectedPolicyAmount}
				</Grid>

				<Grid lg={12} xs={12} item>
				<Paper elevation={3}>
					<Typography component="h2" color="textPrimary" align="center">
						Claims are automatically paid if Hurricane-strength wind speeds
			            are recorded by government weather stations within 15 mile radius
						of your home or business.
					</Typography>
					</Paper>
				</Grid>
				<Grid lg={4} xs={12}>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 3 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount * 10}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12}>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 4 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount * 20}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12}>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 5 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount *30}
					</Typography>
				</Grid>
				<Grid>
					{/* if/else if there are items to list or fresh start... */}
					<Button variant="contained" 
						color="primary"
						value={account}
						onClick={(account) => onClick(account)}
					>Next Step</Button>
				</Grid>
			</Grid>
		</div>
	)
}

HurricaneMainContent.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HurricaneMainContent)
