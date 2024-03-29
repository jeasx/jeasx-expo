import Layout from "../../Layout";

/**
 * @param {import("../../types").RouteProps} props
 */
export default function Authorization({ request, reply }) {
  const authorization = request.headers["authorization"];
  if (
    authorization !== `Basic ${Buffer.from("demo:demo").toString("base64")}`
  ) {
    reply.header("WWW-Authenticate", 'Basic realm="Restricted Area');
    reply.status(401);
    return (
      <Layout title="Error 401">
        <h1>Error 401</h1>
        <p>You are not allowed to view this page!</p>
      </Layout>
    );
  }
}
