import { SELECT_CONTACT, SET_LATEST_MESSAGES, SET_MESSAGES } from '../types';

const initialState = {
	latestMessages  : {},
	messages        : [],
	selectedContact : {
		type : '',
		name : ''
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_LATEST_MESSAGES:
			return {
				...state,
				latestMessages : action.payload
			};
		case SELECT_CONTACT:
			return {
				...state,
				selectedContact : {
					...state.selectedContact,
					type : action.payload.type,
					name : action.payload.name
				}
			};
		case SET_MESSAGES:
			return {
				...state,
				messages : action.payload
			};
		default:
			return state;
	}
}
