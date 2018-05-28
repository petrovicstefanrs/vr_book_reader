// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import {getBooks} from '../../redux/actions/books';
import {getAllBooks} from '../../redux/selectors/books';

// Components

import AsPageContent from '../../hoc/AsPageContent';
import ResponsiveDialog from '../../hoc/ResponsiveDialog';
import StretchableSpinner from '../StretchableSpinner';
import UploadBookForm from '../../components/forms/UploadBookForm';
import BookCard from '../../components/cards/BookCard';

// Component Code

import styles from '../../styles/Library';
const CLASS = 'top-Library';

class Library extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		getBooks: PropTypes.func.isRequired,
		setMenuActive: PropTypes.func,
	};

	static defaultProps = {};

	constructor(props) {
		super(props);

		this.state = {
			showUploadDialog: false,
		};

		this.renderEmptyLibrary = this.renderEmptyLibrary.bind(this);
	}

	componentDidMount() {
		const {getBooks} = this.props;
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

	renderEmptyLibrary() {
		const classes = this.props.classes;
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					<FontAwesome icon={FA.book} name={FA.book} />
				</Typography>
				<Typography type="title">It looks like your library is empty.</Typography>
				<Typography type="subheading">
					Click the button in bottom right corner to add a Book!
				</Typography>
			</div>
		);
	}

	renderBooks() {
		const {books} = this.props;

		return lodash.map(books, book => {
			return <BookCard key={'Book_' + book.id + '_' + book.name} book={book} />;
		});
	}

	renderContent = () => {
		const {classes, books, loading} = this.props;

		const content = books && books.length ? this.renderBooks() : this.renderEmptyLibrary();
		const shouldRenderSpinner = loading && !(books && books.length);
		return shouldRenderSpinner ? (
			<StretchableSpinner />
		) : (
			<div className={classes.container}>{content}</div>
		);
	};

	render() {
		const {classes} = this.props;
		return (
			<AsPageContent>
				<div className={CLASS}>
					<Button
						variant="fab"
						color="secondary"
						aria-label="add_books"
						className={classes.floatButton}
						onClick={() => this.openUploadDialog()}
					>
						<FontAwesome icon={FA.plus} name={FA.plus} />
					</Button>
					<div>
						<Typography variant="headline">Library</Typography>
						<Divider />
					</div>
					{this.renderContent()}
					<div className={classes.container} />
				</div>
				<ResponsiveDialog
					title="Upload Book"
					id="new_book"
					onClose={this.closeUploadDialog}
					open={this.state.showUploadDialog}
				>
					<UploadBookForm/>
				</ResponsiveDialog>
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({
	books: getAllBooks(state),
	loading: state.books.loading,
});

const mapDispatchToProps = dispatch => ({
	getBooks: item => dispatch(getBooks()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));
