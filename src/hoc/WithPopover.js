// Node Modules

import React, {Component} from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Enviroment Settings

// import './WithPopover.css';

// Component Code

const CLASS = 'top-WithPopover';

class WithPopover extends Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		placement: PropTypes.string,
		content: PropTypes.oneOfType([
      		PropTypes.element,
	      	PropTypes.func,
	      	PropTypes.string
	    ]).isRequired
	};

	static defaultProps = {
		placement: 'top'
	}

	render() {
		const popoverElement = (
			<Popover className={CLASS} id={"popover-"+this.props.title} title={this.props.title}>
				{this.props.content}
			</Popover>
		);
		return (
			<OverlayTrigger trigger={['focus', 'hover', 'click']} placement={this.props.placement} overlay={popoverElement}>
				{this.props.children}
			</OverlayTrigger>
		);
	}
}

export default WithPopover;