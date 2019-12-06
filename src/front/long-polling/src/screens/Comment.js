import React from 'react';
import {withRouter} from 'react-router-dom';
import {NavBar, FancyButton, Feed} from '../components';
import {fetchFeed, asyncFetchComments,
	postComment, fetchComments} from '../models';
import '../styles/App.css';

function CommentBox(props) {
	return (
		<div className="comment-box">
			<p>{props.text}</p>
		</div>
	);
}

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feedId: Number.parseInt(props.match.params.feedId),
			comments: [],
			currentComment: '',
			feed: null,
			lastEventId: 0
		}
		this.asyncCommentsXhr = null;
	}

	componentDidMount() {
		fetchFeed(this.state.feedId,
			this.onFetchFeed, this.onFeedError);
		fetchComments(this.state.feedId, this.onFetchComment, this.onCommentError);
	}

	componentWillUnmount() {
		if (this.asyncCommentsXhr)
			this.asyncCommentsXhr.abort();
	}

	onFetchFeed = (e) => {
		this.setState({feed: e});
	}

	onFetchComment = (e) => {
		console.log(e);
		this.setState({comments: e});
		this.asyncCommentsXhr = asyncFetchComments(this.state.feedId,
			this.state.lastEventId, this.onCommentEvent, this.onCommentError);
	}

	onFeedError = (e) => {
		console.log('error loading comment');
	}

	onCommentEvent = (e, lastEventId) => {
		const comments = JSON.parse(JSON.stringify(this.state.comments));
		console.log(comments);
		let lastCheckedIndex = 0;
		const length = comments.length;
		e.forEach((obj) => {
			obj = obj.feed;
			while (lastCheckedIndex < length &&
				comments[lastCheckedIndex].id < obj.id) {
				lastCheckedIndex += 1;
			}
			if (lastCheckedIndex < length &&
				comments[lastCheckedIndex].id === obj.id) {
				comments[lastCheckedIndex] = obj;
				return;
			} else {
				comments.splice(lastCheckedIndex, 0, obj);
				lastCheckedIndex += 1;
			}
		});
		console.log("before set State", comments);
		this.setState({comments, lastEventId});
		this.asyncCommentsXhr = asyncFetchComments(this.state.feedId,
			lastEventId + 1, this.onCommentEvent, this.onCommentError);
	}

	onCommentError = (e) => {
		console.log('failed to get comments');
	}

	postNewComment = () => {
		postComment(this.state.feedId, this.state.currentComment,
			function() {
				console.log('comment success');
			}, function() {
				console.log('comment failed');
			});
		this.setState({currentComment: ''});
	}

	onBackClicked = () => {
	}

	render() {
		const comments = this.state.comments.map(function(obj) {
			return (<CommentBox text={obj.text} />);
		});

		console.log(JSON.stringify(this.state));
		return (
			<main>
			{
				this.state.feed ?
				<Feed
						title={this.state.feed.title}
						description={this.state.feed.description}
						date={this.state.feed.date}
				/>
				: null
			}
				<div className="comment-area">
					<div>
						{comments}
					</div>
					<div className="new-comment-section">
						<textarea
							value={this.state.currentComment}
							onChange={(e) => this.setState({currentComment: e.target.value})}
						/>
						<FancyButton
							value="Post"
							onClick={this.postNewComment}
						/>
					</div>
				</div>
			</main>
		);
	}
}

export default Comment = withRouter(Comment);
