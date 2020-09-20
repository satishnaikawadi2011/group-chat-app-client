import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
	container : (props) => ({
		maxWidth                : 'max-content',
		padding                 : 10,
		margin                  : 10,
		position                : 'relative',
		marginLeft              :
			props.byMe ? 'auto' :
			'',
		marginBottom            : 20,
		backgroundColor         :
			props.byMe ? '#d6f5f5' :
			'',
		color                   :
			props.byMe ? 'black' :
			'',
		borderTopLeftRadius     :
			props.byMe ? 12 :
			0,
		borderTopRightRadius    : 12,
		borderBottomLeftRadius  : 12,
		borderBottomRightRadius :
			props.byMe ? 0 :
			12
	}),
	from      : {
		color : 'green'
	},
	content   : {
		textAlign  : 'justify',
		fontWeight : 450
	},
	time      : {
		textAlign : 'right',
		display   : 'block'
	},
	server    : {
		backgroundColor : ' #70dbdb',
		marginLeft      : '40%',
		marginBottom    : 10,
		marginTop       : 10,
		color           : 'black',
		width           : '30%'
	}
});

function Message({ message }) {
	const { username } = useSelector((state) => state.user.userData);
	const byMe = message.from === username;
	const classes = useStyles({ byMe });
	if (message.from === 'server') {
		return <Chip className={classes.server} label={message.content} />;
	}
	return (
		<React.Fragment>
			<Paper className={classes.container} styles={{ marginLeft: 'auto' }}>
				<Typography className={classes.from} variant="h6">
					{message.type === 'group' && message.from}
				</Typography>
				<Typography className={classes.content} variant="body2">
					{message.content}
				</Typography>
				<Typography className={classes.time} variant="caption">
					{moment(message.createdAt).format('hh:mm')}
				</Typography>
			</Paper>
		</React.Fragment>
	);
}

export default Message;
