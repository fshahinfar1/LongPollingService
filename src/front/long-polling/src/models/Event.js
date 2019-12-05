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
