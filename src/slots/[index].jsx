import { html } from "jsx-async-runtime";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.js";
import { pick } from "../jokes/jokes";
import Layout from "../Layout";

const SNIPPET = `function Card({ accent, media, header, footer = <small>No footer</small>, children }) {
  return (
    <article class="sl-card" style={\`--accent: \${accent}\`}>
      {media && <figure>{media}</figure>}
      {header && <header>{header}</header>}
      <div class="sl-content">{children}</div>
      <footer>{footer}</footer>
    </article>
  );
}

// No footer given, so the default renders.
<Card
  accent="#a855f7"
  media={<span class="sl-avatar">AL</span>}
  header={
    <>
      <h3>Ada Lovelace</h3>
      <span class="sl-kicker">Analytical engineer</span>
    </>
  }
>
  <dl class="sl-stats">…</dl>
</Card>`;

const RENDER_PROP_SNIPPET = `async function Jokes({ category, amount, children }) {
  const data = await loadJokes(category, amount);
  return children(data);
}

<Jokes category="programming" amount={3}>
  {(items) => <ul>{items.map((joke) => <li>{joke.setup}</li>)}</ul>}
</Jokes>`;

export default function () {
  return (
    <Layout
      title="Component slots and render props"
      description="Fill several slots of a component with JSX, or pass a function to let an async component load the data."
      css="/slots/index.css"
    >
      <h1>Component slots and render props</h1>
      <p class="lead">
        A component can offer more than one place to fill in content. Besides <code>children</code>,
        any prop can hold JSX, so a card can have named slots for its header, footer and media.
      </p>
      <p>
        A slot is an ordinary prop: leave it out to skip it, or give it a default value as a
        fallback. If a slot needs data from the component, pass a function instead: a{" "}
        <a href="#render-props">render prop</a>.
      </p>
      <pre class="language-jsx">
        <code class="language-jsx">
          {html(Prism.highlight(SNIPPET, Prism.languages.jsx, "jsx"))}
        </code>
      </pre>

      <h2>One component, three cards</h2>
      <div class="sl-grid">
        {/* header, footer and children: no media slot. */}
        <Card
          accent="#22d3ee"
          header={
            <>
              <span class="sl-kicker">Release</span>
              <h3>Jeasx 3.0</h3>
            </>
          }
          footer={<a href="/slots#render-props">Read the changelog →</a>}
        >
          <ul class="sl-list">
            <li>Faster streaming</li>
            <li>Smaller bundles</li>
            <li>Async iterables everywhere</li>
          </ul>
        </Card>

        {/* media slot filled, footer left out: the default fallback renders. */}
        <Card
          accent="#a855f7"
          media={<span class="sl-avatar">AL</span>}
          header={
            <>
              <h3>Ada Lovelace</h3>
              <span class="sl-kicker">Analytical engineer</span>
            </>
          }
        >
          <dl class="sl-stats">
            <div>
              <dt>Commits</dt>
              <dd>1,843</dd>
            </div>
            <div>
              <dt>Reviews</dt>
              <dd>412</dd>
            </div>
            <div>
              <dt>Streak</dt>
              <dd>37 d</dd>
            </div>
          </dl>
        </Card>

        {/* Every slot filled, each with several elements in a fragment. */}
        <Card
          accent="#f59e0b"
          media={<span class="sl-icon">⚡</span>}
          header={
            <>
              <span class="badge badge-success">New</span>
              <h3>Instant previews</h3>
            </>
          }
          footer={
            <>
              <button type="button" class="sl-button">
                Try it
              </button>
              <button type="button" class="sl-button sl-ghost">
                Later
              </button>
            </>
          }
        >
          <p>Slots can hold anything: text, lists, buttons or other components.</p>
        </Card>
      </div>

      <h2 id="render-props">Render props</h2>
      <p>
        A single function child works as a <em>render prop</em>: the async component loads the data,
        and the caller decides how it looks. The same <code>&lt;Jokes&gt;</code> loader is used
        twice below with different markup. <a href="">Reload</a> for new jokes.
      </p>
      <pre class="language-jsx">
        <code class="language-jsx">
          {html(Prism.highlight(RENDER_PROP_SNIPPET, Prism.languages.jsx, "jsx"))}
        </code>
      </pre>

      <div class="joke-columns">
        <section>
          <h3>As a list</h3>
          <Jokes category="programming" amount={3}>
            {(items) => (
              <ul class="joke-list">
                {items.map((joke) => (
                  <li>
                    {joke.setup} <em>{joke.punchline}</em>
                  </li>
                ))}
              </ul>
            )}
          </Jokes>
        </section>
        <section>
          <h3>As cards</h3>
          <Jokes category="general" amount={2}>
            {(items) => (
              <div class="joke-grid">
                {items.map((joke, index) => (
                  <div class="joke-card">
                    <strong>Joke #{index + 1}</strong>
                    <p>{joke.setup}</p>
                    <p>
                      <em>{joke.punchline}</em>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Jokes>
        </section>
      </div>
    </Layout>
  );
}

/**
 * A card with four slots: `media` and `header` (optional), `footer` (with a default)
 * and `children`. The accent color is a plain prop, not a slot.
 *
 * @param {{ accent: string, media?: JSX.Element, header?: JSX.Element, footer?: JSX.Element,
 *   children: JSX.Element }} props
 */
function Card({ accent, media, header, footer = <small>No footer</small>, children }) {
  return (
    <article class="sl-card" style={`--accent: ${accent}`}>
      {media && <figure>{media}</figure>}
      {header && <header>{header}</header>}
      <div class="sl-content">{children}</div>
      <footer>{footer}</footer>
    </article>
  );
}

/** @typedef {import("../jokes/state").Joke} Joke */

/**
 * Loads the data and calls the render prop with it.
 *
 * @param {{ category: string, amount: number, children: (jokes: Joke[]) => JSX.Element }} props
 */
async function Jokes({ category, amount, children }) {
  const data = await loadJokes(category, amount);
  return children(data);
}

/**
 * Simulates a slow API call.
 *
 * @param {string} category
 * @param {number} amount
 * @returns {Promise<Joke[]>}
 */
async function loadJokes(category, amount) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return pick(category, amount);
}
