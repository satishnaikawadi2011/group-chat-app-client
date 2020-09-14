import React, { useEffect, useState } from 'react';
import Contact from '../components/Contact';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '../components/Menu';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER } from '../utils/graphql';
import { useDispatch } from 'react-redux';
import { getUserData } from '../redux/actions/user';
import ContactList from '../components/ContactList';

const useStyles = makeStyles({
	container : {
		height   : '90vh',
		width    : '80vw',
		overflow : 'hidden',
		padding  : 10,
		margin   : '5vh 10vw 5vh 10vw'
		// backgroundColor : 'red'
	}
});

function Home(props) {
	const dispatch = useDispatch();
	const [
		loading,
		setLoading
	] = useState(true);
	const [
		userData,
		setUserData
	] = useState(null);
	const { load } = useQuery(GET_USER, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch(getUserData(data.getUser));
			setUserData(data.getUser);
			setLoading(false);
		}
	});
	const { isDarkTheme } = props;
	const classes = useStyles();
	if (loading) {
		return <h1>Loading...</h1>;
	}
	else {
		return (
			<React.Fragment>
				<Paper className={classes.container}>
					{/* <Menu /> */}
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
							{/* <div>{userData.username}</div> */}
							{/* <Contact />
							<Contact />
							<Contact />
							<Contact />
							<Contact /> */}
							{/* <Contact />
						<Contact />
						<Contact />
						<Contact />
						<Contact /> */}
						</div>
						<div
							style={{
								height       : '90vh',
								width        : 'calc(80vw - 420px)',
								// backgroundColor : 'red',
								marginLeft   : '20px',
								marginBottom : '10px'
							}}
						>
							Hello
						</div>
					</div>
				</Paper>
			</React.Fragment>
		);
	}
}

export default Home;
