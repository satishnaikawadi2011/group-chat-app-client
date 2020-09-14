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
import { useDispatch } from 'react-redux';
import { OPEN_DIALOG } from '../redux/types';
import { logout } from '../redux/actions/user';

const useStyles = makeStyles((theme) => ({
	root  : {
		display  : 'flex',
		position : 'absolute',
		zIndex   : 3,
		cursor   : 'pointer',
		left     : 500
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
										<MenuItem onClick={() => handleCreate('group')}>New Group</MenuItem>
										<MenuItem onClick={() => handleCreate('contact')}>New Contact</MenuItem>
										<MenuItem onClick={() => console.log('logout')}>Profile</MenuItem>
										<MenuItem onClick={handleLogout}>Logout</MenuItem>
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
