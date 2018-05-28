import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from '../styles/ResponsiveDialog';

class ResponsiveDialog extends React.Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		fullScreen: PropTypes.bool.isRequired,
		onClose: PropTypes.func,
		open: PropTypes.bool.isRequired,
		id: PropTypes.string.isRequired,
	};

	static defaultProps = {
		open: false,
	};

	handleClose = () => {
		this.props.onClose();
	};

	render() {
		const {fullScreen, id, title, open, children} = this.props;

		return (
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={this.handleClose}
				aria-labelledby={`dialog-${id}`}
			>
				<DialogTitle id={`dialog-${id}`}>{title}</DialogTitle>
				<DialogContent>{children}</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary" variant="raised">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default withStyles(styles)(withMobileDialog()(ResponsiveDialog));
