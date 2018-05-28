import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

import '../styles/WithDropZone.css';

const CLASS = 'DropZone';

class WithDropZone extends Component {
	static propTypes = {
		// Dropzone speciffic props
		accept: PropTypes.array,
		disableClick: PropTypes.bool,
		disabled: PropTypes.bool,
		disablePreview: PropTypes.bool,
		preventDropOnDocument: PropTypes.bool,
		multiple: PropTypes.bool,
		name: PropTypes.string,
		maxSize: PropTypes.number,
		minSize: PropTypes.number,
		className: PropTypes.string,
		activeClassName: PropTypes.string,
		acceptClassName: PropTypes.string,
		rejectClassName: PropTypes.string,
		disabledClassName: PropTypes.string,
		onClick: PropTypes.func,
		onDrop: PropTypes.func,
		onDropAccepted: PropTypes.func,
		onDropRejected: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnter: PropTypes.func,
		onDragOver: PropTypes.func,
		onDragLeave: PropTypes.func,
		onFileDialogCancel: PropTypes.func,
	};

	static defaultProps = {
		accept: null,
		disableClick: false,
		disabled: false,
		disablePreview: true,
		preventDropOnDocument: true,
		multiple: false,
		name: 'FileDropZone',
		maxSize: null,
		minSize: 0,
	};

	constructor(props) {
		super(props);

		this.onDrop = this.onDrop.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	onClick(event) {
		if (this.props.onClick) {
			this.props.onClick(event);
		}

		return;
	}

	onDrop(acceptedFiles, rejectedFiles) {
		this.setState({
			isFileDragged: false,
		});
		if (this.props.onDrop) {
			this.props.onDrop(acceptedFiles, rejectedFiles);
		}

		return;
	}

	onDropAccepted() {
		this.setState({
			isFileDragged: false,
		});
		if (this.props.onDropAccepted) {
			this.props.onDropAccepted();
		}

		return;
	}

	onDropRejected() {
		this.setState({
			isFileDragged: false,
		});
		if (this.props.onDropRejected) {
			this.props.onDropRejected();
		}

		return;
	}

	onDragStart() {
		this.setState({
			isFileDragged: true,
		});
		if (this.props.onDragStart) {
			this.props.onDragStart();
		}

		return;
	}

	onDragEnter() {
		this.setState({
			isFileDragged: true,
		});
		if (this.props.onDragEnter) {
			this.props.onDragEnter();
		}

		return;
	}

	onDragOver() {
		this.setState({
			isFileDragged: false,
		});
		if (this.props.onDragOver) {
			this.props.onDragOver();
		}

		return;
	}

	onDragLeave() {
		this.setState({
			isFileDragged: false,
		});
		if (this.props.onDragLeave) {
			this.props.onDragLeave();
		}

		return;
	}

	onFileDialogCancel() {
		if (this.props.onFileDialogCancel) {
			this.props.onFileDialogCancel();
		}

		return;
	}

	render() {
		const accept = this.props.accept ? this.props.accept.join(', ') : null;
		let dropZone = (
			<Dropzone
				ref={node => {
					this.dropzone = node;
				}}
				accept={accept}
				disableClick={this.props.disableClick}
				disabled={this.props.disabled}
				disablePreview={this.props.disablePreview}
				preventDropOnDocument={this.props.preventDropOnDocument}
				multiple={this.props.multiple}
				name={this.props.name}
				maxSize={this.props.maxSize}
				minSize={this.props.minSize}
				className={CLASS + ' ' + this.props.className}
				activeClassName={this.props.activeClassName || `${CLASS}-active`}
				acceptClassName={this.props.acceptClassName || `${CLASS}-accepted`}
				rejectClassName={this.props.rejectClassName || `${CLASS}-rejected`}
				disabledClassName={this.props.disabledClassName || `${CLASS}-disabled`}
				onClick={this.props.onClick}
				onDrop={this.props.onDrop}
				onDropAccepted={this.props.onDropAccepted}
				onDropRejected={this.props.onDropRejected}
				onDragStart={this.props.onDragStart}
				onDragEnter={this.props.onDragEnter}
				onDragOver={this.props.onDragOver}
				onDragLeave={this.props.onDragLeave}
				onFileDialogCancel={this.props.onFileDialogCancel}
			>
				{this.props.children}
			</Dropzone>
		);

		return <div className="top-WithDropZone">{dropZone}</div>;
	}
}

export default WithDropZone;
