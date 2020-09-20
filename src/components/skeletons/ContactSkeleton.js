import React from 'react';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyle = makeStyles({
	paper       : {
		margin   : 10,
		padding  : 10,
		display  : 'flex',
		width    : 'calc(80vw/3.5)',
		position : 'relative',
		cursor   : 'pointer'
	},
	contactName : {
		marginLeft   : 10,
		marginBottom : 6,
		marginTop    : 5
	},
	// content     : {
	//     marginLeft : 10,
	//     marginBottom:6
	// },
	time        : {
		position : 'absolute',
		top      : 13,
		right    : 17
	}
});

function ContactSkeleton() {
	const classes = useStyle();
	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<Skeleton variant="circle" animation="wave" height={60} width={60} />
				<div>
					<Skeleton className={`${classes.contactName}`} height={20} animation="wave" width={70} />
					<Skeleton className={`${classes.contactName}`} height={20} animation="wave" width={150} />
				</div>
				<Skeleton className={classes.time} height={10} animation="wave" width={50} />
			</Paper>
		</React.Fragment>
	);
}

export default ContactSkeleton;
