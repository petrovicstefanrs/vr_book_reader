// Node Modules

import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

// Enviroment settings

// Components

import styles from '../styles/StretchableSpinner';

class StretchableSpinner extends Component {
	render() {
		return (
			<div style={styles.container}>
				<CircularProgress size={100} left={0} top={0} status="loading" style={styles.refresh} />
			</div>
		);
	}
}

export default StretchableSpinner;
