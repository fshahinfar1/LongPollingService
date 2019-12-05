import {get} from '../utils/Http';
const base = 'http://localhost:8080/events';

export function asyncFetchEvents(eventId, success, error) {
	const xhr = get(`${base}/events/async/${eventId}`, function() {
		let payload = this.responseText;
		if (payload === 'Request timeout occurred.') {
			payload = [];
		} else {
			payload = JSON.parse(payload);
		}
		const length = payload.length;
		const lastEventId = length === 0 ? 0 : payload[length - 1].event.id;
		success(payload, lastEventId);
	}, function() {
		error(this);
	});
	return xhr;
}

export function filterEvent(arr, {dataType, eventType, postId}) {
		let res = arr.filter(function(obj) {
			console.log(eventType, postId, dataType);
			let okay = true;
			if (dataType !== undefined) {
				okay = okay && obj.event.dataType === dataType;
			}

			if (eventType !== undefined) {
				okay = okay && obj.event.eventType === eventType;
			}

			if (postId !== undefined) {
				console.log('postId:', postId, obj.event.postId)
				console.log(obj.event.postId === postId);
				console.log(typeof (postId), typeof(obj.event.postId));
				okay = okay && obj.event.postId === postId;
			}

			return okay;
		});
	return res;
}
