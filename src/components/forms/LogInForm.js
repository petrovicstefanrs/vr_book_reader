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
import {login, clearAuthMessage} from "../../redux/actions/auth";

// Containers

// Components

import InputField from './InputField';

// Component Code

const CLASS = 'top-AuthForm';

class LogInForm extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
		this.handleMessageDone = this.handleMessageDone.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password;
	}

	submit() {
	 	this.props.login(this.state.email, this.state.password);
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
				    title="Sign in"
				    showMenuIconButton={false}
				    zDepth={3}
				  />
	  			<Card className="AuthCard">
					<CardMedia className="AuthCardMedia">
						<InputField
					    	id='userEmail'
					    	type='text'
					    	floatingLabelText='Email'
					    	onChange={(val) => this.setState({email: val})}
					    />
					    <InputField
					    	id='userPassword'
					    	type='password'
					    	floatingLabelText='Password'
					    	onChange={(val) => this.setState({password: val})}
					    />
					</CardMedia>
					<CardActions>
						<RaisedButton disabled={disabled} label={"SIGN IN"} primary={true} fullWidth={true} onClick={this.submit} />
					    <span className="formInfoText">
					    	Don't have an account?<br/>
					    	<Link className="buttonLink" to={routes.AUTH_REGISTER}>Sign Up</Link>
					    </span>
					</CardActions>
				</Card>
				<Snackbar
	  				open={!!this.props.login_message}
	  				action={snackbarAction}
	  				onActionClick={this.handleMessageDone}
	  				onRequestClose={this.handleMessageDone}
	  				message={this.props.login_message || ""}
	  				autoHideDuration={5000}/>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	login_message: state.auth.message,
	error: !!state.auth.error
});

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
	clearAuthMessage: () => dispatch(clearAuthMessage())
});

export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);