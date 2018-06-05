// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

// Enviroment settings

import FA from '../../lib/font_awesome';
import {
	ACCEPTED_FILE_FORMATS,
	FILE_SIZE_LIMITS,
	FILE_SIZES,
	FILE_SIZE_LABEL,
} from '../../consts/uploads';
import {uploadBook} from '../../redux/actions/books';

// Components

import WithDropZone from '../../hoc/WithDropZone';

// Component Code

import styles from '../../styles/UploadBookForm';
const CLASS = 'top-UploadBookForm';

class UploadBookForm extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		uploading: PropTypes.bool,
	};

	static defaultProps = {
		uploading: false,
	};

	constructor(props) {
		super(props);

		this.state = {
			error: null,
			maxSize: FILE_SIZES[100],
			uploadingFile: null,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.uploading && this.props.uploading) {
			this.setState({
				uploadingFile: null,
			});
		}
	}

	handleFiles = files => {
		const {uploadBook} = this.props;
		if (!files || !files.length) {
			return;
		}
		const file = files[0];
		uploadBook && uploadBook(file);
		this.setState({
			error: null,
			uploadingFile: file.name,
		});
	};

	handleRejected = rejected => {
		if (rejected && rejected.length) {
			const {size, name} = rejected[0];
			let error;
			error = (
				<React.Fragment>
					<strong>{name}</strong> can't be uploaded.
					<br />That <strong>file format</strong> is not allowed!<br />Try another file!
				</React.Fragment>
			);
			if (size >= FILE_SIZE_LIMITS[this.state.maxSize]) {
				error = (
					<React.Fragment>
						<strong>{name}</strong> can't be uploaded.<br />Maximum size allowed is{' '}
						<strong>{FILE_SIZE_LABEL[this.state.maxSize]}</strong>!<br />Try another file!
					</React.Fragment>
				);
			}
			this.setState({
				error,
			});
		}
		return;
	};

	renderDropzoneContent = () => {
		const {classes, uploading} = this.props;
		const {error} = this.state;
		const uploadFormats = `${ACCEPTED_FILE_FORMATS.cbr}, ${ACCEPTED_FILE_FORMATS.cbz}`;

		let icon = FA.upload;
		error && (icon = FA.ban);

		let message = (
			<React.Fragment>
				<strong>Choose a file</strong> or drag it here!<br />
				Accepted formats: <strong>{uploadFormats}</strong>
			</React.Fragment>
		);
		error && (message = error);

		return (
			<Card className={classes.card}>
				<CardContent
					className={`${classes.cardContent} ${uploading && classes.cardContentDisabled} ${error &&
						classes.cardContentError}`}
				>
					{uploading ? (
						<React.Fragment>
							<FontAwesome icon={FA.cog} name={FA.cog} spin className={classes.upload_icon} />
							<Typography className={classes.upload_label} type="subheading">
								Uploading "{this.state.uploadingFile}"
							</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>
							<FontAwesome icon={icon} name={icon} className={classes.upload_icon} />
							<Typography className={classes.upload_label} type="subheading">
								{message}
							</Typography>
						</React.Fragment>
					)}
				</CardContent>
			</Card>
		);
	};

	render() {
		const {classes, uploading, ...props} = this.props;
		const uploadFormats = [ACCEPTED_FILE_FORMATS.cbr, ACCEPTED_FILE_FORMATS.cbz];

		return (
			<div className={CLASS}>
				<WithDropZone
					{...props}
					accept={uploadFormats}
					maxSize={FILE_SIZE_LIMITS[this.state.maxSize]}
					onDrop={this.handleFiles}
					onDropRejected={this.handleRejected}
					disabled={uploading}
				>
					{this.renderDropzoneContent}
				</WithDropZone>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	uploading: state.books.uploading,
});

const mapDispatchToProps = dispatch => ({
	uploadBook: file => dispatch(uploadBook(file)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UploadBookForm));
