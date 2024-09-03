import { escapeEntities } from "jsx-async-runtime";
import Layout from "../Layout";
import data from "./data.json";

/**
 * @param {import("../types").RouteProps} props
 */
export default function BlogIndex({ request, reply }) {
  const posts = request.cookies["posts"]
    ? JSON.parse(request.cookies["posts"])
    : data;
  reply.setCookie("posts", JSON.stringify(posts));

  return (
    <Layout title="Blog" css="/css/index.css">
      <main class="container">
        <section class="center">
          <h1>Blog posts</h1>
        </section>
        <section class="center">
          <a href="/blog/post">Submit New Post</a>
          <br />
          (Login: demo/demo)
        </section>
        <section>
          {posts.map(({ slug, date, author, title }) => (
            <article>
              <header>
                <time>
                  {new Date(date).toLocaleDateString("en-EN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </header>
              <main>
                <h2>
                  <a href={slug}>{escapeEntities(title)}</a>
                </h2>
              </main>
              <footer>{author}</footer>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
