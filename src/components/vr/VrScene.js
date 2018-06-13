// Node Modules
import 'aframe';
import 'aframe-extras';
import 'aframe-environment-component';
import 'aframe-effects';
import 'aframe-particle-system-component';
import 'aframe-look-at-component';
import 'aframe-fps-counter-component';
import './a_components/disable-inspector';
import {Entity, Scene, Camera} from 'aframe-react';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import lodash from 'lodash';

// Enviroment settings

import {makeAssetUrl} from '../../lib/util';
import ENV from '../../env';

// Components

import Book from './components/Book';

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
		settingEnv: PropTypes.bool,
	};

	static defaultProps = {
		book: null,
	};

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
		const shouldRenderDevStats =
			obj.type === ComponentTypes.camera || (props && props.camera && ENV.isDevEnv);

		if (props && props.src) {
			props.src = makeAssetUrl(props.src);
		}

		if (obj.type === ComponentTypes.scene) {
			if (!ENV.isDevEnv) {
				props['disable-inspector'] = true;
			}
		}

		if (obj.type === ComponentTypes.book) {
			// Early return if we don;t want to render the book, just the enviroment
			if (!this.props.book) {
				return;
			}

			const pages = this.prepareBookPages();
			return <Type key={key} {...props} pages={pages} look-at="#camera" />;
		}

		if (shouldRenderDevStats) {
			return (
				<Type key={key} {...props}>
					<Entity fps-counter />
					{children}
				</Type>
			);
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
		const {settingEnv} = this.props;
		if (settingEnv) {
			return null;
		}
		const scene = this.renderVrEditor();
		return scene;
	}
}

const mapStateToProps = state => ({
	settingEnv: state.books.setting_env,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VrScene);
