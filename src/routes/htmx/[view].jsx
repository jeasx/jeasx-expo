import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function View({ request, reply }) {
  const body = request.body || {};

  return (
    <form hx-post="./edit" hx-swap="outerHTML" method="post">
      <fieldset>
        <input type="hidden" name="action" value="edit" />
        {fields.map(({ label, name }) => (
          <div class="grid">
            <label>{label}:</label> {body[name]}
            <input type="hidden" name={name} value={body[name]} />
          </div>
        ))}
      </fieldset>
      <input type="submit" value="Edit" />
    </form>
  );
}
