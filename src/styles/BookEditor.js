import {BOOK_THUMBNAIL} from '../consts/images';

const styles = theme => ({
	editor_content: {
		display: 'flex',
		width: '100%',
		[theme.breakpoints.down(700)]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	cover_card: {
		width: BOOK_THUMBNAIL.width + 32,
		minWidth: BOOK_THUMBNAIL.width + 32,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			width: '100%',
		},
	},
	cover_card_content: {
		padding: '16px 16px 0 16px',
		[theme.breakpoints.down(700)]: {
			justifyContent: 'center',
			display: 'flex',
		},
	},
	card_button: {
		width: '100%',
		paddingTop: 8,
		paddingBottom: 8,
		marginTop: 8,
		marginBottom: 8,
	},
	details_card: {
		minWidth: 288,
		width: 288,
		marginLeft: 16,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			marginLeft: 0,
			marginTop: 24,
			width: '100%',
		},
	},
	save_button: {
		marginLeft: 'auto',
		padding: 8,
	},
	details_card_content: {
        padding: '16px 16px 0 16px',
		height: 'calc(100% - 68px)',
		minHeight: 256,
		display: 'flex',
		flexDirection: 'column',
	},
	details_description: {
		marginTop: 24,
	},
});

export default styles;
