import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FancyButton, NavBar, Feed} from '../components';
import {get, post} from '../utils/Http';
import '../styles/App.css';


let feeds_info = [];
function onFeedsSuccess(e) {
	feeds_info = JSON.parse(this.responseText);
	console.log(JSON.stringify(feeds_info));
}

function onFeedsError(e) {
	console.log("Failed to get feeds");
}

get('http://localhost:8080/feeds', onFeedsSuccess, onFeedsError);

function App() {
	const history = useHistory();

	const feed_objs = feeds_info.map(function (obj) {
		return <Feed
						key={obj.id}
						title={obj.title}
						description={obj.description}
						history={history}
					/>
	});

  return (
		<main>
			<h1>Main</h1>
			<div className="feeds-container">
				{feed_objs}
			</div>
		</main>
  );
}


export default App;
