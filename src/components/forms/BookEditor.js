import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import lodash from 'lodash';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import {
	GridList,
	GridListTileBar,
	GridListTile,
	IconButton,
	Typography,
	Divider,
} from '@material-ui/core';

// Enviroment settings

import FA from '../../lib/font_awesome';
import {BOOK_BIG_THUMBNAIL} from '../../consts/images';
import {
	ACCEPTED_IMAGE_FORMATS,
	FILE_SIZE_LIMITS,
	FILE_SIZES,
	FILE_SIZE_LABEL,
} from '../../consts/uploads';
import {makeAssetUrl} from '../../lib/util';
import {
	updateBookThumbnail,
	updateBookDetails,
	updateBookEnvironment,
} from '../../redux/actions/books';
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
		book: PropTypes.object.isRequired,
		environments: PropTypes.array.isRequired,
		updateBookThumbnail: PropTypes.func,
		updateBookDetails: PropTypes.func,
		updateBookEnvironment: PropTypes.func,
		settingEnv: PropTypes.bool,
	};

	constructor(props) {
		super(props);

		this.state = {
			name: props.book.name,
			description: props.book.description || '',
			thumbnail: props.book.thumbnail,
			selectedSceneId: null,
		};
	}

	componentDidMount() {
		this.setCorrectSceneId();
	}

	setCorrectSceneId = () => {
		const {book} = this.props;
		const selectedSceneId = book.vrEnviromentId || 1;

		this.setState({
			selectedSceneId: selectedSceneId,
		});
	};

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
			bookId: book.id,
		};

		if (this.canUpdateDetails()) {
			updateBookDetails && updateBookDetails(payload);
		}
	};

	handleEnvChange = envId => {
		this.setState({
			selectedSceneId: envId,
		});

		const {book, updateBookEnvironment} = this.props;
		const payload = {
			envId: envId,
			bookId: book.id,
		};

		updateBookEnvironment && updateBookEnvironment(payload);
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
					<Typography type="subheading">BOOK DETAILS</Typography>
					<Divider style={{margin: '0 0 16px 0'}} />
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

	renderSceneGrid = () => {
		const {classes, environments} = this.props;
		const {selectedSceneId} = this.state;

		const list = lodash.map(environments, env => {
			const titleClassName =
				env.id === selectedSceneId
					? `${classes.scene_list_title} ${classes.scene_list_item_active}`
					: `${classes.scene_list_title}`;

			const envId = env.id;

			return (
				<GridListTile key={envId} classes={{root: classes.scene_list_item}}>
					<img src={makeAssetUrl(env.thumbnail)} alt="Book Thumbnail" />
					<GridListTileBar
						title={env.name}
						classes={{
							root: classes.scene_list_tile_bar,
							title: titleClassName,
						}}
						actionIcon={
							<IconButton onClick={() => this.handleEnvChange(envId)}>
								<FontAwesome
									icon={FA.check_circle_o}
									name={FA.check_circle_o}
									className={titleClassName}
								/>
							</IconButton>
						}
					/>
				</GridListTile>
			);
		});

		return (
			<GridList className={classes.scene_list_grid} cols={2.5}>
				{list}
			</GridList>
		);
	};

	renderScenePicker = () => {
		const {classes, environments, settingEnv} = this.props;
		const {selectedSceneId} = this.state;
		const shouldRenderSceneEditor = environments && environments.length && selectedSceneId;

		if (!shouldRenderSceneEditor) {
			return null;
		}

		const rawScene = lodash.find(environments, {id: selectedSceneId});
		const scene = JSON.parse(rawScene.enviromentDefinition);

		const loadingEnv = (
			<React.Fragment>
				<FontAwesome icon={FA.cog} name={FA.cog} spin className={classes.env_loader} />
				<Typography className={classes.upload_label} type="subheading">
					Please wait while the enviroment loads...
				</Typography>
			</React.Fragment>
		);

		return (
			<Card className={classes.scene_card}>
				<CardContent className={classes.scene_card_content}>
					<Typography style={{'alignSelf': 'flex-start'}} type="subheading">SELECT ENVIROMENT</Typography>
					<Divider style={{margin: '0 0 16px 0', width: '100%'}} />
					{settingEnv ? loadingEnv : <VrScene scene={scene} />}
				</CardContent>
				<CardActions className={classes.scene_list_root}>{this.renderSceneGrid()}</CardActions>
			</Card>
		);
	};

	render() {
		const {classes} = this.props;
		return (
			<div className={`${CLASS} ${classes.editor_content}`}>
				{this.renderCoverEditor()}
				{this.renderDetailsEditor()}
				{this.renderScenePicker()}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		uploading: state.books.uploading,
		environments: state.vrenvironments.all_environments,
		settingEnv: state.books.setting_env,
	};
};

const mapDispatchToProps = dispatch => ({
	updateThumbnail: (file, bookId) => dispatch(updateBookThumbnail(file, bookId)),
	updateBookDetails: payload => dispatch(updateBookDetails(payload)),
	updateBookEnvironment: payload => dispatch(updateBookEnvironment(payload)),
	addToast: message => dispatch(addToast(message)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BookEditor));
