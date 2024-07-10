import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Context({ request, reply }) {
  this.theme = request.query["theme"] || "light";

  return (
    <Layout
      title="Context object"
      description="Use 'this' to avoid prop drilling"
      css="/preact/index.css"
    >
      <main>
        <section>
          <h1>Avoid prop drilling via 'this'</h1>
          <p>
            In Jeasx you can use 'this' to provide data to subcomponents without
            prop drilling.
          </p>
          <p>
            You should use this with care, but it is a handy feature for global
            state like themes.
          </p>
          <p>Have a look at the source to see how it works.</p>
          <hr />
          <Subcomponent />
        </section>
      </main>
    </Layout>
  );
}

function Subcomponent() {
  return (
    <>
      <div style="display: flex; justify-content: space-evenly">
        <a
          href="?theme=light"
          style={{ "font-weight": this.theme === "light" ? "bold" : "normal" }}
        >
          Light
        </a>
        <a
          href="?theme=dark"
          style={{ "font-weight": this.theme === "dark" ? "bold" : "normal" }}
        >
          Dark
        </a>
      </div>
      <div
        style={{
          "background-color": this.theme === "dark" ? "black" : "white",
        }}
      >
        <Subsubcomponent />
      </div>
    </>
  );
}

function Subsubcomponent() {
  return (
    <div
      style={{
        color: this.theme === "dark" ? "white" : "black",
        "text-align": "center",
      }}
    >
      {this.theme}
    </div>
  );
}
