// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import lodash from 'lodash';

import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';

// Enviroment settings

import FA from '../../lib/font_awesome';
import {dismissToast} from '../../redux/actions/application';

// Component Code

class Toast extends Component {
	static propTypes = {
		toast: PropTypes.object,
	};

	handleToastDismiss(id) {
		this.props.dismissToast(id);
	}

	renderToast() {
		const {toast} = this.props;
		const snackbarAction = (
			<Button color="inherit" onClick={() => this.handleToastDismiss(toast.id)}>
				<FontAwesome icon={FA.times} name={FA.times} />
			</Button>
		);
		return (
			<Snackbar
				anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
				open={true}
				action={snackbarAction}
				onClose={() => this.handleToastDismiss(toast.id)}
				message={toast.message}
				autoHideDuration={toast.duration}
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

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
