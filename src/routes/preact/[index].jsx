import Layout from "../Layout";
import Preact from "./Preact";

export default function Jokes() {
  return (
    <Layout
      title="Jokes"
      description="Tell me some jokes"
      css="/css/index.css"
      script="/preact/index.js"
    >
      <main class="container">
        <section>
          <h1 class="center">Jokes</h1>
        </section>
        <section>
          <Preact component="Clock" />
        </section>
        <section>
          <Preact component="Jokes" api="/jokes/api" initial={3} />
        </section>
      </main>
    </Layout>
  );
}
