import { render } from "preact";
import Components from "./components/$index";

function init(components) {
  document.querySelectorAll("[data-component]").forEach((el) => {
    const Component = components[el.getAttribute("data-component")];
    const props = el.hasAttribute("data-props")
      ? JSON.parse(el.getAttribute("data-props"))
      : {};
    if (Component) {
      // Using render instead of hydrate to avoid hydration mismatches.
      // For single components it is fast und avoids lots of headaches.
      render(<Component {...props} />, el);
    }
  });
}

init(Components);
