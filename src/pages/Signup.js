import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import AppIcon from '../images/logo.svg';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../utils/graphql';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/user';

const styles = {
	form        : {
		textAlign : 'center'
	},
	pageTitle   : {
		marginTop    : 10,
		marginBottom : 10,
		fontSize     : '3rem'
	},
	logo        : {
		width        : 45,
		height       : 45,
		marginTop    : 20,
		marginBottom : 20
	},
	textField   : {
		margin : '10px auto 10px auto'
	},
	button      : {
		marginTop : 20,
		position  : 'relative'
	},
	customError : {
		color     : 'red',
		fontSize  : '0.8rem',
		marginTop : 20
	},
	progress    : {
		position : 'absolute'
	}
};

const useStyles = makeStyles(styles);

function Signup(props) {
	const dispatch = useDispatch();
	const [
		signupUser,
		{ loading }
	] = useMutation(SIGNUP_USER, {
		update(_, res) {
			dispatch(signup(res.data.signup.token));
			props.history.push('/');
		},
		onError(err) {
			if (err.graphQLErrors[0]) {
				setErrors(err.graphQLErrors[0].extensions.errors);
			}
			else {
				console.log(err);
			}
		}
	});
	const classes = useStyles();
	const [
		userData,
		setUserData
	] = useState({
		email           : '',
		username        : '',
		password        : '',
		confirmPassword : ''
	});
	const [
		errors,
		setErrors
	] = useState({});
	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		signupUser({ variables: userData });
		// console.log(userData);
	};
	return (
		<Grid className={`${classes.form} centered-to-page`} container>
			<Grid item sm />
			<Grid item sm>
				<img className={classes.logo} src={AppIcon} alt="SocialApp" />
				<h1 className={classes.pageTitle}>SignUp</h1>

				<form noValidate onSubmit={handleSubmit}>
					<TextField
						id="email"
						name="email"
						label="Email"
						onChange={handleChange}
						helperText={errors.email}
						error={

								errors.email ? true :
								false
						}
						value={userData.email}
						type="email"
						className={classes.textField}
						fullWidth
					/>
					<TextField
						id="password"
						name="password"
						label="Password"
						onChange={handleChange}
						helperText={errors.password}
						error={

								errors.password ? true :
								false
						}
						value={userData.password}
						type="password"
						className={classes.textField}
						fullWidth
					/>
					<TextField
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm Password"
						onChange={handleChange}
						helperText={errors.confirmPassword}
						error={

								errors.confirmPassword ? true :
								false
						}
						value={userData.confirmPassword}
						type="password"
						className={classes.textField}
						fullWidth
					/>
					<TextField
						id="username"
						name="username"
						label="Username"
						onChange={handleChange}
						helperText={errors.username}
						error={

								errors.username ? true :
								false
						}
						value={userData.username}
						type="text"
						className={classes.textField}
						fullWidth
					/>
					{errors.general && (
						<Typography variant="body2" className={classes.customError}>
							{errors.general}
						</Typography>
					)}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						disabled={loading}
					>
						SignUp{loading && <CircularProgress className={classes.progress} size={30} />}
					</Button>
					<br />
					<small className="text-capitalize">
						already have an account ? login <Link to="/login">here</Link>{' '}
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
}

export default Signup;
