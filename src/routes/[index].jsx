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
      css="/frontpage/index.css"
    >
      <header>
        <h1>jeasx - expo</h1>
      </header>
      <main>
        <section>
          {sitemap.map(({ type, path, title }) => {
            switch (type) {
              case "headline":
                return <h2>{title}</h2>;
              case "link":
                return (
                  <a
                    href={path}
                    target={path.startsWith("https://") ? "_blank" : undefined}
                  >
                    {title}
                    {path.startsWith("https://") && (
                      <img
                        src="/icons/external.svg"
                        width="16"
                        height="16"
                        alt="External link"
                      />
                    )}
                  </a>
                );
            }
          })}
        </section>
      </main>
    </Layout>
  );
}
