import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Lit({ request, reply }) {
  return (
    <Layout
      title="jeasx with Lit"
      description="jeasx integrates easily with Lit"
      css="/css/index.css"
      script="/lit/index.js"
    >
      <main class="container">
        <section class="center">
          <h1>Lit example</h1>
          <p>
            jeasx works smoothly with{" "}
            <a href="https://lit.dev/" target="_blank">
              Lit.
            </a>
          </p>
        </section>
        <section>
          <logo-animation />
          <list-animation />
        </section>
      </main>
    </Layout>
  );
}
