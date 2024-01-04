import Layout from "../Layout";
import jokes from "./jokes";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Jokes({ request, reply }) {
  const body = request.body || {};
  const category = body["category"];
  const counter = Number(body["counter"] || request.cookies["counter"] || "3");
  const data = category ? jokes(category, counter) : [];
  reply.setCookie("counter", String(counter));

  return (
    <Layout title="Jokes" description="Some funny jokes" css="/jokes/index.css">
      <main>
        <section>
          <h1>Jokes</h1>
          <form method="post">
            <div class="counter">
              <button
                class="counter-button"
                name="counter"
                value={counter - 1}
                disabled={counter === 1}
              >
                -
              </button>
              <button
                class="counter-button"
                name="counter"
                value={counter + 1}
                disabled={counter === 5}
              >
                +
              </button>
              <button
                class="counter-button"
                name="category"
                value="programming"
              >
                Tell me {counter} nerd {counter === 1 ? "joke" : "jokes"}
              </button>
              <button class="counter-button" name="category" value="general">
                Tell me {counter} {counter === 1 ? "pun" : "puns"}
              </button>
            </div>
            {data.length > 0 && (
              <ul id="jokes">
                {data.map((joke) => (
                  <li>{joke}</li>
                ))}
              </ul>
            )}
          </form>
        </section>
      </main>
    </Layout>
  );
}
