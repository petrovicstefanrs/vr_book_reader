// Node Modules

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import { logout } from '../../redux/actions/auth';
import { setMenuActive } from '../../redux/actions/menu';

// Components

// Component Code

const CLASS = 'top-MainMenu';

const drawerWidth = 256;

const styles = (theme) => ({
	drawerInner: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		height: 56,
	},
	headerButton: {
		fontSize: '1em'
	},
	hide: {
		display: 'none',
	},
	appBar: {
		height: 56,
		position: 'absolute',
		zIndex: theme.zIndex.drawer + 1,
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
		fontSize: '1em'
	},
	menuIcon: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: theme.spacing.unit*2
	},
	drawerPaper: {
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
		width: theme.spacing.unit*7,
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
		backgroundColor: theme.palette.grey[300],
	},
});

const MENU_ITEMS = {
	home: { route: routes.DASHBOARD_HOME, title: 'Home', icon: FA.home },
	library: {
		route: routes.DASHBOARD_LIBRARY,
		title: 'Library',
		icon: FA.book,
	},
	favourites: {
		route: routes.DASHBOARD_FAVOURITES,
		title: 'Favourites',
		icon: FA.heart,
	},
	profile: {
		route: routes.DASHBOARD_SETTINGS,
		title: 'Profile',
		icon: FA.cog,
	},
};

class MainMenu extends Component {
	static propTypes = {
		logout: PropTypes.func.isRequired,
		setMenuActive: PropTypes.func,
		user: PropTypes.object,
		selected: PropTypes.string,
	};

	static defaultProps = {
		selected: null,
	};

	constructor(props) {
		super(props);

		this.state = {
			user: props.user,
			selected: props.selected,
			open: false,
		};

		this.logout = this.logout.bind(this);
		this.renderMenuItems = this.renderMenuItems.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
		this.handleDrawerClose = this.handleDrawerClose.bind(this);
	}

	handleDrawerOpen() {
		this.setState({ open: true });
	}

	handleDrawerClose() {
		this.setState({ open: false });
	}

	logout() {
		this.props.logout();
	}

	onMenuItemClick(item) {
		if (this.props.setMenuActive) {
			this.props.setMenuActive(item);
			this.handleDrawerClose();
		}
		return;
	}

	renderMenuItems() {
		const classes = this.props.classes;
		return lodash.map(MENU_ITEMS, (item) => {
			let active = this.props.selected === item.title ? 'active' : null;
			return (
				<Link to={item.route} key={item.title}>
					<ListItem
						disableGutters
						button
						onClick={() => this.onMenuItemClick(item.title)}
						className={active && classes.activeItem}
					>
						<ListItemIcon className={classes.menuIcon}>
							<FontAwesome icon={item.icon} name={item.icon} />
						</ListItemIcon>
						<ListItemText primary={item.title} />
					</ListItem>
				</Link>
			);
		});
	}

	render() {
		const classes = this.props.classes;
		return (
			<div className={CLASS}>
				<AppBar
					elevation={3}
					className={classNames(
						classes.appBar,
						this.state.open && classes.appBarShift
					)}
				>
					<Toolbar disableGutters={!this.state.open}>
						<IconButton
							className={classNames(
								classes.menuButton,
								this.state.open && classes.hide
							)}
							onClick={this.handleDrawerOpen}
						>
							<FontAwesome icon={FA.bars} name={FA.bars} />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Drawer
					variant="permanent"
					classes={{
						paper: classNames(
							classes.drawerPaper,
							!this.state.open && classes.drawerPaperClose
						),
					}}
					open={this.state.open}
				>
					<div className={classes.drawerInner}>
						<div className={classes.drawerHeader}>
							<IconButton className={classes.headerButton} onClick={this.handleDrawerClose}>
								<FontAwesome
									icon={FA.chevron_left}
									name={FA.chevron_left}
								/>
							</IconButton>
						</div>
						<Divider />
						<List>{this.renderMenuItems()}</List>
						<Divider />
						<List className={classes.menuFooter}>
							<Divider style={{ marginBottom: 8 }} />
							<ListItem
								disableGutters
								button
								onClick={this.logout}
							>
								<ListItemIcon className={classes.menuIcon}>
									<FontAwesome
										icon={FA.sign_out}
										name={FA.sign_out}
									/>
								</ListItemIcon>
								<ListItemText primary="Log out" />
							</ListItem>
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	selected: state.menu.selected,
});

const mapDispatchToProps = (dispatch) => ({
	logout: (email, password) => dispatch(logout()),
	setMenuActive: (item) => dispatch(setMenuActive(item)),
});

export default withStyles(styles, { withTheme: true })(
	connect(mapStateToProps, mapDispatchToProps)(MainMenu)
);
