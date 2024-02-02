import { escapeEntities } from "jsx-async-runtime";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function Upload({ request, reply }) {
  return (
    <Layout title="SVG demo" css="/upload/index.css">
      <main>
        <form method="post">
          <label>
            Enter some text
            <input
              type="text"
              name="text"
              value={escapeEntities(request.body?.["text"])}
              autofocus
            />
          </label>
          <button type="submit">Submit</button>
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
