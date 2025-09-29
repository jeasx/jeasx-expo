import Layout from "../Layout";
import Image from "../sharp/Image";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ({ request, reply }) {
  const id = request.path.substring(request.route.lastIndexOf("/") + 1);
  const product = await (
    await fetch(`https://dummyjson.com/product/${id}`)
  ).json();

  if (product.message) {
    reply.status(404);
    return;
  }

  return (
    <Layout
      title={product.title}
      description={product.description}
      robots="noindex,nofollow"
    >
      <article class="center">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        {product.images.map((image) => (
          <Image
            src={image}
            alt={product.title}
            position="entropy"
            immutable
            loading="lazy"
            width="200"
            height="200"
          />
        ))}
      </article>
      <section class="center">
        <a href="..">Back to overview</a>
      </section>
    </Layout>
  );
}
