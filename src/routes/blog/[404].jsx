import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function PageNotFound({ request }) {
  return (
    <Layout title="Page not found" css="/404/index.css">
      <main>
        <section>
          <h1>Error 404</h1>
          <p>
            The page you are looking for was moved, removed or might never
            existed.
          </p>
          <a href="/blog">Go to homepage</a>
        </section>
      </main>
    </Layout>
  );
}
