import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class InputField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id || ('text_input_' + Math.random()),
			value: props.defaultValue || ''
		};

		this.onChange=this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({
			value: e.target.value
		});
		if (this.props.onChange) {
			this.props.onChange(e.target.value, this.state.id);
		}
	}

	render() {
		let controlType = InputField.TYPES.text;
		let isMultiline = false;
		if (this.props.type === InputField.TYPES.password) {
			controlType = InputField.TYPES.password;
		}
		if (this.props.multiline) {
			isMultiline = true;
		}

		return (
			<TextField
				disabled={this.props.disabled}
				id={this.state.id}
				className={this.props.className}
				type={controlType}
				name={this.props.name || "InputField"}
				onChange={this.onChange}
				multiline={isMultiline}
				label={this.props.label}/>
		);
	}
}

InputField.propTypes = {
	label: PropTypes.string,
	multiline: PropTypes.bool,
	onChange: PropTypes.func,
	name: PropTypes.string,
	id: PropTypes.string,
	type: PropTypes.string.isRequired,
	className: PropTypes.string,
	disabled: PropTypes.bool
};

InputField.TYPES = {
	text: 'text',
	password: 'password',
	textarea: 'textarea',
};

export default InputField;
