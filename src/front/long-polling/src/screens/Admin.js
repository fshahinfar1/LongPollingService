import React from 'react';
import {withRouter} from 'react-router-dom';
import {FancyButton} from '../components';
import {fetchFeeds, deleteFeed} from '../models';
import '../styles/App.css';


function FeedOptions(props) {
	return (
		<div className="feed-option-container">
			<b>{props.title}</b>
			<span>{props.date}</span>
			<div className="feed-option-buttons" >
				<FancyButton value="view" onClick={props.onViewClicked} />
				<FancyButton value="delete" onClick={props.onDeleteClicked} />
			</div>
		</div>
	);
}

class Admin extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			feedsInfo: [],
		};
	}

	componentDidMount() {
		fetchFeeds(this.onFeedsSuccess, this.onFeedsError);
	}

	onFeedsSuccess = (e) => {
		this.setState({feedsInfo: e});
	}

	onFeedsError = (e) => {
		console.log("Fetching feeds for admin panel failed");
	}

	onDeleteFeed = (obj) => {
		console.log('onDeleteFeed');
		deleteFeed(obj, () => {
			const feedsInfo = JSON.parse(JSON.stringify(this.state.feedsInfo));
			for (let i = 0; i < feedsInfo.length; i++) {
				if (feedsInfo[i].id === obj.id) {
					feedsInfo.splice(i, 1);
					break;
				}
			}
			this.setState({feedsInfo});
		}, () => {
			console.log("admin panel: failed to remove feed");
		});
	}

	render() {
		const _this = this;
		const feeds = this.state.feedsInfo.map(function(obj) {
			return (
				<FeedOptions
					key={obj.id}
					date={obj.date}
					title={obj.title}
					onViewClicked={() => _this.props.history.push(`/comment/${obj.id}`)}
					onDeleteClicked={() => _this.onDeleteFeed(obj)}
				/>
			);
		});

		return (
			<main>
				<div className="admin-view">
					{feeds}
				</div>
			</main>
		);
	}
}

export default Admin = withRouter(Admin);
