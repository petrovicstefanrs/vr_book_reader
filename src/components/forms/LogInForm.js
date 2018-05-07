// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Snackbar from 'material-ui/Snackbar';
import Card, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

// Enviroment settings

import * as routes from '../../lib/routes';
import FA from '../../lib/font_awesome';
import {login, clearAuthMessage} from '../../redux/actions/auth';

// Containers

// Components

import InputField from './InputField';

// Component Code

import styles from '../../styles/AuthForms';
const CLASS = 'top-AuthForm';

class LogInForm extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
		this.handleMessageDone = this.handleMessageDone.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password;
	}

	submit() {
		this.props.login(this.state.email, this.state.password);
	}

	handleMessageDone() {
		this.props.clearAuthMessage();
	}

	render() {
		const classes = this.props.classes;
		const disabled = !this.canSubmit();
		const snackbarAction = (
			<Button color="inherit" onClick={this.handleMessageDone}>
				<FontAwesome icon={FA.times} name={FA.times} />
			</Button>
		);

		return (
			<div className={CLASS}>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title="Sign In"
						subheader="Welcome back"
						classes={{
							title: classes.whiteText,
							subheader: classes.whiteText,
						}}
					/>
					<CardContent className={classes.cardContent}>
						<InputField
							id="userEmail"
							type="text"
							label="Email"
							onChange={val => this.setState({email: val})}
						/>
						<InputField
							className={classes.inputField}
							id="userPassword"
							type="password"
							label="Password"
							onChange={val => this.setState({password: val})}
						/>
					</CardContent>
					<CardActions className={classes.cardFooter}>
						<Button variant="raised" disabled={disabled} color="primary" onClick={this.submit}>
							SIGN IN
						</Button>
						<Typography
							style={{
								padding: '8px 0',
								textAlign: 'right',
							}}
							type="subheading"
						>
							Don't have an account?<br />
							<Link to={routes.AUTH_REGISTER}>Sign Up</Link>
						</Typography>
					</CardActions>
				</Card>

				<Snackbar
					anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
					open={!!this.props.login_message}
					action={snackbarAction}
					onClose={this.handleMessageDone}
					message={this.props.login_message || ''}
					autoHideDuration={5000}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	login_message: state.auth.message,
	error: !!state.auth.error,
});

const mapDispatchToProps = dispatch => ({
	login: (email, password) => dispatch(login(email, password)),
	clearAuthMessage: () => dispatch(clearAuthMessage()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LogInForm));
