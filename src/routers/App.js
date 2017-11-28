// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

// Enviroment settings

import * as routes from '../lib/routes';
import {initialize} from '../redux/actions/application';

// Containers

import NotFound from '../containers/NotFound';
import Home from '../containers/Home';
import LogIn from '../containers/LogIn';
import Register from '../containers/Register';

// Components

import AuthRoute from '../hoc/AuthRoute';

const CLASS = 'top-App';

class App extends Component {

	constructor(props) {
		super(props);
	}

  	render() {
  		this.props.initialize();
  		return (
		  	<div className={CLASS}>
		  		<Switch>
				  	<AuthRoute exact name="Home" path={routes.HOME} component={Home}/>
				  	<AuthRoute exact name="Login" path={routes.AUTH_LOGIN} component={LogIn}/>
				  	<AuthRoute exact name="Register" path={routes.AUTH_REGISTER} component={Register}/>
				    <AuthRoute name="Not found" path="*" component={NotFound}/>
			    </Switch>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	initialized: state.initialized
});

const mapDispatchToProps = dispatch => {
	return {
		initialize: () => dispatch(initialize())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));