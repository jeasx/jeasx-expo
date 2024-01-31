import Layout from "../Layout";
import Preact from "../Preact";

export default function Jokes() {
  return (
    <Layout title="Jokes" description="Tell me some jokes">
      <h1>Jokes</h1>
      <Preact component="Jokes" api="/jokes/api" initial={3} />
    </Layout>
  );
}
