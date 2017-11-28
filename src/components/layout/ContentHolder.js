// Node Modules

import React from 'react';
import PropTypes from 'prop-types';

// Enviroment Settings

import './ContentHolder.css';

// Component Code

const ContentHolder = ({children, className, ...props}) => {
	const CLASS = (className || '') + ' top-ContentHolder';
	return (
		<div className={CLASS} {...props}>
			{children}
		</div>
	);
};

ContentHolder.propTypes = {
	content: PropTypes.bool,
	bordered: PropTypes.bool,
	padded: PropTypes.bool,
};

export default ContentHolder;