import React from 'react';
import {useHistory} from 'react-router-dom';
import {FancyButton, Feed} from '../components';
import {get, post} from '../utils/Http';
import '../styles/App.css';


class Feeds extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feeds_info: [],
		}
	}

	componentDidMount() {
		const _this = this;
		get('http://localhost:8080/feeds', function() {
			_this.onFeedsSuccess(this);
		}, function () {
				_this.onFeedsError(this);
		});
	}

	onFeedsSuccess = (e) => {
		console.log(e.responseText);
		const feeds_info = JSON.parse(e.responseText);
		this.setState({feeds_info});
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
						/>
		});

		return (
			<main>
				<h1>Main</h1>
				<div className="feeds-container">
					{feeds}
				</div>
			</main>
		);
	}
}


export default Feeds;
