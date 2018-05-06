// Node Modules

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';

import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import { setMenuActive } from '../../redux/actions/menu';

// Components

import AsPageContent from '../../hoc/AsPageContent';

// Component Code

const CLASS = 'top-Dashboard';

const styles = (theme) => ({
	card: {
		width: 200,
		minWidth: 200,
		flexShrink: 1,
		margin: 8,
		'&:hover': {
			transform: 'scale(1.05)'
		},
		transition: theme.transitions.create('transform', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	withmedia: {
		height: 160,
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '5em',
	},
	content: {
		maxHeight: 124,
		minHeight: 124,
		overflow: 'hidden',
	},
	container: {
		width: 'calc(100% + 16px)',
		display: 'flex',
		justifyContent: 'flex-start',
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		},
		flexWrap: 'wrap',
		marginLeft: -8,
		paddingTop: 24,
	},
	buttonStyle: {
		width: '100%',
		fontWeight: 700,
		fontSize: '12px',
	},
	description: {
		marginTop: 8,
	},
});

const CARDS = {
	library: {
		route: routes.DASHBOARD_LIBRARY,
		title: 'Library',
		icon: FA.book,
		description: 'All your eBooks and Comics in one place.',
	},
	favourites: {
		route: routes.DASHBOARD_FAVOURITES,
		title: 'Favourites',
		icon: FA.heart,
		description: 'Read your favourite eBooks and Comics again!',
	},
	profile: {
		route: routes.DASHBOARD_SETTINGS,
		title: 'Profile Settings',
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

		return lodash.map(CARDS, (card) => {
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
							<Typography type="headline" component="h2">
								{card.title}
							</Typography>
							<Divider />
							<Typography
								className={classes.description}
								type="subheading"
								component="p"
							>
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
						<Typography type="display2">Home</Typography>
						<Divider />
					</div>
					<div className={classes.container}>
						{this.renderCards()}
					</div>
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	setMenuActive: (item) => dispatch(setMenuActive(item)),
});

export default withStyles(styles)(
	connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
