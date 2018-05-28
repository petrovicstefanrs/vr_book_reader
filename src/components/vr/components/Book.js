import 'aframe-bring-to-front-component';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

import {BOOK_MODES} from '../../../consts/aframe';
import Page from './Page';
import Button from './Button';
import { makeAssetUrl } from '../../../lib/util';

const CYCLE_DIRECTIONS = {
	previous: 'previous',
	next: 'next',
};

class Book extends Component {
	static propTypes = {
		pages: PropTypes.array,
		position: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		mode: PropTypes.oneOf([BOOK_MODES.single, BOOK_MODES.double]),
		pageHeight: PropTypes.number,
		pageWidth: PropTypes.number,
		buttonHeight: PropTypes.number,
		buttonWidth: PropTypes.number,
	};

	static defaultProps = {
		pages: [],
		position: {x: 0, y: 0, z: 0},
		mode: BOOK_MODES.double,
		pageHeight: 1.5,
		pageWidth: 1,
		buttonHeight: null,
		buttonWidth: 0.2,
	};

	constructor(props) {
		super(props);

		this.state = {
			currentPage: 0,
			position: props.position,
		};
	}

	componentWillReceiveProps(nextProps) {
		//Deserialize position prop from a-frame to handle in react
		if (nextProps.position && typeof nextProps.position === 'string') {
			const coordinates = nextProps.position.split(' ');
			const deserializedPosition = {
				x: parseFloat(coordinates[0]),
				y: parseFloat(coordinates[1]),
				z: parseFloat(coordinates[2]),
			};
			this.setState({
				position: deserializedPosition,
			});
		}
	}

	cyclePage = direction => {
		const {mode, pages} = this.props;
		const {currentPage} = this.state;
		const numOfPages = pages.length - 1;
		let jumpStep = mode === BOOK_MODES.single ? 1 : 2;
		let nextPage = currentPage;

		if (direction === CYCLE_DIRECTIONS.previous) {
			nextPage -= jumpStep;
		} else {
			nextPage += jumpStep;
		}

		if (nextPage < 0 || nextPage > numOfPages) {
			return;
		}

		this.setState({
			currentPage: nextPage,
		});
	};

	renderPages = () => {
		const {mode, pageHeight, pageWidth, pages} = this.props;
		const {currentPage} = this.state;
		const numOfPages = pages.length - 1;

		let content;
		if (mode === BOOK_MODES.single) {
			const src = currentPage > numOfPages ? null : pages[currentPage];
			content = <Page height={pageHeight} width={pageWidth} src={src} />;
		} else {
			const pageOneSrc = currentPage > numOfPages ? null : pages[currentPage];
			const pageTwoSrc = currentPage + 1 > numOfPages ? null : pages[currentPage + 1];
			content = (
				<Entity>
					<Page
						src={pageOneSrc}
						height={pageHeight}
						width={pageWidth}
						position={{x: -pageWidth / 2, y: 0, z: 0}}
					/>
					<Page
						src={pageTwoSrc}
						height={pageHeight}
						width={pageWidth}
						position={{x: pageWidth / 2, y: 0, z: 0}}
					/>
				</Entity>
			);
		}

		return content;
	};

	render() {
		const {pages, pageHeight, pageWidth, buttonHeight, buttonWidth, mode} = this.props;
		const {currentPage, position} = this.state;

		const numOfPages = pages.length - 1;
		const nextDisabled = currentPage + 1 > numOfPages;
		const previousDisabled = currentPage - 1 < 0;

		let previousButtonPosition, nextButtonPosition;
		if (mode === BOOK_MODES.single) {
			previousButtonPosition = {
				x: -(pageWidth / 2 + buttonWidth / 2),
				y: position.y,
				z: position.z,
			};
			nextButtonPosition = {x: pageWidth / 2 + buttonWidth / 2, y: position.y, z: position.z};
		} else {
			previousButtonPosition = {x: -(pageWidth + buttonWidth / 2), y: position.y, z: position.z};
			nextButtonPosition = {x: pageWidth + buttonWidth / 2, y: position.y, z: position.z};
		}

		return (
			<Entity bring-to-front position={position}>
				<Entity look-at="[camera]">
					<Button
						id="button"
						position={previousButtonPosition}
						height={buttonHeight || pageHeight}
						width={buttonWidth}
						disabled={previousDisabled}
						text="<"
						onClick={() => this.cyclePage(CYCLE_DIRECTIONS.previous)}
					/>
					{this.renderPages()}
					<Button
						id="button"
						position={nextButtonPosition}
						height={buttonHeight || pageHeight}
						width={buttonWidth}
						disabled={nextDisabled}
						text=">"
						onClick={() => this.cyclePage(CYCLE_DIRECTIONS.next)}
					/>
				</Entity>
			</Entity>
		);
	}
}

export default Book;
