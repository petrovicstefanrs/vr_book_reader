// Node Modules

import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import PropTypes from 'prop-types';

// Enviroment Settings

import * as routes from '../lib/routes';

// Component Code

const AuthRoute = ({component, isPrivate, ...props}) => {
  let isLoggedIn=false;

  if (isLoggedIn) {
    return isPrivate
      ? <Route {...props} component={component} />
      : <Redirect to={routes.DASHBOARD} />;
  }
  else {
    return isPrivate
        ? <Redirect to={routes.AUTH_LOGIN} />
        : <Route {...props} component={component} />;
  }
};

export default AuthRoute;

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};