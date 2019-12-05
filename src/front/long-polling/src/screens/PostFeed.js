import React from 'react';
import {postFeed} from '../models';
import {Form, NavBar} from '../components';
import '../styles/App.css';


function postFeeds(obj) {
	const payload = Object.assign({
		createDate: new Date().toISOString(),
	}, obj);
	postFeed(payload, function() {
		console.log("Post feed success");
	}, function() {
		console.log("Post feed failed");
	});
}

function PostFeed() {
  return (
		<main>
			<div>
			<Form title="Feed" onSubmit={postFeeds}/>
			</div>
		</main>
  );
}


export default PostFeed;
