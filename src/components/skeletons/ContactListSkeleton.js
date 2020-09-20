import React from 'react';
import ContactSkeleton from './ContactSkeleton';

function ContactListSkeleton() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			<ContactSkeleton />
			<ContactSkeleton />
			<ContactSkeleton />
			<ContactSkeleton />
			<ContactSkeleton />
			<ContactSkeleton />
			<ContactSkeleton />
		</div>
	);
}

export default ContactListSkeleton;
