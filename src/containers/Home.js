// Node Modules

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Enviroment Settings

import './Home.css';
import FA from '../lib/font_awesome';
import * as routes from '../lib/routes';

// Components

import ContentHolder from '../components/layout/ContentHolder';
import MoveableBackground from '../components/layout/MoveableBackground';
import MoveableLogo from '../components/graphics/MoveableLogo';
import FullPageOverlay from '../components/graphics/FullPageOverlay';
import IconButton from '../components/buttons/IconButton';

// Component Code

const CLASS = 'top-Home';

class Home extends Component {

  	render() {
    	return (
    		<ContentHolder className={CLASS}>
    			<div className="interactive-Home">
    				<div className="presentation-text">
	    				<span>Create your perfect reading atmosphere!</span>
	    				<span>Read your eBooks inside beautifull VR Enviroments</span>
    				</div>
    				<Link className="buttonLink" to={routes.AUTH_REGISTER}><IconButton icon={FA.arrow_right} pullright="true">DIVE IN</IconButton></Link>
    			</div>
    			<div className="background-Home">
    				<div className="rotatingStars"></div>
	    			<FullPageOverlay/>
	    			<MoveableLogo/>
	    			<MoveableBackground/>
    			</div>
    		</ContentHolder>
    	);
  	}
}

export default Home;