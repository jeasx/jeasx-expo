import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Form({ request, reply }) {
  const body = request.body || {};

  return (
    <form hx-post="./view" hx-swap="outerHTML" method="post">
      <fieldset>
        <input type="hidden" name="action" value="view" />
        {fields.map(({ label, name, type, value }) => (
          <div>
            <label>{label}:</label>
            <input type={type} name={name} value={body[name] ?? value} />
          </div>
        ))}
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  );
}
