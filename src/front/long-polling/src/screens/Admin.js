import React from 'react';
import {FancyButton} from '../components';
import '../styles/App.css';


function FeedOptions(props) {
	return (
		<div className="feed-option-container">
			<b>{props.title}</b>
			<div className="feed-option-buttons" >
				<FancyButton value="view" />
				<FancyButton value="delete" />
			</div>
		</div>
	);
}

export default function Admin(props) {

	const feeds_info = [{
		id: 0,
		title:'title1'
	}, {
		id: 1,
		title: 'title2'
	}, {
		id: 2,
		title: 'title3'
	}, {
		id: 3,
		title: 'title4'
	}]

	const feeds = feeds_info.map(function(obj) {
		return (
			<FeedOptions key={obj.id} title={obj.title} />
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
