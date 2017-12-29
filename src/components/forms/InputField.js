import React, {Component} from 'react';
import * as lodash from 'lodash';
import {FormGroup, ControlLabel, FormControl, HelpBlock, InputGroup} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';

class InputField extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id || ('text_input_' + Math.random()),
			value: props.initialValue || ''
		};
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		});
		if (this.props.onChange) {
			this.props.onChange(e.target.value, this.state.id);
		}
	}

	handleKeyDown(e) {
		if (this.props.onKeyDown) {
			this.props.onKeyDown(e);
		}
	}

	getValidationState() {
		let currentValue = this.state.value.toString();
		if (this.props.validator) {
			return this.props.validator(currentValue);
		}

		return null;
	}

	setInputValue(value = '') {
		this.setState({value});

		if (this.props.onChange) {
			this.props.onChange(value, this.state.id);
		}
	}

	render() {
		let controlType = 'text';
		let componentClass = 'input';
		let rows = null;

		if (this.props.type === InputField.TYPES.password) {
			controlType = 'password';
		}
		else if (this.props.type === InputField.TYPES.textarea) {
			componentClass = 'textarea';
			rows = this.props.rows || null;
		}
		else if (this.props.type === InputField.TYPES.number) {
			controlType = 'number';
			rows = this.props.rows || null;
		}
		else if (this.props.type === InputField.TYPES.file) {
			controlType = 'file';
			rows = this.props.rows || null;
		}

		const feedback = this.props.showFeedbackIcon ? <FormControl.Feedback /> : null;
		const helpBlock = this.props.helpBlock ? <HelpBlock>{this.props.helpBlock}</HelpBlock> : null;

		let className = this.props.className || '';
		if (this.props.hasError) {
			className += ' has-error';
		}

		const childProps = {};
		lodash.forEach(this.props, (prop, name) => {
			if (!InputField.propTypes[name]) {
				childProps[name] = prop;
			}
		});

		const inputField = (
			<FormControl
				disabled={this.props.disabled}
				name={this.state.id}
				type={controlType}
				rows={rows}
				componentClass={componentClass}
				value={this.state.value}
				placeholder={this.props.placeholder}
				onChange={e => this.handleChange(e)}
				onKeyDown={e => this.handleKeyDown(e)}
				{...childProps}/>
		);

		const inputFieldGroup = this.props.icon
			? <InputGroup>
					<InputGroup.Addon>{this.props.icon && <FontAwesome iey={this.props.icon} name={this.props.icon} />}</InputGroup.Addon>
					{inputField}
			  </InputGroup>
			: {inputField};

		const inputFieldLabel = this.props.label ? (<ControlLabel>{this.props.label}</ControlLabel>) : null;
		return (
			<FormGroup
				controlId={this.state.id}
				validationState={this.getValidationState()}
				className={className}
				bsSize={this.props.bsSize}>
				{this.props.beforeElement}
				{inputFieldLabel}
				{inputFieldGroup}
				{feedback}
				{helpBlock}
				{this.props.children}
			</FormGroup>
		);
	}
}

InputField.propTypes = {
	onChange: PropTypes.func,
	onKeyDown: PropTypes.func,
	initialValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number]),
	id: PropTypes.string,
	validator: PropTypes.func,
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	rows: PropTypes.number,
	type: PropTypes.string,
	showFeedbackIcon: PropTypes.bool,
	placeholder: PropTypes.string,
	helpBlock: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object]),
	className: PropTypes.string,
	bsSize: PropTypes.string,
	disabled: PropTypes.bool,
	hasError: PropTypes.bool,
	beforeElement: PropTypes.any
};

InputField.TYPES = {
	text: 'text',
	file: 'file',
	password: 'password',
	textarea: 'textarea',
	number: 'number',
	email: 'email'
};

export default InputField;
