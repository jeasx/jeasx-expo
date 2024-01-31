import { requestContext } from "@fastify/request-context";
import DefaultLayout from "../Layout";

export default function Layout({
  title = "",
  description = "",
  children = [],
}) {
  const path = requestContext.get("request").urlData().path;

  return (
    <DefaultLayout
      title={title}
      description={description}
      css="/preact/index.css"
      script="/preact/index.js"
    >
      <main>
        <section>
          {children}
          {path !== "/preact" && <a href="/preact">Back to overview</a>}
        </section>
      </main>
    </DefaultLayout>
  );
}
