/**
 * @param {import("../types").RouteProps} props
 */
export default function Time({}) {
  return (
    <div id="swap">
      <p>
        <b>{new Date().toISOString()}</b>
      </p>
      <a href="./time#swap" target="htmz">
        Refresh
      </a>
      {" | "}
      <a href="./edit#swap" target="htmz">
        Restart
      </a>
    </div>
  );
}
