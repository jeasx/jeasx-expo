import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Sitemap({ reply }) {
  reply.header("content-type", "text/xml; charset=utf-8");
  return (
    <>
      {`<?xml version="1.0" encoding="UTF-8"?>`}
      <urlset>
        {sitemap
          .filter(
            ({ path, type }) =>
              type === "link" && path.startsWith("/") && path !== "/sitemap.xml"
          )
          .map(({ path }) => (
            <url>
              <loc>https://showcases.jeasx.dev{path}</loc>
            </url>
          ))}
      </urlset>
    </>
  );
}
