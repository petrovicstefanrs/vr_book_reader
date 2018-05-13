import lodash from 'lodash';

// eslint-disable-next-line
const DEFAULT_OPTIONS = {
	message: '',
	duration: 5000,
};

export class Toast {
	constructor(message) {
		this.id = lodash.uniqueId();
		this.message = message || DEFAULT_OPTIONS.message;
		this.duration = DEFAULT_OPTIONS.duration;
	}
}
