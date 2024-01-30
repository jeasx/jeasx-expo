/**
 * @param {import("../types").RouteProps} props
 */
export default function View({ request, reply }) {
  const body = request.body || {};

  return (
    <form hx-post="./edit" method="post">
      <input type="hidden" name="action" value="edit" />
      <input type="hidden" name="firstName" value={body["firstName"]} />
      <input type="hidden" name="lastName" value={body["lastName"]} />
      <input type="hidden" name="email" value={body["email"]} />
      <div>First Name: {body["firstName"]}</div>
      <div>Last Name: {body["lastName"]}</div>
      <div>Email: {body["email"]}</div>
      <button>Edit</button>
      <p>
        <i>Generated at: {new Date().toISOString()}</i>
      </p>
    </form>
  );
}
