// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// Enviroment Settings

import * as routes from '../../lib/routes';
import {setMenuActive} from '../../redux/actions/menu';
import {getUser} from '../../redux/actions/profile';
import {getThemes} from '../../redux/actions/themes';
import {PROFILE} from '../../consts/pages';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import ProfileEditor from '../../components/forms/ProfileEditor';
import StretchableSpinner from '../StretchableSpinner';

// Component Code

import styles from '../../styles/ProfileSettings';
const CLASS = 'top-ProfileSettings';

class ProfileSettings extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		user: PropTypes.object,
		themes: PropTypes.array,
	};

	static defaultProps = {
		user: null,
		themes: null,
	};

	componentDidMount() {
		const {setMenuActive, getThemes, getUser, user, themes} = this.props;
		if (!user) {
			getUser && getUser();
		}
		if (!themes) {
			getThemes && getThemes();
		}
		setMenuActive(PROFILE);
	}

	renderEditor() {
		const {user, themes, loading} = this.props;

		return loading ? (
			<StretchableSpinner />
		) : (user && themes) ? (
			<ProfileEditor user={user} themes={themes}/>
		) : (
			this.renderUserNotFound()
		);
	}

	renderUserNotFound = () => {
		const classes = this.props.classes;
		const homeLink = (
			<Link to={routes.DASHBOARD_HOME}>
				<Typography color="secondary" type="subheading">
					Go back to Home Page
				</Typography>
			</Link>
		);
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					¯\_(ツ)_/¯
				</Typography>
				<Typography type="title">We are very sorry, we couldn't find your profile.</Typography>
				{homeLink}
			</div>
		);
	};

	render() {
		const {classes, user} = this.props;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						{user ? (
							<React.Fragment>
								<Typography variant="headline">Profile Settings</Typography>
								<Divider />
							</React.Fragment>
						) : null}
					</div>
					<div className={classes.container}>{this.renderEditor()}</div>
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = (state, props) => ({
	user: state.profile.user,
	themes: state.themes.data,
	loading: !state.profile.user || state.profile.loading || !state.themes.data,
});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
	getUser: () => dispatch(getUser()),
	getThemes: () => dispatch(getThemes()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProfileSettings));
