import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

class Page extends Component {
	static propTypes = {
		src: PropTypes.string,
		position: PropTypes.object,
		width: PropTypes.number,
		height: PropTypes.number,
	};

	static defaultProps = {
		src: null,
        position: {x: 0, y: 0, z: 0},
        width: 1,
        height: 1.5,
	};

	render() {
		const {src, width, height, position} = this.props;
		return (
			<Entity
				primitive="a-image"
				geometry={{
					width: width,
					height: height,
				}}
                src={src}
				position={position}
			/>
		);
	}
}

export default Page;
