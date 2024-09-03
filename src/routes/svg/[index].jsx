import { escapeEntities } from "jsx-async-runtime";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function Upload({ request, reply }) {
  return (
    <Layout title="SVG demo" css="/css/index.css">
      <main class="container">
        <form method="post">
          <fieldset>
            <label>
              Enter some text
              <input
                type="text"
                name="text"
                value={escapeEntities(request.body?.["text"])}
                autofocus
              />
            </label>
          </fieldset>
          <input type="submit" value="Submit" />
          {request.body?.["text"] && (
            <img
              src={`/svg/logo.svg?text=${encodeURIComponent(
                request.body?.["text"]
              )}`}
              width="400"
            />
          )}
        </form>
      </main>
    </Layout>
  );
}
