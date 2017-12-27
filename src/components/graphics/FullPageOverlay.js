// Node Modules

import React, {Component} from 'react';

// Enviroment settings

import overlayImage from "../../assets/Home/home_overlay.jpg";
import './FullPageOverlay.css';

const CLASS = 'top-FullPageOverlay';

class FullPageOverlay extends Component {
	render() {
		return (
			<div className={CLASS}>
				<img className="overlayImage" src={overlayImage} alt=""/>
			</div>
		);
	}
}

export default FullPageOverlay;