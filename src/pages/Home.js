import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation, useQuery } from '@apollo/client';
import {
	DELETE_CONTACT_SUB,
	GET_MESSAGES,
	GET_NOTIFICATIONS,
	GET_USER,
	NEW_CONTACT,
	NEW_MESSAGE,
	NEW_NOTIFICATION,
	SEND_MESSAGE
} from '../utils/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/user';
import ContactList from '../components/ContactList';
import Menu from '../components/Menu';
import DialogForm from '../components/DialogForm';
import Messages from '../components/Messages';
import Message from '../components/Message';
import { useSubscription } from '@apollo/client';
import {
	ADD_CONTACT,
	ADD_MESSAGE,
	ADD_NOTIFICATION,
	DELETE_CONTACT,
	OPEN_NOT_DIALOG,
	SELECT_CONTACT,
	SET_MESSAGES,
	SET_NOTIFICATIONS
} from '../redux/types';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import { CircularProgress, Typography, useTheme } from '@material-ui/core';
import AppIcon from '../images/logo.svg';
import { client } from '../utils/ApolloProvider';
import GroupInfoDrawer from '../components/GroupInfoDrawer';
import FABIcon from '../components/FABIcon';

const useStyles = makeStyles({
	container   : {
		height   : '90vh',
		width    : '80vw',
		overflow : 'hidden',
		margin   : '5vh 10vw 5vh 10vw'
	},
	sendIcon    : (props) => ({
		height : 25,
		width  : 25,
		color  : 'white'
	}),
	sendBtn     : {
		height          : 50,
		width           : 50,
		marginLeft      : 5,
		marginTop       : 10,
		backgroundColor : '#33cccc',
		cursor          : 'pointer',
		outline         : 'none',
		border          : 'none',
		borderRadius    : 25
	},
	loader      : {
		height         : '100vh',
		width          : '100vw',
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center'
	},
	fallbackBox : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'center',
		heigth         : '90vh',
		marginTop      : '30vh',
		width          : '100%'
	},
	img         : { textAlign: 'center', height: 200, width: 200, marginBottom: 20 },
	contactList : {
		overflow  : 'auto',
		height    : '90vh',
		marginTop : '40px',
		width     : 'calc(80vw/3.3)',
		border    : '1px solid #33cccc'
	}
});

function Home(props) {
	const [
		messageInfo,
		setMessageInfo
	] = useState({});
	const theme = useTheme();
	const classes = useStyles();
	const [
		content,
		setContent
	] = useState('');
	const { selectedContact } = useSelector((state) => state.data);
	const { purpose } = useSelector((state) => state.ui.drawer);
	const { username } = useSelector((state) => state.user.userData);
	const { data: msgData, error: msgError } = useSubscription(NEW_MESSAGE);
	const { data: newCtData, error: newCtError } = useSubscription(NEW_CONTACT);
	const { data: newNtData, error: newNtError } = useSubscription(NEW_NOTIFICATION);
	const { data: delCtData, error: delCtError } = useSubscription(DELETE_CONTACT_SUB);
	useQuery(GET_NOTIFICATIONS, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: SET_NOTIFICATIONS, payload: data.getNotifications });
		}
	});
	const dispatch = useDispatch();
	const FABClickhandler = () => {
		dispatch({ type: OPEN_NOT_DIALOG });
	};
	const [
		loading,
		setLoading
	] = useState(true);
	const [
		userData,
		setUserData
	] = useState(null);
	useQuery(GET_USER, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch(getUserData(data.getUser));
			setUserData(data.getUser);
			setLoading(false);
		}
	});
	useEffect(
		() => {
			if (msgError) {
				console.log(msgError);
			}

			if (msgData) {
				const message = msgData.newMessage;
				const contact =

						username === message.to ? message.from :
						message.to;
				dispatch({
					type    : ADD_MESSAGE,
					payload : {
						contact,
						message
					}
				});
			}
		},
		[
			msgData,
			msgError
		]
	);
	useEffect(
		() => {
			if (newCtError) {
				console.log(newCtError);
			}

			if (newCtData) {
				const payload = newCtData.newContact;
				dispatch({
					type    : ADD_CONTACT,
					payload
				});
			}
		},
		[
			newCtData,
			newCtError
		]
	);
	useEffect(
		() => {
			if (delCtError) {
				console.log(delCtError);
			}

			if (delCtData) {
				const payload = delCtData.deleteContact;
				dispatch({
					type    : DELETE_CONTACT,
					payload :

							payload.type !== 'personal' ? { name: payload.name, type: 'group' } :
							payload
				});
				if (selectedContact.name === payload.name) {
					dispatch({ type: SET_MESSAGES, payload: [] });
					dispatch({ type: SELECT_CONTACT, payload: { type: '', name: '' } });
				}
			}
		},
		[
			delCtData,
			delCtError
		]
	);
	useEffect(
		() => {
			if (newNtError) {
				console.log(newNtError);
			}

			if (newNtData) {
				const payload = newNtData.newNotification;
				dispatch({
					type    : ADD_NOTIFICATION,
					payload
				});
			}
		},
		[
			newNtData,
			newNtError
		]
	);
	let messageBox;
	if (selectedContact.name === '') {
		messageBox = (
			<div className={classes.fallbackBox}>
				<img src={AppIcon} className={classes.img} />
				<Typography variant="h5">Please select a contact or group to chat with them !</Typography>
			</div>
		);
	}
	else {
		messageBox = <Messages />;
	}
	const bgInput = theme.palette.action.selected;
	const inputColor =

			theme.palette.text.primary === '#fff' ? 'white' :
			'black';
	const [
		sendMessage
	] = useMutation(SEND_MESSAGE, {
		onError(err) {
			console.log(err);
		}
	});
	const submitMessage = (e) => {
		e.preventDefault();
		// console.log(content);
		if (content.trim() === '' || selectedContact.name === '') return;

		sendMessage({ variables: { to: selectedContact.name, content } });
		setContent('');
	};
	if (loading) {
		return (
			<div className={classes.loader}>
				<div className="loader">Loading...</div>
			</div>
		);
	}
	else {
		return (
			<React.Fragment>
				<DialogForm />
				<Paper className={classes.container}>
					<Menu />
					{purpose !== 'group-info' && <GroupInfoDrawer />}
					<div style={{ display: 'flex' }}>
						<div
							className={`${classes.contactList} contact__list`}
							style={{ backgroundColor: theme.palette.action.disabled }}
						>
							<ContactList userData={userData} />
						</div>
						<div
							id="data"
							style={{
								backgroundColor : theme.palette.divider
							}}
							className="message-box"
						>
							{messageBox}
							<form
								className="form"
								style={{ backgroundColor: theme.palette.background.default }}
								onSubmit={submitMessage}
							>
								<input
									style={{ backgroundColor: bgInput, color: inputColor, zIndex: 3 }}
									type="text"
									className="input"
									placeholder="Type a message ...."
									value={content}
									onChange={(e) => setContent(e.target.value)}
								/>
								<button className={classes.sendBtn} type="submit">
									<SendIcon className={classes.sendIcon} />
								</button>
							</form>
						</div>
					</div>
				</Paper>
				<FABIcon onClick={FABClickhandler} />
			</React.Fragment>
		);
	}
}

export default Home;
