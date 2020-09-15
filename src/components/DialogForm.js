import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_CONTACT, CLOSE_DIALOG } from '../redux/types';
import { useMutation } from '@apollo/client';
import { CREATE_GROUP, ADD_CONTACT_MUT } from '../utils/graphql';

export default function FormDialog(props) {
	const dispatch = useDispatch();
	const { type, open } = useSelector((state) => state.ui.dialog);
	const [
		data,
		setData
	] = useState('');
	const [
		errors,
		setErrors
	] = useState({});
	const title =

			type === 'group' ? 'Create a new group !' :
			'Add a new contact to your contacts !';
	const text =

			type ===
			'group' ? `To create a new group, please enter unique group-name here. Then by selecting group add members to it.` :
			`To add a new contact, please enter unique userId of other user here. Then by selecting contact chat with them.`;
	const label =

			type === 'group' ? 'Group Name' :
			'UserId';
	const error =

			type === 'group' ? 'name' :
			'userId';

	const handleChange = (e) => {
		setData(e.target.value);
	};

	const handleClose = () => {
		dispatch({ type: CLOSE_DIALOG });
		setData('');
	};
	const [
		createGroup
	] = useMutation(CREATE_GROUP, {
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		onCompleted(data) {
			dispatch({ type: ADD_CONTACT, payload: { type: 'group', contactName: data.createGroup.name } });
			handleClose();
		},
		variables   : { name: data }
	});
	const [
		addContact
	] = useMutation(ADD_CONTACT_MUT, {
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		onCompleted(data) {
			dispatch({ type: ADD_CONTACT, payload: { type: 'personal', contactName: data.addContact[0] } });
			handleClose();
		},
		variables   : { id: data }
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(data);
		if (type === 'group') {
			createGroup();
		}
		else if (type === 'personal') {
			addContact();
		}
		// handleClose();
	};
	return (
		<React.Fragment>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{text}</DialogContentText>
					<form id="form-id" onSubmit={handleSubmit}>
						<TextField
							autoFocus
							margin="dense"
							name="data"
							label={label}
							type="text"
							fullWidth
							onChange={handleChange}
							helperText={errors[error]}
							error={

									errors[error] ? true :
									false
							}
							value={data}
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" form="form-id" color="primary">
						{
							type === 'group' ? 'Create' :
							'Add'}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
