// Node Modules

import React, {Component} from 'react';

// Enviroment Settings

import bgImage from "../../assets/Home/background.jpg";
import './MoveableBackground.css';

// Component Code

const CLASS = 'top-MoveableBackground';

class MoveableBackground extends Component {
	render() {
		return (
			<div className={CLASS}>
				<div className="floating">
					<div className="tossing">
						<img className="backgroundImageMoveable" src={bgImage}/>
					</div>
				</div>
			</div>
		);
	}
}

export default MoveableBackground;