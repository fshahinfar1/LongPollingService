import {get, post} from '../utils/Http';
import {asyncFetchEvents, filterEvent} from '../models';
const base = 'http://localhost:8080';


export function fetchLikes(feedId, success, error) {
	const xhr = get(`${base}/posts/${feedId}/likes`, function () {
		let payload = JSON.parse(this.responseText);
		console.log(payload);
		const count = payload.length;
		console.log('count: ', count);
		success(count);
	}, function() {
		error(this);
	});
	return xhr;
}

export function asyncFetchLikes(feedId, eventId, success, error) {
	const xhr = asyncFetchEvents(eventId, function(e, lastEventId) {
		console.log(e);
		let payload = e;
		payload = filterEvent(payload, {dataType: 'LIKE', postId: feedId});
		const count = payload.length;
		console.log('async like count', count);
		success(count, lastEventId);
	}, error);
	return xhr;
}

export function postLike(feedId, success, error) {
	const payload = {createDate: new Date().toISOString()};
	const xhr = post(`${base}/posts/${feedId}/likes`,
		payload, success, error);
	return xhr;
}
