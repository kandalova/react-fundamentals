import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter,
	unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';

import AppWrapper from './AppWrapper';
import { history } from './history';

import './index.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<HistoryRouter history={history}>
		<AppWrapper />
	</HistoryRouter>
);
