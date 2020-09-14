import { SIGNUP, LOGOUT, LOGIN, SET_USER } from '../types';

const initialState = {
	token    : null,
	userData : {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SIGNUP:
		case LOGIN:
			localStorage.setItem('token', action.payload);
			return {
				...state,
				token : action.payload
			};
		case SET_USER:
			return {
				...state,
				userData : action.payload
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
