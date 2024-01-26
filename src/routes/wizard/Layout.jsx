import { requestContext } from "@fastify/request-context";
import Header from "./components/Header";

export default function Layout({ title = "", data = {}, children = [] }) {
  const path = requestContext.get("request").urlData().path;

  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="de">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="description" content="Jeasx" />
          <meta name="view-transition" content="same-origin" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href={`/wizard/index.css?${process.env.BUILD_TIME}`}
          />
          <script
            src={`/wizard/index.js?${process.env.BUILD_TIME}`}
            defer
          ></script>
          <title>{title}</title>
        </head>
        <body>
          <main>
            <section>
              <Header path={path} data={data} />
              {children}
            </section>
          </main>
        </body>
      </html>
    </>
  );
}
