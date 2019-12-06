import React from 'react';
import {useHistory} from 'react-router-dom';
import {FancyButton, Feed} from '../components';
import {fetchFeeds, asyncFetchFeeds,
	postLike, fetchLikes, asyncFetchLikes} from '../models';
import {dclone} from '../utils';
import '../styles/App.css';

const dummyFunc = function(){};

class Feeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds_info: [],
			lastEventId: 0,
			lastLikeEventId: 0,
			likes: {}
		}
		this.asyncFeedsXhr = null;
		this.asyncLikeXhr = {};
	}

	componentDidMount() {
		console.log("Feeds screen did mount", this.state.lastEventId + 1);
		fetchFeeds(this.onFeedsSuccess, this.onFeedsError);
	}

	componentWillUnmount() {
		if (this.asyncFeedsXhr) {
			this.asyncFeedsXhr.abort();
		}

		Object.keys(this.asyncLikeXhr).forEach((key) => {
			this.asyncLikeXhr[key].abort();
		});
	}

	applyFeedEvent = (_obj, feeds_info) => {
		let length = feeds_info.length;
		let checkedIndex = 0;
		console.log('in for each in async feed', _obj);
		let obj = _obj.feed;
		while (checkedIndex < length &&
						feeds_info[checkedIndex].id !==  _obj.event.postId) {
			console.log(typeof(_obj.event.postId), typeof(feeds_info[checkedIndex].id));
			checkedIndex += 1;
		}
		if (checkedIndex < length &&
				feeds_info[checkedIndex].id === _obj.event.postId) {
			console.log('found');
			if (_obj.event.eventType === 'DELETE') {
				console.log("doing delete");
				feeds_info.splice(checkedIndex, 1);
				length -= 1;
			} else {
				feeds_info[checkedIndex] = obj;
			}
			return;
		} else {
			if (_obj.event.eventType === 'DELETE')
				return;
			feeds_info.splice(checkedIndex, 0, obj);
			length += 1;
		}
	}

	onFeedsEventFetch = (e, lastEventId) => {
		console.log(e);
		const feeds_info = dclone(this.state.feeds_info);
		e.forEach((obj) => this.applyFeedEvent(obj, feeds_info));
		const levnum = lastEventId > this.state.lastEventId ? lastEventId: this.state.lastEventId;
		this.setState({feeds_info, levnum});
		this.asyncFeedsXhr = asyncFetchFeeds(lastEventId + 1,
			this.onFeedsEventFetch, this.onFeedsError);
	}

	onFeedsSuccess = (e) => {
		// update posts data it self
		this.setState({feeds_info: e});
		// fetch likes for each post
		for (let i = 0; i < e.length; i++) {
			const id = e[i].id;
			fetchLikes(id,
				(count) => {this.onFetchLike(e[i], count)},
				()=>null
			);
			this.asyncLikeXhr[id] = asyncFetchLikes(id,
				this.state.lastLikeEventId + 1,
				(cnt, lstEId) => this.onAsyncFetchLike(cnt, lstEId, id),
				dummyFunc
			);
		}
		const nextEventId = this.state.lastEventId + 1;
		this.asyncFeedsXhr = asyncFetchFeeds(nextEventId,
			this.onFeedsEventFetch, this.onFeedsError);
	}

	onFeedsError = (e) => {
		console.log("Failed to get feeds");
	}

	onFetchLike = (e, likeCount) => {
		const likes = dclone(this.state.likes);
		likes[e.id] = likeCount;
		this.setState({likes});
	}

	onAsyncFetchLike = (count, lstEId, id) => {
		const likes = dclone(this.state.likes);
		let precnt = likes[id];
		if (precnt === undefined) {
			precnt = 0;
		}
		likes[id] = precnt + count;
		this.asyncLikeXhr[id] = asyncFetchLikes(id,
			this.state.lastLikeEventId + 1,
			(cnt, lst) => this.onAsyncFetchLike(cnt, lst, id),
			dummyFunc
		);
		let lastLikeEventId = lstEId > this.state.lastLikeEventId ?
			lstEId : this.state.lastLikeEventId;
		this.setState({likes, lastLikeEventId,});
	}

	render() {
		console.log(JSON.stringify(this.state));
		const feeds = this.state.feeds_info.map((obj) => {
			let likes = this.state.likes[obj.id];
			if (likes === undefined)
				likes = 0;
			return <Feed
							key={obj.id}
							title={obj.title}
							description={obj.description}
							date={obj.date}
							id={obj.id}
							onLikeClick={function() {postLike(obj.id,
								function(){}, function(){})}}
							likeCount={likes}
						/>
		});

		return (
			<main>
				<div className="feeds-container">
					{feeds}
				</div>
			</main>
		);
	}
}


export default Feeds;
