import React from 'react';
import {get, post} from '../utils/Http';
import {Form, NavBar} from '../components';
import '../styles/App.css';


function postFeeds(obj) {
	const url = "http://localhost:8080/feeds"
	const payload = Object.assign({
		createDate: "2019-11-30T14:56:05.834Z",
		id: "0"
	}, obj);
	post(url, payload, function() {
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
