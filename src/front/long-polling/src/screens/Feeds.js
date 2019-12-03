import React from 'react';
import {useHistory} from 'react-router-dom';
import {FancyButton, Feed} from '../components';
import {fetchFeeds} from '../models';
import '../styles/App.css';


class Feeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds_info: [],
		}
	}

	componentDidMount() {
		fetchFeeds(this.onFeedsSuccess, this.onFeedsError);
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
