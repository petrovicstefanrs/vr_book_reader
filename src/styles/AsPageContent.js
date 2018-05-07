const styles = theme => ({
	content: {
		position: 'absolute',
		top: 0,
		left: 0,
		padding: 24,
		paddingLeft: 80,
		paddingTop: 80,
		boxSizing: 'border-box',
		minHeight: '100%',
		maxHeight: '100%',
		minWidth: '100%',
		maxWidth: '100%',
		overflowY: 'auto',
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
	},
});

export default styles;
