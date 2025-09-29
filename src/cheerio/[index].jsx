import * as prettier from "prettier";
import Layout from "../Layout";
import extractStyles from "./extractStyles";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  if (request.query["text"] === "plain") {
    reply.header("content-type", "text/plain; charset=utf-8");
  }

  this.responseHandler = async (payload) => {
    return typeof payload === "string"
      ? await prettier.format(
          request.query["source"] === "raw" ? payload : extractStyles(payload),
          {
            parser: "html",
          }
        )
      : payload;
  };

  return (
    <Layout title="Extract inline styles with Cheerio">
      <div style="--pico-h1-color:orange; text-align: center">
        <h1 class="headline">Extract inline styles with cheerio.js</h1>
      </div>
      <p style="color:green; text-align:center">
        Jeasx allows you to post-process the resulting HTML output via a
        response-handler. Have a look at the source to see how things are wired
        up. This is an example for how to use{" "}
        <a href="https://cheerio.js.org" target="_blank">
          cheerio.js
        </a>{" "}
        to extract styles from resulting HTML and insert them to head.
      </p>
      <div style="display: flex; flex-direction: row; gap: 1rem; justify-content: center;">
        <IFrame title="Original source" src="?text=plain&source=raw" />
        <IFrame title="Rewritten markup" src="?text=plain" />
      </div>
    </Layout>
  );
}

function IFrame({ title, src }) {
  return (
    <>
      <style>{
        /*css*/ `
        .iframe-wrapper {
          width: 50%;
        }
      `
      }</style>
      <div class="iframe-wrapper">
        <h3 style="text-align:center">{title}</h3>
        <iframe
          src={src}
          style="width: 100%; height: 300px; border: 1px solid lightgray;"
        ></iframe>
      </div>
    </>
  );
}
