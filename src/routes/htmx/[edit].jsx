import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Form({ request, reply }) {
  const body = request.body || {};

  return (
    <form data-hx-post="./view" method="post">
      <input type="hidden" name="action" value="view" />
      {fields.map(({ label, name, type, value }) => (
        <div>
          <label>{label}:</label>
          <input type={type} name={name} value={body[name] ?? value} />
        </div>
      ))}
      <button>Submit</button>
    </form>
  );
}
