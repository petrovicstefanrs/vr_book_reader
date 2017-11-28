// Node Modules

import React from 'react';
import {Link} from 'react-router-dom';

// Enviroment settings

import './NotFound.css';
import * as routes from '../lib/routes';

// Components

const NotFound = () => {

	const homeLink = <Link to={routes.HOME}>Go back home</Link>;

	return (
			<div className="jumbotron">
				<h1>404 Not found</h1>
				<h3>Oops it seems there's nothing here</h3>
				{homeLink}
			</div>
	);
};

export default NotFound;