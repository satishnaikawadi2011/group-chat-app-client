import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE } from '../utils/graphql';
import { ADD_MESSAGE, SET_MESSAGES } from '../redux/types';
import Message from './Message';
import { Avatar, Typography } from '@material-ui/core';
import ContactMenu from '../components/ContactMenu';
import GroupInfoDrawer from './GroupInfoDrawer';

function Messages() {
	const { isDarkTheme } = useSelector((state) => state.ui);
	const bgBar =
		isDarkTheme ? '#333333' :
		'#bfbfbf';
	const dispatch = useDispatch();
	const [
		loading,
		setLoading
	] = useState(true);
	const { messages, selectedContact: { name, type } } = useSelector((state) => state.data);
	const [
		getMessages
	] = useLazyQuery(GET_MESSAGES, {
		onCompleted(data) {
			dispatch({ type: SET_MESSAGES, payload: data.getMessages });
			setLoading(false);
		},
		onError(err) {
			console.log(err);
		},
		variables   : { otherUser: name, type }
	});
	useEffect(
		() => {
			const el = document.getElementById('data');
			el.scrollTop = el.scrollHeight;
		},
		[
			messages
		]
	);
	useEffect(
		() => {
			if (name !== '') {
				getMessages();
			}
		},
		[
			name
		]
	);
	if (loading) {
		return <h1>{'Loading'}</h1>;
	}
	return (
		<React.Fragment>
			<div
				style={{
					height          : 50,
					width           : 'calc(80vw - 370px)',
					backgroundColor : bgBar,
					position        : 'fixed',
					zIndex          : 2,
					display         : 'flex'
				}}
			>
				<Avatar style={{ padding: 10, backgroundColor: '#33cccc', margin: 5, marginLeft: 20 }}>
					{name[0]}
				</Avatar>
				<Typography
					variant="h6"
					style={{
						padding : 10,
						color   :
							isDarkTheme ? 'white' :
							'black'
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
							<div key={message.id} style={{ marginTop: 60 }}>
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
