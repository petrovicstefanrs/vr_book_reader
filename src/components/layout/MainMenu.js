// Node Modules

import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

// Enviroment Settings

import './MainMenu.css';
import * as routes from '../../lib/routes';

// Components

import NavItemWithRouter from './NavItemWithRouter';

// Component Code

const CLASS = 'top-MainMenu';

class MainMenu extends Component {

	render() {
		return (
			<div className={CLASS}>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="#">React-Bootstrap</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Action</MenuItem>
								<MenuItem eventKey={3.2}>Another action</MenuItem>
								<MenuItem eventKey={3.3}>Something else here</MenuItem>
								<MenuItem divider />
								<MenuItem eventKey={3.3}>Separated link</MenuItem>
							</NavDropdown>
						</Nav>
						<Nav pullRight>
							<NavItemWithRouter to={routes.AUTH_LOGIN} label="Log In"/>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default MainMenu;