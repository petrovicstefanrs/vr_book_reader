// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

// Enviroment Settings

import * as routes from '../../lib/routes';
import {getBook} from '../../redux/actions/books';
import {getBookById} from '../../redux/selectors/books';
import {getEnvironments} from '../../redux/actions/vrenvironments';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import StretchableSpinner from '../StretchableSpinner';
import BookEditor from '../../components/forms/BookEditor';

// Component Code

import styles from '../../styles/LibraryEdit';
const CLASS = 'top-LibraryEdit';

class LibraryEdit extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		book: PropTypes.object,
		getBook: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
		environments: PropTypes.array.isRequired,
		getEnvironments: PropTypes.func.isRequired,
	};

	static defaultProps = {};

	componentWillMount() {
		const {getBook, book, bookId, getEnvironments} = this.props;
		if (!book && bookId) {
			getBook && getBook(bookId);
		}
		getEnvironments && getEnvironments();
	}

	renderEditor() {
		const {book, environments} = this.props;
		return <BookEditor book={book} environments={environments}/>;
	}

	renderBookNotFound = () => {
		const classes = this.props.classes;
		const libraryLink = (
			<Link to={routes.DASHBOARD_LIBRARY}>
				<Typography color="secondary" type="subheading">
					Go back to library
				</Typography>
			</Link>
		);
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					¯\_(ツ)_/¯
				</Typography>
				<Typography type="title">We are very sorry, there is nothing here.</Typography>
				{libraryLink}
			</div>
		);
	};

	renderContent = () => {
		const {classes, book, loading} = this.props;

		const content = book ? this.renderEditor() : this.renderBookNotFound();
		const shouldRenderSpinner = loading && !(book && book.length);
		return shouldRenderSpinner ? (
			<StretchableSpinner />
		) : (
			<div className={classes.container}>{content}</div>
		);
	};

	render() {
		const {classes, book} = this.props;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						{book ? (
							<React.Fragment>
								<Typography variant="headline">Edit: Book #{book.id}</Typography>
								<Divider />
							</React.Fragment>
						) : null}
					</div>
					{this.renderContent()}
					<div className={classes.container} />
				</div>
			</AsPageContent>
		);
	}
}

const mapStateToProps = (state, props) => {
	const {bookId} = props.match && props.match.params;
	return {
		bookId,
		book: getBookById(state, bookId),
		loading: state.books.loading || state.vrenvironments.loading,
		environments: state.vrenvironments.all_environments,
	};
};

const mapDispatchToProps = dispatch => ({
	getBook: id => dispatch(getBook(id)),
	getEnvironments: () => dispatch(getEnvironments()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LibraryEdit));
