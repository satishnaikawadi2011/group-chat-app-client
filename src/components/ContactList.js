import { useQuery } from '@apollo/client';
import { makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LATEST_MESSAGES } from '../redux/types';
import { GET_LATEST_MESSAGES } from '../utils/graphql';
import Contact from './Contact';
import ContactIcon from '../images/no-contacts.svg';
import ContactListSkeleton from './skeletons/ContactListSkeleton';

const useStyles = makeStyles({
	loader            : {
		height         : '90vh',
		width          : 'calc(80vw/3.3)',
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
	},
	fallbackText      : {
		margin    : 'auto 10px auto 10px',
		textAlign : 'center'
	},
	fallbackIcon      : {
		height    : 100,
		width     : 100,
		marginTop : 'calc(90vh/3)'
	},
	fallbackContainer : {
		height         : '90vh',
		width          : 'calc(80vw/3.3)',
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'center'
	}
});

function ContactList(props) {
	const classes = useStyles();
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
	const myGroups = groups;
	const myContacts = contacts;
	let list = [
		...myGroups,
		...myContacts
	];

	let contactListmarkup;
	if (list.length === 0) {
		contactListmarkup = (
			<div className={classes.fallbackContainer}>
				<img src={ContactIcon} className={classes.fallbackIcon} />
				<Typography className={classes.fallbackText} variant="h6">
					You don't have any contacts or groups.Create some groups or add new contacts
				</Typography>
			</div>
		);
	}
	else {
		contactListmarkup = (
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
	if (loading) {
		return <ContactListSkeleton />;
	}
	else {
		return contactListmarkup;
	}
}

export default ContactList;
