import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

class Page extends Component {
	static propTypes = {
		src: PropTypes.string,
		position: PropTypes.object,
		rotation: PropTypes.object,
		width: PropTypes.number,
		height: PropTypes.number,
	};

	static defaultProps = {
		src: null,
		position: {x: 0, y: 0, z: 0},
		rotation: {x: 0, y: 0, z: 0},
		width: 1,
		height: 1.5,
	};

	render() {
		const {src, width, height, position, rotation} = this.props;
		return src ? (
			<Entity
				primitive="a-image"
				geometry={{
					width: width,
					height: height,
				}}
				src={src}
				position={position}
				rotation={rotation}
			/>
		) : (
			<Entity
				primitive="a-plane"
				geometry={{
					width: width,
					height: height,
				}}
				color="#000000"
				position={position}
				rotation={rotation}
			/>
		);
	}
}

export default Page;
