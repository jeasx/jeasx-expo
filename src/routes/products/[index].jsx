import Layout from "../Layout";
import Image from "./Image";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function BlogOverview({ request }) {
  const { products } = await (
    await fetch("https://dummyjson.com/products")
  ).json();

  return (
    <Layout
      title="Products"
      description="Product overview"
      css="/css/index.css"
    >
      <main class="content center">
        <h1>Product overview</h1>
        <section>
          <div class="grid">
            {products.map(
              (
                { id, title, category, price, description, thumbnail },
                index
              ) => (
                <>
                  {index % 3 === 0 ? `</div><div class="grid">` : ""}
                  <article>
                    <header>
                      <Image
                        src={thumbnail}
                        width="640"
                        height="320"
                        position="entropy"
                        alt={title}
                        immutable
                      />
                      <hr />
                      <b>{price} €</b>
                    </header>
                    <main>
                      <h3>
                        <a href={`${id}`}>{title}</a>
                      </h3>
                      <p>{description}</p>
                    </main>
                  </article>
                </>
              )
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
