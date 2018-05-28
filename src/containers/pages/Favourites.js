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

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {setMenuActive} from '../../redux/actions/menu';
import {getBooks} from '../../redux/actions/books';
import {getFavouriteBooks} from '../../redux/selectors/books';
import {FAVOURITES} from '../../consts/pages';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import StretchableSpinner from '../StretchableSpinner';
import BookCard from '../../components/cards/BookCard';

// Component Code

import styles from '../../styles/Library';
const CLASS = 'top-Favourites';

class Favourites extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		getBooks: PropTypes.func.isRequired,
		setMenuActive: PropTypes.func,
	};

	static defaultProps = {};

	componentDidMount() {
		const {getBooks, setMenuActive} = this.props;
		setMenuActive(FAVOURITES);
		getBooks && getBooks();
	}

	openUploadDialog = () => {
		this.setState({
			showUploadDialog: true,
		});
	};

	closeUploadDialog = () => {
		this.setState({
			showUploadDialog: false,
		});
	};

	renderEmptyFavourites = () => {
		const classes = this.props.classes;
		const libraryHref = (
			<Link to={routes.DASHBOARD_LIBRARY}>
				<Typography component="span" style={{display: 'inline'}} color="secondary" type="subheading">
					library
				</Typography>
			</Link>
		);
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					<FontAwesome icon={FA.heart} name={FA.heart} />
				</Typography>
				<Typography type="title">It looks like your favourites are empty.</Typography>
				<Typography type="subheading">
					Go back to {libraryHref} and click the <FontAwesome icon={FA.heart} name={FA.heart} /> to
					put a book into favourites
				</Typography>
			</div>
		);
	};

	renderFavourites() {
		const {books} = this.props;

		return lodash.map(books, book => {
			return <BookCard key={'Book_' + book.id + '_' + book.name} book={book} />;
		});
	}

	renderContent = () => {
		const {classes, books, loading} = this.props;

		const content = books && books.length ? this.renderFavourites() : this.renderEmptyFavourites();

		const shouldRenderSpinner = loading && !(books && books.length);
		return shouldRenderSpinner ? <StretchableSpinner /> : <div className={classes.container}>{content}</div>;
	};

	render() {
		const {classes} = this.props;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						<Typography variant="headline">Favourites</Typography>
						<Divider />
					</div>
					{this.renderContent()}
					<div className={classes.container} />
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({
	books: getFavouriteBooks(state),
	loading: state.books.loading,
});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
	getBooks: item => dispatch(getBooks()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Favourites));
