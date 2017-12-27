// Node Modules

import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Enviroment settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {login} from "../../redux/actions/auth";

// Containers

// Components

import IconButton from '../buttons/IconButton';
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
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password;
	}

	submit() {
	 	this.props.login(this.state.email, this.state.password);
	}

  	render() {
  		const message = this.props.login_message
  			? (<Alert className="messageAuth" bsStyle={this.props.error ? "danger" : "warning"}>{this.props.login_message}</Alert>)
  			: null;
  		const disabled = !this.canSubmit();
  		return (
		  	<div className={CLASS}>
		  		<form>
				    <InputField
				    	id='userEmail'
				    	type='email'
				    	placeholder='Your email'
				    	icon={FA.envelope}
				    	onChange={ (val) => this.setState({email: val})}
				    />
				    <InputField
				    	id='userPassword'
				    	type='password'
				    	placeholder='Your password'
				    	icon={FA.lock}
				    	onChange={ (val) => this.setState({password: val})}
				    />
				    <IconButton disabled={disabled} className="buttonSubmit" pullright="true" onClick={this.submit}>SIGN IN</IconButton>
				    {message}
				    <span className="separator"></span>
				    <span className="formInfoText">
				    	Don't have an account?<br/>
				    	<Link className="buttonLink" to={routes.AUTH_REGISTER}>Sign Up</Link>
				    </span>
				</form>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	login_message: state.auth.message,
	error: !!state.auth.error,
	loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password))
});

export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);