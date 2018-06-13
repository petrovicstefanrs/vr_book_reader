import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import common from '@material-ui/core/colors/common';

export const light = {
	type: 'light',
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
		hint: 'rgba(0, 0, 0, 0.38)',
	},
	divider: 'rgba(0, 0, 0, 0.12)',
	action: {
		active: common.white,
		hover: 'rgba(0, 0, 0, 0.1)',
		hoverOpacity: 0.1,
		selected: 'rgba(0, 0, 0, 0.2)',
		disabled: 'rgba(0, 0, 0, 0.3)',
		disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
	primary: pink,
	secondary: grey,
};
