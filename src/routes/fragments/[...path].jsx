import Layout from "../Layout";

export default async function Fragments({ request }) {
  const id = request.query["id"] || 1;

  return (
    <FragmentLayout>
      <Fragment>
        <h1>Template Fragments</h1>
        <p>
          Creating routes that emit HTML fragments is straightforward in Jeasx
          which makes it a perfect match for{" "}
          <a href="https://htmx.org/" target="_blank">
            HTMX
          </a>
          . Sometimes, however, creating many routes by hand can be tedious. The
          concept of{" "}
          <a href="https://htmx.org/essays/template-fragments/" target="_blank">
            template fragments
          </a>{" "}
          is a nice idea and can be easily implemented in Jeasx using just a few
          lines of custom code.
        </p>
      </Fragment>
      <Fragment name="product">
        <form>
          <h2>Product-Browser</h2>
          <input
            name="id"
            type="range"
            value={id}
            min={1}
            max={20}
            hx-get="./~product"
            hx-swap="outerHTML"
            hx-target="closest form"
          />
          <Product id={id} />
        </form>
      </Fragment>
      <Fragment name="time">
        <p hx-get="./~time" hx-trigger="every 1s" hx-swap="outerHTML">
          {new Date().toTimeString()}
        </p>
      </Fragment>
    </FragmentLayout>
  );
}

function FragmentLayout({ children = [] }) {
  return this.request.path.includes("~") ? (
    <>{children}</>
  ) : (
    <Layout script="/htmx/index.js">{children}</Layout>
  );
}

function Fragment({ name = "", children = [] }) {
  return !this.request.path.includes("~") ||
    (name && this.request.path.endsWith(`~${name}`)) ? (
    <>{children}</>
  ) : null;
}

async function Product({ id }) {
  const product = await (
    await fetch(`https://dummyjson.com/products/${id}`)
  ).json();

  return (
    <article>
      <header>
        <h3>{product.title}</h3>
        <b>{product.price} €</b>
      </header>
      <img
        src={product.thumbnail}
        alt={product.title}
        width="300"
        height="300"
      />
      <p>{product.description}</p>
    </article>
  );
}
