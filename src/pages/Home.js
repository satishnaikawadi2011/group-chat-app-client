import React from 'react';
import Contact from '../components/Contact';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Menu from '../components/Menu';

const useStyles = makeStyles({
	container : {
		height   : '90vh',
		width    : '80vw',
		overflow : 'hidden',
		padding  : 10,
		margin   : '5vh 10vw 5vh 10vw'
		// backgroundColor : 'red'
	}
});

function Home(props) {
	const { isDarkTheme } = props;
	const classes = useStyles();
	return (
		<React.Fragment>
			<Paper className={classes.container}>
				{/* <Menu /> */}
				<div style={{ display: 'flex' }}>
					<div
						style={{
							overflow        : 'auto',
							height          : '90vh',
							backgroundColor : `${
								isDarkTheme ? ' #737373' :
								'#cccccc'}`,
							marginTop       : '40px'
						}}
					>
						<Contact />
						<Contact />
						<Contact />
						<Contact />
						<Contact />
						{/* <Contact />
					<Contact />
					<Contact />
					<Contact />
					<Contact /> */}
					</div>
					<div
						style={{
							height       : '90vh',
							width        : 'calc(80vw - 420px)',
							// backgroundColor : 'red',
							marginLeft   : '20px',
							marginBottom : '10px'
						}}
					>
						Hello
					</div>
				</div>
			</Paper>
		</React.Fragment>
	);
}

export default Home;
