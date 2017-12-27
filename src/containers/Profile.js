// Node Modules

import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import lodash from 'lodash';

// Enviroment Settings

import './Profile.css';

import FA from '../lib/font_awesome';
import {getUser} from "../redux/selectors/users";

// Components

import AsPageContent from '../hoc/AsPageContent';
import ImageWithFallback from '../components/graphics/ImageWithFallback';

// Component Code

const CLASS = 'top-Profile';

class Profile extends Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	};

	static defaultProps = {
		user: {}
	}

	constructor(props) {
		super(props);

		this.state = {
			user: props.user
		};

		this.renderUserInfo = this.renderUserInfo.bind(this);
	}

	renderUserInfo() {
		let username = this.state.user.name || null;
		let email = this.state.user.email || null;
		let img = this.state.user.profile_img || null;

		return (
			<div className="ProfileDetails">
				<ImageWithFallback image={img} width={75} height={75}/>
				<div className="UserInfo">
					<span className="InfoUsername">{username}</span>
					<span className="InfoEmail">{email}</span>
				</div>
			</div>
		);
	}

	render() {
		return (
			<AsPageContent>
				<div className={CLASS}>
					{this.renderUserInfo()}
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({
	user: getUser(state)
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(Profile);