// Node Modules

import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

// Enviroment settings

import FA from '../lib/font_awesome';
import './StretchableSpinner.css';

// Components

class StretchableSpinner extends Component {
  render() {
    return (
		<div className="top-StretchableSpinner">
			<FontAwesome spin size='2x' icon={FA.cog} name={FA.cog}/>
		</div>
    );
  }
}

export default StretchableSpinner;
