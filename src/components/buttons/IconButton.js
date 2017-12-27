// Node Modules

import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import './IconButton.css';

// Components

// Component Code

const toFa = (icon, spin, className) => {
	return icon
		? (<FontAwesome className={className} key={icon} name={icon} spin={spin} />)
		: null;
};

const IconButton = ({icon, className, children, spin, loading, disabled, ...props}) => {

	const POSSITION_CLASS = props.pullRight ? 'pullRight' : 'pullLeft';
	const CLASS = (className || '') + ' top-IconButton';

	if (loading) {
		icon = FA.cog;
		spin = true;
	}

	icon = toFa(icon, spin, POSSITION_CLASS);

	return (
		<Button className={CLASS} disabled={disabled || loading} {...props}>
			{props.pullRight ? null : icon}
			{children}
			{props.pullRight ? icon : null}
		</Button>
	);
};

IconButton.propTypes = {
	icon: PropTypes.string,
	className: PropTypes.string,
	spin: PropTypes.bool,
	disabled: PropTypes.bool,
	loading: PropTypes.bool,
	pullRight: PropTypes.bool
};

export default IconButton;