import React from 'react';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Typography } from '@material-ui/core';
import moment from 'moment';

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

function Contact(props) {
	const classes = useStyle();
	const groupAvatar = 'https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_960_720.png';
	const soloAvatar = 'https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png';
	const message = {
		from      : 'Saty',
		createdAt : new Date().toISOString(),
		content   : 'Hi this is a test message! Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, quas.',
		type      : 'group'
	};
	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<Avatar
					className={classes.avatar}
					src={

							message.type === 'group' ? groupAvatar :
							soloAvatar
					}
				/>
				<div>
					<Typography className={`${classes.contactName} truncate`} variant="h6">
						{message.from}
					</Typography>
					<Typography className={`${classes.content} truncate`} variant="body2">
						{
							message.type === 'personal' ? message.content :
							`${message.from} : ${message.content}`}
					</Typography>
				</div>
				<Typography className={classes.time} variant="body2">
					{moment(message.createdAt).format('hh:mm')}
				</Typography>
			</Paper>
		</React.Fragment>
	);
}

export default Contact;
