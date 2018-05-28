// Node Modules

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';

// Enviroment Settings

import '../styles/Home.css';
import * as routes from '../lib/routes';

// Components

import MoveableBackground from '../components/layout/MoveableBackground';
import MoveableLogo from '../components/graphics/MoveableLogo';
import FullPageOverlay from '../components/graphics/FullPageOverlay';

// Component Code

const CLASS = 'top-Home';

class Home extends Component {
	render() {
		return (
			<div className={CLASS}>
				<div className="interactive-Home gradientToTransparent">
					<div className="presentation-text">
						<span>Create your perfect reading atmosphere!</span>
						<span>Read your eBooks inside beautifull VR Enviroments</span>
					</div>
					<Link to={routes.AUTH_LOGIN}>
						<Button className="homeButton" variant="raised" color="primary">
							{' '}
							DIVE IN{' '}
						</Button>
					</Link>
				</div>
				<div className="background-Home">
					<div className="rotatingStars" />
					<FullPageOverlay />
					<MoveableLogo />
					<MoveableBackground />
				</div>
			</div>
		);
	}
}

export default Home;
