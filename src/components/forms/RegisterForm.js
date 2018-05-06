// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Snackbar from 'material-ui/Snackbar';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// Enviroment settings

import * as routes from '../../lib/routes';
import FA from '../../lib/font_awesome';
import {register, clearAuthMessage} from "../../redux/actions/auth";

// Containers

// Components

import InputField from './InputField';

// Component Code

const CLASS = 'top-AuthForm';

const styles = theme => ({
	card: {
		width: '256px'
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: '16px'
	},
	inputField: {
		marginTop: '16px'
	},
	cardHeader: {
		backgroundColor: theme.palette.primary.main
	},
	cardFooter: {
		flexDirection: 'column',
		height: 'auto',
		alignItems: 'initial'
	},
	whiteText: {
		color: theme.palette.primary.contrastText
	}
});

class RegisterForm extends Component {
	static propTypes = {
		register: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: ''
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
		this.handleMessageDone = this.handleMessageDone.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password && !!this.state.username;
	}

	submit() {
		this.props.register(this.state.username, this.state.email, this.state.password);
	}

	handleMessageDone() {
		this.props.clearAuthMessage();
	}

  	render() {
  		const classes = this.props.classes;
  		const disabled = !this.canSubmit();
  		const snackbarAction = (
  			<Button primary onClick={this.handleMessageDone}>
  				<FontAwesome icon={FA.times} name={FA.times}/>
  			</Button>
  		);

  		return (
		  	<div className={CLASS}>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title="Sign Up"
	  					subheader="Well Hello There!"
	  					classes={{
	  						title: classes.whiteText,
	  						subheader: classes.whiteText
	  					}}>
					</CardHeader>
					<CardContent className={classes.cardContent}>
					    <InputField
					    	id='userName'
					    	type='text'
					    	label='Username'
					    	onChange={ (val) => this.setState({username: val})}
					    />
					    <InputField
					    	className={classes.inputField}
					    	id='userEmail'
					    	type='email'
					    	label='Email'
					    	onChange={ (val) => this.setState({email: val})}
					    />
					    <InputField
					    	className={classes.inputField}
					    	id='userPassword'
					    	type='password'
					    	label='Password'
					    	onChange={ (val) => this.setState({password: val})}
					    />
					</CardContent>
					<CardActions className={classes.cardFooter}>
						<Button variant="raised" disabled={disabled} color="primary" onClick={this.submit}>
							SIGN UP
						</Button>
					    <Typography
					    	style={{
					    		padding: '8px 0',
					    		textAlign: 'right'
					    	}}
					    	type="subheading">
					    	Already have an account?<br/>
					    	<Link className="buttonLink" to={routes.AUTH_LOGIN}>Sign In</Link>
					    </Typography>
					</CardActions>
				</Card>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', 'horizontal': 'right' }}
	  				open={!!this.props.register_message}
	  				action={snackbarAction}
	  				onClose={this.handleMessageDone}
	  				message={this.props.register_message || ""}
	  				autoHideDuration={5000}/>
			</div>
		);
  	}
}

const mapStateToProps = state => ({
	register_message: state.auth.message,
	error: !!state.auth.error
});

const mapDispatchToProps = dispatch => ({
	register: (username, email, password) => dispatch(register(username, email, password)),
	clearAuthMessage: () => dispatch(clearAuthMessage())
});

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(RegisterForm));