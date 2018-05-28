// Node Modules

import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

// Enviroment Settings

// Component Code

import styles from '../styles/AsPageContent';

class AsPageContent extends Component {
	render() {
		const classes = this.props.classes;
		return (
			<Paper className={classes.content} elevation={3}>
				{this.props.children}
			</Paper>
		);
	}
}

export default withStyles(styles)(AsPageContent);
