// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

import Reboot from 'material-ui/Reboot';

// Enviroment settings

import * as routes from '../lib/routes';
import {initialize} from '../redux/actions/application';
import {isLoggedIn} from '../redux/selectors/auth';

// Containers

import NotFound from '../containers/NotFound';
import Home from '../containers/Home';
import LogIn from '../containers/LogIn';
import Register from '../containers/Register';
import Dashboard from '../containers/Dashboard';
import MainMenu from '../components/layout/MainMenu';

// Components

import AuthRoute from '../hoc/AuthRoute';
import StretchableSpinner from '../containers/StretchableSpinner';

const CLASS = 'top-App';

class App extends Component {
	constructor(props) {
		super(props);

		this.initializeApp = this.initializeApp.bind(this);
		this.renderAppOrSpinner = this.renderAppOrSpinner.bind(this);
	}

	initializeApp() {
		if (!this.props.initialized) {
			this.props.initialize();
		}
	}

	renderAppOrSpinner() {
		return this.props.initialized
			? (<Switch>
				  	<AuthRoute exact name="Home" path={routes.HOME} component={Home}/>
				  	<AuthRoute exact name="Login" path={routes.AUTH_LOGIN} component={LogIn}/>
				  	<AuthRoute exact name="Register" path={routes.AUTH_REGISTER} component={Register}/>
				  	<AuthRoute exact name="DashboardHome" path={routes.DASHBOARD_HOME} component={Dashboard} isPrivate={true}/>
				    <AuthRoute name="Not found" path="*" component={NotFound} isPrivate={true}/>
			    </Switch>)
			: <StretchableSpinner/>;
	}

	renderMainMenu() {
		return this.props.isLoggedIn ? <MainMenu/> : null;
	}

  	render() {
  		this.initializeApp();
  		return (
		  	<div className={CLASS}>
		  		<Reboot />
		  		{this.renderMainMenu()}
		  		{this.renderAppOrSpinner()}
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	initialized: state.initialized && !state.loading,
	isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = dispatch => {
	return {
		initialize: () => dispatch(initialize())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));