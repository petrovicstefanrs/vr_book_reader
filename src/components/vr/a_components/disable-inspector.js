// eslint-disable-next-line
AFRAME.registerComponent('disable-inspector', {
    dependencies: ['inspector'],
    init: function() {
        if (this.el.components && this.el.components.inspector) {
            this.el.components.inspector.remove();
        }
    },
});