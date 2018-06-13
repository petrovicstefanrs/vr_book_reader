import {BOOK_BIG_THUMBNAIL} from '../consts/images';

const styles = theme => ({
	editor_content: {
		display: 'flex',
		width: '100%',
		flexWrap: 'wrap',
		[theme.breakpoints.down(700)]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	avatar_card: {
		width: BOOK_BIG_THUMBNAIL.width + 32,
		minWidth: BOOK_BIG_THUMBNAIL.width + 32,
		maxWidth: 272,
		marginLeft: 16,
		marginTop: 16,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			maxWidth: 'unset',
			width: '100%',
		},
	},
	avatar_card_content: {
		color: 'white',
		fontSize: '64px',
		padding: '16px 16px 0 16px',
		justifyContent: 'center',
		display: 'flex',
		height: 'calc(100% - 68px)',
	},
	card_button: {
		width: '100%',
		paddingTop: 8,
		paddingBottom: 8,
		marginTop: 8,
		marginBottom: 8,
	},
	details_card: {
		width: BOOK_BIG_THUMBNAIL.width + 32,
		minWidth: BOOK_BIG_THUMBNAIL.width + 32,
		marginLeft: 16,
		marginTop: 16,
		maxWidth: 272,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			maxWidth: 'unset',
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
	details_card_content_item: {
		marginTop: 16,
	},
	details_description: {
		marginTop: 24,
	},
	theme_card: {
		marginLeft: 16,
		marginTop: 16,
		flexGrow: 1,
		maxWidth: 272,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			maxWidth: 'unset',
			width: '100%',
		},
	},
	theme_card_content: {
		padding: '16px 16px 0 16px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		maxHeight: '377px',
	},
	theme_list_grid: {
		transform: 'translateZ(0)',
		width: '100%',
		height: '100%',
	},
	theme_list_title: {
		color: theme.palette.primary.contrastText,
	},
	theme_list_tile_bar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	theme_list_item: {
		height: '128px !important',
	},
	theme_list_item_active: {
		color: theme.palette.secondary.main,
	},
	env_loader: {
		fontSize: '4em',
		marginBottom: theme.spacing.unit * 2,
	},
	vertical_card_actions: {
		display: 'flex',
		flexDirection: 'column',
	},
	security_card_content: {
		padding: '16px 16px 0 16px',
		height: 'calc(100% - 136px)',
		minHeight: 256,
		display: 'flex',
		flexDirection: 'column',
	},
	full_width: {
		width: '100%',
	},
	security_card: {
		width: BOOK_BIG_THUMBNAIL.width + 32,
		minWidth: BOOK_BIG_THUMBNAIL.width + 32,
		marginLeft: 16,
		marginTop: 16,
		maxWidth: 272,
		[theme.breakpoints.down(700)]: {
			flexGrow: 1,
			maxWidth: 'unset',
			width: '100%',
		},
	},
});

export default styles;
