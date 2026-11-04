import Layout from "../Layout";

export default function () {
  return (
    <Layout
      title="Active search with HTMX and Jeasx"
      description="Search addresses as you type with HTMX, Jeasx and Nominatim."
      css="/nominatim/index.css"
      script="/nominatim/index.js"
    >
      <div class="as">
        <h1>Active search with HTMX and Jeasx</h1>
        <p>
          Implementing{" "}
          <a href="https://four.htmx.org/patterns/active-search">
            active search
          </a>{" "}
          with HTMX and Jeasx is straightforward. This example uses{" "}
          <a href="https://nominatim.org/release-docs/latest/api/Search">
            Nominatim
          </a>{" "}
          from OpenStreetMap to find addresses: the results update while you
          type, without reloading the page.
        </p>
        <div class="as-search">
          <input
            type="search"
            name="search"
            aria-label="Search addresses"
            placeholder="Brandenburg Gate, Eiffel Tower, ..."
            hx-post="./locations"
            hx-trigger="input changed delay:500ms, keyup[key=='Enter']"
            hx-target="#results"
            hx-indicator=".htmx-indicator"
            hx-sync="this:replace"
            autocomplete="off"
            autofocus
          />
          <span class="htmx-indicator">Searching…</span>
        </div>
        <p class="as-hint">
          Type at least 3 characters. Data © OpenStreetMap contributors.
        </p>
        <div id="results" aria-live="polite"></div>
      </div>
    </Layout>
  );
}
