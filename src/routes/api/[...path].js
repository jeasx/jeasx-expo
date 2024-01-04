/**
 * @param {import("../types").RouteProps} props
 */
export default function Status({ request, reply }) {
  const { url, query, method, headers, body } = request;
  reply.header("Content-Type", "application/json");
  return {
    url,
    query,
    method,
    headers,
    body,
  };
}
