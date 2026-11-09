# Thetis by Old North

A responsive, static website for Thetis, a North Carolina youth soccer development program. It is built with HTML, CSS, and vanilla JavaScript; no build step or package manager is required.

## Project structure

```text
.
├── index.html               # Main site content and page structure
├── partners.html            # Existing-partner session request page
├── css/
│   ├── styles.css           # Main site design system
│   └── partner-scheduling.css # Partner booking page styles
├── js/
│   ├── main.js              # Main site navigation and form behavior
│   └── partner-scheduling.js # Session request interactions
├── official-logo.png        # Brand logo
├── preview-*.jpg            # Site photography
└── team-*.png               # Team photography
```

## Partner session requests

Existing partners can visit `partners.html` to request a one-on-one or group practice session. They can provide a preferred date, time, and location: Fred Fletcher Park (820 Clay St, Raleigh, NC 27605), their home, or a field of their choice.

The static page prepares an email request to `thetisoldnorth@gmail.com`; it does not check live availability or reserve a slot. The Thetis team must confirm the appointment by email. A backend calendar/booking integration would be needed to display real-time availability and prevent conflicts.

## Preview locally

Open `index.html` in a browser, or serve the project directory with any static file server. For example:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` and `http://localhost:8000/partners.html`.

## Publish

The site is static and can be deployed on GitHub Pages or another static hosting provider. Configure the host to publish the repository root (the directory containing `index.html`).

## Contact

Interest and partner session forms open an email draft to `thetisoldnorth@gmail.com`. They do not submit information to a server or store it.
