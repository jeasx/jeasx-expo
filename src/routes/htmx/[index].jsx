import Layout from "../Layout";
import View from "./[view]";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Htmx({ request, reply }) {
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
          </p>
          <View request={request} reply={reply} />
        </section>
      </main>
    </Layout>
  );
}
