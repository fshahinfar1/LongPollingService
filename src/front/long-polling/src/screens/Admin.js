import React from 'react';
import {FancyButton} from '../components';
import '../styles/App.css';


function FeedOptions(props) {
	return (
		<div className="feed-option-container">
			<b>{props.title}</b>
			<span>{props.date}</span>
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
		title:'title1',
		date: '1398-x-x',
	}, {
		id: 1,
		date: '1398-x-x',
		title: 'title2'
	}, {
		id: 2,
		date: '1398-x-x',
		title: 'title3'
	}, {
		id: 3,
		date: '1398-x-x',
		title: 'title4'
	}]

	const feeds = feeds_info.map(function(obj) {
		return (
			<FeedOptions key={obj.id} date={obj.date} title={obj.title} />
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
