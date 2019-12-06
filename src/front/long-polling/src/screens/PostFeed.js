import React from 'react';
import {useHistory} from 'react-router-dom';
import {postFeed} from '../models';
import {Form, NavBar} from '../components';
import '../styles/App.css';

function PostFeed() {
	const history = useHistory();

	function postFeeds(obj) {
		const payload = Object.assign({
			createDate: new Date().toISOString(),
		}, obj);
		postFeed(payload, function() {
			console.log("Post feed success");
		}, function() {
			console.log("Post feed failed");
		});
		history.push('/');
	}

  return (
		<main>
			<div>
			<Form title="Feed" onSubmit={postFeeds}/>
			</div>
		</main>
  );
}


export default PostFeed;
