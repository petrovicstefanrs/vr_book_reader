// Node Modules

import React, {Component} from 'react';
import {} from 'react-bootstrap';
import {Link} from 'react-router-dom';

// Enviroment Settings

import './Auth.css';
import FA from '../lib/font_awesome';
import * as routes from '../lib/routes';

// Components

import ContentHolder from '../components/layout/ContentHolder';
import MoveableBackground from '../components/layout/MoveableBackground';
import FullPageOverlay from '../components/graphics/FullPageOverlay';
import IconButton from '../components/buttons/IconButton';
import RegisterForm from '../components/forms/RegisterForm';

// Component Code

const CLASS = 'top-Auth';

class Home extends Component {

  	render() {
    	return (
    		<ContentHolder className={CLASS}>
                <div className="content-Auth gradientToTransparent">
                    <div className="interactive-Auth">
                        <RegisterForm />
                        <Link className="buttonLink" to={routes.HOME}><IconButton icon={FA.home} className="authBackButton" pullright="true">Travel Home</IconButton></Link>
                    </div>
                </div>
    			<div className="background-Auth">
                    <div className="rotatingStars"></div>
	    			<FullPageOverlay/>
	    			<MoveableBackground/>
    			</div>
    		</ContentHolder>
    	);
  	}
}

export default Home;