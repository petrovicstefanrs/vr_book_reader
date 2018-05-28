// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {setMenuActive} from '../../redux/actions/menu';
import * as pages from '../../consts/pages';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import ComingSoonSign from '../../components/graphics/ComingSoonSign';

// Component Code

import styles from '../../styles/Dashboard';
const CLASS = 'top-Dashboard';

const CARDS = {
	library: {
		route: routes.DASHBOARD_LIBRARY,
		title: pages.LIBRARY,
		icon: FA.book,
		description: 'Read, Edit, Manage... All your books in one place.',
	},
	favourites: {
		route: routes.DASHBOARD_FAVOURITES,
		title: pages.FAVOURITES,
		icon: FA.heart,
		description: 'Want to read your favourite books again? This is the place.',
	},
	store: {
		route: routes.DASHBOARD_STORE,
		title: pages.STORE,
		icon: FA.shopping_cart,
		description: 'Buy comics, books or enviroments.',
		coming_soon: true,
	},
	editor: {
		route: routes.DASHBOARD_EDITOR,
		title: pages.EDITOR,
		icon: FA.tree,
		description: 'Create and publish your environments.',
		coming_soon: true,
	},
	profile: {
		route: routes.DASHBOARD_SETTINGS,
		title: pages.PROFILE,
		icon: FA.cog,
		description: 'Manage your profile!',
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
							{card.coming_soon && <ComingSoonSign className={classes.coming_soon}/>}
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
