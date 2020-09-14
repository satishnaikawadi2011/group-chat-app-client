import { LOGIN, LOGOUT, SET_USER, SIGNUP } from '../types';

export const login = (payload) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN, payload });
	} catch (err) {
		console.log(err);
	}
};

export const signup = (payload) => (dispatch) => {
	dispatch({ type: SIGNUP, payload });
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	localStorage.removeItem('token');
};

export const getUserData = (payload) => (dispatch) => {
	dispatch({ type: SET_USER, payload });
};
