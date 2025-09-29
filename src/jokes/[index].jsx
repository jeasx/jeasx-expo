import Layout from "../Layout";
import jokes from "./jokes";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  const body = request.body || {};
  const category = body["category"];
  const counter = Number(body["counter"] || request.cookies["counter"] || "3");
  const data = category ? jokes(category, counter) : [];
  reply.setCookie("counter", String(counter), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });

  return (
    <Layout title="Jokes" description="Some funny jokes">
      <h1 class="center">Jokes</h1>
      <form method="post">
        <fieldset class="grid">
          <button
            class="secondary"
            name="counter"
            value={counter - 1}
            disabled={counter === 1}
          >
            -
          </button>
          <button
            class="secondary"
            name="counter"
            value={counter + 1}
            disabled={counter === 5}
          >
            +
          </button>
        </fieldset>
        <fieldset class="grid">
          <button name="category" value="programming">
            Tell me {counter} nerd {counter === 1 ? "joke" : "jokes"}
          </button>
        </fieldset>
        <fieldset class="grid">
          <button name="category" value="general">
            Tell me {counter} {counter === 1 ? "pun" : "puns"}
          </button>
        </fieldset>
      </form>
      {data.length > 0 && (
        <ul>
          {data.map((joke) => (
            <li>{joke}</li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
