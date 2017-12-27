// Node Modules

import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {connect} from 'react-redux';
// import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ShareButton from 'react-social-share-buttons';
import {slide as Menu} from 'react-burger-menu';
import lodash from 'lodash';

// Enviroment Settings

import './MainMenu.css';

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {logout} from "../../redux/actions/auth";
import {setMenuActive} from "../../redux/actions/menu";
import {getUser} from "../../redux/selectors/users";

// Components

import NavItemWithRouter from './NavItemWithRouter';
import ImageWithFallback from '../graphics/ImageWithFallback';

// Component Code

const CLASS = 'top-MainMenu';

const MENU_ITEMS = {
	// home: {route: routes.DASHBOARD, title: 'Home', icon: FA.home},
	profile: {route: routes.DASHBOARD_PROFILE, title: 'Profile', icon: FA.user},
	library: {route: routes.DASHBOARD_LIBRARY, title: 'Library', icon: FA.book},
	favourites: {route: routes.DASHBOARD_FAVOURITES, title: 'Favourites', icon: FA.heart}
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
			selected: props.selected
		};

		this.logout = this.logout.bind(this);
		this.renderUserInfo = this.renderUserInfo.bind(this);
		this.renderMenuItems = this.renderMenuItems.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
	}

	logout() {
	 	this.props.logout();
	}

	renderUserInfo() {
		let username = this.state.user.name || null;
		let email = this.state.user.email || null;
		let img = this.state.user.profile_img || null;

		return (
			<div className="ProfileDetails">
				<ImageWithFallback image={img} width={75} height={75}/>
				<div className="UserInfo">
					<span className="InfoUsername">{username}</span>
					<span className="InfoEmail">{email}</span>
				</div>
			</div>
		);
	}

	renderSocialButtons() {
		let fb_url = "";
		let tw_url = "";
		const shareText = 'Read all your favourite EBooks and Comics in VR.';
		return (
			<div className="SocialButtons">
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

	onMenuItemClick(item) {
		if (this.props.setMenuActive) {
			this.props.setMenuActive(item);
		}
		return;
	}

	renderMenuItems() {
		return lodash.map(MENU_ITEMS, (item) => {
			let active = this.props.selected === item.title ? 'active' : null;
			return <NavItemWithRouter onClick={() => this.onMenuItemClick(item.title)} className={active} key={item.title} to={item.route} label={item.title} icon={item.icon}/>;
		});
	}

	render() {
		let burgerIcon = (<FontAwesome icon={FA.bars} name={FA.bars}/>);
		return (
			<div className={CLASS}>
				<Menu
					width={250}
					customCrossIcon={false}
					customBurgerIcon={burgerIcon}>
					{this.renderUserInfo()}
		        	{this.renderMenuItems()}
			    	<div className="MenuBottom">
						{this.renderSocialButtons()}
		        		<NavItemWithRouter onClick={this.logout} className={"LogOutButton"} to={'/'} label={'Log out'} icon={FA.sign_out}/>
			    	</div>
			    </Menu>
			    <div className="TopBar">
			    </div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: getUser(state),
	selected: state.menu.selected
});

const mapDispatchToProps = dispatch => ({
	logout: (email, password) => dispatch(logout()),
	setMenuActive: (item) => dispatch(setMenuActive(item))
});

export default connect(mapStateToProps,mapDispatchToProps)(MainMenu);