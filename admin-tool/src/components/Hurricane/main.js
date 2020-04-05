import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

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
	contentWrapper: {
		height: 700,
	},
	container: {
		padding: '48px 36px 48px 36px',
	},
	slider: {
		width: 1400
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
function HurricaneMainContent({ classes , account, nextStepClick, onSliderChange, loading, selectedPolicyAmount}) {
	let content
	//const [] = useState(0)
	if (loading) {
		content = <p id="loader" className="text-center">Loading...</p>
	} else {
		content = <>Put here</>
	}

	useEffect(() => {
		// Update the document title using the browser API
		document.title = `You clicked ${account} times`;
	});

	return (
		<div className={classes.container}>			
			<Grid
				container
				spacing={1}
				className={classes.contentWrapper}
				alignItems="center"
				justify="center"
			>					
				<Grid lg={12} xs={12} item>
					<Typography variant="h5" color="textPrimary" align="center">
						Buy a Hurricane policy for account: [{account}]
					</Typography>						
				</Grid>
				<hr />
				<Grid lg={12} xs={12} container item spacing={3}>
					<PolicySlider
						className={classes.slider}						
						min={25}
						max={500}
						step={5}
						valueLabelDisplay="on"
						aria-label="pretto slider" 
						defaultValue={100}
						onChange={onSliderChange}	
					/>
				</Grid>
				<Grid lg={12} xs={12} container item spacing={3}>


					<label>Selected Amount: </label>{selectedPolicyAmount}
				</Grid>
				
				<Grid lg={12} xs={12} container item spacing={3}>
					<Typography component="h2" color="textPrimary" align="center">
						Claims are automatically paid if Hurricane-strength wind speeds
			            are recorded by government weather stations within 15 mile radius
						of your home or business.
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container spacing={3} item>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 3 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount * 10}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container spacing={3} item>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 4 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount * 20}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container item spacing={3}>
					<Typography component="h2" color="textPrimary" align="center">
						<label>Category 5 </label>
						<label>Max Payout: </label><br />
						USD {selectedPolicyAmount *30}
					</Typography>
				</Grid>
				<Grid item container spacing={3}>
					{/* if/else if there are items to list or fresh start... */}
					<Button variant="contained" 
						color="primary"
						value={account}
						onClick={(account) => nextStepClick(account)}
					>Next Step</Button>
				</Grid>
			</Grid>
			{/* <CenteredGrid c={classes} account={account} onSliderChange={onSliderChange} /> */}
		</div>
	)
}

HurricaneMainContent.propTypes = {
	classes: PropTypes.object,
}

function CenteredGrid({ c, account, onClick, onSliderChange, loading, selectedPolicyAmount}) {
	//const classes = useStyles(c);
  
	return (
	  <div className={c.root}>
		<Grid container spacing={1}>
		  <Grid item xs={12}>
			<Paper className={c.paper}>
				<Typography variant="h5" color="textPrimary" align="center">
					Buy a Hurricane policy for account: [{account}]
				</Typography>
			</Paper>
		  </Grid>
		  <Grid item xs={12} lg={12}>
			<Paper className={c.paper}>
			<PolicySlider
						className={c.slider}						
						min={25}
						max={500}
						step={5}
						valueLabelDisplay="on"
						aria-label="pretto slider" 
						defaultValue={100}
						onChange={onSliderChange}	
					/>
			</Paper>
		  </Grid>
		  <Grid item xs={12} lg={4} >
			<Paper className={c.paper}>
				1
			</Paper>
		  </Grid>
		  <Grid item xs={12} lg={4} >
			<Paper className={c.paper}>
				2
			</Paper>
		  </Grid>
		  <Grid item xs={12} lg={4} >
			<Paper className={c.paper}>
				3
			</Paper>
		  </Grid>
		  
		</Grid>
	  </div>
	);
  }

function SpacingGrid() {
	const [spacing, setSpacing] = React.useState(2);
	const classes = useStyles();
  
	const onRadioChange = (event) => {
	  setSpacing(Number(event.target.value));
	};
  
	return (
	  <Grid container className={classes.root} spacing={2}>
		<Grid item xs={12}>
		  <Grid container justify="center" spacing={spacing}>
			{[0, 1, 2].map((value) => (
			  <Grid key={value} item>
				<Paper className={classes.paper} />
			  </Grid>
			))}
		  </Grid>
		</Grid>
		<Grid item xs={12}>
		  <Paper className={classes.control}>
			<Grid container>
			  <Grid item>
				<FormLabel>spacing</FormLabel>
				<RadioGroup
				  name="spacing"
				  aria-label="spacing"
				  value={spacing.toString()}
				  onChange={onRadioChange}
				  row
				>
				  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
					<FormControlLabel
					  key={value}
					  value={value.toString()}
					  control={<Radio />}
					  label={value.toString()}
					/>
				  ))}
				</RadioGroup>
			  </Grid>
			</Grid>
		  </Paper>
		</Grid>
	  </Grid>
	);
  }

export default withStyles(styles)(HurricaneMainContent)
