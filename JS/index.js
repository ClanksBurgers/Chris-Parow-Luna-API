// SWAPI example: two separate GET requests for People and Planets.
document.addEventListener('DOMContentLoaded', () => {
	const endpoints = {
		people: 'https://swapi.dev/api/people/',
		planets: 'https://swapi.dev/api/planets/'
	};

	const resultsList = document.getElementById('results-list');
	const navPeople = document.getElementById('nav-people');
	const navPlanets = document.getElementById('nav-planets');

	function setActive(button) {
		[navPeople, navPlanets].forEach(b => b.setAttribute('aria-pressed', 'false'));
		button.setAttribute('aria-pressed', 'true');
	}

	function showLoading(message = 'Loading...') {
		resultsList.innerHTML = '';
		const li = document.createElement('li');
		li.className = 'loading';
		li.textContent = message;
		resultsList.appendChild(li);
	}

	function showError(message) {
		resultsList.innerHTML = '';
		const li = document.createElement('li');
		li.className = 'error';
		li.textContent = message;
		resultsList.appendChild(li);
	}

	function renderPeople(items) {
		resultsList.innerHTML = '';
		items.forEach(p => {
			const li = document.createElement('li');
			li.className = 'person-card';

			const avatar = document.createElement('div');
			avatar.className = 'person-avatar';
			// small inline SVG as avatar (helmet/starfighter)
			avatar.innerHTML = `
				<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M3 12c0 4.418 3.582 8 8 8s8-3.582 8-8" stroke="#FFD54A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
					<path d="M7 12c1-3 5-3 6 0" stroke="#FFD54A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
				</svg>`;

			const meta = document.createElement('div');
			meta.className = 'person-meta';
			const title = document.createElement('h3');
			title.textContent = p.name;
			const details = document.createElement('p');
			details.innerHTML = `Height: ${p.height} cm • Mass: ${p.mass} kg • Gender: ${p.gender}`;

			meta.appendChild(title);
			meta.appendChild(details);
			li.appendChild(avatar);
			li.appendChild(meta);
			resultsList.appendChild(li);
		});
	}

	function renderPlanets(items) {
		resultsList.innerHTML = '';
		items.forEach(pl => {
			const li = document.createElement('li');
			const name = document.createElement('div');
			name.className = 'planet-name';
			name.textContent = pl.name;
			const details = document.createElement('div');
			details.className = 'planet-details';
			details.textContent = `Climate: ${pl.climate} • Terrain: ${pl.terrain} • Population: ${pl.population}`;
			li.appendChild(name);
			li.appendChild(details);
			resultsList.appendChild(li);
		});
	}

	// Each nav click issues a fresh GET for only the needed data
	async function fetchPeople(url = endpoints.people) {
		try {
			showLoading('Loading people...');
			const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			console.log('people response', data);
			// render current page results only
			renderPeople(data.results || []);
		} catch (err) {
			console.error(err);
			showError('Failed to load people. ' + err.message);
		}
	}

	async function fetchPlanets(url = endpoints.planets) {
		try {
			showLoading('Loading planets...');
			const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			console.log('planets response', data);
			renderPlanets(data.results || []);
		} catch (err) {
			console.error(err);
			showError('Failed to load planets. ' + err.message);
		}
	}

	// Wire nav
	navPeople.addEventListener('click', () => { setActive(navPeople); fetchPeople(); });
	navPlanets.addEventListener('click', () => { setActive(navPlanets); fetchPlanets(); });

	// initial load
	setActive(navPeople);
	fetchPeople();

	// No opening crawl to hide — static intro replaces it.
});
