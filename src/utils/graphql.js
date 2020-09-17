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

export const ADD_CONTACT_MUT = gql`
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

export const SEND_MESSAGE = gql`
	mutation sendMessage($to: String!, $content: String!) {
		sendMessage(to: $to, content: $content) {
			from
			createdAt
			type
			to
			content
			id
		}
	}
`;

export const GET_GROUP = gql`
	query getGroup($name: String!) {
		getGroup(name: $name) {
			name
			admin
			createdAt
			members {
				username
			}
			id
		}
	}
`;

export const ADD_MEMBER_MUT = gql`
	mutation addMember($userId: String!, $groupName: String!) {
		addMember(userId: $userId, groupName: $groupName) {
			username
		}
	}
`;

export const REMOVE_MEMBER_MUT = gql`
	mutation removeMember($otherUsername: String!, $groupName: String!) {
		removeMember(otherUsername: $otherUsername, groupName: $groupName)
	}
`;

export const LEFT_GROUP_MUT = gql`
	mutation leftGroup($groupName: String!) {
		leftGroup(groupName: $groupName)
	}
`;

export const DELETE_GROUP_MUT = gql`
	mutation deleteGroup($id: String!) {
		deleteGroup(id: $id)
	}
`;

export const REMOVE_CONTACT_MUT = gql`
	mutation removeContact($username: String!) {
		removeContact(username: $username)
	}
`;

export const GET_NOTIFICATIONS = gql`
	query getNotifications {
		getNotifications {
			read
			content
			id
			type
			sender
			recepient
			createdAt
		}
	}
`;

export const NEW_NOTIFICATION = gql`
	subscription newNotification {
		newNotification {
			id
			type
			sender
			recepient
			createdAt
			read
			content
		}
	}
`;

export const MARK_NOTIFICATIONS_AS_READ = gql`
	mutation markNotificationsAsRead($ids: [String]!) {
		markNotificationsAsRead(ids: $ids)
	}
`;
