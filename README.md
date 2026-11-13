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

- **Dynamic websites**: planet gallery with view transitions, blog, products, MDX
- **Web applications without client-side JavaScript**: lottery, todos, jokes, GitHub repos, multi-step wizard, A/B testing
- **Hypermedia with HTMX**: HTMX (click to edit, active search, template fragments, infinite scroll, reactive scripting) and Fixi.js
- **Islands of client-side JavaScript**: Alpine.js, ArrowJS, Lit, Preact, React, Svelte, Vue
- **Streaming and Server-Sent Events**: streaming HTML, parallel and out-of-order loading, async iterables, ReadableStreams, Mandelbrot explorer, SSE, chat
- **Images, JSON and other content types**: image upload, image scaling with sharp, SVG charts, Open Graph images, JSON, `Response` objects, content negotiation, XML sitemap
- **Server-side JSX with jsx-async-runtime**: what JSX renders, render props, `this` as context, intercepting JSX, head management, i18n, Declarative Shadow DOM, unit tests
- **Client-side JSX with jsx-async-runtime**: client-side JSX, Game of Life, maze chase game, racing game, isometric shooter, jungle platformer, social feed, async dependency tree
- **Authentication and security**: basic auth, login and sessions, signed cookies, Content Security Policy, Cap.js captcha
- **Error handling and post-processing**: error handlers, prettifying HTML, extracting styles with Cheerio

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
