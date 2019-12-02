import React from 'react';
import NavBar from './Navbar';
import FancyButton from './FancyButton';
import {get, post} from './Http';
import {Link, useHistory} from 'react-router-dom';
import {hear_icon, comment_icon} from './icons';
import './App.css';


export class Comment extends React.Component {
	constructor(props) {
		super(props);
	}


	onBackClicked = () => {
	}

	render() {
		return (
			<div>
				<FancyButton
					value="Back"
					onClick={this.onBackClicked}
				/>
				<textarea />
				<FancyButton
					value="Post"
				/>
			</div>
		);
	}
}

class Feed extends React.Component {
	constructor(props) {
		super(props);
	}

	onCommentClick = () => {
	  this.props.history.push('/comment');
	}

	render() {
		return (
				<div className='feed-container'>
					<div className='feed-content'>
						<h1>{this.props.title}</h1>
						<p>{this.props.description}</p>
					</div>
					<div className='feed-footer'>
						<FancyButton
							value='like'
							img={{alt:'heart', src:hear_icon}}
						/>
						<FancyButton
							value='comment'
							img={{alt:'comment', src:comment_icon}}
							onClick={this.onCommentClick}
						/>
						<p className='feed-date'>1398-x-x</p>
					</div>
				</div>
			);
	}
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
