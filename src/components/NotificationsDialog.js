import React, { useEffect } from 'react';

import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_NOT_DIALOG, OPEN_NOT_DIALOG, READ_NOTIFICATIONS } from '../redux/types';
import Notification from './Notification';
import { useMutation } from '@apollo/client';
import { MARK_NOTIFICATIONS_AS_READ } from '../utils/graphql';

function NotificationsDialog() {
	const dispatch = useDispatch();
	const { notifications } = useSelector((state) => state.data);
	const { open } = useSelector((state) => state.ui.notificationDialog);
	const unReadNots = notifications.filter((n) => n.read === false);
	const ids = unReadNots.map((un) => un.id);
	const [
		markNotificationsAsRead
	] = useMutation(MARK_NOTIFICATIONS_AS_READ, {
		onError(err) {
			console.log(err);
		}
	});
	// console.log(ids);
	const handleClose = () => {
		dispatch({ type: CLOSE_NOT_DIALOG });
		dispatch({ type: READ_NOTIFICATIONS });
		markNotificationsAsRead({ variables: { ids } });
	};
	return (
		<Dialog onClose={handleClose} className="not__dialog" aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle id="simple-dialog-title">Notifications</DialogTitle>
			<List>
				{notifications.map((notification) => {
					return <Notification notification={notification} />;
				})}
			</List>
		</Dialog>
	);
}

export default NotificationsDialog;
