// Node Modules
import 'aframe';
import './a_components/mousemove-rotate';
import './a_components/disable-inspector';
import {Entity, Scene} from 'aframe-react';

import React, {Component} from 'react';
import { makeAssetUrl } from '../../lib/util';

// Component Code

class PresentationObject extends Component {
	render() {
        const model = makeAssetUrl('models/planet/scene.gltf');

		return (
			<Scene disable-inspector vr-mode-ui="false">
				<Entity position="0 -0.8 2.5" primitive="a-camera" wasd-controls-enabled="false"  />
				<Entity position="0 0 0" scale="0.1 0.1 0.1" mousemove-rotate gltf-model={model}/>
			</Scene>
		);
	}
}

export default PresentationObject;
