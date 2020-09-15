import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useQuery } from '@apollo/client';
import { DELETE_CONTACT_SUB, GET_USER, NEW_CONTACT, NEW_MESSAGE } from '../utils/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/user';
import ContactList from '../components/ContactList';
import Menu from '../components/Menu';
import DialogForm from '../components/DialogForm';
import Messages from '../components/Messages';
import Message from '../components/Message';
import { useSubscription } from '@apollo/client';
import { ADD_CONTACT, ADD_MESSAGE, DELETE_CONTACT } from '../redux/types';

const useStyles = makeStyles({
	container : {
		height   : '90vh',
		width    : '80vw',
		overflow : 'hidden',
		padding  : 10,
		margin   : '5vh 10vw 5vh 10vw'
	}
});

function Home(props) {
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
				// console.log('It works,delete contact');
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
				// console.log('It works');
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
	const { isDarkTheme } = props;
	const classes = useStyles();
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
							style={{
								height          : '90vh',
								width           : 'calc(80vw - 420px)',
								marginLeft      : '20px',
								marginBottom    : '10px',
								backgroundColor :
									isDarkTheme ? '#595959' :
									' #e6e6e6',
								overflow        : 'auto'
							}}
						>
							{messageBox}
							{/* <Message /> */}
						</div>
					</div>
				</Paper>
			</React.Fragment>
		);
	}
}

export default Home;
