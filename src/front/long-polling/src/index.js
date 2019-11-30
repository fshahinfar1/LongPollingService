import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './index.css';
import App from './App';
import PostFeed from './PostFeed';
import Feeds from './Feeds';
import * as serviceWorker from './serviceWorker';

class Routing extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path="/new-feed"><PostFeed /></Route>
					<Route path="/"><App /></Route>
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
