// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router-dom';
import lodash from 'lodash';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {getSelectedTheme} from '../redux/selectors/profile';
import {getThemes} from '../redux/actions/themes';

import {THEMES} from '../styles/themes';

// Enviroment settings

// Containers

import App from './App';

// Components

import {history} from '../store';

class ThemeInjector extends Component {
	componentDidMount() {
		const {themes} = this.props;

		if (!themes) {
			getThemes && getThemes();
		}
	}

	render() {
		const {themes, selectedTheme} = this.props;

		const activeTheme = themes ? lodash.find(themes, {id: selectedTheme}) : null;
		const theme = activeTheme
			? THEMES[activeTheme.id]
			: selectedTheme
				? THEMES[selectedTheme]
				: THEMES[2];

		function getTheme() {
			return createMuiTheme({
				palette: {
					...theme,
				},
				overrides: {
					MuiModal: {
						root: {
							zIndex: 9999999,
						},
					},
				},
			});
		}

		const muiTheme = getTheme();

		return (
			<MuiThemeProvider theme={muiTheme}>
				<Router history={history} basename="/">
					<App />
				</Router>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		selectedTheme: getSelectedTheme(),
		themes: state.themes.data,
	};
};

const mapDispatchToProps = dispatch => ({
	getThemes: () => dispatch(getThemes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeInjector);
