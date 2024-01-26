export default function Layout({ title, description, children = [] }) {
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <base href="/" />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="view-transition" content="same-origin" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href={`/todos/index.css?${process.env.BUILD_TIME}`}
          />
          <script
            src={`/todos/index.js?${process.env.BUILD_TIME}`}
            defer
          ></script>
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
