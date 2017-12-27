// Node Modules

import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Enviroment settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {register} from "../../redux/actions/auth";

// Containers

// Components

import IconButton from '../buttons/IconButton';
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
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password && !!this.state.username;
	}

	submit() {
		this.props.register(this.state.username, this.state.email, this.state.password);
	}

  	render() {
  		const message = this.props.register_message
  			? (<Alert className="messageAuth" bsStyle={this.props.error ? "danger" : "warning"}>{this.props.register_message}</Alert>)
  			: null;
  		const disabled = !this.canSubmit();
  		return (
		  	<div className={CLASS}>
		  		<form>
				    <InputField
				    	id='userName'
				    	type='text'
				    	placeholder='Username'
				    	icon={FA.user}
				    	onChange={ (val) => this.setState({username: val})}
				    />
				    <InputField
				    	id='userEmail'
				    	type='email'
				    	placeholder='Email'
				    	icon={FA.envelope}
				    	onChange={ (val) => this.setState({email: val})}
				    />
				    <InputField
				    	id='userPassword'
				    	type='password'
				    	placeholder='Password'
				    	icon={FA.lock}
				    	onChange={ (val) => this.setState({password: val})}
				    />
				    <IconButton disabled={disabled} className="buttonSubmit" pullright="true" onClick={this.submit}>SIGN UP</IconButton>
				    {message}
				    <span className="separator"></span>
				    <span className="formInfoText">
				    	Already have an account?<br/>
				    	<Link className="buttonLink" to={routes.AUTH_LOGIN}>Sign In</Link>
				    </span>
				</form>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	register_message: state.auth.message,
	error: !!state.auth.error,
	loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
	register: (username, email, password) => dispatch(register(username, email, password))
});

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);