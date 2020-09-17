import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Badge, Fab, Tooltip } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';
import NotificationsDialog from './NotificationsDialog';

const useStyles = makeStyles((theme) => ({
	fab : {
		position : 'absolute',
		bottom   : theme.spacing(6),
		right    : theme.spacing(6),
		height   : 70,
		width    : 70
	}
}));

function FABIcon({ onClick }) {
	const { notifications } = useSelector((state) => state.data);
	const unReadNot = notifications.filter((not) => not.read === false);
	const classes = useStyles();
	return (
		<React.Fragment>
			<Tooltip title="notifications">
				<Fab className={classes.fab} color="primary" onClick={onClick}>
					<Badge color="secondary" badgeContent={unReadNot.length} max={99}>
						<NotificationsIcon fontSize="large" />
					</Badge>
				</Fab>
			</Tooltip>
			<NotificationsDialog />
		</React.Fragment>
	);
}

export default FABIcon;
