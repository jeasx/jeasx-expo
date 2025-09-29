import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ({}) {
  return (
    <Layout title="Upload and image scaling">
      <form action="./image" method="post" enctype="multipart/form-data">
        <label>
          Convert to format
          <select name="format">
            <option>avif</option>
            <option>webp</option>
          </select>
        </label>
        <label>
          Resize to
          <select name="size">
            <option>160</option>
            <option>320</option>
            <option>640</option>
          </select>
        </label>
        <label>
          Rotate
          <select name="rotate">
            <option>0</option>
            <option>30</option>
            <option>45</option>
            <option>60</option>
            <option>75</option>
            <option>90</option>
            <option>180</option>
          </select>
        </label>
        <label>
          Choose a picture (jpg only)
          <input type="file" name="upload" accept="jpg" required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Layout>
  );
}
