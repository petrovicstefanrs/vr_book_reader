// Node Modules

import React from 'react';
import FontAwesome from 'react-fontawesome';
import {FormGroup, ControlLabel, HelpBlock, FormControl, InputGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Component Code


const FieldGroup = ({ id, label, help, inputType, icon, ...props }) => {
	return (
		<FormGroup controlId={id}>
			{label && <ControlLabel>{label}</ControlLabel>}
			{
				icon
				? <InputGroup>
						<InputGroup.Addon>{icon && <FontAwesome iey={icon} name={icon} />}</InputGroup.Addon>
						<FormControl type={inputType} {...props} />
				  </InputGroup>
				: <FormControl type={inputType} {...props} />
			}
			{help && <HelpBlock>{help}</HelpBlock>}
		</FormGroup>
	);
};

FieldGroup.propTypes = {
	id: PropTypes.string.isRequired,
	inputType: PropTypes.string.isRequired,
	label: PropTypes.string,
	help: PropTypes.string
};

export default FieldGroup;

