// Node Modules

import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

// Enviroment Settings

import './ImageWithFallback.css';

import FA from '../../lib/font_awesome';

// Component Code

const CLASS = 'top-ImageWithFallback';

const ImageWithFallback = ({image, alt, width, height, onClick}) => {
	let style = {
		minWidth: width,
		minHeight: height
	};

	if (image) {
		const src = image;
		return (
			<div style={style} className={`${CLASS} ${CLASS}-image-wrapper`}>
				<img src={src} alt={alt} title={alt} onClick={onClick}/>
			</div>
		);
	}

	return (
		<div style={style} className={`${CLASS} ${CLASS}-fallback`} title={alt} onClick={onClick}>
			<div className={`${CLASS}-fallback-wrapper`}>
				<FontAwesome name={FA.image}/>
			</div>
		</div>
	);
};

ImageWithFallback.propTypes = {
	image: PropTypes.object,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	onClick: PropTypes.func,
	alt: PropTypes.string
};

export default ImageWithFallback;