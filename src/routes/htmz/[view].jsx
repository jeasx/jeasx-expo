import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function View({ request, reply }) {
  const body = request.body || {};

  return (
    <form id="swap" action="./edit#swap" target="htmz" method="post">
      <input type="hidden" name="action" value="edit" />
      {fields.map(({ label, name }) => (
        <div>
          <label>{label}:</label> {body[name]}
          <input type="hidden" name={name} value={body[name]} />
        </div>
      ))}
      <button>Edit</button>
      <a href="./time#swap" target="htmz">
        Show time
      </a>
    </form>
  );
}
