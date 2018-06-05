import 'aframe-bring-to-front-component';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Entity} from 'aframe-react';

import {BOOK_MODES} from '../../../consts/aframe';
import Page from './Page';
import Button from './Button';

const CYCLE_DIRECTIONS = {
	previous: 'previous',
	next: 'next',
	first: 'first',
	last: 'last',
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
		borderSize: PropTypes.number,
	};

	static defaultProps = {
		pages: [],
		position: {x: 0, y: 0, z: 0},
		mode: BOOK_MODES.single,
		pageHeight: 0.8,
		pageWidth: 0.65,
		buttonHeight: 0.1,
		buttonWidth: 0.1,
		borderSize: 0.02,
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
		} else if (direction === CYCLE_DIRECTIONS.next) {
			nextPage += jumpStep;
		} else if (direction === CYCLE_DIRECTIONS.first) {
			nextPage = 0;
		} else if (direction === CYCLE_DIRECTIONS.last) {
			nextPage = numOfPages;
		}

		if (nextPage < 0 || nextPage > numOfPages) {
			return;
		}

		this.setState({
			currentPage: nextPage,
		});
	};

	renderPages = () => {
		const {mode, pageHeight, pageWidth, pages, borderSize} = this.props;
		const {currentPage} = this.state;
		const numOfPages = pages.length - 1;

		let content;
		if (mode === BOOK_MODES.single) {
			const src = currentPage > numOfPages ? null : pages[currentPage];
			content = (
				<Entity
					primitive="a-plane"
					material="shader: flat; color: black;"
					width={pageWidth + borderSize}
					height={pageHeight + borderSize}
				>
					<Page height={pageHeight} width={pageWidth} src={src} position={{x: 0, y: 0, z: 0.001}} />
				</Entity>
			);
		} else {
			const pageOneSrc = currentPage > numOfPages ? null : pages[currentPage];
			const pageTwoSrc = currentPage + 1 > numOfPages ? null : pages[currentPage + 1];
			content = (
				<Entity>
					<Entity
						primitive="a-plane"
						material="shader: flat; color: black;"
						width={pageWidth * 2 + borderSize}
						height={pageHeight + borderSize}
						rotation={{x: 0, y: 30, z: 0}}
					>
						<Page
							src={pageOneSrc}
							height={pageHeight}
							width={pageWidth}
							position={{x: -pageWidth / 2, y: 0, z: 0.001}}
						/>
					</Entity>
					<Entity
						primitive="a-plane"
						material="shader: flat; color: black;"
						width={pageWidth * 2 + borderSize}
						height={pageHeight + borderSize}
						rotation={{x: 0, y: -30, z: 0}}
					>
						<Page
							src={pageTwoSrc}
							height={pageHeight}
							width={pageWidth}
							position={{x: pageWidth / 2, y: 0, z: 0.001}}
						/>
					</Entity>
				</Entity>
			);
		}

		return content;
	};

	renderControls = () => {
		const {pages, pageWidth, pageHeight, buttonHeight, buttonWidth, mode, borderSize} = this.props;
		const {currentPage} = this.state;

		const numOfPages = pages.length - 1;
		const nextDisabled = currentPage + 1 > numOfPages;
		const previousDisabled = currentPage - 1 < 0;

		let previousButtonPosition, nextButtonPosition, controlsWidth;
		let controlsHeight = buttonHeight + borderSize;

		const ButtonXAxisOffset = pageWidth / 2 - (buttonWidth / 2 + borderSize / 2);
		previousButtonPosition = {
			x: -ButtonXAxisOffset,
			y: 0,
			z: 0.001,
		};
		nextButtonPosition = {x: ButtonXAxisOffset, y: 0, z: 0.001};
		controlsWidth = pageWidth + borderSize * 2;

		const firstPageButtonPosition = {x: previousButtonPosition.x + buttonWidth, y: 0, z: 0.001};
		const lastPageButtonPosition = {x: nextButtonPosition.x - buttonWidth, y: 0, z: 0.001};
		const controlsPosition = {x: 0, y: -(pageHeight / 2 + borderSize * 4 + buttonHeight), z: 0.2};

		return (
			<Entity
				look-at="[camera]"
				primitive="a-plane"
				material="shader: flat; color: black;"
				height={controlsHeight}
				width={controlsWidth}
				position={controlsPosition}
			>
				<Button
					id="button"
					position={previousButtonPosition}
					height={buttonHeight}
					width={buttonWidth}
					disabled={previousDisabled}
					text="<"
					onClick={() => this.cyclePage(CYCLE_DIRECTIONS.previous)}
				/>
				<Button
					id="button"
					position={firstPageButtonPosition}
					height={buttonHeight}
					width={buttonWidth}
					disabled={previousDisabled}
					text="<<"
					onClick={() => this.cyclePage(CYCLE_DIRECTIONS.first)}
				/>
				<Button
					id="button"
					position={lastPageButtonPosition}
					height={buttonHeight}
					width={buttonWidth}
					disabled={nextDisabled}
					text=">>"
					onClick={() => this.cyclePage(CYCLE_DIRECTIONS.last)}
				/>
				<Button
					id="button"
					position={nextButtonPosition}
					height={buttonHeight}
					width={buttonWidth}
					disabled={nextDisabled}
					text=">"
					onClick={() => this.cyclePage(CYCLE_DIRECTIONS.next)}
				/>
			</Entity>
		);
	};

	render() {
		const {position} = this.state;

		return (
			<Entity bring-to-front="distance: -0.5;" position={position}>
				<Entity look-at="[camera]">
					{this.renderPages()}
					{this.renderControls()}
				</Entity>
			</Entity>
		);
	}
}

export default Book;
