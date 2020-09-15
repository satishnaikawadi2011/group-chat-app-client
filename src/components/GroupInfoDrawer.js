import React from 'react';
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
import { TOGGLE_DRAWER } from '../redux/types';
import { Avatar, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
	}
}));

export default function PersistentDrawerRight() {
	const { isDrawerOpen } = useSelector((state) => state.ui);
	const { username } = useSelector((state) => state.user.userData);
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	const group = {
		name      : 'Apu1',
		admin     : 'apu',
		createdAt : '2020-09-15T20:20:56.652Z',
		members   : [
			{
				username : 'apu'
			}
		],
		id        : '5f612228ba7ef15d288ff4c6'
	};
	const handleDrawerOpen = () => {
		dispatch({ type: TOGGLE_DRAWER });
	};

	const handleDrawerClose = () => {
		dispatch({ type: TOGGLE_DRAWER });
	};

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
					{group.name[0]}
				</Avatar>
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
							<PersonAddIcon style={{ cursor: 'pointer' }} />{' '}
							<Typography style={{ marginLeft: 20, cursor: 'pointer' }} variant="h6">
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
											<IconButton edge="end" aria-label="delete">
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
							<DeleteIcon color="error" fontSize="large" style={{ cursor: 'pointer' }} />
							<Typography
								variant="h6"
								style={{ color: 'red', marginLeft: 20, cursor: 'pointer', marginBottom: 20 }}
							>
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
							<ExitToAppIcon color="error" fontSize="large" style={{ cursor: 'pointer' }} />
							<Typography
								variant="h6"
								style={{ color: 'red', marginLeft: 20, cursor: 'pointer', marginBottom: 20 }}
							>
								Exit Group
							</Typography>
						</div>
						<Divider />
					</React.Fragment>}
			</Drawer>
		</div>
	);
}