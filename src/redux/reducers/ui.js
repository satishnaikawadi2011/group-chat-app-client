import { CLOSE_DIALOG, OPEN_DIALOG, TOGGLE_DRAWER, TOGGLE_THEME } from '../types';

const initialState = {
	dialog       : {
		type : '',
		open : false
	},
	isDrawerOpen : false,
	isDarkTheme  : false
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
		case TOGGLE_THEME:
			return {
				...state,
				isDarkTheme : !state.isDarkTheme
			};
		case TOGGLE_DRAWER:
			return {
				...state,
				isDrawerOpen : !state.isDrawerOpen
			};
		default:
			return state;
	}
}
