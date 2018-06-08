// eslint-disable-next-line
AFRAME.registerComponent('mousemove-rotate', {
	schema: {speed: {default: 1}},
	init: function() {
		this.x_cord = 0;
		this.y_cord = 0;
		document.addEventListener('mousemove', this.OnDocumentMouseMove.bind(this));
	},
	OnDocumentMouseDown: function(event) {
		this.ifMouseDown = true;
		this.x_cord = event.clientX;
		this.y_cord = event.clientY;
	},
	OnDocumentMouseMove: function(event) {
		var temp_x = event.clientX - this.x_cord;
        var temp_y = event.clientY - this.y_cord;

		if (Math.abs(temp_y) < Math.abs(temp_x)) {
			this.el.object3D.rotateY(temp_x * this.data.speed / 1000);
		} else {
			this.el.object3D.rotateX(temp_y * this.data.speed / 10000);
        }

		this.x_cord = event.clientX;
		this.y_cord = event.clientY;
	},
});
