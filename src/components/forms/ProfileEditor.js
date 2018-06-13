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
	Typography,
	Divider,
	IconButton,
	GridListTileBar,
	GridListTile,
	GridList,
} from '@material-ui/core';

import UserAvatar from 'react-user-avatar';

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
	updateUserAvatar,
	updateProfileDetails,
	updateProfilePassword,
	updateProfileDeactivate,
    updateProfileTheme,
} from '../../redux/actions/profile';
import {addToast} from '../../redux/actions/application';
import {Toast} from '../../consts/toasts';

// Components

import InputField from './InputField';
import WithDropZone from '../../hoc/WithDropZone';

// Component Code

import styles from '../../styles/ProfileEditor';
const CLASS = 'top-ProfileEditor';

class ProfileEditor extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		themes: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);
		const {user} = props;
		this.state = {
			firstname: user ? user.firstname : '',
			lastname: user ? user.lastname : '',
			username: user ? user.username : '',
			email: user ? user.email : '',
			avatar: user ? user.avatar : null,
			selectedTheme: user ? user.uiThemeId : null,
			password: null,
			password_repeat: null,
		};
	}

	handleAvatar = files => {
		const {updateAvatar, user} = this.props;
		if (!files || !files.length) {
			return;
		}
		const file = files[0];
		updateAvatar && updateAvatar(file, user.id);
	};

	canUpdateDetails = () => {
		const {lastname, firstname, email} = this.state;
		const {user} = this.props;

		const nameChanged = firstname && user.firstname !== firstname;
		const lastnameChanged = lastname && user.lastname !== lastname;
		const emailChanged = email && user.email !== email;
		return nameChanged || lastnameChanged || emailChanged;
	};

	canUpdatePassword = () => {
		const {password, password_repeat} = this.state;

		if (!password || !password_repeat) {
			return false;
		}

		return password === password_repeat;
	};

	handleDetails = () => {
		const {updateProfileDetails} = this.props;
		const {lastname, firstname, email} = this.state;
		const payload = {
			lastname: lastname || '',
			firstname: firstname || '',
			email: email || '',
		};

		if (this.canUpdateDetails()) {
			updateProfileDetails && updateProfileDetails(payload);
		}
	};

	handlePassword = () => {
		const {updateProfilePassword} = this.props;
		const {password} = this.state;

		if (this.canUpdatePassword()) {
			updateProfilePassword && updateProfilePassword(password);
		}
	};

	handleDeactivate = () => {
		const {updateProfileDeactivate} = this.props;

		updateProfileDeactivate && updateProfileDeactivate();
	};

    handleThemeChange = (themeId) => {
		const {updateProfileTheme} = this.props;

		updateProfileTheme && updateProfileTheme(themeId);
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
				error = `Avatar can't be uploaded. Maximum size allowed is ${
					FILE_SIZE_LABEL[FILE_SIZES[5]]
				} Try another file!`;
			}
			addToast && addToast(new Toast(error));
		}
		return;
	};

	renderAvatarEditor = () => {
		const {classes, uploading} = this.props;
		const {avatar, lastname, username, firstname} = this.state;
		const uploadFormats = [
			ACCEPTED_IMAGE_FORMATS.jpg,
			ACCEPTED_IMAGE_FORMATS.jpeg,
			ACCEPTED_IMAGE_FORMATS.png,
		];

		const avatarUrl = avatar ? makeAssetUrl(avatar) : null;
		const displayName = firstname || lastname ? `${firstname} ${lastname}` : username;
		const uploadingLabel = <FontAwesome icon={FA.cog} name={FA.cog} spin />;
		return (
			<Card className={classes.avatar_card}>
				<CardContent className={classes.avatar_card_content}>
					<UserAvatar size={BOOK_BIG_THUMBNAIL.width} name={displayName} src={avatarUrl} />
				</CardContent>
				<CardActions>
					<WithDropZone
						accept={uploadFormats}
						maxSize={FILE_SIZE_LIMITS[FILE_SIZES[5]]}
						onDrop={this.handleAvatar}
						onDropRejected={this.handleRejected}
						disabled={uploading}
					>
						<Button className={classes.card_button} size="medium" color="primary">
							{uploading ? uploadingLabel : 'Change avatar'}
						</Button>
					</WithDropZone>
				</CardActions>
			</Card>
		);
	};

	renderDetailsEditor = () => {
		const {classes} = this.props;
		const {firstname, lastname, email} = this.state;
		return (
			<Card className={classes.details_card}>
				<CardContent className={classes.details_card_content}>
					<Typography type="subheading">USER DETAILS</Typography>
					<Divider />
					<InputField
						className={classes.details_card_content_item}
						id="profileName"
						type="text"
						label="Firstname"
						defaultValue={firstname}
						onChange={val => this.setState({firstname: val})}
					/>
					<InputField
						className={classes.details_card_content_item}
						id="profileLastname"
						type="text"
						label="Lastname"
						defaultValue={lastname}
						onChange={val => this.setState({lastname: val})}
					/>
					<InputField
						className={classes.details_card_content_item}
						id="profileEmail"
						type="text"
						label="Email"
						defaultValue={email}
						onChange={val => this.setState({email: val})}
					/>
				</CardContent>
				<CardActions>
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

	renderSecurityEditor = () => {
		const {classes} = this.props;
		return (
			<Card className={classes.security_card}>
				<CardContent className={classes.security_card_content}>
					<Typography color="secondary" type="subheading">
						SECURITY
					</Typography>
					<Divider />
					<InputField
						className={classes.details_card_content_item}
						id="profilePassword"
						type="password"
						label="New Password"
						onChange={val => this.setState({password: val})}
					/>
					<InputField
						className={classes.details_card_content_item}
						id="profilePasswordAgain"
						type="password"
						label="Repeat New Password"
						onChange={val => this.setState({password_repeat: val})}
					/>
				</CardContent>
				<CardActions classes={{root: classes.vertical_card_actions}}>
					<Button
						disabled={!this.canUpdatePassword()}
						onClick={this.handlePassword}
						className={classes.card_button}
						size="medium"
						color="primary"
					>
						Save new Password
					</Button>
					<Divider className={classes.full_width} />
					<Button
						onClick={this.handleDeactivate}
						className={classes.card_button}
						size="medium"
						color="secondary"
					>
						<FontAwesome icon={FA.warning} name={FA.warning} />
						<span style={{margin: '0 0 0 8px'}}>Disable Account</span>
					</Button>
				</CardActions>
			</Card>
		);
	};

	renderThemePicker = () => {
		const {classes, themes} = this.props;
		const {selectedTheme} = this.state;

		const list = lodash.map(themes, theme => {
			const titleClassName =
				theme.id === selectedTheme
					? `${classes.theme_list_title} ${classes.theme_list_item_active}`
					: `${classes.theme_list_title}`;

			const themeId = theme.id;

			return (
				<GridListTile key={themeId} classes={{root: classes.theme_list_item}}>
					<img src={makeAssetUrl(theme.thumbnail)} alt="Book Thumbnail" />
					<GridListTileBar
						title={theme.name}
						classes={{
							root: classes.theme_list_tile_bar,
							title: titleClassName,
						}}
						actionIcon={
							<IconButton onClick={() => this.handleThemeChange(themeId)}>
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
			<Card className={classes.theme_card}>
				<CardContent className={classes.theme_card_content}>
					<Typography style={{alignSelf: 'flex-start'}} type="subheading">
						UI THEME
					</Typography>
					<Divider style={{margin: '0 0 16px 0', width: '100%'}} />
					<GridList className={classes.theme_list_grid} cols={1}>
						{list}
					</GridList>
				</CardContent>
			</Card>
		);
	};

	render() {
		const {classes} = this.props;
		return (
			<div className={`${CLASS} ${classes.editor_content}`}>
				{this.renderAvatarEditor()}
				{this.renderDetailsEditor()}
				{this.renderSecurityEditor()}
				{this.renderThemePicker()}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		uploading: state.profile.uploading,
	};
};

const mapDispatchToProps = dispatch => ({
	updateAvatar: (file, userId) => dispatch(updateUserAvatar(file, userId)),
	updateProfileDetails: payload => dispatch(updateProfileDetails(payload)),
	updateProfilePassword: password => dispatch(updateProfilePassword(password)),
	updateProfileDeactivate: () => dispatch(updateProfileDeactivate()),
	updateProfileTheme: (themeId) => dispatch(updateProfileTheme(themeId)),
	addToast: message => dispatch(addToast(message)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProfileEditor));
