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
		backgroundColor: 'rgba(0,0,0,0.5)',
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
	is_favourite: {
		color: theme.palette.secondary.main,
	},
});

export default styles;
