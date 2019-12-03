import {get, post} from '../utils/Http';

export function fetchFeeds(success, error) {
	console.log(typeof(get));
	get('http://localhost:8080/feeds', function() {
		let payload = JSON.parse(this.responseText);
		payload = payload.map(feedFromJson);
		success(payload);
	}, function () {
			error(this);
	});
}

function feedFromJson(obj) {
	return ({
		id: obj.id,
		title: obj.title,
		description: obj.description,
		date: new Date(obj.createDate).toLocaleDateString()
	});
}
