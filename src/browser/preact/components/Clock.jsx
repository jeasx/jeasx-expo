import { signal } from "@preact/signals";

const time = signal(new Date());

setInterval(() => {
  time.value = new Date();
}, 500);

export default function Clock() {
  return (
    <div class="clock">
      <time>{time.value.toLocaleTimeString()}</time>
    </div>
  );
}
