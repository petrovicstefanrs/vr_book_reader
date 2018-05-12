import * as TYPES from '../types';
import {HOME} from '../../consts/pages';

const INITIAL_STATE = {
	menu: {
		selected: HOME,
	},
};

const set_active_menu_item = (state, action) => {
	return Object.assign({}, state, {
		menu: Object.assign({}, state.menu, {selected: action.data.selected}),
	});
};

export default {
	INITIAL_STATE,
	[TYPES.SET_ACTIVE_MENU_ITEM]: set_active_menu_item,
};
