// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// Enviroment Settings

import {getBook} from '../../redux/actions/books';
import {getEnvironments} from '../../redux/actions/vrenvironments';
import {setMenuActive} from '../../redux/actions/menu';
import {PROFILE} from '../../consts/pages';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import ProfileEditor from '../../components/forms/ProfileEditor';

// Component Code

import styles from '../../styles/ProfileSettings';
const CLASS = 'top-ProfileSettings';

class ProfileSettings extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		user: PropTypes.object,
	};

	static defaultProps = {
		user: null,
	};

	componentDidMount() {
		const {setMenuActive} = this.props;
		setMenuActive(PROFILE);
	}

	renderEditor() {
		// const {user} = this.props;
		// return <ProfileEditor user={user}/>;
		return 'Kobijagi placeholder';
	}

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
					{this.renderEditor()}
					<div className={classes.container} />
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = (state, props) => ({
	user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
	getBook: id => dispatch(getBook(id)),
	getEnvironments: () => dispatch(getEnvironments()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ProfileSettings));
