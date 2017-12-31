// Node Modules

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// Enviroment Settings

import './Auth.css';
import FA from '../lib/font_awesome';
import * as routes from '../lib/routes';

// Components

import MoveableBackground from '../components/layout/MoveableBackground';
import FullPageOverlay from '../components/graphics/FullPageOverlay';
import IconButton from '../components/buttons/IconButton';
import LogInForm from '../components/forms/LogInForm';

// Component Code

const CLASS = 'top-Auth';

class Home extends Component {

  	render() {
    	return (
    		<div className={CLASS}>
                <div className="content-Auth gradientToTransparent">
                    <div className="interactive-Auth">
                        <LogInForm />
                        <Link className="buttonLink" to={routes.HOME}><IconButton icon={FA.home} className="authBackButton" pullright="true">Travel Home</IconButton></Link>
                    </div>
                </div>
    			<div className="background-Auth">
                    <div className="rotatingStars"></div>
	    			<FullPageOverlay/>
	    			<MoveableBackground/>
    			</div>
    		</div>
    	);
  	}
}

export default Home;