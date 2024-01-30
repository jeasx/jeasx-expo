import Layout from "../Layout";
import Edit from "./[edit]";
import View from "./[view]";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Htmx({ request, reply }) {
  const body = request.body || { action: "edit" };
  return (
    <Layout
      title="HTMX example"
      description="jeasx integrates easily with HTMX"
      css="/wizard/index.css"
      script="https://unpkg.com/htmx.org"
    >
      <main>
        <section>
          <h1>HTMX example</h1>
          <p>
            jeasx is the perfect match for
            <a href="https://htmx.org/" target="_blank">
              HTMX
            </a>
            because it makes it easy to create routes that emit HTML fragments.
            This example works with and without JavaScript.
          </p>
          <p>
            <i>Generated at: {new Date().toISOString()}</i>
          </p>
          {body["action"] === "edit" ? (
            <Edit request={request} reply={reply} />
          ) : (
            <View request={request} reply={reply} />
          )}
        </section>
      </main>
    </Layout>
  );
}
