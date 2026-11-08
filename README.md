# Thetis by Old North

A responsive, static website for Thetis, a North Carolina youth soccer development program. It is built with HTML, CSS, and vanilla JavaScript; no build step or package manager is required.

## Project structure

```text
.
├── index.html             # Site content and page structure
├── css/
│   └── styles.css         # Responsive layout, colors, and typography
├── js/
│   └── main.js            # Mobile navigation and dynamic copyright year
├── official-logo.png      # Brand logo
├── preview-*.jpg          # Site photography
└── team-*.png             # Team photography
```

The existing image files remain at the repository root and are referenced by the page and stylesheet.

## Preview locally

Open `index.html` in a browser, or serve the project directory with any static file server. For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish

The site is static and can be deployed on GitHub Pages or another static hosting provider. Configure the host to publish the repository root (the directory containing `index.html`).

## Contact

The contact link opens an email to `thetisoldnorth@gmail.com`. It does not submit data to a server or store visitor information.
