import Layout from "./Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Preact({}) {
  return (
    <Layout
      title="jeasx-preact"
      description="Some examples which show how to use preact with jeasx."
    >
      <h1>jeasx-preact</h1>
      <p>Some examples which show how to use preact with jeasx.</p>
      <p>
        <a href="examples/clock">Clock</a>
        <a href="examples/jokes">Jokes</a>
        <a href="examples/lottery">Lottery</a>
        <a href="examples/repositories">Repositories</a>
        <a href="examples/todos">Todos</a>
      </p>
    </Layout>
  );
}
