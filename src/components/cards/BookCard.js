// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import LinesEllipsis from 'react-lines-ellipsis';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

// Enviroment Settings

import FA from '../../lib/font_awesome';
import * as routes from '../../lib/routes';
import {toggleFavouriteBook, deleteBook} from '../../redux/actions/books';
import {BOOK_THUMBNAIL} from '../../consts/images';
import {makeAssetUrl} from '../../lib/util';

// Components

import ImageWithFallback from '../../components/graphics/ImageWithFallback';

// Component Code

import styles from '../../styles/BookCard';

class BookCard extends Component {
	static propTypes = {
		classes: PropTypes.object.isRequired,
		book: PropTypes.object.isRequired,
		toggleFavourite: PropTypes.func.isRequired,
		deleteBook: PropTypes.func.isRequired,
	};

	static defaultProps = {};

	renderBook() {
		const {classes, book} = this.props;
		const description = book.description || "This item doesn't have a description...";

		const {isFavourite} = book;
		return (
			<div className={classes.card_wrapper}>
				<div className={classes.card_action_button_wrapper}>
					<Tooltip id="tooltip-favourite" title="Favourite" placement="right">
						<Button
							variant="flat"
							aria-label={isFavourite ? 'Remove book from favourites' : 'Put book into favourites'}
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
						<Link to={routes.libraryEdit(book.id)}>
							<Button variant="flat" aria-label="Edit Book" className={classes.card_action_button}>
								<FontAwesome icon={FA.pencil} name={FA.pencil} />
							</Button>
						</Link>
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
				<Link to={routes.libraryRead(book.id)}>
					<Card className={classes.book_card}>
						<CardContent className={classes.withmedia}>
							<ImageWithFallback
								image={makeAssetUrl(book.thumbnail)}
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
								<LinesEllipsis text={description} maxLine="3" ellipsis=" ..." trimRight />
							</Typography>
						</CardContent>
					</Card>
				</Link>
			</div>
		);
	}

	renderContent = () => {
		const {book} = this.props;

		const content = book ? this.renderBook() : null;

		return content;
	};

	render() {
		return this.renderContent();
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	toggleFavourite: id => dispatch(toggleFavouriteBook(id)),
	deleteBook: id => dispatch(deleteBook(id)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BookCard));
