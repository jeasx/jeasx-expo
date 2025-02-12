import { pathToRegexp } from "path-to-regexp";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ({ request, reply }) {
  const path = request.body["path"];
  const sensitive = request.body["sensitive"] === "on";
  const end = request.body["end"] === "on";
  const trailing = request.body["trailing"] === "on";
  const regexp = pathToRegexp(path, { sensitive, end, trailing }).regexp;
  return (
    path && (
      <table>
        <thead>
          <tr>
            <td style="width:50%;">Path</td>
            <td style="width:50%;">Regular Expression</td>
          </tr>
        </thead>
        <tr>
          <td>
            <code>{this.escape(path)}</code>
          </td>
          <td>
            <code>
              /{this.escape(regexp.source)}/{regexp.flags}
            </code>
          </td>
        </tr>
      </table>
    )
  );
}
