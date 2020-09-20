import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import MessageSkeleton from './MessageSkeleton';
import { useTheme } from '@material-ui/core';

function MessagesSkeleton({ type }) {
	const theme = useTheme();
	const bgBar = theme.palette.background.default;
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<div
				style={{
					height          : 70,
					width           : 'calc(80vw - (80vw/3.3))',
					backgroundColor : bgBar,
					position        : 'fixed',
					zIndex          : 2,
					display         : 'flex',
					borderBottom    : '2px solid #33cccc',
					padding         : 5
				}}
			>
				<Skeleton style={{ marginTop: 5, marginLeft: 5 }} variant="circle" height={50} width={50} />
				<Skeleton style={{ marginLeft: 20, marginTop: 10 }} height={30} width={80} />
			</div>
			{
				type === 'group' ? <React.Fragment>
					<MessageSkeleton byMe={true} type="group" />
					<MessageSkeleton type="group" />
					<MessageSkeleton byMe={true} type="group" />
					<MessageSkeleton type="group" />
					<MessageSkeleton byMe={true} type="group" />
					<MessageSkeleton type="group" />
				</React.Fragment> :
				<React.Fragment>
					<MessageSkeleton byMe={true} />
					<MessageSkeleton />
					<MessageSkeleton byMe={true} />
					<MessageSkeleton />
					<MessageSkeleton byMe={true} />
					<MessageSkeleton />
				</React.Fragment>}
			{/* <MessageSkeleton byMe={true} /> */}
		</div>
	);
}

export default MessagesSkeleton;
