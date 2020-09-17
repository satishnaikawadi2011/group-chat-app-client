import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import {
	DELETE_CONTACT,
	OPEN_DIALOG,
	OPEN_DRAWER,
	SELECT_CONTACT,
	SET_MESSAGES,
	TOGGLE_DRAWER,
	TOGGLE_THEME
} from '../redux/types';
import { logout } from '../redux/actions/user';
import { useMutation } from '@apollo/client';
import { REMOVE_CONTACT_MUT } from '../utils/graphql';

const useStyles = makeStyles((theme) => ({
	root  : {
		display   : 'flex',
		position  : 'absolute',
		zIndex    : 3,
		cursor    : 'pointer',
		right     : 0,
		margin    : 5,
		marginTop : 10
	},
	paper : {
		marginRight : theme.spacing(2)
	}
}));

export default function MenuListComposition() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [
		open,
		setOpen
	] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};
	const [
		removeContact
	] = useMutation(REMOVE_CONTACT_MUT, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: DELETE_CONTACT, payload: { type: 'personal', name: data.removeContact } });
			dispatch({ type: SET_MESSAGES, payload: [] });
			dispatch({ type: SELECT_CONTACT, paylaod: { type: '', name: '' } });
		}
	});
	const handleRemoveContact = () => {
		removeContact({ variables: { username: name } });
	};
	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const handleCreate = (type) => {
		dispatch({ type: OPEN_DIALOG, payload: type });
	};

	const handleLogout = () => {
		dispatch(logout());
	};
	const { isDarkTheme } = useSelector((state) => state.ui);
	const { selectedContact: { type, name } } = useSelector((state) => state.data);
	const prevOpen = useRef(open);
	useEffect(
		() => {
			if (prevOpen.current === true && open === false) {
				anchorRef.current.focus();
			}

			prevOpen.current = open;
		},
		[
			open
		]
	);
	let menuList;
	if (type === 'personal') {
		menuList = <MenuItem onClick={handleRemoveContact}>Remove Contact</MenuItem>;
	}
	else if (type === 'group') {
		menuList = (
			<MenuItem
				onClick={() => {
					dispatch({ type: OPEN_DRAWER, payload: 'group-info' });
				}}
			>
				Group Info
			</MenuItem>
		);
	}
	return (
		<div className={classes.root}>
			<div>
				<MoreVertIcon
					ref={anchorRef}
					aria-controls={

							open ? 'menu-list-grow' :
							undefined
					}
					aria-haspopup="true"
					onClick={handleToggle}
				/>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin :

										placement === 'bottom' ? 'center top' :
										'center bottom'
							}}
						>
							<Paper style={{ zIndex: '100' }}>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										{menuList}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		</div>
	);
}
