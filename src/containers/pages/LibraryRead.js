// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import lodash from 'lodash';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {Paper} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

// Enviroment Settings

import * as routes from '../../lib/routes';
import {getBook} from '../../redux/actions/books';
import {getBookById} from '../../redux/selectors/books';
import {getEnvironments} from '../../redux/actions/vrenvironments';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import StretchableSpinner from '../StretchableSpinner';
import VrScene from '../../components/vr/VrScene';

// Component Code

import styles from '../../styles/LibraryRead';
const CLASS = 'top-LibraryRead';

class LibraryRead extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		book: PropTypes.object,
		environments: PropTypes.array.isRequired,
		getEnvironments: PropTypes.func.isRequired,
		getBook: PropTypes.func.isRequired,
		match: PropTypes.object.isRequired,
	};

	static defaultProps = {};

	componentDidMount() {
		const {getBook, getEnvironments, book, bookId} = this.props;
		if (!book && bookId) {
			getBook && getBook(bookId);
		}
		getEnvironments && getEnvironments();
	}

	renderBook() {
		const {book, classes, environments} = this.props;
		const envId = book.vrEnviromentId;
		if (!environments.length) {
			return this.renderError('scene');
		}

		const rawScene = envId ? lodash.find(environments, {id: envId}) : environments[0];
		const scene = JSON.parse(rawScene.enviromentDefinition);

		return (
			<Paper className={classes.player}>
				<VrScene book={book} scene={scene}/>
			</Paper>
		);
	}

	renderError = (type) => {
		const classes = this.props.classes;
		const libraryLink = (
			<Link to={routes.DASHBOARD_LIBRARY}>
				<Typography color="secondary" type="subheading">
					Go back to library
				</Typography>
			</Link>
		);

		const message = type === 'book' ? 'We are very sorry, there is nothing here.' : 'We are very sorry, something went wrong with initializing vr enviroment';
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					{type === 'book' ? `¯\\_(ツ)_/¯` : `(҂◡_◡)`}
				</Typography>
				<Typography type="title">{message}</Typography>
				{libraryLink}
			</div>
		);
	};

	renderContent = () => {
		const {classes, book, loading} = this.props;

		const content = book ? this.renderBook() : this.renderError('book');
		const shouldRenderSpinner = loading && !(book && book.length);
		return shouldRenderSpinner ? (
			<StretchableSpinner />
		) : (
			<div className={classes.container}>{content}</div>
		);
	};

	render() {
		const {book} = this.props;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<div>
						{book ? (
							<React.Fragment>
								<Typography variant="headline">Reading: {book.name}</Typography>
								<Divider />
							</React.Fragment>
						) : null}
					</div>
					{this.renderContent()}
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LibraryRead));
