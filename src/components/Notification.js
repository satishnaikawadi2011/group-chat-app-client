import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Divider } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';

const useStyles = makeStyles({
	avatar : (props) => ({
		backgroundColor :

				props.type === 'ADDED' ? green[100] :
				red[100],
		color           :

				props.type === 'ADDED' ? green[600] :
				red[600]
	})
});

function Notification({ notification }) {
	const { id, createdAt, type, content, read } = notification;
	const classes = useStyles({ type });
	let icon;
	if (type === 'ADDED') {
		icon = <ContactsIcon />;
	}
	else if (type === 'REMOVED') {
		icon = <RemoveCircleOutlineSharpIcon />;
	}
	else {
		icon = <DeleteForeverIcon />;
	}
	return (
		<React.Fragment>
			<ListItem button>
				<ListItemAvatar>
					<Avatar className={classes.avatar}>{icon}</Avatar>
				</ListItemAvatar>
				<ListItemText primary={content} secondary={moment(createdAt).fromNow()} />
				{!read && (
					<ListItemSecondaryAction>
						<FiberManualRecordIcon color="secondary" fontSize="small" />
					</ListItemSecondaryAction>
				)}
			</ListItem>
			<Divider />
		</React.Fragment>
	);
}

export default Notification;
