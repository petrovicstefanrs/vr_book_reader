export const ACCEPTED_FILE_FORMATS = {
	cbz: '.cbz',
	cbr: '.cbr',
	cbt: '.cbt',
	cba: '.cba',
	cb7: '.cb7',
	pdf: '.pdf',
};

export const ACCEPTED_IMAGE_FORMATS = {
	jpg: '.jpg',
	jpeg: '.jpeg',
	png: '.png',
};

export const ACCEPTED_MIME_TYPES = {
	archive: 'application/x-cbr',
};

export const ACCEPTED_IMAGE_MIME_TYPES = {
	[ACCEPTED_IMAGE_FORMATS.jpeg]: 'image/jpeg',
	[ACCEPTED_IMAGE_FORMATS.jpg]: 'image/jpg',
	[ACCEPTED_IMAGE_FORMATS.png]: 'image/png'
};

export const FILE_SIZES = {
	5: 5,
	25: 25,
	50: 50,
	100: 100,
};

export const FILE_SIZE_LIMITS = {
	5: 5242880,
	25: 26214400,
	50: 52428800,
	100: 104857600,
};

export const FILE_SIZE_LABEL = {
	5: '5MB',
	25: '25MB',
	50: '50MB',
	100: '100MB',
};
