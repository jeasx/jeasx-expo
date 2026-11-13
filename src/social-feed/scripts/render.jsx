import { jsxToString } from "jsx-async-runtime";
import { PEOPLE } from "../feed";
import Post from "../Post";
import { Activity, Contacts, Feeds } from "../Sidebar";
import { state, visible } from "./state";

const list = document.getElementById("posts");
const newPosts = document.getElementById("new-posts");

/**
 * Renders JSX to a DOM element.
 *
 * @param {JSX.Element} jsx
 */
async function toElement(jsx) {
  const template = document.createElement("template");
  template.innerHTML = await jsxToString(jsx);
  return /** @type {HTMLElement} */ (template.content.firstElementChild);
}

/**
 * Renders a single post again and swaps it in, keeping a half-written comment.
 *
 * @param {any} post
 */
export async function update(post) {
  const old = document.getElementById(`post-${post.id}`);
  if (!old) {
    return;
  }
  const draft = /** @type {HTMLInputElement} */ (old.querySelector(".reply input"));
  const focused = document.activeElement === draft;
  const element = await toElement(<Post post={post} />);
  const input = /** @type {HTMLInputElement} */ (element.querySelector(".reply input"));
  input.value = draft.value;
  old.replaceWith(element);
  if (focused) {
    input.focus();
  }
}

/** Renders all posts of the active feed. */
export async function renderList() {
  list.innerHTML = await jsxToString(
    <>
      {state.posts.filter(visible).map((post) => (
        <Post post={post} />
      ))}
    </>,
  );
}

export async function renderFeeds() {
  document
    .getElementById("feeds")
    .replaceWith(await toElement(<Feeds active={state.filter} counts={state.unread} />));
}

export async function renderContacts() {
  document.getElementById("contacts").innerHTML = await jsxToString(
    <Contacts people={PEOPLE} online={state.online} />,
  );
}

/** Shows or hides the "new posts" button. */
export function renderBanner() {
  const count = state.pending.filter(visible).length;
  newPosts.hidden = count === 0;
  newPosts.textContent = `↑ ${count} new post${count > 1 ? "s" : ""}`;
}

/**
 * Adds an entry to the live activity.
 *
 * @param {string} entry
 */
export async function log(entry) {
  state.activity = [entry, ...state.activity].slice(0, 6);
  document.getElementById("activity").innerHTML = await jsxToString(
    <Activity entries={state.activity} />,
  );
}

/** Shows the waiting posts at the top of the feed. */
export async function showPending() {
  const fresh = state.pending;
  state.pending = [];
  state.posts = [...fresh, ...state.posts].slice(0, 50);
  for (const post of fresh.filter(visible).reverse()) {
    list.prepend(await toElement(<Post post={post} fresh />));
  }
  renderBanner();
}
