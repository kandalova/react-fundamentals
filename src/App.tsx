import React from 'react';
import { Header } from './components/Header/Header';
import classes from './app.module.scss';

function App() {
	// eslint-disable-next-line react/react-in-jsx-scope
	return (
		<div className={classes.app}>
			<Header />
		</div>
	);
}

export default App;
