import DefaultLayout from "../Layout";
import Header from "./components/Header";

/**
 * @this {import("../types").RouteProps}
 */
export default function Layout({ title = "", data = {}, children = [] }) {
  const path = this.request.urlData().path;

  return (
    <DefaultLayout title={title} css="/css/index.css" script="/wizard/index.js">
      <main class="container">
        <section>
          <Header path={path} data={data} />
          {children}
        </section>
      </main>
    </DefaultLayout>
  );
}
