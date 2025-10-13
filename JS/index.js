// Fetching TheCatAPI — images and breeds.
document.addEventListener('DOMContentLoaded', () => {
	const API_KEY = 'live_1osUdmv0YhXpleHo07byBJhVblrfMpDAFtQyQQpvnP9kEXDTr6rhqFh96zNgKjza'; // TODO: remove before pushing

	const endpoints = {
		images: 'https://api.thecatapi.com/v1/images/search?limit=8',
		breeds: 'https://api.thecatapi.com/v1/breeds'
	};

	const resultsList = document.getElementById('results-list');
	const navImages = document.getElementById('nav-images');
	const navBreeds = document.getElementById('nav-breeds');

	function setActive(button) {
		[navImages, navBreeds].forEach(b => b.setAttribute('aria-pressed', 'false'));
		button.setAttribute('aria-pressed', 'true');
	}

	function renderList(items, type) {
		// clear
		resultsList.innerHTML = '';
		if (!Array.isArray(items)) return;

		if (type === 'images') {
			// grid of thumbnails
			resultsList.classList.add('grid');
			items.slice(0, 24).forEach(it => {
				const li = document.createElement('li');
				const img = document.createElement('img');
				img.src = it.url;
				img.alt = it.id || 'cat image';
				img.className = 'thumb';
				li.appendChild(img);
				resultsList.appendChild(li);
			});
		} else {
			// list of breed cards
			resultsList.classList.remove('grid');
			items.slice(0, 50).forEach(it => {
				const li = document.createElement('li');
				const card = document.createElement('div');
				card.className = 'breed-card';

				// optional image: some breeds include an image object
				if (it.image && it.image.url) {
					const img = document.createElement('img');
					img.src = it.image.url;
					img.alt = it.name;
					card.appendChild(img);
				}

				const meta = document.createElement('div');
				meta.className = 'breed-meta';
				const title = document.createElement('div');
				title.textContent = it.name;
				const desc = document.createElement('div');
				desc.textContent = it.temperament ? it.temperament : (it.origin || '');
				desc.style.color = '#475569';
				desc.style.fontSize = '.95rem';
				meta.appendChild(title);
				meta.appendChild(desc);
				card.appendChild(meta);
				li.appendChild(card);
				resultsList.appendChild(li);
			});
		}
	}

	function fetchAndRender(type) {
		const url = endpoints[type];
		fetch(url, { headers: { 'x-api-key': API_KEY, 'Accept': 'application/json' } })
			.then(res => {
				if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
				return res.json();
			})
				.then(data => {
					console.log(`${type} response:`, data);
					renderList(data, type === 'images' ? 'images' : 'breeds');
				})
			.catch(err => {
				console.error('Fetch error:', err);
				resultsList.innerHTML = `<li>Error fetching ${type}: ${err.message}</li>`;
			});
	}

	// Wire nav
	navImages.addEventListener('click', e => { setActive(navImages); fetchAndRender('images'); });
	navBreeds.addEventListener('click', e => { setActive(navBreeds); fetchAndRender('breeds'); });

	// initial load
	setActive(navImages);
	fetchAndRender('images');
});
