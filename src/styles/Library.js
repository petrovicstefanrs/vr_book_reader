const styles = theme => ({
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
		position: 'fixed',
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
});

export default styles;
