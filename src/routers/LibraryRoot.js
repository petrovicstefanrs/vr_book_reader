// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch} from 'react-router-dom';
import {withRouter} from 'react-router';

// Enviroment settings

import * as routes from '../lib/routes';
import {setMenuActive} from '../redux/actions/menu';
import {LIBRARY} from '../consts/pages';

// Pages

import NotFound from '../containers/NotFound';
import Library from '../containers/pages/Library';
import LibraryEdit from '../containers/pages/LibraryEdit';
import LibraryRead from '../containers/pages/LibraryRead';

// Components

import AuthRoute from '../hoc/AuthRoute';

class LibraryRoot extends Component {

	componentDidMount() {
		const {setMenuActive} = this.props;
		setMenuActive(LIBRARY);
	}

	renderLibraryPages() {
		return (
			<Switch>
				<AuthRoute
					exact
					name="DashboardLibrary"
					path={routes.DASHBOARD_LIBRARY}
					component={Library}
					isPrivate={true}
				/>
				<AuthRoute
					exact
					name="LibraryEdit"
					path={routes.LIBRARY_EDIT}
					component={LibraryEdit}
					isPrivate={true}
				/>
				<AuthRoute
					exact
					name="LibraryRead"
					path={routes.LIBRARY_READ}
					component={LibraryRead}
					isPrivate={true}
				/>
				<AuthRoute name="Not found" path="*" component={NotFound} isPrivate={true} />
			</Switch>
		);
	}

	render() {
		return this.renderLibraryPages();
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LibraryRoot));
