import * as TYPES from '../types';
import {withType} from '../../lib/util';

export const initialize = () => {
	return withType(TYPES.INITIALIZED);
};
