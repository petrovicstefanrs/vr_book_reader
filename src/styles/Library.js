import {BOOK_THUMBNAIL} from '../consts/images';

const styles = theme => ({
	book_card: {
		width: BOOK_THUMBNAIL.width,
		minWidth: BOOK_THUMBNAIL.width,
		flexShrink: 1,
		margin: 8,
		'&:hover': {
			transform: 'scale(1.05)',
		},
		transition: theme.transitions.create('transform', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	headline: {
		fontSize: '8em',
		fontWeight: 700,
		lineHeight: '1em',
	},
	emptyPage: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		margin: 0,
		padding: 24,
		paddingTop: 111,
		paddingLeft: 80,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		flexDirection: 'column',
	},
	floatButton: {
		position: 'absolute',
		bottom: 24,
		right: 24,
		zIndex: 999,
		fontSize: '1em',
	},
	container: {
		width: 'calc(100% + 16px)',
		display: 'flex',
		justifyContent: 'flex-start',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
		flexWrap: 'wrap',
		marginLeft: -8,
		paddingTop: 24,
	},
	description: {
		marginTop: 8,
		overflow: 'hidden',
	},
	withmedia: {
		height: BOOK_THUMBNAIL.height,
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '5em',
		position: 'relative',
	},
	content: {
		maxHeight: 124,
		minHeight: 124,
		overflow: 'hidden',
		padding: '16px !important',
	},
	card_title: {
		width: BOOK_THUMBNAIL.width - 32,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	card_action_button: {
		color: 'white',
		fontSize: 16,
		padding: '8px !important',
		width: 32,
		minWidth: 32,
		justifyContent: 'center',
	},
	card_action_button_wrapper: {
		position: 'absolute',
		top: 0,
		right: 0,
		display: 'flex',
		flexDirection: 'column',
		width: 32,
		zIndex: 1,
		margin: 8,
	},
	card_wrapper: {
		position: 'relative',
	},
});

export default styles;
