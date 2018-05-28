// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// Component Code

import styles from '../../styles/ComingSoonSign';
const CLASS = 'top-ComingSoonSign';

class ComingSoonSign extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		className: PropTypes.string,
	};

	render() {
		const classes = this.props.classes;
		const className = this.props.className
			? `${this.props.className} ${classes.sign}`
			: classes.sign;
		return (
			<div className={CLASS}>
				<Paper className={className}>
					<Typography className={classes.label} type="subheading">
						Coming Soon
					</Typography>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ComingSoonSign));
