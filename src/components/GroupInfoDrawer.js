import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_CONTACT, OPEN_DIALOG, REMOVE_MEMBER, SELECT_CONTACT, SET_GROUP, TOGGLE_DRAWER } from '../redux/types';
import { Avatar, CircularProgress, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_GROUP_MUT, GET_GROUP, LEFT_GROUP_MUT, REMOVE_MEMBER_MUT } from '../utils/graphql';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
	root         : {
		display : 'flex'
	},
	title        : {
		flexGrow : 1
	},
	hide         : {
		display : 'none'
	},
	drawer       : {
		width      : drawerWidth,
		flexShrink : 0
	},
	drawerPaper  : {
		width : drawerWidth
	},
	drawerHeader : {
		display        : 'flex',
		alignItems     : 'center',
		padding        : theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent : 'flex-start'
	},
	loader       : {
		height         : '100%',
		width          : '100%',
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	}
}));

export default function PersistentDrawerRight({ name }) {
	const { isDrawerOpen } = useSelector((state) => state.ui);
	const { username } = useSelector((state) => state.user.userData);
	const { group } = useSelector((state) => state.data);
	const [
		loading,
		setLoading
	] = useState(true);
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	useQuery(GET_GROUP, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: SET_GROUP, payload: data.getGroup });
			setLoading(false);
		},
		variables   : { name }
	});
	const [
		removeMember
	] = useMutation(REMOVE_MEMBER_MUT, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: REMOVE_MEMBER, payload: data.removeMember });
			setLoading(false);
		}
	});
	const [
		leftGroup
	] = useMutation(LEFT_GROUP_MUT, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: DELETE_CONTACT, payload: { name: group.name, type: 'group' } });
			dispatch({ type: SELECT_CONTACT, payload: { type: '', name: '' } });
			dispatch({ type: TOGGLE_DRAWER });
			setLoading(false);
		}
	});
	const [
		deleteGroup
	] = useMutation(DELETE_GROUP_MUT, {
		onError(err) {
			console.log(err);
		},
		onCompleted(data) {
			dispatch({ type: DELETE_CONTACT, payload: { name: group.name, type: 'group' } });
			dispatch({ type: SELECT_CONTACT, payload: { type: '', name: '' } });
			dispatch({ type: TOGGLE_DRAWER });
			setLoading(false);
		}
	});
	const handleDeleteGroup = () => {
		setLoading(true);
		deleteGroup({ variables: { id: group.id } });
	};
	const handleExitGroup = () => {
		setLoading(true);
		leftGroup({ variables: { groupName: group.name } });
	};
	const handleRemoveMember = (membername) => {
		setLoading(true);
		removeMember({ variables: { otherUsername: membername, groupName: group.name } });
	};
	const handleDrawerClose = () => {
		dispatch({ type: TOGGLE_DRAWER });
	};
	const handleAddMember = () => {
		dispatch({ type: OPEN_DIALOG, payload: { type: 'personal', member: true } });
	};
	let dataDependentUI;
	if (!loading) {
		dataDependentUI = (
			<React.Fragment>
				<Divider />
				<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px auto 10px auto' }}>
					{' '}
					<CreateIcon />{' '}
					<Typography style={{ marginLeft: 5 }} variant="body1">{`Created ${moment(group.createdAt).format(
						'DD/MM/YYYY'
					)} at ${moment(group.createdAt).format('hh:mm a')}`}</Typography>
				</div>
				<Divider />
				{username === group.admin && (
					<React.Fragment>
						<div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px auto 10px auto' }}>
							{' '}
							<IconButton onClick={handleAddMember}>
								<PersonAddIcon />{' '}
							</IconButton>
							<Typography style={{ marginLeft: 20, marginTop: 10 }} variant="h6">
								Add Member
							</Typography>
						</div>
						<Divider />
					</React.Fragment>
				)}
				<Typography style={{ margin: '10px auto 10px auto' }} variant="h6">{`${group.members
					.length} Members`}</Typography>
				<Divider />
				<List>
					{group.members.map((member) => {
						return (
							<React.Fragment key={member.username}>
								<ListItem>
									<ListItemAvatar>
										<Avatar>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={member.username}
										secondary={

												group.admin === member.username ? 'Admin' :
												null
										}
									/>
									{
										member.username !== group.admin ? username ===
										group.admin ? <ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() => handleRemoveMember(member.username)}
											>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction> :
										null :
										null}
								</ListItem>
								<Divider />
							</React.Fragment>
						);
					})}
				</List>
				{
					username === group.admin ? <React.Fragment>
						<div
							style={{
								display        : 'flex',
								justifyContent : 'space-around',
								margin         : '10px auto 10px auto'
							}}
						>
							{' '}
							<IconButton onClick={handleDeleteGroup}>
								<DeleteIcon color="error" fontSize="large" />
							</IconButton>
							<Typography variant="h6" style={{ color: 'red', margin: 20 }}>
								Delete Group
							</Typography>
						</div>
						<Divider />
					</React.Fragment> :
					<React.Fragment>
						<div
							style={{
								display        : 'flex',
								justifyContent : 'space-around',
								margin         : '10px auto 10px auto'
							}}
						>
							{' '}
							<IconButton onClick={handleExitGroup}>
								<ExitToAppIcon color="error" fontSize="large" />
							</IconButton>
							<Typography variant="h6" style={{ color: 'red', margin: 20 }}>
								Exit Group
							</Typography>
						</div>
						<Divider />
					</React.Fragment>}
			</React.Fragment>
		);
	}
	else {
		dataDependentUI = (
			<div className={classes.loader}>
				<div className="loader" />
			</div>
		);
	}
	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				anchor="right"
				open={isDrawerOpen}
				classes={{
					paper : classes.drawerPaper
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{
							theme.direction === 'rtl' ? <ChevronLeftIcon /> :
							<ChevronRightIcon />}
					</IconButton>
					<Typography variant="h5">Group Info</Typography>
				</div>
				<Divider />
				<Avatar
					style={{
						backgroundColor : '#33cccc',
						height          : 150,
						width           : 150,
						fontSize        : 50,
						textAlign       : 'center',
						margin          : '20px auto 20px auto'
					}}
				>
					{name[0]}
				</Avatar>
				<Divider />
				<Typography
					variant="h5"
					style={{ textAlign: 'center', margin: '10px auto 10px auto' }}
				>{`Group Name : ${name}`}</Typography>
				{dataDependentUI}
			</Drawer>
		</div>
	);
}
