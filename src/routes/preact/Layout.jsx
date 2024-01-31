import { requestContext } from "@fastify/request-context";

export default function Layout({
  title = "",
  description = "",
  children = [],
}) {
  const path = requestContext.get("request").urlData().path;
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href={`/preact/index.css?${process.env.BUILD_TIME}`}
          />
          <script
            src={`/preact/index.js?${process.env.BUILD_TIME}`}
            defer
          ></script>
          <title>{title}</title>
        </head>
        <body>
          <main>
            <section>
              {children}
              {path !== "/preact" && <a href="/preact">Back to overview</a>}
            </section>
          </main>
        </body>
      </html>
    </>
  );
}
