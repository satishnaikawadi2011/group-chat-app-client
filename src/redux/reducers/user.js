import { SIGNUP, LOGOUT, LOGIN } from '../types';

const initialState = {
	token    : null,
	userData : {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SIGNUP:
		case LOGIN:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token    : action.payload.token,
				userData : action.payload
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
