// Node Modules

import React from 'react';
import {Link} from 'react-router-dom';

import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';

// Enviroment settings

import * as routes from '../lib/routes';

// Components

import AsPageContent from '../hoc/AsPageContent';

import styles from '../styles/NotFound';

const NotFound = props => {
	const classes = props.classes;
	const homeLink = (
		<Link to={routes.HOME}>
			<Typography type="subheading">Go back home</Typography>
		</Link>
	);

	return (
		<AsPageContent>
			<div className={classes.page}>
				<Typography className={classes.headline} type="headline">
					{' '}
					404{' '}
				</Typography>
				<Typography type="title">Oops it seems there's nothing here</Typography>
				{homeLink}
			</div>
		</AsPageContent>
	);
};

export default withStyles(styles)(NotFound);
