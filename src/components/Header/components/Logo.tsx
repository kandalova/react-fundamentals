import React from 'react';
// import logo from './logo.png';

export function Logo() {
	return (
		<img
			src={process.env.PUBLIC_URL + '/img/logo.png'}
			// src='https://play-lh.googleusercontent.com/JmTQsXdAWCQqJlm4BeKlxV_9gc5pt89YBIRq398VXR3Nk4qVlak25sVQlfrzJrpulpA=w480-h960-rw'
			alt='My logo'
		/>
	);
}
