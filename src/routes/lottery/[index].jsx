/**
 * @param {import("../types").RouteProps} props
 */
export default function Lottery({ request }) {
  const body = request.body || {};

  const number = +body["number"];
  const submit = body["submit"];
  const numbers = !submit && body["numbers"] ? JSON.parse(body["numbers"]) : [];
  let delta = 0;

  if (number) {
    const index = numbers.indexOf(number);
    if (index === -1) {
      numbers.push(number);
      delta = 1;
    } else {
      numbers.splice(index, 1);
      delta = -1;
    }
  }

  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="description" content="A fake lottery" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="view-transition" content="same-origin" />
          <link
            rel="stylesheet"
            href={`/lottery/index.css?${process.env.BUILD_TIME}`}
          />
          <script
            src={`/scroll-restore/index.js?${process.env.BUILD_TIME}`}
            defer
          ></script>
          <title>Lottery {numbers.join(", ")}</title>
        </head>
        <body>
          <main class="lottery">
            <h1>Lottery (6 out of 49)</h1>
            <form method="post">
              <input
                type="hidden"
                name="numbers"
                value={JSON.stringify(numbers)}
              />
              <div
                class="progressbar"
                style={`--currentValue: ${numbers.length}; --previousValue: ${
                  numbers.length - delta
                }; --maxValue: 6`}
              />
              <div class="grid">
                {Array.from({ length: 49 }, (_, index) => (
                  <button
                    class={{
                      box: true,
                      checked: numbers.includes(index + 1),
                      last: number === index + 1,
                    }}
                    type="submit"
                    name="number"
                    value={index + 1}
                    disabled={
                      numbers.length === 6 && !numbers.includes(index + 1)
                    }
                    autofocus={number === index + 1}
                  >
                    {numbers.includes(index + 1) ? "✓" : index + 1}
                  </button>
                ))}
              </div>
              <div>
                {numbers.length === 6 && (
                  <button
                    type="submit"
                    name="submit"
                    value="submit"
                    disabled={numbers.length < 6}
                  >
                    Reveal results
                  </button>
                )}
                {submit && (
                  <p>
                    {Array(6)
                      .fill()
                      .map(() => (Math.random() > 0.8 ? "🎉" : "❌"))
                      .join(" ")}
                  </p>
                )}
              </div>
            </form>
          </main>
        </body>
      </html>
    </>
  );
}
