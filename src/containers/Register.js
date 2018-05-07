// Node Modules

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';

// Enviroment Settings

import '../styles/Auth.css';
import FA from '../lib/font_awesome';
import * as routes from '../lib/routes';

// Components

import MoveableBackground from '../components/layout/MoveableBackground';
import FullPageOverlay from '../components/graphics/FullPageOverlay';
import RegisterForm from '../components/forms/RegisterForm';

// Component Code

const CLASS = 'top-Auth';
import styles from '../styles/Register';

class Home extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};

	render() {
		const classes = this.props.classes;

		return (
			<div className={CLASS}>
				<div className="content-Auth gradientToTransparent">
					<div className="interactive-Auth">
						<RegisterForm />
						<Link to={routes.HOME}>
							<Button className="homeButton" variant="raised" color="primary">
								<FontAwesome className={classes.leftIcon} icon={FA.home} name={FA.home} />
								Travel Home
							</Button>
						</Link>
					</div>
				</div>
				<div className="background-Auth">
					<div className="rotatingStars" />
					<FullPageOverlay />
					<MoveableBackground />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Home);
