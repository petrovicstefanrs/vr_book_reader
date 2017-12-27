// Node Modules

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

// Enviroment settings

import './NavItemWithRouter.css';


const CLASS = 'top-NavItemWithRouter';

const NavItemWithRouter = ({to, label, icon, onClick, className, ...props}) => {
	let customClass = className ? " "+className : '';

	let linkIcon = icon
		? (<FontAwesome className={"NavItemIcon"} key={icon} name={icon}/>)
		: null;
	return (

		<li className={CLASS+customClass}>
			<Link onClick={onClick} to={to}>{linkIcon}{label}</Link>
		</li>
	);
};

export default NavItemWithRouter;

NavItemWithRouter.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};