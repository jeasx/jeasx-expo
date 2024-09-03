import Layout from "./Layout";
import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Frontpage({}) {
  return (
    <Layout
      title="jeasx expo"
      description="Welcome to jeasx - JSX with Ease"
      css="/css/index.css"
    >
      <main class="container center">
        <h1>jeasx - expo</h1>
        <hr />
        {sitemap.map(({ title, links }) => (
          <section>
            <h2>{title}</h2>
            <div class="grid">
              {links.map(({ title, path }) => (
                <a href={path}>
                  <article>{title}</article>
                </a>
              ))}
            </div>
            <hr />
          </section>
        ))}
      </main>
    </Layout>
  );
}
