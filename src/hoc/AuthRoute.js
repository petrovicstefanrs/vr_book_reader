// Node Modules

import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Enviroment Settings

import * as routes from '../lib/routes';
import {isLoggedIn} from '../redux/selectors/auth';

// Component Code

class AuthRoute extends Component {
	static propTypes = {
		component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
		isPrivate: PropTypes.bool,
	};

	render() {
		let {isPrivate, logedIn, component, ...props} = this.props;
		let authRoute = null;

		if (logedIn) {
			authRoute = this.props.isPrivate ? (
				<Route {...props} component={this.props.component} />
			) : (
				<Redirect to={routes.DASHBOARD_HOME} />
			);
		} else {
			authRoute = this.props.isPrivate ? (
				<Redirect to={routes.AUTH_LOGIN} />
			) : (
				<Route {...props} component={this.props.component} />
			);
		}
		return authRoute;
	}
}

const mapStateToProps = state => ({
	logedIn: isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
