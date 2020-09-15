import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE } from '../utils/graphql';
import { ADD_MESSAGE, SET_MESSAGES } from '../redux/types';
import Message from './Message';

function Messages() {
	const dispatch = useDispatch();
	const [
		loading,
		setLoading
	] = useState(true);
	const { messages, selectedContact: { name, type } } = useSelector((state) => state.data);
	useQuery(GET_MESSAGES, {
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
	if (loading) {
		return <h1>{'Loading'}</h1>;
	}
	return (
		<React.Fragment>
			<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
				{messages.map((message, index) => {
					if (index === 0) {
						return (
							<div key={message.id} style={{ marginBottom: 60 }}>
								<Message message={message} />
							</div>
						);
					}
					return <Message key={message.id} message={message} />;
				})}
			</div>
		</React.Fragment>
	);
}

export default Messages;
