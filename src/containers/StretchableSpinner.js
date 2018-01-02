// Node Modules

import React, {Component} from 'react';
import {CircularProgress} from 'material-ui/Progress';

// Enviroment settings

// Components

const style = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class StretchableSpinner extends Component {
  render() {
    return (
		<div style={style.container}>
			<CircularProgress
				size={100}
				left={0}
				top={0}
				status="loading"
				style={style.refresh}
			/>
		</div>
    );
  }
}

export default StretchableSpinner;
