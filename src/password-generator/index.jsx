import { jsxToString } from "jsx-async-runtime";
import PasswordList from "./PasswordList";
import { generatePassword } from "./generate";

const SET_ALPHABET_SIZES = { lower: 26, upper: 26, digits: 10, symbols: 24 };

/** Reads the controls, generates fresh passwords and renders them in the browser. */
async function render(form) {
  const length = Number(new FormData(form).get("length"));
  const sets = /** @type {string[]} */ (new FormData(form).getAll("sets"));
  const container = document.getElementById("passwords");
  // Keep the length readout and the slider fill level in sync while dragging.
  /** @type {HTMLOutputElement} */
  const output = document.querySelector("output[for='length']");
  output.value = String(length);
  const range = form.querySelector("input[name='length']");
  range.style.setProperty("--fill", `${((length - 8) / 56) * 100}%`);
  if (sets.length === 0) {
    container.innerHTML = "<p>Pick at least one character set.</p>";
    return;
  }
  const passwords = Array.from({ length: 5 }, () => generatePassword({ length, sets }));
  const alphabetSize = sets.reduce((sum, set) => sum + SET_ALPHABET_SIZES[set], 0);
  // Render the JSX component to HTML right in the browser.
  container.innerHTML = await jsxToString(
    <PasswordList passwords={passwords} length={length} alphabetSize={alphabetSize} />,
  );
}

// Any control change (slider, checkboxes) refreshes the passwords immediately.
document.addEventListener("input", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement) {
    const form = target.closest("#password-form");
    if (form instanceof HTMLFormElement) {
      render(form);
    }
  }
});

// Submitting (Enter or Enter on the Roll button) also rolls with fresh randomness.
document.addEventListener("submit", (event) => {
  if (event.target instanceof HTMLFormElement && event.target.id === "password-form") {
    event.preventDefault();
    render(event.target);
  }
});

// Copy a password on button click, even after the list has been re-rendered.
document.addEventListener("click", async (event) => {
  if (!(event.target instanceof HTMLElement)) {
    return;
  }
  const button = event.target.closest("button[data-copy]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }
  await navigator.clipboard.writeText(button.dataset.copy);
  button.textContent = "Copied!";
  setTimeout(() => (button.textContent = "Copy"), 1500);
});
