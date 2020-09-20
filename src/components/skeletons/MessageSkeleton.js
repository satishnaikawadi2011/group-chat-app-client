import React from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

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
		borderTopLeftRadius     :
			props.byMe ? 12 :
			0,
		borderTopRightRadius    : 12,
		borderBottomLeftRadius  : 12,
		borderBottomRightRadius :
			props.byMe ? 0 :
			12
	}),
	time      : {
		textAlign : 'right',
		display   : 'block',
		float     : 'right'
	}
});

function MessageSkeleton({ byMe, type }) {
	const classes = useStyles({ byMe });
	return (
		<React.Fragment>
			<Paper className={classes.container} styles={{ marginLeft: 'auto' }}>
				{type === 'group' && <Skeleton height={20} width={60} />}
				<Skeleton height={20} width={170} />
				<Skeleton height={20} width={100} />
				<Skeleton className={classes.time} height={10} width={40} />
			</Paper>
		</React.Fragment>
	);
}

export default MessageSkeleton;
