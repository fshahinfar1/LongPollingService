import React from 'react';
import NavBar from './Navbar';
import FancyButton from './FancyButton';
import {get, post} from './Http';
import {Link} from 'react-router-dom';
import {hear_icon, comment_icon} from './icons';
import './App.css';


function Feed(props) {
	return (
		<div className='feed-container'>
			<div className='feed-content'>
				<h1>{props.title}</h1>
				<p>{props.description}</p>
			</div>
			<div className='feed-footer'>
				<FancyButton
					value='like'
					img={{alt:'heart', src:hear_icon}}
				/>
				<FancyButton
					value='comment'
					img={{alt:'comment', src:comment_icon}}
				/>
				<p className='feed-date'>1398-x-x</p>
			</div>
		</div>
	);
}

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

	const feed_objs = feeds.map(function (obj) {
		return <Feed
						key={obj.id}
						title={obj.title}
						description={obj.description}
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
