// Node Modules
import 'aframe';
import 'aframe-extras';
import 'aframe-effects';
import 'aframe-particle-system-component';
import 'aframe-look-at-component';
import {Entity, Scene, Camera} from 'aframe-react';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import lodash from 'lodash';

// Enviroment settings

import {makeAssetUrl} from '../../lib/util';
import Book from './components/Book';

// Components

// Component Code

const ComponentTypes = {
	book: 'book',
	scene: 'scene',
	entity: 'entity',
	camera: 'camera',
	assets: 'assets',
	asset_item: 'asset_item',
};

const AframeComponents = {
	[ComponentTypes.book]: Book,
	[ComponentTypes.scene]: Scene,
	[ComponentTypes.entity]: Entity,
	[ComponentTypes.camera]: Camera,
	[ComponentTypes.assets]: 'a-assets',
	[ComponentTypes.asset_item]: 'a-asset-item',
};

class VrScene extends Component {
	static propTypes = {
		scene: PropTypes.object.isRequired,
		book: PropTypes.object,
	};

	static defaultProps = {};

	constructor(props) {
		super(props);
	}

	prepareBookPages = () => {
		const {book} = this.props;
		const {pages} = book;
		const preparedPages = lodash.map(pages, page => {
			const pageUrl = makeAssetUrl(page.path);
			return pageUrl;
		});

		return preparedPages;
	};

	JSONtoAFRAME = (obj, key) => {
		const Type = AframeComponents[obj.type];
		const children = obj.children ? obj.children.map(this.JSONtoAFRAME) : [];
		const props = obj.props;

		if (props && props.src) {
			props.src = makeAssetUrl(props.src);
		}

		if (obj.type === ComponentTypes.book) {
			const pages = this.prepareBookPages();
			return <Type key={key} {...props} pages={pages} look-at="#camera" />;
		}

		return (
			<Type key={key} {...props}>
				{children}
			</Type>
		);
	};

	renderVrEditor = () => {
		const {scene} = this.props;
		const renderedScene = this.JSONtoAFRAME(scene);
		return renderedScene;
	};

	render() {
		return this.renderVrEditor();
	}
}

const mapStateToProps = state => ({
	scene: {
		type: 'scene',
		props: {
			embedded: true,
			environment:
				'ground: noise; preset: forest; skyType: gradient; groundTexture: none; flatShading: true; groundColor: #24531C; shadow: true; fog: 0.3; playArea: 1',
		},
		children: [
			{
				type: 'assets',
				props: {},
				children: [
					{
						type: 'asset_item',
						props: {
							id: 'trees-gltf',
							src: 'trees/scene.gltf',
						},
					},
				],
			},
			{
				type: 'entity',
				props: {
					id: 'rig',
					position: '0.5 0 -4',
					rotation: '0 0 0',
				},
				children: [
					{
						type: 'entity',
						props: {
							id: 'camera',
							camera: true,
							position: '0 1.6 0',
							'wasd-controls': 'true',
							'acceleration': '40',
							'look-controls': 'pointerLockEnabled: true',
						},
						children: [
							{
								type: 'entity',
								props: {
									primitive: 'a-cursor',
									position: '0 0 -0.5'
								},
							},
						],
					},
				],
			},
			{
				type: 'book',
				props: {
					position: '0.5 1.6 -5'
				}
			},
			{
				type: 'entity',
				props: {
					position: '0.0 0.0 -3.0',
				},
				children: [
					{
						type: 'entity',
						props: {
							light: 'type: point; intensity: 5; distance: 10; decay: 2',
							position: '0.0 0.0 0.0',
						},
					},
					{
						type: 'entity',
						children: [
							{
								type: 'entity',
								props: {
									position: '0.0 1.5 0.0',
								},
							},
						],
					},
				],
			},
			{
				type: 'entity',
				props: {
					position: '0.0 0.0 -3.0',
				},
				children: [
					{
						type: 'entity',
						props: {
							'gltf-model': '#trees-gltf',
							scale: '0.5 0.5 0.5',
							position: '0.0 -0.5 0',
							rotation: '0 35 0',
							shadow: 'receive: false; cast: true',
						},
					},
				],
			},
		],
	},
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VrScene);
