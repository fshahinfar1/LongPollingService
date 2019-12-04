import {get, post} from '../utils/Http';
const base = 'http://localhost:8080';

export function asyncFetchComments(feedId, eventId, success, error) {
	console.log(`${base}/feeds/${feedId}/comments/async/${eventId}`);
	const xhr = get(`${base}/feeds/${feedId}/comments/async/${eventId}`,
		function() {
		console.log(this.responseText);
		let payload;
		if (this.responseText) {
			payload = JSON.parse(this.responseText);
		} else {
			payload = []
		}
		success(payload);
	}, function() {
		error(this);
	});
	return xhr;
}

export function postComment(feedId, text, success, error) {
	console.log('post new comment');

	const createDate = new Date().toISOString();
	const payload = {text, createDate};

	console.log(`${base}/feeds/${feedId}/comments`);

	post(`${base}/feeds/${feedId}/comments`, payload,
		success, error);
}
