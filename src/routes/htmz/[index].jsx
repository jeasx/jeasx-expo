import Layout from "../Layout";
import Edit from "./[edit]";
import View from "./[view]";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Htmz({ request, reply }) {
  const body = request.body || { action: "edit" };
  return (
    <Layout
      title="htmz example"
      description="Jeasx integrates easily with htmz"
      css="/wizard/index.css"
    >
      <main>
        <section>
          <h1>htmz example</h1>
          <p>
            jeasx is the perfect match for{" "}
            <a href="https://leanrada.com/htmz/" target="_blank">
              htmz
            </a>{" "}
            because it makes it easy to create routes that emit HTML fragments.
          </p>
          <p>
            htmz is a minimalist HTML microframework (166 bytes in total) for
            creating interactive and modular web user interfaces with the
            familiar simplicity of plain HTML.
          </p>
          <p>
            <b>
              In a nutshell, htmz lets you swap page fragments on request using
              vanilla HTML.
            </b>
          </p>
          {body["action"] === "edit" ? (
            <Edit request={request} reply={reply} />
          ) : (
            <View request={request} reply={reply} />
          )}
        </section>
      </main>
      <iframe
        hidden
        name="htmz"
        onload={
          /*js*/ `document.querySelector(contentWindow.location.hash||null)?.replaceWith(...contentDocument.body.childNodes)`
        }
      ></iframe>
    </Layout>
  );
}
