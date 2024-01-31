import Layout from "../Layout";
import Preact from "../Preact";

export default function Todos({}) {
  return (
    <Layout title="Todos" description="A simple todo list">
      <h1>Todos</h1>
      <Preact component="Clock" />
      <Preact component="Todos" />
    </Layout>
  );
}
