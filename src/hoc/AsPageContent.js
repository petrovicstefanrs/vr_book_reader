// Node Modules

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
// import PropTypes from 'prop-types';

// Enviroment Settings

import './AsPageContent.css';

// Component Code

class AsPageContent extends Component {
  render() {
    return(
      <Paper className="top-AsPageContent">
        {this.props.children}
      </Paper>
    );
  }
}

export default AsPageContent;
