// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Snackbar from 'material-ui/Snackbar';
import {Card, CardActions, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

// Enviroment settings

import * as routes from '../../lib/routes';
import FA from '../../lib/font_awesome';
import {register, clearAuthMessage} from "../../redux/actions/auth";

// Containers

// Components

import InputField from './InputField';

// Component Code

const CLASS = 'top-AuthForm';

class RegisterForm extends Component {
	static propTypes = {
		register: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: ''
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
		this.handleMessageDone = this.handleMessageDone.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password && !!this.state.username;
	}

	submit() {
		this.props.register(this.state.username, this.state.email, this.state.password);
	}

	handleMessageDone() {
		this.props.clearAuthMessage();
	}

  	render() {
  		const disabled = !this.canSubmit();
  		const snackbarAction = (<FontAwesome icon={FA.times} name={FA.times}/>);
  		return (
		  	<div className={CLASS}>
		  		<AppBar
				    title="Sign up"
				    showMenuIconButton={false}
				    zDepth={3}
				  />
				<Card className="AuthCard">
					<CardMedia className="AuthCardMedia">
					    <InputField
					    	id='userName'
					    	type='text'
					    	floatingLabelText='Username'
					    	onChange={ (val) => this.setState({username: val})}
					    />
					    <InputField
					    	id='userEmail'
					    	type='email'
					    	floatingLabelText='Email'
					    	onChange={ (val) => this.setState({email: val})}
					    />
					    <InputField
					    	id='userPassword'
					    	type='password'
					    	floatingLabelText='Password'
					    	onChange={ (val) => this.setState({password: val})}
					    />
					</CardMedia>
					<CardActions>
						<RaisedButton disabled={disabled} label={"SIGN UP"} primary={true} fullWidth={true} onClick={this.submit} />
					    <span className="formInfoText">
					    	Already have an account?<br/>
					    	<Link className="buttonLink" to={routes.AUTH_LOGIN}>Sign In</Link>
					    </span>
					</CardActions>
				</Card>
				<Snackbar
	  				open={!!this.props.register_message}
	  				action={snackbarAction}
	  				onActionClick={this.handleMessageDone}
	  				onRequestClose={this.handleMessageDone}
	  				message={this.props.register_message || ""}
	  				autoHideDuration={5000}/>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	register_message: state.auth.message,
	error: !!state.auth.error
});

const mapDispatchToProps = dispatch => ({
	register: (username, email, password) => dispatch(register(username, email, password)),
	clearAuthMessage: () => dispatch(clearAuthMessage())
});

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);