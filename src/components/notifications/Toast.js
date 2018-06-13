// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

// Enviroment settings

import FA from '../../lib/font_awesome';
import {dismissToast} from '../../redux/actions/application';
import { withStyles } from '@material-ui/core';

// Component Code

import styles from '../../styles/Toast';
class Toast extends Component {
	static propTypes = {
		toast: PropTypes.object,
	};

	handleToastDismiss(id) {
		this.props.dismissToast(id);
	}

	renderToast() {
		const {toast, classes} = this.props;
		const snackbarAction = (
			<Button color="inherit" onClick={() => this.handleToastDismiss(toast.id)}>
				<FontAwesome icon={FA.times} name={FA.times} />
			</Button>
		);
		return (
			<Snackbar
				className={classes.snackbar_root}
				anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
				open={true}
				action={snackbarAction}
				onClose={() => this.handleToastDismiss(toast.id)}
				message={toast.message}
				autoHideDuration={/*toast.duration*/null}
			/>
		);
	}

	render() {
		const {toast} = this.props;
		return toast ? this.renderToast() : null;
	}
}

const mapStateToProps = state => {
	return {
		toast: state.toast,
	};
};

const mapDispatchToProps = dispatch => ({
	dismissToast: id => {
		return dispatch(dismissToast(id));
	},
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Toast));
