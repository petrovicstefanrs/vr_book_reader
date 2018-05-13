// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';

import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Card, {CardActions, CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {setMenuActive} from '../../redux/actions/menu';
import * as pages from '../../consts/pages';
// Components

import AsPageContent from '../../hoc/AsPageContent';

// Component Code

import styles from '../../styles/Dashboard';
const CLASS = 'top-Dashboard';

const CARDS = {
	library: {
		route: routes.DASHBOARD_LIBRARY,
		title: pages.LIBRARY,
		icon: FA.book,
		description: 'All your eBooks and Comics in one place.',
	},
	favourites: {
		route: routes.DASHBOARD_FAVOURITES,
		title: pages.FAVOURITES,
		icon: FA.heart,
		description: 'Read your favourite eBooks and Comics again!',
	},
	profile: {
		route: routes.DASHBOARD_SETTINGS,
		title: pages.PROFILE,
		icon: FA.cog,
		description: 'Full control over your profile!',
	},
};

class Dashboard extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
	};

	static defaultProps = {};

	constructor(props) {
		super(props);

		this.state = {};

		this.renderCards = this.renderCards.bind(this);
		this.onCardClick = this.onCardClick.bind(this);
	}

	onCardClick(item) {
		if (this.props.setMenuActive) {
			this.props.setMenuActive(item);
		}
		return;
	}

	renderCards() {
		const classes = this.props.classes;

		return lodash.map(CARDS, card => {
			return (
				<Link
					key={'Card_' + card.title}
					onClick={() => this.onCardClick(card.title)}
					to={card.route}
				>
					<Card className={classes.card}>
						<CardContent className={classes.withmedia}>
							<FontAwesome icon={card.icon} name={card.icon} />
						</CardContent>
						<CardContent className={classes.content}>
							<Typography variant="title" component="h6">
								{card.title}
							</Typography>
							<Divider />
							<Typography className={classes.description} variant="body1" component="p">
								{card.description}
							</Typography>
						</CardContent>
					</Card>
				</Link>
			);
		});
	}

	render() {
		const classes = this.props.classes;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						<Typography variant="headline">Home</Typography>
						<Divider />
					</div>
					<div className={classes.container}>{this.renderCards()}</div>
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
