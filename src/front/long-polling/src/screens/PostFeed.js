import React from 'react';
import {withRouter} from 'react-router-dom';
import {postFeed, fetchFeed} from '../models';
import {Form, NavBar} from '../components';
import '../styles/App.css';

class PostFeed extends React.Component {
	constructor(props) {
		super(props)
		const { feedId } = props.match.params;
		console.log(props.match);
		this.state = {
			feedId,
			data: null
		}

	}

	componentDidMount() {
		const feedId = this.state.feedId;
		if (feedId !== undefined) {
			fetchFeed(feedId, (payload) => {
				this.setState({data:payload});
			}, function() {
			});
		}
	}

	postFeeds = (obj) => {
		const payload = Object.assign({
			createDate: new Date().toISOString(),
		}, obj);
		postFeed(payload, function() {
			console.log("Post feed success");
		}, function() {
			console.log("Post feed failed");
		});
		this.props.history.push('/');
	}

	putFeed = (obj) => {
	}

	render() {
		const isUpdate = this.state.feedId !== undefined;
		const ready = !isUpdate || this.state.data !== null;
		return (
			<main>
				<div>
				{ ready ?
				<Form title="Feed"
					data={this.state.data}
					onSubmit={isUpdate ? this.putFeed : this.postFeeds}/>
					: <h2> Please Wait </h2>
				}
				</div>
			</main>
		);
	}
}


export default PostFeed = withRouter(PostFeed);
