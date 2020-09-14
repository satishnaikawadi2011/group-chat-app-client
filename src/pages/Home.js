import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/user';
import ContactList from '../components/ContactList';
import Menu from '../components/Menu';
import DialogForm from '../components/DialogForm';
import Messages from '../components/Messages';
import Message from '../components/Message';

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
									' #e6e6e6'
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
