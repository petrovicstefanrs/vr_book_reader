const styles = theme => ({
	card: {
		width: 200,
		minWidth: 200,
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
	withmedia: {
		height: 200,
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '5em',
	},
	content: {
		maxHeight: 124,
		minHeight: 124,
		overflow: 'hidden',
		padding: 16
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
	buttonStyle: {
		width: '100%',
		fontWeight: 700,
		fontSize: '12px',
	},
	description: {
		marginTop: 8,
	},
});

export default styles;
