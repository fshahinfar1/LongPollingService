import React from 'react';
import {NavBar, FancyButton, Feed} from '../components';
import '../styles/App.css';

function CommentBox(props) {
	return (
		<div className="comment-box">
			<p>{props.text}</p>
		</div>
	);
}

export default class Comment extends React.Component {
	constructor(props) {
		super(props);
	}


	onBackClicked = () => {
	}

	render() {
		const comments_text = ['hello', 'this is a teset comment', 'nice job!']
		const comments = comments_text.map(function(obj) {
			return (<CommentBox text={obj} />);
		});

		return (
			<div>
				<NavBar />
				<main>
					<Feed
							title="test title"
							description="description"
					/>
					<div className="comment-area">
						<div>
							{comments}
						</div>
						<div>
							<textarea/>
							<FancyButton
								value="Back"
								onClick={this.onBackClicked}
							/>
							<FancyButton
								value="Post"
							/>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

