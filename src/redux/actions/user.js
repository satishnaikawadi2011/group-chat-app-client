import { LOGIN, LOGOUT, SIGNUP } from '../types';

export const login = (payload) => (dispatch) => {
	dispatch({ type: LOGIN, payload });
};

export const signup = (payload) => (dispatch) => {
	dispatch({ type: SIGNUP, payload });
};

export const logout = () => (dispatch) => {
	dispatch({ type: LOGOUT });
	localStorage.removeItem('token');
};
