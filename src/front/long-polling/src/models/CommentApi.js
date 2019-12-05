import {get, post} from '../utils/Http';
import {asyncFetchEvents, filterEvent} from '.';
const base = 'http://localhost:8080';


export function fetchComments(feedId, success, error) {
	const xhr = get(`${base}/posts/${feedId}/comments`, function() {
		let payload;
		if (this.responseText === 'Request timeout occurred.') {
			payload = [];
		} else {
			payload = JSON.parse(this.responseText);
		}
		success(payload)
	}, error);
}

export function asyncFetchComments(feedId, eventId, success, error) {
	const xhr = asyncFetchEvents(eventId, function(e, lastEventId) {
		console.log(e);
		let payload = e;
		// TODO: should filter the post id here!
		console.log('before filtering comment evenets');
		payload = filterEvent(payload, {dataType:'COMMENT', postId: feedId});
		success(payload, lastEventId);
	}, error);
	return xhr;
}

export function postComment(feedId, text, success, error) {
	console.log('post new comment');

	const createDate = new Date().toISOString();
	const payload = {text, createDate};

	console.log(`${base}/posts/${feedId}/comments`);

	post(`${base}/posts/${feedId}/comments`, payload,
		success, error);
}
