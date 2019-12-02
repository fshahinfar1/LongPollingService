import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FancyButton, NavBar, Feed} from '../components';
import {get, post} from '../utils/Http';
import '../styles/App.css';


function App() {
	const feeds = [{
		id: 0,
		title: 'title',
		description: 'test text'
	},{
		id: 1,
		title: 'title2',
		description: 'description 2'
	}];

	const history = useHistory();

	const feed_objs = feeds.map(function (obj) {
		return <Feed
						key={obj.id}
						title={obj.title}
						description={obj.description}
						history={history}
					/>
	});

  return (
		<div>
			<NavBar/>
			<main>
				<h1>Main</h1>
				<Link to="/new-feed">wow</Link>
				<div className="feeds-container">
					{feed_objs}
				</div>
			</main>
			<footer>
			</footer>
		</div>
  );
}


export default App;
