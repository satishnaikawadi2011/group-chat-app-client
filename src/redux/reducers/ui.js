import { CLOSE_DIALOG, CLOSE_DRAWER, OPEN_DIALOG, OPEN_DRAWER, TOGGLE_DRAWER, TOGGLE_THEME } from '../types';

const initialState = {
	dialog      : {
		type   : '',
		open   : false,
		member : null
	},
	drawer      : {
		isDrawerOpen : false,
		purpose      : ''
	},
	isDarkTheme : false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case OPEN_DIALOG:
			return {
				...state,
				dialog : {
					...state.dialog,
					type   : action.payload.type,
					open   : true,
					member :
						action.payload.member ? action.payload.member :
						null
				}
			};
		case CLOSE_DIALOG:
			return {
				...state,
				dialog : {
					...state.dialog,
					type   : '',
					open   : false,
					member : null
				}
			};
		case TOGGLE_THEME:
			return {
				...state,
				isDarkTheme : !state.isDarkTheme
			};
		case OPEN_DRAWER:
			return {
				...state,
				drawer : {
					...state.drawer,
					isDrawerOpen : true,
					purpose      : action.payload
				}
			};
		case CLOSE_DRAWER:
			return {
				...state,
				drawer : {
					...state.drawer,
					isDrawerOpen : false,
					purpose      : ''
				}
			};
		default:
			return state;
	}
}
