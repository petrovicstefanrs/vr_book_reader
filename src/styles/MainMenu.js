const drawerWidth = 256;

const styles = theme => ({
	drawerInner: {
		width: drawerWidth,
	},
	toolbar: {
		height: '56px !improtant',
		minHeight: '56px',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		height: 56,
	},
	headerButton: {
		fontSize: '1em',
	},
	hide: {
		display: 'none',
	},
	appBar: {
		height: 56,
		zIndex: 9999999,
		position: 'absolute',
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 4,
		marginBottom: 4,
		marginRight: 32,
		color: theme.palette.primary.contrastText,
		fontSize: '1em',
	},
	menuIcon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 56,
		margin: 0,
		color: theme.palette.text.secondary,
	},
	menuItemText: {
		paddingLeft: 0,
	},
	drawerPaper: {
		zIndex: 999999,
		position: 'relative',
		overflowX: 'hidden',
		minHeight: '100%',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		width: theme.spacing.unit * 7,
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuFooter: {
		bottom: 0,
		position: 'absolute',
		width: drawerWidth,
	},
	activeItem: {
		backgroundColor: theme.palette.action.selected,
	},
	avatarBlock: {
		color: theme.palette.primary.contrastText,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '0px 0px 0px auto',
		padding: '0 16px',
		height: '56px',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.05)',
			cursor: 'pointer',
			color: theme.palette.primary.contrastText,
		},
	},
	avatarText: {
		marginRight: 8,
		textAlign: 'right',
		fontSize: 12,
		maxWidth: 80,
	},
});

export default styles;
