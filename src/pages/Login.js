import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import AppIcon from '../images/logo.svg';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from '../utils/graphql';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/user';

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

function Login(props) {
	const dispatch = useDispatch();
	const [
		loginUser,
		{ loading }
	] = useLazyQuery(LOGIN_USER, {
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		onCompleted(data) {
			dispatch(login(data.login.token));
			window.location.href = '/';
		}
	});
	const classes = useStyles();
	const [
		userData,
		setUserData
	] = useState({
		username : '',
		password : ''
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
		loginUser({ variables: userData });
	};
	return (
		<Grid className={`${classes.form} centered-to-page`} container>
			<Grid item sm />
			<Grid item sm>
				<img className={classes.logo} src={AppIcon} alt="SocialApp" />
				<h1 className={classes.pageTitle}>Login</h1>
				<form noValidate onSubmit={handleSubmit}>
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
						Login
						{loading && <CircularProgress className={classes.progress} size={30} />}
					</Button>
					<br />
					<small className="text-capitalize">
						don't have an account ? signup <Link to="/signup">here</Link>{' '}
					</small>
				</form>
			</Grid>
			<Grid item sm />
		</Grid>
	);
}

export default Login;
