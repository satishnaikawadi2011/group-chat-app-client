import { SIGNUP, LOGOUT, LOGIN, SET_USER, ADD_CONTACT, DELETE_CONTACT } from '../types';

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
		case ADD_CONTACT:
			if (action.payload.type === 'personal') {
				return {
					...state,
					userData : {
						...state.userData,
						contacts : [
							action.payload.contactName,
							...state.userData.contacts
						]
					}
				};
			}
			else if (action.payload.type === 'group') {
				return {
					...state,
					userData : {
						...state.userData,
						groups : [
							action.payload.contactName,
							...state.userData.groups
						]
					}
				};
			}
		case DELETE_CONTACT:
			if (action.payload.type === 'personal') {
				return {
					...state,
					userData : {
						...state.userData,
						contacts : state.userData.contacts.filter((c) => c !== action.payload.name)
					}
				};
			}
			else if (action.payload.type === 'group' || 'personal2') {
				return {
					...state,
					userData : {
						...state.userData,
						groups : state.userData.groups.filter((g) => g !== action.payload.name)
					}
				};
			}
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
}
