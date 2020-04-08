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
import Fab from '@material-ui/core/Fab';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { Table, TableBody, TableCell,
	TableContainer, TableHead, TableRow } from '@material-ui/core';

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
		'& > *': {
			margin: theme.spacing(1),
		},
	  	width: 300 + theme.spacing(3) * 2,
	},
	margin: {
	  height: theme.spacing(3),
	}
  }));

  const ColorlibConnector = withStyles({
	alternativeLabel: {
	  top: 22,
	},
	active: {
	  '& $line': {
		backgroundImage:
		  'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
	  },
	},
	completed: {
	  '& $line': {
		backgroundImage:
		  'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
	  },
	},
	line: {
	  height: 3,
	  border: 0,
	  backgroundColor: '#eaeaf0',
	  borderRadius: 1,
	},
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
	root: {
	  backgroundColor: '#ccc',
	  zIndex: 1,
	  color: '#fff',
	  width: 50,
	  height: 50,
	  display: 'flex',
	  borderRadius: '50%',
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	active: {
	  backgroundImage:
		'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	  boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	},
	completed: {
	  backgroundImage:
		'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	},
  });
  
  function ColorlibStepIcon(props) {
	const classes = useColorlibStepIconStyles();
	const { active, completed } = props;
  
	const icons = {
	  1: <SettingsIcon />,
	  2: <GroupAddIcon />,
	  3: <VideoLabelIcon />,
	  4: <VideoLabelIcon />,
	};
  
	return (
	  <div
		className={clsx(classes.root, {
		  [classes.active]: active,
		  [classes.completed]: completed,
		})}
	  >
		{icons[String(props.icon)]}
	  </div>
	);
  }
  
  ColorlibStepIcon.propTypes = {
	active: PropTypes.bool,
	completed: PropTypes.bool,
	icon: PropTypes.node,
  };
  
  const useStepperStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	},
	button: {
	  marginRight: theme.spacing(1),
	},
	instructions: {
	  marginTop: theme.spacing(1),
	  marginBottom: theme.spacing(1),
	},
  }));
  
function getSteps() {
	return ['Select Amount of Coverage', 'Insured Information', 'Payment Information', 'Confirmation' ];
}
  
function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Select Amount of Coverage';
		case 1:
			return 'Insured Information';
		case 2:
			return 'Payment Information';
		case 3:
			return 'Confirmation';
		default:
			return 'Unknown step';
	}
}
  
function CustomizedSteppers() {
	const classes = useStepperStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();
  
	const handleNext = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
  
	const handleBack = () => {
	  setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
  
	const handleReset = () => {
	  setActiveStep(0);
	};
  
	return (
	  <div className={classes.root}>		
		<Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
		  {steps.map((label) => (
			<Step key={label}>
			  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
			</Step>
		  ))}
		</Stepper>
		{/** ToDo: Move buttons to bottom */}
		<div>
		  {activeStep === steps.length ? (
			<div>
			  <Typography className={classes.instructions}>
				All steps completed - you&apos;re finished
			  </Typography>
			  <Button onClick={handleReset} className={classes.button}>
				Reset
			  </Button>
			</div>
		  ) : (
			<div>
			  <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
			  <div>
				<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
				  Back
				</Button>
				<Button
				  variant="contained"
				  color="primary"
				  onClick={handleNext}
				  className={classes.button}
				>
				  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
				</Button>
			  </div>
			</div>
		  )}
		</div>
	  </div>

	);
  }

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
	  backgroundColor: 'black',
	  border: '2px solid black',
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
	  borderRadius: 1,
	},
	rail: {
	  height: 12,
	  borderRadius: 1,
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
		Connected Account: [{account}]		
			<Grid
				container
				spacing={1}
				className={classes.contentWrapper}
				alignItems="center"
				justify="center"
			>				
				<Grid lg={12} sm={12} item>
					<CustomizedSteppers step={1} />
				</Grid>	
				<Grid lg={12} xs={12} item>
					<Typography variant="h3" color="textPrimary" align="center">
						Hurricane Coverage
					</Typography>
					<Typography align='center'>
						Coverage payouts pre-agreed upon amounts will be paid directly to the 
						account you have on your profile.
					</Typography>
					{/* <Typography variant="h5" color="textPrimary" align="center">
						Connected Account: [{account}]
					</Typography>						 */}
				</Grid>
				<Grid lg={12} xs={12} container item spacing={3}>

				</Grid>
				<Grid lg={12} xs={12} container item spacing={3}>
				<br /><br />
					<PolicySlider
						className={classes.slider}						
						min={25}
						max={500}
						step={5}
						valueLabelDisplay="on"
						aria-label="premium slider" 
						defaultValue={100}
						onChange={onSliderChange}	
					/>
				</Grid><br /><br /><br />
				<Grid lg={12} xs={12} container item spacing={3}>
					<label>Selected Amount: </label>{selectedPolicyAmount}
				</Grid>
				
				<Grid lg={12} xs={12} container item spacing={3}>
					<Typography variant="h5" color="textPrimary" align="center">
						Claims are automatically paid if Hurricane-strength wind speeds
			            are recorded by government weather stations within 15 mile radius
						of your home or business.
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container spacing={3} item>
					<Typography variant="h5" color="textPrimary" align="center">
						<label>Category 3 [111 mph - 129 mph] </label><br />
						<label>Max Payout: </label>
						USD {selectedPolicyAmount * 10}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container spacing={3} item>
					<Typography variant="h5" color="textPrimary" align="center">
						<label>Category 4 [130 mph - 156 mph] </label><br />
						<label>Max Payout: </label>
						USD {selectedPolicyAmount * 20}
					</Typography>
				</Grid>
				<Grid lg={4} xs={12} container spacing={3} item>
					<Typography variant="h5" color="textPrimary" align="center">
						<label>Category 5 [157+ mph] </label><br />
						<label>Max Payout: </label>
						USD {selectedPolicyAmount * 30}
					</Typography>
				</Grid>
				<Grid item container spacing={3}>
					{/* if/else if there are items to list or fresh start... */}
					<Fab
						account={account}
						value={account}
						variant="extended"
						color="primary"
						onClick={(el, account) => nextStepClick(el, account)}
					>
						Next Step
						<NavigateNextRoundedIcon className={classes.extendedIcon} />						
					</Fab>
				</Grid>
			</Grid>
			{/* <TableContainer component={Paper} elevation={3}>
				<Table className={classes.table} aria-label="caption table">
				
				<TableHead>
					<TableRow>
					<TableCell>Category</TableCell>
					<TableCell align="right">Premium</TableCell>
					<TableCell align="right">Max Payout</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
					<TableRow key={row.name}>
						<TableCell component="th" scope="row">
						{row.name}
						</TableCell>
						<TableCell align="right">{row.regular}</TableCell>
						<TableCell align="right">{row.our}</TableCell>
					</TableRow>
					))}
				</TableBody>
				</Table>
			</TableContainer> */}
		</div>
	)
}


// Table data
function createData(name, premium, payout) {
	return { name, premium, payout };
}

// table rows
const rows = [
	createData('Category 3', '', ''),
	createData('Category 4', '', ''),
	createData('Category 5', '', ''),
];

// Table styles
const tableStyles = makeStyles({
	table: {
		minWidth: 350,
	},
});



HurricaneMainContent.propTypes = {
	classes: PropTypes.object,
}

export default withStyles(styles)(HurricaneMainContent)
