// Node Modules

import React from 'react';
import {Link} from 'react-router-dom';

import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

// Enviroment settings

import * as routes from '../lib/routes';

// Components

import AsPageContent from '../hoc/AsPageContent';

const styles = theme => ({
	page: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		margin: 0 ,
		padding: 24,
	    paddingTop: 80,
	    paddingLeft: 80,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		flexDirection: 'column'
	},
	headline: {
		fontSize: '10em',
		fontWeight: 700,
		lineHeight: '1em'
	}
});

const NotFound = (props) => {
	const classes = props.classes;
	const homeLink = <Link to={routes.HOME}><Typography type="subheading">Go back home</Typography></Link>;

	return (
			<AsPageContent>
				<div className={classes.page}>
					<Typography className={classes.headline} type="headline"> 404 </Typography>
					<Typography type="title">Oops it seems there's nothing here</Typography>
					{homeLink}
				</div>
			</AsPageContent>
	);
};

export default withStyles(styles)(NotFound);