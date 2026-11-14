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
| `npm test`      | Run the unit tests (`src/**/*.test.js[x]`)      |
| `npm run clean` | Remove build output                             |

## What's inside

Each example lives in its own folder below [`src/`](src) and is served at the matching path (e.g. `src/todos` → `/todos`).

- **Server-side JSX with jsx-async-runtime**: what JSX renders, `this` as context, render props, intercepting JSX, Declarative Shadow DOM, unit tests
- **Streaming with jsx-async-runtime**: out-of-order and parallel loading, streaming HTML, async iterables, ReadableStreams, Mandelbrot explorer
- **Client-side apps with jsx-async-runtime**: client-side JSX, Kanban board and cinema seat booking (with and without JavaScript), social feed, async dependency tree
- **Client-side games with jsx-async-runtime**: Game of Life, maze chase game, racing game, isometric shooter, jungle platformer, flight game with a streamed landscape
- **Server-rendered websites and apps**: blog, products, planet gallery with view transitions, MDX, todos, multi-step wizard, lottery, jokes, GitHub repos, A/B testing, i18n
- **Images, JSON and other content types**: Open Graph images, SVG charts, image scaling with sharp, image upload, JSON, Server-Sent Events, chat with SSE, content negotiation, `Response` objects, XML sitemap
- **Security, errors and post-processing**: login and sessions, basic auth, signed cookies, Content Security Policy, Cap.js captcha, error handlers, prettifying HTML, extracting styles with Cheerio, head management
- **Hypermedia with HTMX**: HTMX (click to edit, active search, template fragments, infinite scroll, reactive scripting) and Fixi.js
- **JavaScript libraries and frameworks**: React, Preact, Vue, Svelte, Lit, Alpine.js, ArrowJS

The full list with descriptions is in [`src/sitemap.json`](src/sitemap.json).

## Project structure

Jeasx uses file-based routing inside `src/`:

- `[name].jsx` / `[name].js`: a route, served at `/name` (`[index].jsx` serves the folder itself)
- `[...path].jsx`: a catch-all route for all paths below the folder
- `[...guard].js(x)`: a guard that runs before every route in its folder and below (auth, redirects, request setup)
- `[404].jsx`: the page for unknown paths
- `index.js` / `index.css`: browser bundles, built with esbuild and served at the same path
- other files (components, helpers): imported by routes, not served

Server and browser build options, as well as Fastify plugins (multipart, cookies, form parsing), are configured in [`jeasx.config.js`](jeasx.config.js). Static files go in [`public/`](public).

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
