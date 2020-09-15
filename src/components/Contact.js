import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { SELECT_CONTACT } from '../redux/types';

const useStyle = makeStyles({
	paper       : {
		margin   : 10,
		padding  : 10,
		display  : 'flex',
		width    : 350,
		position : 'relative',
		cursor   : 'pointer'
	},
	contactName : {
		marginLeft : 10
	},
	content     : {
		marginLeft : 10
	},
	avatar      : {
		border : '1px solid black',
		height : 60,
		width  : 60
	},
	time        : {
		position : 'absolute',
		top      : 13,
		right    : 17
	}
});

const getDiff = (a, b) => {
	const d1 = moment(a);
	const d2 = moment(b);
	return d1.diff(d2, 'days');
};

function Contact(props) {
	const dispatch = useDispatch();
	let formatedDate;

	const classes = useStyle();
	const groupAvatar = 'https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_960_720.png';
	const soloAvatar = 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png';
	const { latestMessage, name, type } = props;
	const handleContact = () => {
		dispatch({ type: SELECT_CONTACT, payload: { name, type } });
	};
	if (latestMessage) {
		if (getDiff(new Date(), latestMessage.createdAt) < 1) {
			formatedDate = moment(latestMessage.createdAt).format('hh:mm a');
		}
		else if (getDiff(new Date(), latestMessage.createdAt) > 7) {
			formatedDate = moment(latestMessage.createdAt).format('DD/MM/YYYY');
		}
		else {
			formatedDate = moment(latestMessage.createdAt).format('dddd');
		}
	}
	return (
		<React.Fragment>
			<Paper className={classes.paper} onClick={handleContact}>
				<Avatar
					className={classes.avatar}
					src={

							type === 'group' ? groupAvatar :
							soloAvatar
					}
				/>
				<div>
					<Typography className={`${classes.contactName} truncate`} variant="h6">
						{name}
					</Typography>
					<Typography className={`${classes.content} truncate`} variant="body2">
						{
							latestMessage ? type === 'personal' ? latestMessage.content :
							`${latestMessage.from} : ${latestMessage.content}` :
							'You are connected now !'}
					</Typography>
				</div>
				<Typography className={classes.time} variant="body2">
					{latestMessage && formatedDate}
				</Typography>
			</Paper>
		</React.Fragment>
	);
}

export default Contact;
