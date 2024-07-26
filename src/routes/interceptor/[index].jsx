import { jsxToString } from "jsx-async-runtime";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function JSXInterceptor({ request }) {
  const removeStyles = request.query["styles"] === "off";

  return (
    <Layout
      title="Interceptor demo"
      description="Overriding #jsxToString allows to modify existing jsx components"
      css="/preact/index.css"
    >
      <main>
        <section>
          <h1>JSX interception</h1>
          <p>
            The underlying{" "}
            <a
              href="https://github.com/jeasx/jsx-async-runtime"
              target="_blank"
            >
              jsx-async-runtime
            </a>{" "}
            allows you to intercept the rendering of jsx elements. This allows
            you to modify or replace existing markup.
          </p>
          {removeStyles ? (
            <StyleCleaner>
              <ThirdPartyComponent />
              <a href="?styles=on">Turn inline styles on</a>
            </StyleCleaner>
          ) : (
            <>
              <ThirdPartyComponent />
              <a href="?styles=off">Turn inline styles off</a>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
}

function StyleCleaner({ children = [] }) {
  this.jsxToString = (jsxElement) => {
    if (jsxElement?.props?.style) {
      delete jsxElement.props.style;
    }
    return jsxToString.call(this, jsxElement);
  };
  return <>{children}</>;
}

function ThirdPartyComponent() {
  return (
    <div style="border: 4px dashed black;">
      {["red", "green", "blue", "orange"].map((color) => (
        <>
          <span style={`background-color: ${color}`}>{color}</span>
          &nbsp;
        </>
      ))}
    </div>
  );
}
