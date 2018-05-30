// Node Modules
import 'aframe';
import 'aframe-environment-component';
import {Entity, Scene, Camera} from 'aframe-react';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider, {Paper} from '@material-ui/core';

// Enviroment settings

import FA from '../../lib/font_awesome';
import {register} from '../../redux/actions/auth';
import {BOOK_BIG_THUMBNAIL} from '../../consts/images';
import {
	ACCEPTED_IMAGE_FORMATS,
	FILE_SIZE_LIMITS,
	FILE_SIZES,
	FILE_SIZE_LABEL,
} from '../../consts/uploads';
import {makeAssetUrl} from '../../lib/util';
import {updateBookThumbnail, updateBookDetails} from '../../redux/actions/books';
import {addToast} from '../../redux/actions/application';
import {Toast} from '../../consts/toasts';

// Components

import InputField from './InputField';
import ImageWithFallback from '../graphics/ImageWithFallback';
import WithDropZone from '../../hoc/WithDropZone';

// Component Code

import styles from '../../styles/BookEditor';
import VrScene from '../vr/VrScene';
const CLASS = 'top-BookEditor';

class BookEditor extends Component {
	static propTypes = {
		register: PropTypes.func.isRequired,
		book: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			name: props.book.name,
			description: props.book.description || '',
			thumbnail: props.book.thumbnail,
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password && !!this.state.username;
	}

	submit() {
		this.props.register(this.state.username, this.state.email, this.state.password);
	}

	handleThumbnail = files => {
		const {updateThumbnail, book} = this.props;
		if (!files || !files.length) {
			return;
		}
		const file = files[0];
		updateThumbnail && updateThumbnail(file, book.id);
	};

	canUpdateDetails = () => {
		const {name, description} = this.state;
		const {book} = this.props;

		const nameChanged = name && book.name !== name;
		const descriptionChanged = description && book.description !== description;
		return nameChanged || descriptionChanged;
	};

	handleDetails = () => {
		const {updateBookDetails, book} = this.props;
		const {name, description} = this.state;
		const payload = {
			name: name || '',
			description: description || '',
			bookId: book.id
		};

		if (this.canUpdateDetails()) {
			updateBookDetails && updateBookDetails(payload);
		}
	};

	handleRejected = rejected => {
		const {addToast} = this.props;
		if (rejected && rejected.length) {
			const {size} = rejected[0];
			let error;
			error = `That file format is not allowed! Must be ${ACCEPTED_IMAGE_FORMATS.jpeg}, ${
				ACCEPTED_IMAGE_FORMATS.jpg
			} or ${ACCEPTED_IMAGE_FORMATS.png}`;
			if (size >= FILE_SIZE_LIMITS[FILE_SIZES[5]]) {
				error = `Thumbnail can't be uploaded. Maximum size allowed is ${
					FILE_SIZE_LABEL[FILE_SIZES[5]]
				} Try another file!`;
			}
			addToast && addToast(new Toast(error));
		}
		return;
	};

	renderCoverEditor = () => {
		const {classes, uploading} = this.props;
		const {thumbnail} = this.state;
		const uploadFormats = [
			ACCEPTED_IMAGE_FORMATS.jpg,
			ACCEPTED_IMAGE_FORMATS.jpeg,
			ACCEPTED_IMAGE_FORMATS.png,
		];

		const uploadingLabel = <FontAwesome icon={FA.cog} name={FA.cog} spin />;
		return (
			<Card className={classes.cover_card}>
				<CardContent className={classes.cover_card_content}>
					<ImageWithFallback
						image={makeAssetUrl(thumbnail)}
						width={BOOK_BIG_THUMBNAIL.width}
						height={BOOK_BIG_THUMBNAIL.height}
					/>
				</CardContent>
				<CardActions>
					<WithDropZone
						accept={uploadFormats}
						maxSize={FILE_SIZE_LIMITS[FILE_SIZES[5]]}
						onDrop={this.handleThumbnail}
						onDropRejected={this.handleRejected}
						disabled={uploading}
					>
						<Button className={classes.card_button} size="medium" color="primary">
							{uploading ? uploadingLabel : 'Change cover'}
						</Button>
					</WithDropZone>
				</CardActions>
			</Card>
		);
	};

	renderDetailsEditor = () => {
		const {classes} = this.props;
		const {name, description} = this.state;
		return (
			<Card className={classes.details_card}>
				<CardContent className={classes.details_card_content}>
					<InputField
						id="bookName"
						type="text"
						label="Name"
						defaultValue={name}
						onChange={val => this.setState({name: val})}
					/>
					<InputField
						className={classes.details_description}
						id="bookDescription"
						multiline
						type="text"
						label="Description"
						rows={7}
						rowsMax={7}
						defaultValue={description}
						placeholder={'Set book description...'}
						onChange={val => this.setState({description: val})}
					/>
				</CardContent>
				<CardActions>
					CardContent
					<Button
						disabled={!this.canUpdateDetails()}
						onClick={this.handleDetails}
						className={classes.card_button}
						size="medium"
						color="primary"
					>
						Save Changes
					</Button>
				</CardActions>
			</Card>
		);
	};

	// renderVrEditor = () => {
	// 	return <VrScene book={this.props.book}/>;
	// }

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.editor_content}>
				{this.renderCoverEditor()}
				{this.renderDetailsEditor()}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	uploading: state.books.uploading,
});

const mapDispatchToProps = dispatch => ({
	updateThumbnail: (file, bookId) => dispatch(updateBookThumbnail(file, bookId)),
	updateBookDetails: (payload) => dispatch(updateBookDetails(payload)),
	addToast: message => dispatch(addToast(message)),
	register: (username, email, password) => dispatch(register(username, email, password)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BookEditor));
