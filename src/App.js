import React, { useState } from 'react';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, Switch as SwitchBtn } from '@material-ui/core';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ApolloProvider from './utils/ApolloProvider';
import jwtDecode from 'jwt-decode';
import { logout } from './redux/actions/user';
import ProtectedRoute from './utils/ProtectedRoute';
import store from './redux/store';
import { LOGIN } from './redux/types';

const token = localStorage.getItem('token');

if (token) {
	const decodedToken = jwtDecode(token);
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logout());
		window.location.href = '/login';
	}
	else {
		store.dispatch({ type: LOGIN, payload: { ...decodedToken, token } });
	}
}

function App() {
	const [
		darkTheme,
		setDarkTheme
	] = useState(false);
	const palleteType =
		darkTheme ? 'dark' :
		'light';
	const theme = createMuiTheme({
		palette    : {
			type : palleteType
		},
		typography : {
			fontFamily : [
				'Ubuntu',
				'sans-serif'
			]
		}
	});
	const handleThemeChange = () => {
		setDarkTheme((prevState) => !prevState);
	};
	return (
		<ApolloProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router style={{ position: 'relative' }}>
					<div style={{ position: 'absolute', top: 0, right: 0 }}>
						<SwitchBtn style={{ position: 'absolute' }} checked={darkTheme} onChange={handleThemeChange} />
					</div>
					<Switch>
						<ProtectedRoute
							exact
							path="/"
							component={(props) => <Home {...props} isDarkTheme={darkTheme} />}
							authenticated
						/>
						<ProtectedRoute path="/login" component={Login} guest />
						<ProtectedRoute path="/signup" component={Signup} guest />
					</Switch>
				</Router>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
