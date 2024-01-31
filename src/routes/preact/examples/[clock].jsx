import Layout from "../Layout";
import Preact from "../Preact";

export default function Clock() {
  return (
    <Layout title="Clock" description="A simple clock">
      <h1>Clock</h1>
      <Preact component="Clock" />
    </Layout>
  );
}
