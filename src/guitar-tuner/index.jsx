import { jsxToString } from "jsx-async-runtime";
import Gauge from "./Gauge";
import { STRINGS, detectPitch, nearestString, noteOf } from "./pitch";
import Strings from "./Strings";

const display = document.getElementById("display");
const listen = document.getElementById("listen");
const hint = document.getElementById("hint");

/** @type {AudioContext | null} */
let audio = null;
/** @type {MediaStream | null} */
let stream = null;
let frame = 0;
/** Detected frequency, smoothed over the last frames to calm the needle. */
let frequency = null;
/** Frames without a pitch; the display keeps the last note for a moment. */
let silence = 0;
/** Reference tone being played, as index into STRINGS. */
let playing = null;
/** @type {{ stop(): void } | null} */
let tone = null;

function context() {
  audio ??= new AudioContext();
  return audio;
}

async function render() {
  const note = frequency ? noteOf(frequency) : null;
  const active = frequency ? STRINGS.indexOf(nearestString(frequency)) : null;
  display.innerHTML = await jsxToString(
    <>
      <Gauge note={note} frequency={frequency} />
      <Strings active={active} playing={playing} />
    </>,
  );
}

async function start() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      // Processing meant for speech would distort the guitar.
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });
  } catch {
    hint.textContent =
      "No microphone access. You can still tune by ear with the reference tones.";
    return;
  }
  const ctx = context();
  await ctx.resume();
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 4096;
  ctx.createMediaStreamSource(stream).connect(analyser);
  const samples = new Float32Array(analyser.fftSize);
  listen.textContent = "⏹ Stop";
  hint.textContent = "Listening… pluck one string at a time.";

  const loop = async () => {
    analyser.getFloatTimeDomainData(samples);
    const detected = detectPitch(samples, ctx.sampleRate);
    if (detected) {
      silence = 0;
      // Jumps of more than a semitone start fresh, small changes are smoothed.
      frequency =
        frequency && Math.abs(Math.log2(detected / frequency)) < 1 / 12
          ? frequency * 0.7 + detected * 0.3
          : detected;
    } else if (++silence > 30) {
      frequency = null;
    }
    await render();
    if (stream) frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);
}

async function stop() {
  cancelAnimationFrame(frame);
  stream?.getTracks().forEach((track) => track.stop());
  stream = null;
  frequency = null;
  listen.textContent = "🎤 Start tuning";
  hint.textContent = "Standard tuning E A D G B E, A4 = 440 Hz.";
  await render();
}

/** Seconds between two plucks of a repeating reference tone. */
const REPEAT = 4;

/**
 * Plucks the reference tone of a string once: a few harmonics with a pluck-like decay.
 *
 * @param {number} index
 * @param {number} when Start time on the audio clock.
 */
function pluck(index, when) {
  const ctx = context();
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, when);
  gain.gain.linearRampToValueAtTime(0.3, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, when + REPEAT);
  gain.connect(ctx.destination);
  return [1, 2, 3].map((harmonic, i) => {
    const oscillator = ctx.createOscillator();
    const level = ctx.createGain();
    oscillator.frequency.value = STRINGS[index].frequency * harmonic;
    level.gain.value = [1, 0.4, 0.15][i];
    oscillator.connect(level).connect(gain);
    oscillator.start(when);
    oscillator.stop(when + REPEAT);
    return oscillator;
  });
}

/**
 * Plucks a string again and again until stopped. Each pluck is scheduled on the
 * audio clock ahead of time, so the rhythm stays steady even if the timer is late.
 *
 * @param {number} index
 */
function repeat(index) {
  const ctx = context();
  ctx.resume();
  let next = ctx.currentTime;
  let oscillators = [];
  const schedule = () => {
    while (next < ctx.currentTime + 0.5) {
      // Keep the previous pluck too, it may still be ringing.
      oscillators = [...oscillators.slice(-3), ...pluck(index, next)];
      next += REPEAT;
    }
  };
  schedule();
  const timer = setInterval(schedule, 200);
  return {
    stop() {
      clearInterval(timer);
      oscillators.forEach((oscillator) => oscillator.stop());
    },
  };
}

listen.addEventListener("click", () => (stream ? stop() : start()));

display.addEventListener("click", async (event) => {
  const button = /** @type {Element} */ (event.target).closest("[data-string]");
  if (!(button instanceof HTMLElement)) return;
  const index = Number(button.dataset.string);
  tone?.stop();
  // Pressing the repeating string again silences it, another string takes over.
  if (playing === index) {
    playing = null;
    tone = null;
  } else {
    playing = index;
    tone = repeat(index);
  }
  await render();
  /** @type {HTMLElement} */ (
    display.querySelector(`[data-string="${index}"]`)
  ).focus();
});
