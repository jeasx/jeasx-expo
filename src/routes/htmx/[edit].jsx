/**
 * @param {import("../types").RouteProps} props
 */
export default function Form({ request, reply }) {
  const body = request.body || {};

  return (
    <form hx-post="./view">
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={body["firstName"]} />
      </div>
      <div>
        <label>Last Name</label>
        <input type="text" name="lastName" value={body["lastName"]} />
      </div>
      <div>
        <label>Email Address</label>
        <input type="email" name="email" value={body["email"]} />
      </div>
      <button>Submit</button>
    </form>
  );
}
