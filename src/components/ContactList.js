import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LATEST_MESSAGES } from '../redux/types';
import { GET_LATEST_MESSAGES } from '../utils/graphql';
import Contact from './Contact';

function ContactList(props) {
	const [
		loading,
		setLoading
	] = useState(true);
	const dispatch = useDispatch();
	useQuery(GET_LATEST_MESSAGES, {
		onCompleted(data) {
			dispatch({ type: SET_LATEST_MESSAGES, payload: data.getLatestMessages });
			setLoading(false);
		},
		onError     : (err) => console.log(err)
	});
	const { latestMessages } = useSelector((state) => state.data);
	const { userData: { groups, contacts } } = useSelector((state) => state.user);
	const myGroups =
		groups ? groups :
		props.userData.groups;
	const myContacts =
		contacts ? contacts :
		props.userData.contacts;
	let list = [
		...myGroups,
		...myContacts
	];
	if (loading) {
		return <h1>Loading....</h1>;
	}
	else {
		return (
			<React.Fragment>
				{list.map((name) => {
					const type =
						myGroups.includes(name) ? 'group' :
						'personal';
					return (
						<Contact
							key={name}
							name={name}
							type={type}
							latestMessage={

									latestMessages[name] ? latestMessages[name] :
									null
							}
						/>
					);
				})}
			</React.Fragment>
		);
	}
}

export default ContactList;
