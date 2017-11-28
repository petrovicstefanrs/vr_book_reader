// Node Modules

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Enviroment settings

import './MainMenu.css';
// import * as routes from '../../lib/routes';


const CLASS = 'top-NavItemWithRouter';

const NavItemWithRouter = ({to, label, ...props}) => {
	return (
		<li className={CLASS} role="presentation">
			<Link to={to}>{label}</Link>
		</li>
	);
};

export default NavItemWithRouter;

NavItemWithRouter.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};