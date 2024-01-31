import sharp from "sharp";
import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function Upload({ request, reply }) {
  if (request.method === "POST") {
    const file = await request.file();
    const format = file.fields["format"]["value"];
    reply.header("Content-Type", `image/${format}`);
    return await sharp(await file.toBuffer())
      .resize({
        width: 640,
        height: 640,
        position: "entropy",
      })
      .toFormat(format, { quality: 70 })
      .toBuffer();
  }

  return (
    <Layout title="Upload demo" css="/upload/index.css">
      <main>
        <form method="post" enctype="multipart/form-data">
          <label>
            Convert to format
            <select name="format">
              <option>avif</option>
              <option>webp</option>
            </select>
          </label>
          <label>
            Choose a picture (jpg only)
            <input type="file" name="upload" accept="jpg" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </main>
    </Layout>
  );
}
