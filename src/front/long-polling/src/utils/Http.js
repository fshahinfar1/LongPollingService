export function get(url, success, error) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
	xhr.addEventListener('load', success);
	xhr.addEventListener('error', error);
}

export function post(url, payload, success, error) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	const body = JSON.stringify(payload);
	console.log(body);
	xhr.send(body);
	xhr.addEventListener('load', success);
	xhr.addEventListener('error', error);
}
