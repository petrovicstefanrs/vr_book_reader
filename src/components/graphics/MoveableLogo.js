// Node Modules

import React, {Component} from 'react';

// Enviroment settings

import logoImage from '../../assets/Home/logo.png';
import '../../styles/MoveableLogo.css';

const CLASS = 'top-MoveableLogo';

class MoveableLogo extends Component {
	render() {
		return (
			<div className={CLASS}>
				<div className="floating">
					<div className="tossing">
						<span className="versionTag">Alpha v0.1.0</span>
						<img className="logoImageMoveable" src={logoImage} alt="Logo" />
					</div>
				</div>
			</div>
		);
	}
}

export default MoveableLogo;
