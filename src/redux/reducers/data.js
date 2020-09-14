import { SET_LATEST_MESSAGES } from '../types';

const initialState = {
	latestMessages : {},
	messages       : []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_LATEST_MESSAGES:
			return {
				...state,
				latestMessages : action.payload
			};
		default:
			return state;
	}
}
