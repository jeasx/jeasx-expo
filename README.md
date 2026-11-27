# Jeasx examples

This repository features numerous examples demonstrating how to develop with [Jeasx](https://www.jeasx.dev) across a variety of technologies. Explore it and start experimenting today!

Jeasx renders JSX on the server with [Fastify](https://fastify.dev) and [esbuild](https://esbuild.github.io). Pages are plain HTML by default; client-side JavaScript is added only where an example needs it.

## Getting started

Requires a current Node.js LTS release.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The start page links to every example.

## Scripts

| Command         | Description                                     |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Start the development server with live rebuilds |
| `npm run build` | Build server and browser bundles for production |
| `npm start`     | Start the production server (after `build`)     |
| `npm test`      | Run the unit tests (`src/**/*.test.*`)          |
| `npm run clean` | Remove build output                             |

## What's inside

The first four topics cover [jsx-async-runtime](https://github.com/jeasx/jsx-async-runtime), the JSX runtime behind Jeasx; the next three show how to build with Jeasx, and the last two integrate HTMX and other JavaScript libraries and frameworks.

Each example lives in its own folder below [`src/`](src) and is served at the matching path (e.g. `src/todos` → `/todos`).

- **Server-side JSX**: what JSX renders, context, slots, caching, intercepting JSX, web components, unit tests
- **Streaming**: parallel loading, streaming and out-of-order HTML, lazy loading, async iterables
- **Isomorphic apps**: the same components render on the server and in the browser, and work without JavaScript
- **Client-side apps and games**: client-side JSX, from small tools to games
- **Server-rendered websites and apps**: content sites, forms, pagination, databases, A/B testing, i18n
- **Beyond HTML**: SVG, emails, PDFs, images, Server-Sent Events, WebSockets, `Response` objects, JSON APIs
- **Security, errors and post-processing**: sessions, cookies, CSP, captchas, rate limiting, error boundaries, HTML post-processing
- **Hypermedia with HTMX**: classic HTMX patterns
- **JavaScript libraries and frameworks**: React, Preact, Vue, Svelte, Lit, Alpine.js and mixed islands

Every example, with a description, is listed on the start page and in [`src/sitemap.json`](src/sitemap.json).

## Project structure

Jeasx uses file-based routing inside `src/`:

- `[name].jsx` / `[name].js`: a route, served at `/name` (`[index].jsx` serves the folder itself)
- `[...path].jsx`: a catch-all route for all paths below the folder
- `[...guard].js(x)`: a guard that runs before every route in its folder and below (auth, redirects, request setup)
- `[404].jsx`: the page for unknown paths
- `index.js(x)` / `index.css`: browser bundles, built with esbuild and served at the same path
- other files (components, helpers): imported by routes, not served

Styles: [`src/index.css`](src/index.css) holds only what every page needs. Shared styles (buttons, cards, forms, tables, details, loading indicators, the look of the streaming examples) live in [`src/@styles/`](src/@styles), and an example opts in by importing them at the top of its own `index.css`.

Server and browser build options, as well as Fastify plugins and body parsers (cookies, forms, file uploads), are configured in [`jeasx.config.js`](jeasx.config.js). Static files go in [`public/`](public).

## Configuration

| Variable        | Description                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `PORT`          | Server port (default `3000`)                                                                                                   |
| `COOKIE_SECRET` | Secret for signed cookies. Set it in production and keep it across restarts; otherwise a random one is created on every start. |
| `TRUST_PROXY`   | Set to `true` behind a proxy that terminates TLS (set automatically on Vercel)                                                 |

## Deployment

**Docker**

```bash
docker build -t jeasx-expo .
docker run -p 3000:3000 -e COOKIE_SECRET=change-me jeasx-expo
```

The image includes a health check against `/health`.

**Vercel**

The project deploys to Vercel as is: [`vercel.json`](vercel.json) routes all requests to [`api/vercel.js`](api/vercel.js).

## Learn more

- Documentation: [jeasx.dev](https://www.jeasx.dev)
