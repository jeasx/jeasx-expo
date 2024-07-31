/**
 * @this {import("./types").RouteProps}
 */
export default function Layout({
  title = "",
  description = "",
  children = [],
  css = undefined,
  script = undefined,
}) {
  const path = this.request.urlData().path;
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta
            http-equiv="Content-Security-Policy"
            content="default-src 'none'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'none'; form-action 'self'; base-uri 'self'; connect-src 'self'; frame-src 'self';"
          />
          <meta http-equiv="Referrer-Policy" content="same-origin" />
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
        <body>
          {path !== "/" && (
            <>
              <a
                href="/"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  color: "#999999",
                  "text-align": "left",
                  "text-decoration": "underline",
                  "font-weight": "bold",
                  "font-size": "0.8rem",
                }}
              >
                &laquo; Back
              </a>
              <a
                href={`https://github.com/jeasx/jeasx-expo/tree/main/src/routes/${
                  path.split("/")[1]
                }`}
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "calc(100vw - 6em)",
                  color: "#999999",
                  "text-align": "left",
                  "text-decoration": "underline",
                  "font-weight": "bold",
                  "font-size": "0.8rem",
                }}
              >
                Source &raquo;
              </a>
            </>
          )}
          {children}
        </body>
      </html>
    </>
  );
}
