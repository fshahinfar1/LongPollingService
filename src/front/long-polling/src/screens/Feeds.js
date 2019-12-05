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
		console.log("Feeds screen did mount", this.state.lastEventId + 1);
		fetchFeeds(this.onFeedsSuccess, this.onFeedsError);
	}

	componentWillUnmount() {
		if (this.asyncFeedsXhr) {
			console.log("abort xhr feeds");
			this.asyncFeedsXhr.abort();
		}
	}

	onFeedsEventFetch = (e, lastEventId) => {
		console.log(e);
		const feeds_info = JSON.parse(JSON.stringify(this.state.feeds_info));
		let checkedIndex = 0;
		const length = feeds_info.length;
		e.forEach(function(_obj) {
			console.log(_obj);
			let obj = _obj.feed;
			while (checkedIndex < length &&
							feeds_info[checkedIndex].id < obj.id) {
				checkedIndex += 1;
			}
			if (checkedIndex < length &&
					feeds_info[checkedIndex].id === obj.id) {
				if (_obj.event.eventType === 'DELETE') {
					feeds_info.splice(checkedIndex, 1);
				} else {
					feeds_info[checkedIndex] = obj;
				}
				return;
			} else {
				if (_obj.event.eventType === 'DELETE')
					return;
				feeds_info.splice(checkedIndex, 0, obj);
				checkedIndex += 1;
			}
		});
		this.setState({feeds_info, lastEventId});
		this.asyncFeedsXhr = asyncFetchFeeds(lastEventId + 1,
			this.onFeedsEventFetch, this.onFeedsError);
	}

	onFeedsSuccess = (e) => {
		this.setState({feeds_info: e});

		this.asyncFeedsXhr = asyncFetchFeeds(this.state.lastEventId + 1,
			this.onFeedsEventFetch, this.onFeedsError);
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
							id={obj.id}
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
