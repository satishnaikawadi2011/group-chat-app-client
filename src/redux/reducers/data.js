import {
	ADD_MEMBER,
	ADD_MESSAGE,
	REMOVE_MEMBER,
	SELECT_CONTACT,
	SET_GROUP,
	SET_LATEST_MESSAGES,
	SET_MESSAGES
} from '../types';

const initialState = {
	latestMessages  : {},
	messages        : [],
	selectedContact : {
		type : '',
		name : ''
	},
	group           : {}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_LATEST_MESSAGES:
			if (action.payload.from === 'server') {
				return {
					...state
				};
			}
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
				messages : [
					...action.payload
				]
			};
		case ADD_MESSAGE:
			if (state.selectedContact.name === action.payload.contact) {
				return {
					...state,
					messages       : [
						action.payload.message,
						...state.messages
					],
					latestMessages : {
						...state.latestMessages,
						[action.payload.contact]: action.payload.message
					}
				};
			}
			else {
				return {
					...state,
					latestMessages : {
						...state.latestMessages,
						[action.payload.contact]: action.payload.message
					}
				};
			}
		case SET_GROUP:
			return {
				...state,
				group : action.payload
			};
		case ADD_MEMBER:
			return {
				...state,
				group : {
					...state.group,
					members : [
						...state.group.members,
						{ username: action.payload }
					]
				}
			};
		case REMOVE_MEMBER:
			return {
				...state,
				group : {
					...state.group,
					members : state.group.members.filter((m) => m.username !== action.payload)
				}
			};
		default:
			return state;
	}
}
