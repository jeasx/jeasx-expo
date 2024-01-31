import { requestContext } from "@fastify/request-context";
import DefaultLayout from "../Layout";
import Header from "./components/Header";

export default function Layout({ title = "", data = {}, children = [] }) {
  const path = requestContext.get("request").urlData().path;

  return (
    <DefaultLayout
      title={title}
      css="/wizard/index.css"
      script="/wizard/index.js"
    >
      <main>
        <section>
          <Header path={path} data={data} />
          {children}
        </section>
      </main>
    </DefaultLayout>
  );
}
