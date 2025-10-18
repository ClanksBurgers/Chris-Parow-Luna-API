
# Chris Parow — Luna API (SWAPI example)

This small project demonstrates fetching data from public APIs and displaying it in a simple single-page site. It satisfies the assignment requirements by requesting two separate endpoints and issuing a new GET request each time the user navigates between them.

What it includes
- `Index.html` — main page with navigation
- `CSS/index.css` — styles
- `JS/index.js` — JavaScript that issues two separate GET requests (People and Planets)

APIs used
- Star Wars API (SWAPI): https://swapi.dev/

Behavior and requirements covered
- Displays data from two endpoints: People and Planets.
- Navigation links (`People` and `Planets`) each issue a fresh GET request when clicked; only the needed endpoint is requested.
- Loading and error states are shown.
- Simple, readable UI and accessible markup (buttons use `aria-pressed`, results are `aria-live`).

Run locally

1. Clone the repository or download the files.
2. Open `Index.html` in your browser. No server is required because SWAPI is CORS-enabled. Example (Windows PowerShell):

```powershell
# from the project folder
start .\Index.html
```

Notes
- Each time you click a navigation button the app performs a fresh GET to either `https://swapi.dev/api/people/` or `https://swapi.dev/api/planets/` and renders only the data needed for that view.
- If you prefer to serve the files from a local static server (useful for some browsers or extensions), you can run a simple server, e.g. with Python 3:

```powershell
python -m http.server 8000
# then open http://localhost:8000/ in your browser
```

Repository

My Open API Project: https://github.com/ClanksBurgers/Chris-Parow-Luna-API

If you'd like, I can also add pagination controls for the SWAPI pages or switch to a different public API (weather, images, etc.).

