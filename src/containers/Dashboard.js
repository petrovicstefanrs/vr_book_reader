// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Snackbar from 'material-ui/Snackbar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


// Enviroment Settings

import './Dashboard.css';

import FA from '../lib/font_awesome';
import {getUser} from "../redux/selectors/users";
import {ACCEPT_IMAGE} from "../consts/images";

// Components

import InputField from '../components/forms/InputField';
import WithDropZone from '../components/forms/WithDropZone';
import AsPageContent from '../hoc/AsPageContent';
import ImageWithFallback from '../components/graphics/ImageWithFallback';

// Component Code

const CLASS = 'top-Dashboard';

class Dashboard extends Component {

	static propTypes = {
	};

	static defaultProps = {
	}

	constructor(props) {
		super(props);

		this.state = {
		};

	}

	render() {
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						<h1>Home</h1>
						<Divider/>
					</div>
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);