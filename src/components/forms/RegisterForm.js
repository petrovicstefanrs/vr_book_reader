// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// Enviroment settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';

// Containers

// Components

import IconButton from '../buttons/IconButton';
import FieldGroup from './FieldGroup';

// Component Code

const CLASS = 'top-AuthForm';

class RegisterForm extends Component {

	constructor(props) {
		super(props);
	}

  	render() {
  		return (
		  	<div className={CLASS}>
		  		<form>
				    <FieldGroup
				    	id='userName'
				    	inputType='text'
				    	placeholder='Username'
				    	icon={FA.user}
				    />
				    <FieldGroup
				    	id='userEmail'
				    	inputType='email'
				    	placeholder='Email'
				    	icon={FA.envelope}
				    />
				    <FieldGroup
				    	id='userPassword'
				    	inputType='password'
				    	placeholder='Password'
				    	icon={FA.lock}
				    />
				    <IconButton className="buttonSubmit" pullright="true">SIGN UP</IconButton>

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
});

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);