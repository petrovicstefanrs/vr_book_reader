// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ShareButton from 'react-social-share-buttons';
import lodash from 'lodash';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';

// Enviroment Settings

import './MainMenu.css';

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {logout} from "../../redux/actions/auth";
import {setMenuActive} from "../../redux/actions/menu";

// Components

import NavItemWithRouter from './NavItemWithRouter';

// Component Code

const CLASS = 'top-MainMenu';

const MENU_ITEMS = {
	home: {route: routes.DASHBOARD_PROFILE, title: 'Home', icon: FA.home},
	library: {route: routes.DASHBOARD_LIBRARY, title: 'Library', icon: FA.book},
	favourites: {route: routes.DASHBOARD_FAVOURITES, title: 'Favourites', icon: FA.heart},
	profile: {route: routes.DASHBOARD_PROFILE, title: 'Profile', icon: FA.user},
};

class MainMenu extends Component {

	static propTypes = {
		logout: PropTypes.func.isRequired,
		setMenuActive: PropTypes.func,
		user: PropTypes.object,
		selected: PropTypes.string
	};

	static defaultProps = {
		selected: null
	}

	constructor(props) {
		super(props);

		this.state = {
			user: props.user,
			selected: props.selected,
			open: false
		};

		this.logout = this.logout.bind(this);
		this.renderMenuItems = this.renderMenuItems.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

  	handleClose() {
  		this.setState({open: false});
  	}

	logout() {
	 	this.props.logout();
	}

	onMenuItemClick(item) {
		if (this.props.setMenuActive) {
			this.props.setMenuActive(item);
			this.handleClose();
		}
		return;
	}

	renderMenuFooter() {
		let fb_url = "";
		let tw_url = "";
		const shareText = 'Read all your favourite EBooks and Comics in VR.';
		return (
			<div className="MenuFooter">
				<span>Share the love: </span>
				<ShareButton
	                compact
	                socialMedia={'facebook'}
	                url={fb_url}
	                media={"https://imgs.xkcd.com/comics/error_code.png"}
	                text={shareText}
	            />
	            <ShareButton
	                compact
	                socialMedia={'twitter'}
	                url={tw_url}
	                media={"https://imgs.xkcd.com/comics/error_code.png"}
	                text={shareText}
	            />
			</div>
		);
	}

	renderMenuItems() {
		return lodash.map(MENU_ITEMS, (item) => {
			let active = this.props.selected === item.title ? 'active' : null;
			return <NavItemWithRouter
						onClick={() => this.onMenuItemClick(item.title)}
						className={active}
						key={item.title}
						to={item.route}
						label={item.title}
						icon={item.icon}/>;
		});
	}

	render() {
		return (
			<div className={CLASS}>
				<AppBar
					onLeftIconButtonClick={this.handleToggle}/>
				<Drawer
					docked={false}
					width={250}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}>
					<List>
			        	{this.renderMenuItems()}
					</List>
		        	<Divider/>
		        	<div className="MenuBottom">
						<List>
			        		<NavItemWithRouter
			        			onClick={this.logout}
			        			className="LogOutButton"
			        			to={'/'}
			        			label={'Log out'}
			        			icon={FA.sign_out}/>
						</List>
						<Divider/>
						<List>
							{this.renderMenuFooter()}
						</List>
					</div>
				</Drawer>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	selected: state.menu.selected
});

const mapDispatchToProps = dispatch => ({
	logout: (email, password) => dispatch(logout()),
	setMenuActive: (item) => dispatch(setMenuActive(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(MainMenu);