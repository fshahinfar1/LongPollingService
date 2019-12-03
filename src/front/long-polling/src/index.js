import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
	useHistory,
} from "react-router-dom";

import {App, PostFeed, Comment, Login} from './screens';
import {NavBar} from './components';
import * as serviceWorker from './serviceWorker';
import './styles/index.css';


function Routing() {
	return (
			<Router>
				<NavBar showLogin={true}/>
				<Switch>
					<Route path="/new-feed"><PostFeed /></Route>
					<Route path="/comment"><Comment /></Route>
					<Route path="/login"><Login /></Route>
					<Route path="/"><App /></Route>
				</Switch>
			</Router>
	);
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
