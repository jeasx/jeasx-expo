import { escapeEntities } from "jsx-async-runtime";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function BlogDetail({ request, reply }) {
  const slug = request.urlData().path.split("/").slice(2).join("");
  const blog = JSON.parse(request.cookies["posts"]).find(
    (post) => post.slug === slug
  );
  if (!blog) {
    reply.status(404);
    return;
  }

  return (
    <Layout title={blog.title}>
      <article>
        <header>
          <time>
            {new Date(blog.date).toLocaleDateString("en-EN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </header>
        <main>
          <h1>{escapeEntities(blog.title)}</h1>
          <p>{escapeEntities(blog.description)}</p>
          <p>{escapeEntities(blog.body)}</p>
        </main>
      </article>
      <a href="..">Back to overview</a>
    </Layout>
  );
}
