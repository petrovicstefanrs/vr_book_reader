// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import lodash from 'lodash';
import FontAwesome from 'react-fontawesome';
import LinesEllipsis from 'react-lines-ellipsis';

import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import Card, {CardContent} from 'material-ui/Card';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {setMenuActive} from '../../redux/actions/menu';
import {getBooks, toggleFavouriteBook, deleteBook} from '../../redux/actions/books';
import {getAllBooks} from '../../redux/selectors/books';
import {LIBRARY} from '../../consts/pages';
import {BOOK_THUMBNAIL} from '../../consts/images';

// Components

import ImageWithFallback from '../../components/graphics/ImageWithFallback';
import AsPageContent from '../../hoc/AsPageContent';

// Component Code

import styles from '../../styles/Library';
const CLASS = 'top-Library';
class Library extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		getBooks: PropTypes.func.isRequired,
		toggleFavourite: PropTypes.func.isRequired,
		deleteBook: PropTypes.func.isRequired,
		setMenuActive: PropTypes.func,
	};

	static defaultProps = {};

	constructor(props) {
		super(props);

		this.state = {};

		this.renderEmptyLibrary = this.renderEmptyLibrary.bind(this);
	}

	componentDidMount() {
		const {getBooks, setMenuActive} = this.props;
		setMenuActive(LIBRARY);
		getBooks && getBooks();
	}

	renderEmptyLibrary() {
		const classes = this.props.classes;
		return (
			<div className={classes.emptyPage}>
				<Typography className={classes.headline} type="headline">
					<FontAwesome icon={FA.book} name={FA.book} />
				</Typography>
				<Typography type="title">It looks like your library is empty.</Typography>
				<Typography type="subheading">
					Click the button in bottom right corner to add your eBooks!
				</Typography>
			</div>
		);
	}

	renderBooks() {
		const {classes, books} = this.props;

		return lodash.map(books, book => {
			const {isFavourite} = book;
			return (
				<div key={'Book_' + book.id + '_' + book.name} className={classes.card_wrapper}>
					<div className={classes.card_action_button_wrapper}>
						<Tooltip id="tooltip-favourite" title="Favourite" placement="right">
							<Button
								variant="flat"
								aria-label="But book into favourites"
								className={classes.card_action_button}
								onClick={() => this.props.toggleFavourite(book.id)}
							>
								<FontAwesome
									icon={isFavourite ? FA.heart : FA.heart_o}
									name={isFavourite ? FA.heart : FA.heart_o}
									className={isFavourite ? classes.is_favourite : null}
								/>
							</Button>
						</Tooltip>
						<Tooltip id="tooltip-edit" title="Edit" placement="right">
							<Button variant="flat" aria-label="Edit Book" className={classes.card_action_button}>
								<FontAwesome icon={FA.pencil} name={FA.pencil} />
							</Button>
						</Tooltip>
						<Tooltip id="tooltip-delete" title="Delete" placement="right">
							<Button
								variant="flat"
								aria-label="Delete Book"
								onClick={() => this.props.deleteBook(book.id)}
								className={classes.card_action_button}
							>
								<FontAwesome icon={FA.trash} name={FA.trash} />
							</Button>
						</Tooltip>
					</div>
					<Link
						onClick={() => {
							alert('Book open');
						}}
						to={routes.DASHBOARD_LIBRARY}
					>
						<Card className={classes.book_card}>
							<CardContent className={classes.withmedia}>
								<ImageWithFallback
									image={book.thumbnail}
									width={BOOK_THUMBNAIL.width}
									height={BOOK_THUMBNAIL.height}
								/>
							</CardContent>
							<CardContent className={classes.content}>
								<Typography className={classes.card_title} variant="title" component="h6">
									{book.name}
								</Typography>
								<Divider />
								<Typography className={classes.description} variant="body1" component="div">
									<LinesEllipsis text={book.description} maxLine="3" ellipsis=" ..." trimRight />
								</Typography>
							</CardContent>
						</Card>
					</Link>
				</div>
			);
		});
	}

	renderContent = () => {
		const {classes, books} = this.props;

		const content = books && books.length ? this.renderBooks() : this.renderEmptyLibrary();

		return <div className={classes.container}>{content}</div>;
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
			</AsPageContent>
		);
	}
}

const mapStateToProps = state => ({
	books: getAllBooks(state),
});

const mapDispatchToProps = dispatch => ({
	setMenuActive: item => dispatch(setMenuActive(item)),
	getBooks: item => dispatch(getBooks()),
	toggleFavourite: id => dispatch(toggleFavouriteBook(id)),
	deleteBook: id => dispatch(deleteBook(id)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Library));
