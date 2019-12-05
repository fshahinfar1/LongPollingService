import {get} from '../utils/Http';
const base = 'http://localhost:8080/events';

export function asyncFetchEvents(eventId, success, error) {
	const xhr = get(`${base}/events/async/${eventId}`, function() {
		const payload = JSON.parse(this.responseText);
		success(payload);
	}, function() {
		error(this);
	});
	return xhr;
}

export function filterEvent(arr, {dataType, eventType}) {
		let res = arr.filter(function(obj) {
			let okay = true;
			if (dataType) {
				okay = okay && obj.event.dataType === dataType;
			}

			if (eventType) {
				okay = okay && obj.event.eventType === eventType;
			}

			return okay;
		});
	return res;
}
