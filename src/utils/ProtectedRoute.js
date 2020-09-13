import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function ProtectedRoute(props) {
	const { token } = useSelector((state) => state.user);
	if (props.authenticated && !token) {
		return <Redirect to="/login" />;
	}
	else if (props.guest && token) {
		return <Redirect to="/" />;
	}
	else {
		return <Route component={props.component} {...props} />;
	}
}
