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

class LogInForm extends Component {

	constructor(props) {
		super(props);
	}

  	render() {
  		return (
		  	<div className={CLASS}>
		  		<form>
				    <FieldGroup
				    	id='userEmail'
				    	inputType='email'
				    	placeholder='Your email'
				    	icon={FA.envelope}
				    />
				    <FieldGroup
				    	id='userPassword'
				    	inputType='password'
				    	placeholder='Your password'
				    	icon={FA.lock}
				    />
				    <IconButton className="buttonSubmit" pullright="true">SIGN IN</IconButton>

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
});

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(LogInForm);