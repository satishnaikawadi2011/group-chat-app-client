import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CONTACT_SUB, GET_USER, NEW_CONTACT, NEW_MESSAGE, SEND_MESSAGE } from '../utils/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/user';
import ContactList from '../components/ContactList';
import Menu from '../components/Menu';
import DialogForm from '../components/DialogForm';
import Messages from '../components/Messages';
import Message from '../components/Message';
import { useSubscription } from '@apollo/client';
import { ADD_CONTACT, ADD_MESSAGE, DELETE_CONTACT } from '../redux/types';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
	container : {
		height   : '90vh',
		width    : '80vw',
		overflow : 'hidden',
		padding  : 10,
		margin   : '5vh 10vw 5vh 10vw'
	},
	sendIcon  : (props) => ({
		height : 25,
		width  : 25,
		color  : 'white'
	}),
	sendBtn   : {
		height          : 50,
		width           : 50,
		marginLeft      : 5,
		backgroundColor : '#33cccc',
		cursor          : 'pointer',
		outline         : 'none',
		border          : 'none',
		borderRadius    : 25
	}
});

function Home(props) {
	const [
		content,
		setContent
	] = useState('');
	const { selectedContact } = useSelector((state) => state.data);
	const { username } = useSelector((state) => state.user.userData);
	const { data: msgData, error: msgError } = useSubscription(NEW_MESSAGE);
	const { data: newCtData, error: newCtError } = useSubscription(NEW_CONTACT);
	const { data: delCtData, error: delCtError } = useSubscription(DELETE_CONTACT_SUB);
	const dispatch = useDispatch();
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
					payload
				});
			}
		},
		[
			delCtData,
			delCtError
		]
	);
	let messageBox;
	if (selectedContact === '') {
		messageBox = <p>Please select a contact or group to chat with them !</p>;
	}
	else {
		messageBox = <Messages />;
	}
	const { isDarkTheme } = useSelector((state) => state.ui);
	const bgInput =
		isDarkTheme ? '#333333' :
		'#bfbfbf';
	const inputColor =
		isDarkTheme ? 'white' :
		'black';
	const classes = useStyles({ isDarkTheme });
	const [
		sendMessage
	] = useMutation(SEND_MESSAGE, {
		onError(err) {
			console.log(err);
		}
	});
	const submitMessage = (e) => {
		e.preventDefault();
		console.log(content);
		if (content.trim() === '' || selectedContact.name === '') return;

		sendMessage({ variables: { to: selectedContact.name, content } });
		setContent('');
	};
	if (loading) {
		return <h1>Loading...</h1>;
	}
	else {
		return (
			<React.Fragment>
				<DialogForm />
				<Paper className={classes.container}>
					<Menu />
					<div style={{ display: 'flex' }}>
						<div
							style={{
								overflow        : 'auto',
								height          : '90vh',
								backgroundColor : `${
									isDarkTheme ? ' #737373' :
									'#cccccc'}`,
								marginTop       : '40px'
							}}
						>
							<ContactList userData={userData} />
						</div>
						<div
							id="data"
							style={{
								backgroundColor :
									isDarkTheme ? '#595959' :
									' #e6e6e6'
							}}
							className="message-box"
						>
							{messageBox}
							<form className="form" onSubmit={submitMessage}>
								<input
									style={{ backgroundColor: bgInput, color: inputColor }}
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
			</React.Fragment>
		);
	}
}

export default Home;
