import Layout from "../Layout";
import Preact from "../Preact";

export default function Lottery({}) {
  return (
    <Layout title="Lottery" description="A fake lottery">
      <h1>Lottery // 6 out of 49</h1>
      <Preact component="Lottery" />
    </Layout>
  );
}
