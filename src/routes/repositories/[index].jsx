import { escapeEntities } from "jsx-async-runtime";
import Layout from "../Layout";
/**
 * @param {import("../types").RouteProps} props
 */
export default async function Repositories({ request }) {
  const q = request.query["q"] || "jeasx";

  const repositories = (
    await (
      await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          q
        )}+in:name&sort=updated`
      )
    ).json()
  ).items.filter(({ full_name }) => full_name.includes(q));

  return (
    <Layout
      title="Search GitHub Repositories"
      description="A list of repositiories at GitHub."
      css="/repositories/index.css"
    >
      <main>
        <section>
          <h1>Search GitHub Repositories</h1>
          <form method="get">
            <input
              type="text"
              name="q"
              placeholder="Search..."
              value={escapeEntities(q)}
            />
          </form>
          <ul>
            {repositories.map(({ html_url, full_name, description }) => (
              <li>
                <a href={html_url} target="_blank" rel="noopener noreferrer">
                  {full_name}
                </a>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}
