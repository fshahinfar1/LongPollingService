import {get, del} from '../utils/Http';
const base = 'http://localhost:8080';


export function fetchFeed(feedId, success, error) {
	get(`${base}/feeds/${feedId}`, function() {
		let payload = JSON.parse(this.responseText);
		payload = feedFromJson(payload);
		success(payload);
	}, function() {
		error(this);
	});
}

export function fetchFeeds(success, error) {
	get(`${base}/feeds`, function() {
		let payload = JSON.parse(this.responseText);
		payload = payload.map(feedFromJson);
		success(payload);
	}, function () {
			error(this);
	});
}

export function deleteFeed(obj, success, error) {
	del(`${base}/feeds/${obj.id}/delete`, function() {
		success(this);
	}, function() {
		error(this);
	});
}

export function asyncFetchFeeds(eventId, success, error) {
	const xhr = get(`${base}/feeds/async/${eventId}`, function() {
		console.log(this.responseText);
		let payload;
		if (this.responseText !== 'Request timeout occurred.') {
			payload = JSON.parse(this.responseText);
		} else {
			payload = []
		}
		payload = payload.map(feedFromJson);
		success(payload);
	}, function() {
		error(this);
	});
	return xhr;
}

function feedFromJson(obj) {
	return ({
		id: obj.id,
		title: obj.title,
		description: obj.description,
		date: new Date(obj.createDate).toLocaleDateString()
	});
}

