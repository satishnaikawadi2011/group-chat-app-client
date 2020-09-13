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