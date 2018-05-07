const styles = theme => ({
	card: {
		width: '256px',
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '16px',
	},
	inputField: {
		marginTop: '16px',
	},
	cardHeader: {
		backgroundColor: theme.palette.primary.main,
	},
	cardFooter: {
		flexDirection: 'column',
		height: 'auto',
		alignItems: 'initial',
	},
	whiteText: {
		color: theme.palette.primary.contrastText,
	},
});

export default styles;
