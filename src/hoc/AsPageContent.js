// Node Modules

import React, {Component} from 'react';
import {Jumbotron} from 'react-bootstrap';
// import PropTypes from 'prop-types';

// Enviroment Settings

import './AsPageContent.css';

// Component Code

class AsPageContent extends Component {
  render() {
    return(
      <Jumbotron className="top-AsPageContent">
        {this.props.children}
      </Jumbotron>
    );
  }
}

export default AsPageContent;
