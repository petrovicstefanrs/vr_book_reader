import {BOOK_BIG_THUMBNAIL, BOOK_THUMBNAIL} from '../consts/images';

const styles = theme => ({
	editor_content: {
		display: 'flex',
		width: '100%',
		[theme.breakpoints.down(1016)]: {
			flexWrap: 'wrap',
		},
		[theme.breakpoints.down(700)]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	},
	cover_card: {
		width: BOOK_BIG_THUMBNAIL.width + 32,
		minWidth: BOOK_BIG_THUMBNAIL.width + 32,
		[theme.breakpoints.down(1016)]: {
			flexGrow: 1,
		},
		[theme.breakpoints.down(700)]: {
			width: '100%',
		},
	},
	cover_card_content: {
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
		minWidth: 288,
		width: 320,
		marginLeft: 16,
		[theme.breakpoints.down(1016)]: {
			flexGrow: 1,
		},
		[theme.breakpoints.down(700)]: {
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
	scene_card: {
		minWidth: 288,
		marginLeft: 16,
		flexGrow: 1,
		[theme.breakpoints.down(1016)]: {
			marginLeft: 0,
			marginTop: 24,
			width: '100%',
		},
	},
	scene_card_content: {
		padding: '16px 16px 0 16px',
		height: 256,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	scene_list_root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
		padding: 16,
	},
	scene_list_grid: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		width: '100%',
	},
	scene_list_title: {
		color: theme.palette.primary.contrastText,
	},
	scene_list_tile_bar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	scene_list_item: {
		height: '128px !important',
	},
	scene_list_item_active: {
		color: theme.palette.secondary.main,
	},
	env_loader: {
		fontSize: '4em',
		marginBottom: theme.spacing.unit * 2,
	},
});

export default styles;
