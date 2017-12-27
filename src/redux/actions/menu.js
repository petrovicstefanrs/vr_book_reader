import * as TYPES from '../types';
import {withType} from '../../lib/util';

export const setMenuActive = (item) => (dispatch, getState, container) => {
	dispatch(withType(TYPES.SET_ACTIVE_MENU_ITEM, {data: {selected: item}}));
};

