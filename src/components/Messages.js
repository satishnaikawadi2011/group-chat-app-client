import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_MESSAGES } from '../utils/graphql';
import { SET_MESSAGES } from '../redux/types';
import Message from './Message';
import { Avatar, makeStyles, Typography } from '@material-ui/core';
import ContactMenu from '../components/ContactMenu';
import GroupInfoDrawer from './GroupInfoDrawer';
import { useTheme } from '@material-ui/core';
import { client } from '../utils/ApolloProvider';
import MessagesSkeleton from './skeletons/MessagesSkeleton';

const useStyles = makeStyles({
	loader : {
		height         : '90vh',
		width          : '100%',
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

function Messages() {
	const token = localStorage.getItem('token');
	const classes = useStyles();
	const theme = useTheme();
	const [
		loading,
		setLoading
	] = useState(false);
	const bgBar = theme.palette.background.default;
	const dispatch = useDispatch();
	const { messages, selectedContact: { name, type } } = useSelector((state) => state.data);
	const query = `
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
	const url = 'http://localhost:2020/graphql';
	const opts = {
		method  : 'POST',
		headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
		body    : JSON.stringify({ query, variables: { otherUser: name, type } })
	};
	useEffect(
		() => {
			if (name !== '') {
				setLoading(true);
				fetch(url, opts)
					.then((res) => res.json())
					.then((data) => {
						dispatch({ type: SET_MESSAGES, payload: data.data.getMessages });
						setLoading(false);
						const el = document.getElementById('data');
						el.scrollTop = el.scrollHeight;
						// console.log(data);
						// console.log(messages);
					})
					.catch((err) => {
						setLoading(false);
						console.log(err);
					});
			}
		},
		[
			name
		]
	);
	// const [
	// 	getMessages,
	// 	{ loading, updateQuery, refetch }
	// ] = useLazyQuery(GET_MESSAGES, {
	// 	onCompleted(data) {
	// 		dispatch({ type: SET_MESSAGES, payload: data.getMessages });
	// 		updateQuery((messages, { otherUser: name, type }) => {
	// 			dispatch({ type: SET_MESSAGES, payload: messages.getMessages });
	// 		});
	// 	},
	// 	onError(err) {
	// 		console.log(err);
	// 	},
	// 	variables   : { otherUser: name, type }
	// });
	useEffect(
		() => {
			const el = document.getElementById('data');
			el.scrollTop = el.scrollHeight;
		},
		[
			messages
		]
	);
	// useEffect(() => {
	// 	if (name !== '') {
	// 		getMessages();
	// 		// client.reFetchObservableQueries(true);
	// 	}
	// }, []);
	if (loading) {
		return <MessagesSkeleton type={type} />;
	}
	return (
		<React.Fragment>
			<div
				style={{
					height          : 70,
					width           : 'calc(80vw - (80vw/3.3))',
					backgroundColor : bgBar,
					position        : 'fixed',
					zIndex          : 2,
					display         : 'flex',
					borderBottom    : '2px solid #33cccc',
					padding         : 5
				}}
			>
				<Avatar style={{ padding: 10, backgroundColor: '#33cccc', margin: 5, marginLeft: 20 }}>
					{name[0]}
				</Avatar>
				<Typography
					variant="h6"
					style={{
						padding : 10
					}}
				>
					{name}
				</Typography>
				<ContactMenu />
			</div>
			<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
				{messages.map((message, index) => {
					if (index === 0 && messages.length !== 1) {
						return (
							<div key={message.id} style={{ marginBottom: 60 }}>
								<Message message={message} />
							</div>
						);
					}
					else if (index === messages.length - 1) {
						return (
							<div key={message.id} style={{ marginTop: 80 }}>
								<Message message={message} />
							</div>
						);
					}
					return <Message key={message.id} message={message} />;
				})}
			</div>
			{type === 'group' && <GroupInfoDrawer name={name} />}
		</React.Fragment>
	);
}

export default Messages;
