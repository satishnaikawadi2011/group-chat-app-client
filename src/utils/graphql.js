import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
	mutation signup($email: String!, $username: String!, $password: String!, $confirmPassword: String!) {
		signup(email: $email, username: $username, password: $password, confirmPassword: $confirmPassword) {
			username
			groups {
				name
			}
			contacts
			id
			email
			createdAt
			token
		}
	}
`;

export const LOGIN_USER = gql`
	query login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			username
			groups {
				name
			}
			contacts
			id
			email
			createdAt
			token
		}
	}
`;

export const GET_USER = gql`
	query getUser {
		getUser
	}
`;

export const GET_LATEST_MESSAGES = gql`
	query getLatestMessages {
		getLatestMessages
	}
`;

export const CREATE_GROUP = gql`
	mutation createGroup($name: String!) {
		createGroup(name: $name) {
			name
		}
	}
`;

export const ADD_CONTACT = gql`
	mutation addContact($id: String!) {
		addContact(id: $id)
	}
`;

export const GET_MESSAGES = gql`
	query getMessages($otherUser: String!, $type: String!) {
		getMessages(otherUser: $otherUser, type: $type) {
			content
			from
			to
			id
			type
			createdAt
		}
	}
`;

export const NEW_MESSAGE = gql`
	subscription newMessage {
		newMessage {
			from
			to
			content
			type
			createdAt
			id
		}
	}
`;

export const NEW_CONTACT = gql`
	subscription newContact {
		newContact
	}
`;

export const DELETE_CONTACT_SUB = gql`
	subscription deleteContact {
		deleteContact
	}
`;
