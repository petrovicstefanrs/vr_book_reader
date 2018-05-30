const styles = theme => ({
	headline: {
		fontSize: '6em',
		fontWeight: 700,
		lineHeight: '1.5em',
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
	container: {
		display: 'flex',
		justifyContent: 'flex-start',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
		flexWrap: 'wrap',
		paddingTop: 24,
	},
	player: {
		width: '100%',
		height: 'calc(100vh - 160px)',
		zIndex: '99999'
	},
});

export default styles;
