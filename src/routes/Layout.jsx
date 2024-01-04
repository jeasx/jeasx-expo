import { requestContext } from "@fastify/request-context";

export default function Layout({
  title = "",
  description = "",
  children = [],
  css = undefined,
  script = undefined,
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
          <meta name="view-transition" content="same-origin" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {css && (
            <link rel="stylesheet" href={`${css}?${process.env.BUILD_TIME}`} />
          )}
          <script
            src={`/scroll-restore/index.js?${process.env.BUILD_TIME}`}
            defer
          ></script>
          {script && (
            <script src={`${script}?${process.env.BUILD_TIME}`} defer></script>
          )}
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
