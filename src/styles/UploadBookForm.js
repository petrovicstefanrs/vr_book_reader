const styles = theme => ({
	card: {
		width: 512,
		height: 256,
		[theme.breakpoints.down('sm')]: {
			flex: 1,
			width: 'initial',
			height: '80vh',
		},
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '16px',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'all 0.5s',
		'&:hover': {
			background: 'rgba(0, 0, 0, 0.05)',
		},
	},
	cardContentError: {
		color: theme.palette.secondary.main,
	},
	cardContentDisabled: {
		'&:hover': {
			background: 'initial',
		},
	},
	upload_icon: {
		fontSize: '4em',
		marginBottom: theme.spacing.unit * 2,
	},
	upload_label: {
		textAlign: 'center',
	},
});

export default styles;
