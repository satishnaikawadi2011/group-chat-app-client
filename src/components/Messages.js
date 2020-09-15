import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../utils/graphql';
import { SET_MESSAGES } from '../redux/types';
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

	if (loading) {
		return <h1>{'Loading'}</h1>;
	}
	return (
		<div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
			{messages.map((message) => {
				return <Message key={message.id} message={message} />;
			})}
		</div>
	);
}

export default Messages;
