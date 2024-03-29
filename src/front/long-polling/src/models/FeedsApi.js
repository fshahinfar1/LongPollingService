import {get, post, del, put} from '../utils/Http';
import {asyncFetchEvents, filterEvent} from '.';
const base = 'http://localhost:8080/posts';


export function fetchFeed(feedId, success, error) {
	get(`${base}/${feedId}`, function() {
		let payload = JSON.parse(this.responseText);
		payload = feedFromJson(payload);
		success(payload);
	}, function() {
		error(this);
	});
}

export function fetchFeeds(success, error) {
	get(`${base}`, function() {
		let payload = JSON.parse(this.responseText);
		payload = payload.map(feedFromJson);
		success(payload);
	}, function () {
			error(this);
	});
}

export function deleteFeed(obj, success, error) {
	del(`${base}/${obj.id}/delete`, function() {
		success(this);
	}, function() {
		error(this);
	});
}

export function asyncFetchFeeds(eventId, success, error) {
	const xhr = asyncFetchEvents(eventId, function(e, lastEventId) {
		console.log(e);
		let payload;
		payload = e;
		payload = filterEvent(payload, {dataType: 'POST'});
		payload = payload.map(function(obj) {
			if (obj.event.eventType !== 'DELETE')
				obj.feed = feedFromJson(obj.feed);
			return obj;
		});
		success(payload, lastEventId);
	}, error)
	return xhr;
}

export function postFeed(feed, success, error) {
	post(`${base}`, feed, success, error);
}

export function putFeed(id, feed, success, error) {
	put(`${base}/${id}`, feed, success, error);
}

function feedFromJson(obj) {
	return ({
		id: obj.id,
		title: obj.title,
		description: obj.description,
		date: new Date(obj.createDate).toLocaleDateString()
	});
}

