import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
import common from '@material-ui/core/colors/common';

export const dark = {
    type: 'dark',
	text: {
		primary: common.white,
		secondary: 'rgba(255, 255, 255, 0.8)',
		disabled: 'rgba(255, 255, 255, 0.7)',
		hint: 'rgba(255, 255, 255, 0.7)',
		icon: 'rgba(255, 255, 255, 0.7)',
	},
	divider: 'rgba(255, 255, 255, 0.12)',
	background: {
		paper: blueGrey[900],
		default: blueGrey[800],
	},
	action: {
		active: common.white,
		hover: 'rgba(255, 255, 255, 0.1)',
		hoverOpacity: 0.1,
		selected: 'rgba(255, 255, 255, 0.2)',
		disabled: 'rgba(255, 255, 255, 0.3)',
		disabledBackground: 'rgba(255, 255, 255, 0.12)',
	},
	primary: blueGrey,
	secondary: orange,
};
