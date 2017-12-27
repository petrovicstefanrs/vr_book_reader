// Node Modules

import React, {Component} from 'react';

// Enviroment settings

import logoImage from "../../assets/Home/logo.png";
import './MoveableLogo.css';

const CLASS = 'top-MoveableLogo';

class MoveableLogo extends Component {
	render() {
		return (
			<div className={CLASS}>
				<div className="floating">
					<div className="tossing">
						<img className="logoImageMoveable" src={logoImage} alt="Logo"/>
					</div>
				</div>
			</div>
		);
	}
}

export default MoveableLogo;