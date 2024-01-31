import Layout from "../Layout";
import Preact from "./Preact";

export default function Jokes() {
  return (
    <Layout
      title="Jokes"
      description="Tell me some jokes"
      css="/preact/index.css"
      script="/preact/index.js"
    >
      <main>
        <section>
          <h1>Jokes</h1>
          <Preact component="Clock" />
          <Preact component="Jokes" api="/jokes/api" initial={3} />
        </section>
      </main>
    </Layout>
  );
}
