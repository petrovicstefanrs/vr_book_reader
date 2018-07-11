/* eslint-disable */

/**
 * Bring To Front Component
 */

if (typeof AFRAME === 'undefined') {
	throw new Error(
		'Component attempted to register before AFRAME was available.'
	);
}

AFRAME.registerComponent('bring-to-front', {
	schema: {
		trigger: {
			default: 'keydown',
		},
		keyCode: {
			default: 72,
		},
		triggerElement: {
			default: 'a-scene',
		},
		distance: {
			default: -1,
		},
		source: {
			default: 'a-entity[camera]'
		}
	},

	init: function() {
		this.sourceEl = document.querySelector(this.data.source);

		this.yaxis = new THREE.Vector3(0, 1, 0);
		this.zaxis = new THREE.Vector3(0, 0, 1);
		this.pivot = new THREE.Object3D();

		this.el.sceneEl.object3D.add(this.pivot);
		this.pivot.add(this.el.object3D);
	},

	play: function() {
		if (AFRAME.utils.device.checkHeadsetConnected()) {
			document
				.querySelector(this.data.triggerElement)
				.addEventListener('click', this.eventHandler.bind(this));
		} else if (
			!AFRAME.utils.device.checkHeadsetConnected() &&
			AFRAME.utils.device.isMobile()
		) {
			document
				.querySelector(this.data.triggerElement)
				.addEventListener('click', this.eventHandler.bind(this));
		} else {
			if (this.data.trigger === 'click') {
				document
					.querySelector(this.data.triggerElement)
					.addEventListener(
						this.data.trigger,
						this.eventHandler.bind(this)
					);
			} else {
				document.addEventListener(
					this.data.trigger,
					this.eventHandler.bind(this)
				);
			}
		}
	},

	eventHandler: function(evt) {
		if (this.data.trigger === 'keydown' || this.data.trigger === 'keyup') {
			var code = evt.keyCode ? evt.keyCode : evt.which;
			if (code !== this.data.keyCode) {
				return;
			}
		}

		this.el.object3D.position.set(
			0,
			0,
			this.data.distance
		);

		var direction = this.zaxis.clone();
		direction.applyQuaternion(this.sourceEl.object3D.quaternion);
		var ycomponent = this.yaxis
			.clone()
			.multiplyScalar(direction.dot(this.yaxis));
		direction.sub(ycomponent);
		direction.normalize();

        this.pivot.quaternion.setFromUnitVectors(this.zaxis, direction);
        let newPivot = new THREE.Vector3();
        this.sourceEl.object3D.getWorldPosition(newPivot);
		this.pivot.position.copy(newPivot);

		if (this.el.getAttribute('visible') === false) {
			this.el.setAttribute('visible', true);
		}
	},

	update: function(oldData) {},

	remove: function() {},
});
