// Node Modules

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Enviroment settings

import * as routes from '../../lib/routes';
import {register} from '../../redux/actions/auth';

// Containers

// Components

import InputField from './InputField';

// Component Code

import styles from '../../styles/AuthForms';
const CLASS = 'top-AuthForm';

class RegisterForm extends Component {
	static propTypes = {
		register: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
		};

		this.submit = this.submit.bind(this);
		this.canSubmit = this.canSubmit.bind(this);
	}

	canSubmit() {
		return !!this.state.email && !!this.state.password && !!this.state.username;
	}

	submit() {
		this.props.register(this.state.username, this.state.email, this.state.password);
	}

	render() {
		const classes = this.props.classes;
		const disabled = !this.canSubmit();

		return (
			<div className={CLASS}>
				<Card className={classes.card}>
					<CardHeader
						className={classes.cardHeader}
						title="Sign Up"
						subheader="Well Hello There!"
						classes={{
							title: classes.whiteText,
							subheader: classes.whiteText,
						}}
					/>
					<CardContent className={classes.cardContent}>
						<InputField
							id="userName"
							type="text"
							label="Username"
							onChange={val => this.setState({username: val})}
						/>
						<InputField
							className={classes.inputField}
							id="userEmail"
							type="email"
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
							SIGN UP
						</Button>
						<Typography
							style={{
								padding: '8px 0',
								textAlign: 'right',
							}}
							type="subheading"
						>
							Already have an account?<br />
							<Link className="buttonLink" to={routes.AUTH_LOGIN}>
								Sign In
							</Link>
						</Typography>
					</CardActions>
				</Card>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	register: (username, email, password) => dispatch(register(username, email, password)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
