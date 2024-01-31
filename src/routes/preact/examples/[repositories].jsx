import Layout from "../Layout";
import Preact from "../Preact";

export default async function Repositories() {
  return (
    <Layout
      title="GitHub Repositories"
      description="Query GitHub for jeasx repositories"
    >
      <h1>jeasx repositories</h1>
      <Preact component="Repositories" />
    </Layout>
  );
}
