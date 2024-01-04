import Layout from "../Layout";
import Image from "./Image";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function BlogOverview({ request }) {
  const products = (
    await (await fetch("https://dummyjson.com/products")).json()
  ).products;

  return (
    <Layout
      title="Products"
      description="Product overview"
      css="/products/overview/index.css"
    >
      <main>
        <h1>Product overview</h1>
        <section>
          {products.map(
            ({ id, title, category, price, description, thumbnail }) => (
              <article>
                <header>
                  <a href={`${id}`} aria-label="Read more">
                    <Image
                      src={thumbnail}
                      width="640"
                      height="320"
                      position="entropy"
                      alt={title}
                      immutable
                    />
                  </a>
                  <span>{category}</span>
                  <span>{price} €</span>
                </header>
                <main>
                  <h2>
                    <a href={`${id}`}>{title}</a>
                  </h2>
                  <p>{description}</p>
                </main>
                <footer>
                  <a href={`${id}`}>Read more...</a>
                </footer>
              </article>
            )
          )}
        </section>
      </main>
    </Layout>
  );
}
