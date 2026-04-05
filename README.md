# FIFA World Cup 2026 Schedule (Static MVP)

A fast, SEO-first static website for browsing the FIFA World Cup 2026 schedule in the visitor's local timezone.

## Files

- `index.html` – semantic page structure, SEO tags, and JSON-LD.
- `styles.css` – responsive and mobile-friendly styling.
- `app.js` – seeded match data, local timezone conversion, filters, and section rendering.

## Features

- Full schedule list from local seeded data (no API/backend).
- Local timezone kickoff display based on browser settings.
- Flag icons shown for teams in schedule cards and filter options.
- Country filter (`All countries` default, matching home or away team).
- Dedicated sections for:
  - Today’s matches (local date)
  - Upcoming next 24 hours
- Empty states when no results are available.
- Sticky mobile-friendly filter controls.
- Optional “My Team” quick filter saved in `localStorage`.
- SEO-focused metadata and FAQ content.

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

Deploy the four files as-is to any static host (GitHub Pages, Netlify, Cloudflare Pages, Vercel static output, S3, etc.).
