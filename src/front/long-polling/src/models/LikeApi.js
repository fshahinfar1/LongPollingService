import {get, post} from '../utils/Http';
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
}

export function postLike(feedId, success, error) {
	const payload = {createDate: new Date().toISOString()};
	const xhr = post(`${base}/posts/${feedId}/likes`,
		payload, success, error);
	return xhr;
}
