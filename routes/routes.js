import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeView from '../src/views/HomeView';
import AboutView from '../src/views/AboutView';
import ContactView from '../src/views/ContactView';

const Routes = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={HomeView} />
			<Route path="/about" component={AboutView} />
			<Route path="/contact" component={ContactView} />
		</Switch>
	</Router>
);

export default Routes;