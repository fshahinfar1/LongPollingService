function getXHR(url, method) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	return xhr;
}

export function get(url, success, error) {
	const xhr = getXHR(url, 'GET');
	xhr.send();
	xhr.addEventListener('load', success);
	xhr.addEventListener('error', error);
	return xhr;
}

export function post(url, payload, success, error) {
	const xhr = getXHR(url, 'POST');
	const body = JSON.stringify(payload);
	console.log(body);
	xhr.send(body);
	xhr.addEventListener('load', success);
	xhr.addEventListener('error', error);
	return xhr;
}

export function del(url, success, error) {
	const xhr = getXHR(url, 'DELETE');
	xhr.addEventListener('load', success);
	xhr.addEventListener('error', error);
	xhr.send();
	return xhr;
}
