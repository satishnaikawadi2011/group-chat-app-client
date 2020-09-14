import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import ApolloProvider from './utils/ApolloProvider';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
