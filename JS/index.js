//fetching the cat api
document.addEventListener('DOMContentLoaded', () => {
	const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=5';
	const API_KEY = 'live_1osUdmv0YhXpleHo07byBJhVblrfMpDAFtQyQQpvnP9kEXDTr6rhqFh96zNgKjza';

	fetch(API_URL, {
		headers: {
			'x-api-key': API_KEY,
			'Accept': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
			return response.json();
		})
		.then(data => {
			// 'data' is an array of image objects from TheCatAPI
			console.log('TheCatAPI response:', data);
		})
		.catch(err => {
			console.error('Fetch error:', err);
		});
});
