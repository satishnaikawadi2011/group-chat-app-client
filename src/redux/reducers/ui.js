import { CLOSE_DIALOG, OPEN_DIALOG } from '../types';

const initialState = {
	dialog : {
		type : '',
		open : false
	}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case OPEN_DIALOG:
			return {
				...state,
				dialog : {
					...state.dialog,
					type : action.payload,
					open : true
				}
			};
		case CLOSE_DIALOG:
			return {
				...state,
				dialog : {
					...state.dialog,
					type : '',
					open : false
				}
			};
		default:
			return state;
	}
}
