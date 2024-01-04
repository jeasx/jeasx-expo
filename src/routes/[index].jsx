import Layout from "./Layout";
import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Frontpage({}) {
  return (
    <Layout
      title="jeasx showcases"
      description="Welcome to jeasx - JSX with Ease"
      css="/frontpage/index.css"
    >
      <header>
        <h1>jeasx - JSX with Ease</h1>
      </header>
      <main>
        <section>
          {sitemap.map(({ type, path, title }) => {
            switch (type) {
              case "headline":
                return <h2>{title}</h2>;
              case "link":
                return <a href={path}>{title}</a>;
            }
          })}
        </section>
      </main>
    </Layout>
  );
}
