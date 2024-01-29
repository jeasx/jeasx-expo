/**
 * @param {import("../types").RouteProps} props
 */
export default function View({ request, reply }) {
  const body = request.body || {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
  };

  return (
    <form hx-post="./edit">
      <input type="hidden" name="firstName" value={body["firstName"]} />
      <input type="hidden" name="lastName" value={body["lastName"]} />
      <input type="hidden" name="email" value={body["email"]} />
      <div>First Name: {body["firstName"]}</div>
      <div>Last Name: {body["lastName"]}</div>
      <div>Email: {body["email"]}</div>
      <button>Edit</button>
    </form>
  );
}
