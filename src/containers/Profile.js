// Node Modules

import React, {Component} from 'react';
import {PageHeader, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import lodash from 'lodash';

// Enviroment Settings

import './Profile.css';

import FA from '../lib/font_awesome';
import {getUser} from "../redux/selectors/users";
import {ACCEPT_IMAGE} from "../consts/images";

// Components

import InputField from '../components/forms/InputField';
import WithDropZone from '../components/forms/WithDropZone';
import AsPageContent from '../hoc/AsPageContent';
import ImageWithFallback from '../components/graphics/ImageWithFallback';

// Component Code

const CLASS = 'top-Profile';

class Profile extends Component {

	static propTypes = {
		user: PropTypes.object.isRequired
	};

	static defaultProps = {
		user: {
			profile_img: null,
			name: null,
			email: null
		}
	}

	constructor(props) {
		super(props);

		this.state = {
			user: props.user,
			username: this.props.user.name,
			email: this.props.user.email,
			profile_img: this.props.user.profile_img,
			image_message: null,
			image_error: false
		};

		this.renderUserInfo = this.renderUserInfo.bind(this);
		this.renderUserProfileImage = this.renderUserProfileImage.bind(this);
		this.onDropRejected = this.onDropRejected.bind(this);
	}

	onDropRejected() {
		this.setState({
			image_error: true,
			image_message: "Uploading Failed. Please try again!"
		});
	}

	renderUserProfileImage() {
		let img = this.state.profile_img;

		return (
			<WithDropZone
				accept={ACCEPT_IMAGE}
				onDropRejected={this.onDropRejected}
				maxSize={10}>
				<ImageWithFallback
					image={img}
					width={200}
					height={200}/>
			</WithDropZone>
		);
	}

	renderUserInfo() {
		let userProfileImage = this.renderUserProfileImage();
		const profileErrorMessage = this.state.image_message
			? (<Alert className="messageProfileImage" bsStyle={this.state.image_error ? "danger" : "warning"}>{this.state.image_message}</Alert>)
			: null;
		let username = this.state.user.name;
		let email = this.state.user.email;

		return (
			<div className="ProfileEditor">
				<div className="ProfileContent">
					{userProfileImage}
					{profileErrorMessage}
					<InputField
				    	id='userUsername'
				    	type='text'
				    	icon={FA.user}
				    	onChange={(val) => this.setState({username: val})}
				    	initialValue={username}
				    	label="Username"
				    />
					<InputField
				    	id='userEmail'
				    	type='text'
				    	icon={FA.envelope}
				    	onChange={(val) => this.setState({email: val})}
				    	initialValue={email}
				    	label="Email"
				    />
				</div>
			</div>
		);
	}

	render() {
		return (
			<AsPageContent>
				<div className={CLASS}>
					<PageHeader>Profile</PageHeader>
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