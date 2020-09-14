import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DIALOG } from '../redux/types';

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
	const handleSubmit = () => {
		console.log(data);
	};
	return (
		<React.Fragment>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{text}</DialogContentText>
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						{
							type === 'group' ? 'Create' :
							'Add'}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
