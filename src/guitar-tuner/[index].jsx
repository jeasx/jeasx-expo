import Layout from "../Layout";
import Gauge from "./Gauge";
import Strings from "./Strings";

export default function () {
  return (
    <Layout
      title="Guitar tuner with client-side JSX"
      description="A chromatic guitar tuner which listens to your microphone and renders its dial with JSX components in the browser."
      css="/guitar-tuner/index.css"
      script="/guitar-tuner/index.js"
    >
      <h1>Guitar tuner with client-side JSX</h1>
      <p>
        A chromatic tuner built from plain JSX components with{" "}
        <a href="https://github.com/jeasx/jsx-async-runtime">
          jsx-async-runtime
        </a>
        . The server renders the resting dial, then the browser listens to your
        microphone with the Web Audio API, detects the pitch by autocorrelation
        and renders the very same components many times per second. No audio
        leaves your device. Press a string to hear its reference tone
        repeatedly, press it again to stop.
      </p>
      <section class="tuner">
        <div id="display">
          <Gauge />
          <Strings />
        </div>
        <button class="listen" type="button" id="listen">
          🎤 Start tuning
        </button>
        <p class="hint" id="hint">
          Standard tuning E A D G B E, A4 = 440 Hz.
        </p>
      </section>
    </Layout>
  );
}
