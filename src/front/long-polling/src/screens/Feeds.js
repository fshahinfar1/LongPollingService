import React from 'react';
import {useHistory} from 'react-router-dom';
import {FancyButton, Feed} from '../components';
import {fetchFeeds, asyncFetchFeeds} from '../models';
import '../styles/App.css';


class Feeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds_info: [],
			lastEventId: 0
		}
		this.asyncFeedsXhr = null
	}

	componentDidMount() {
		// fetchFeeds(this.onFeedsSuccess, this.onFeedsError);
		this.asyncFeedsXhr = asyncFetchFeeds(this.state.lastEventId,
			this.onFeedsEventFetch, this.onFeedsError);
	}

	componentWillUnmount() {
		if (this.asyncFeedsXhr) {
			this.asyncFeedsXhr.abort();
		}
	}

	onFeedsEventFetch = (e) => {
		console.log(e);
		const feeds_info = JSON.parse(JSON.stringify(this.state.feeds_info));
		let checkedIndex = 0;
		const length = feeds_info.length;
		let lastEventId = this.state.lastEventId;
		e.forEach(function(obj) {
			if (obj.id > lastEventId)
				lastEventId = obj.id + 1; // next event id
			while (checkedIndex < length &&
							feeds_info[checkedIndex].id < obj.id) {
				checkedIndex += 1;
			}
			if (checkedIndex < length &&
					feeds_info[checkedIndex].id === obj.id) {
				feeds_info[checkedIndex] = obj;
				return;
			} else {
				feeds_info.splice(checkedIndex, 0, obj);
				checkedIndex += 1;
			}
		});
		this.setState({feeds_info, lastEventId});
		this.asyncFeedsXhr = asyncFetchFeeds(lastEventId,
			this.onFeedsEventFetch, this.onFeedsError);
	}

	onFeedsSuccess = (e) => {
		this.setState({feeds_info: e});
	}

	onFeedsError = (e) => {
		console.log("Failed to get feeds");
	}

	render() {
		const feeds = this.state.feeds_info.map(function (obj) {
			return <Feed
							key={obj.id}
							title={obj.title}
							description={obj.description}
							date={obj.date}
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
