# FIFA World Cup 2026 Official Key Fixtures (Static MVP)

A fast, SEO-first static website for browsing FIFA-verified key FIFA World Cup 2026 fixtures in the visitor's local timezone.

## Files

- `index.html` – semantic page structure, SEO tags, and source links to FIFA official schedule pages.
- `styles.css` – responsive and mobile-friendly styling.
- `app.js` – FIFA-verified key fixture data, local timezone conversion, filters, and JSON-LD rendering.

## Features

- Displays FIFA-verified anchor fixtures:
  - Opening match
  - Semifinals
  - Third-place match
  - Final
- Local timezone kickoff display based on browser settings.
- Flag icons shown for confirmed teams.
- Country filter (`All countries` default, matching home or away team).
- SEO-focused metadata and `SportsEvent` JSON-LD.
- Links to official FIFA schedule sources.

## Run locally (any static server)

### Option 1: Python

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`

### Option 2: Node (serve package)

```bash
npx serve .
```

Then open the URL printed in terminal.

### Option 3: VS Code Live Server

Open the folder and start **Live Server** on `index.html`.

## Deployment

Deploy the files as-is to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel static output, S3, etc.).
