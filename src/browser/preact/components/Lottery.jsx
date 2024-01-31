import { useState } from "preact/hooks";

export default function Lottery() {
  const [numbers, setNumbers] = useState([]);
  const [submit, setSubmit] = useState(false);

  function toogle(number) {
    setSubmit(false);
    setNumbers(
      numbers.indexOf(number) === -1
        ? [...numbers, number]
        : numbers.filter((num) => num !== number)
    );
  }

  return (
    <div class="lottery">
      <div class="grid">
        {Array.from({ length: 49 }, (_, index) => (
          <button
            class={`box${numbers.includes(index + 1) ? " checked" : ""}`}
            name="number"
            onClick={() => toogle(index + 1)}
            disabled={numbers.length === 6 && !numbers.includes(index + 1)}
          >
            {numbers.includes(index + 1) ? "✓" : index + 1}
          </button>
        ))}
      </div>
      <div>
        {numbers.length === 6 && (
          <button
            value="submit"
            disabled={numbers.length < 6}
            onClick={() => {
              setSubmit(true);
              setNumbers([]);
            }}
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
    </div>
  );
}
