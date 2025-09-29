import DefaultLayout from "../Layout";
import Header from "./components/Header";

/**
 * @this {import("../types").ThisContext}
 */
export default function Layout({
  title = "",
  data = {},
  children = undefined,
}) {
  return (
    <DefaultLayout title={title} script="/wizard/index.js">
      <Header path={this.request.path} data={data} />
      {children}
    </DefaultLayout>
  );
}
