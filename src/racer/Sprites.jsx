const SHIRTS = ["#ef4444", "#3b82f6", "#facc15", "#22c55e", "#f97316", "#a855f7", "#f8fafc"];
const SKIN = ["#f5d0a9", "#d4a373", "#8d5524", "#e0ac69"];

/** Two rows of spectators standing behind a barrier, with their arms down or thrown up. */
function Crowd({ id, cheer }) {
  const people = [];
  for (let row = 0; row < 2; row++) {
    for (let n = 0; n < 9; n++) {
      const i = row * 9 + n;
      const x = 12 + n * 22 + (row ? 11 : 0);
      const y = row ? 52 : 34;
      const shirt = SHIRTS[(i * 5) % SHIRTS.length];
      // Not everybody cheers at once.
      const up = cheer && i % 3 !== 1;
      people.push(
        <g>
          <path
            d={
              up
                ? `M${x - 6} ${y + 4} l-5 -14 M${x + 6} ${y + 4} l5 -14`
                : `M${x - 6} ${y + 4} l-3 12 M${x + 6} ${y + 4} l3 12`
            }
            stroke={SKIN[i % SKIN.length]}
            stroke-width="3"
            stroke-linecap="round"
          />
          <rect x={x - 7} y={y} width="14" height="20" rx="4" fill={shirt} />
          <circle cx={x} cy={y - 6} r="6" fill={SKIN[i % SKIN.length]} />
        </g>,
      );
    }
  }
  return (
    <symbol id={id} viewBox="0 0 220 100">
      {people}
      <rect x="0" y="76" width="220" height="24" fill="#f8fafc" />
      <rect x="0" y="76" width="220" height="6" fill="#dc2626" />
    </symbol>
  );
}

/**
 * Artwork for everything on the road, as SVG symbols. The page renders them
 * once; every frame of the road only references them with `<use>`, which keeps
 * the markup per frame small. Cars take their paint from `currentColor`.
 */
export default function Sprites() {
  return (
    <svg class="sprites" aria-hidden="true" width="0" height="0">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3b82f6" />
          <stop offset="0.55" stop-color="#93c5fd" />
          <stop offset="1" stop-color="#fde68a" />
        </linearGradient>
        {/* Soft puffs of tire smoke: dense in the middle, fading out at the edge. */}
        <radialGradient id="smoke">
          <stop offset="0" stop-color="#fafafa" stop-opacity="1" />
          <stop offset="0.6" stop-color="#d4d4d8" stop-opacity="0.7" />
          <stop offset="1" stop-color="#d4d4d8" stop-opacity="0" />
        </radialGradient>
      </defs>
      {/* A fluffy cloud with a slightly shaded underside. */}
      <symbol id="cloud" viewBox="0 0 200 90">
        <g fill="#e2e8f0">
          <ellipse cx="100" cy="66" rx="92" ry="20" />
          <circle cx="62" cy="54" r="28" />
          <circle cx="140" cy="54" r="26" />
        </g>
        <g fill="#fff">
          <circle cx="70" cy="48" r="26" />
          <circle cx="108" cy="36" r="34" />
          <circle cx="146" cy="50" r="22" />
          <ellipse cx="100" cy="60" rx="78" ry="14" />
        </g>
      </symbol>
      {/*
       * A chubby little bird with a googly eye, a tuft, a big beak and dangling
       * feet, flying to the right, with its stubby wing up and down.
       */}
      <symbol id="bird-up" viewBox="-2 -2 42 36">
        <path
          d="M10 25 l-2 4 M10 25 l1 4"
          stroke="#f97316"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M16 26 l-1 4 M16 26 l2 4"
          stroke="#f97316"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path d="M4 16 L-1 12 L1 19 Z" fill="#0ea5e9" />
        <ellipse cx="15" cy="17" rx="13" ry="11" fill="#38bdf8" />
        <ellipse cx="16" cy="21" rx="8" ry="6" fill="#e0f2fe" />
        <path
          d="M14 6 Q15 1 18 3 M17 6 Q20 2 22 5"
          fill="none"
          stroke="#0ea5e9"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path d="M27 14 L37 17 L27 20 Z" fill="#fb923c" />
        <path d="M27 17 L35 17" stroke="#c2410c" stroke-width="1" />
        <circle cx="22" cy="12" r="5.5" fill="#fff" stroke="#0f172a" stroke-width="1" />
        <circle cx="23.5" cy="13" r="2.6" fill="#0f172a" />
        <circle cx="24.3" cy="12.2" r="0.9" fill="#fff" />
        <path d="M9 15 Q6 2 16 0 Q16 10 15 16 Z" fill="#0284c7" />
      </symbol>
      <symbol id="bird-down" viewBox="-2 -2 42 36">
        <path
          d="M10 25 l-2 4 M10 25 l1 4"
          stroke="#f97316"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M16 26 l-1 4 M16 26 l2 4"
          stroke="#f97316"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path d="M4 16 L-1 12 L1 19 Z" fill="#0ea5e9" />
        <ellipse cx="15" cy="17" rx="13" ry="11" fill="#38bdf8" />
        <ellipse cx="16" cy="21" rx="8" ry="6" fill="#e0f2fe" />
        <path
          d="M14 6 Q15 1 18 3 M17 6 Q20 2 22 5"
          fill="none"
          stroke="#0ea5e9"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path d="M27 14 L37 17 L27 20 Z" fill="#fb923c" />
        <path d="M27 17 L35 17" stroke="#c2410c" stroke-width="1" />
        <circle cx="22" cy="12" r="5.5" fill="#fff" stroke="#0f172a" stroke-width="1" />
        <circle cx="23.5" cy="13" r="2.6" fill="#0f172a" />
        <circle cx="24.3" cy="12.2" r="0.9" fill="#fff" />
        <path d="M9 17 Q5 30 15 32 Q17 24 15 18 Z" fill="#0284c7" />
      </symbol>
      {/* A happy cow walking to the right, with its legs in two steps. */}
      <symbol id="cow-a" viewBox="0 0 96 60">
        <g stroke="#1e293b" stroke-width="5" stroke-linecap="round">
          <path d="M18 36 l-4 20 M30 36 l4 20 M50 36 l-4 20 M60 36 l4 20" />
        </g>
        <path
          d="M10 18 Q4 22 3 30"
          fill="none"
          stroke="#f8fafc"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <circle cx="3" cy="31" r="2.5" fill="#1e293b" />
        <rect
          x="8"
          y="10"
          width="58"
          height="30"
          rx="14"
          fill="#f8fafc"
          stroke="#1e293b"
          stroke-width="1.5"
        />
        <path
          d="M20 11 Q30 16 26 26 Q18 28 14 20 Z M44 12 Q54 10 56 22 Q48 30 40 22 Z M30 32 Q36 28 42 34 L40 40 L30 40 Z"
          fill="#1e293b"
        />
        <ellipse cx="38" cy="40" rx="6" ry="3.5" fill="#f9a8d4" />
        <path
          d="M66 12 L70 3 L74 10 M80 10 L86 3 L86 12"
          fill="#fde68a"
          stroke="#1e293b"
          stroke-width="1"
        />
        <ellipse
          cx="76"
          cy="18"
          rx="12"
          ry="11"
          fill="#f8fafc"
          stroke="#1e293b"
          stroke-width="1.5"
        />
        <path d="M68 10 L62 8 L67 14 Z" fill="#1e293b" />
        <ellipse cx="82" cy="26" rx="9" ry="6" fill="#f9a8d4" stroke="#1e293b" stroke-width="1" />
        <circle cx="79" cy="26" r="1.2" fill="#1e293b" />
        <circle cx="85" cy="26" r="1.2" fill="#1e293b" />
        <circle cx="78" cy="15" r="3.5" fill="#fff" stroke="#1e293b" stroke-width="1" />
        <circle cx="79" cy="15.5" r="1.8" fill="#1e293b" />
      </symbol>
      <symbol id="cow-b" viewBox="0 0 96 60">
        <g stroke="#1e293b" stroke-width="5" stroke-linecap="round">
          <path d="M18 36 l4 20 M30 36 l-4 20 M50 36 l4 20 M60 36 l-4 20" />
        </g>
        <path
          d="M10 18 Q4 22 3 30"
          fill="none"
          stroke="#f8fafc"
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <circle cx="3" cy="31" r="2.5" fill="#1e293b" />
        <rect
          x="8"
          y="10"
          width="58"
          height="30"
          rx="14"
          fill="#f8fafc"
          stroke="#1e293b"
          stroke-width="1.5"
        />
        <path
          d="M20 11 Q30 16 26 26 Q18 28 14 20 Z M44 12 Q54 10 56 22 Q48 30 40 22 Z M30 32 Q36 28 42 34 L40 40 L30 40 Z"
          fill="#1e293b"
        />
        <ellipse cx="38" cy="40" rx="6" ry="3.5" fill="#f9a8d4" />
        <path
          d="M66 12 L70 3 L74 10 M80 10 L86 3 L86 12"
          fill="#fde68a"
          stroke="#1e293b"
          stroke-width="1"
        />
        <ellipse
          cx="76"
          cy="18"
          rx="12"
          ry="11"
          fill="#f8fafc"
          stroke="#1e293b"
          stroke-width="1.5"
        />
        <path d="M68 10 L62 8 L67 14 Z" fill="#1e293b" />
        <ellipse cx="82" cy="26" rx="9" ry="6" fill="#f9a8d4" stroke="#1e293b" stroke-width="1" />
        <circle cx="79" cy="26" r="1.2" fill="#1e293b" />
        <circle cx="85" cy="26" r="1.2" fill="#1e293b" />
        <circle cx="78" cy="15" r="3.5" fill="#fff" stroke="#1e293b" stroke-width="1" />
        <circle cx="79" cy="15.5" r="1.8" fill="#1e293b" />
      </symbol>
      <Crowd id="crowd" cheer={false} />
      <Crowd id="crowd-cheer" cheer={true} />
      {/* A formula car seen from behind. */}
      <symbol id="car" viewBox="0 0 100 60">
        <ellipse cx="50" cy="57" rx="48" ry="4" fill="#000" opacity="0.35" />
        <rect x="2" y="30" width="22" height="28" rx="4" fill="#111" />
        <rect x="76" y="30" width="22" height="28" rx="4" fill="#111" />
        <rect x="5" y="34" width="16" height="2" fill="#444" />
        <rect x="79" y="34" width="16" height="2" fill="#444" />
        <path d="M22 50 L28 22 L72 22 L78 50 Z" fill="currentColor" />
        <path d="M38 22 L42 10 L58 10 L62 22 Z" fill="currentColor" />
        <circle cx="50" cy="13" r="5" fill="#fbbf24" stroke="#111" stroke-width="1.5" />
        <rect x="14" y="4" width="72" height="8" rx="2" fill="currentColor" />
        <rect x="14" y="4" width="72" height="3" rx="1.5" fill="#fff" opacity="0.35" />
        <rect x="30" y="12" width="4" height="12" fill="#222" />
        <rect x="66" y="12" width="4" height="12" fill="#222" />
        <rect x="40" y="44" width="20" height="5" rx="1" fill="#111" />
        <rect x="30" y="40" width="8" height="4" rx="1" fill="#ef4444" />
        <rect x="62" y="40" width="8" height="4" rx="1" fill="#ef4444" />
      </symbol>
      <symbol id="tree" viewBox="0 0 90 120">
        <rect x="39" y="70" width="12" height="50" fill="#78350f" />
        <circle cx="45" cy="45" r="36" fill="#15803d" />
        <circle cx="30" cy="60" r="22" fill="#166534" />
        <circle cx="60" cy="58" r="24" fill="#166534" />
        <circle cx="38" cy="32" r="16" fill="#22c55e" opacity="0.6" />
      </symbol>
      <symbol id="pine" viewBox="0 0 70 150">
        <rect x="30" y="120" width="10" height="30" fill="#713f12" />
        <path
          d="M35 0 L62 60 L8 60 Z M35 30 L68 100 L2 100 Z M35 60 L70 128 L0 128 Z"
          fill="#14532d"
        />
        <path d="M35 0 L48 60 L35 60 Z M35 30 L52 100 L35 100 Z" fill="#166534" />
      </symbol>
      <symbol id="bush" viewBox="0 0 60 38">
        <ellipse cx="30" cy="26" rx="30" ry="14" fill="#4d7c0f" />
        <ellipse cx="20" cy="20" rx="14" ry="12" fill="#65a30d" />
        <ellipse cx="40" cy="18" rx="16" ry="13" fill="#65a30d" />
      </symbol>
      <symbol id="billboard" viewBox="0 0 150 110">
        <rect x="20" y="50" width="8" height="60" fill="#475569" />
        <rect x="122" y="50" width="8" height="60" fill="#475569" />
        <rect x="0" y="0" width="150" height="66" rx="4" fill="#0f172a" />
        <rect x="5" y="5" width="140" height="56" rx="2" fill="#facc15" />
        <text
          x="75"
          y="44"
          text-anchor="middle"
          font-family="sans-serif"
          font-weight="900"
          font-size="30"
          fill="#0f172a"
        >
          JEASX
        </text>
      </symbol>
      <symbol id="gantry" viewBox="0 0 520 170">
        <rect x="0" y="20" width="14" height="150" fill="#e2e8f0" />
        <rect x="506" y="20" width="14" height="150" fill="#e2e8f0" />
        <rect x="0" y="10" width="520" height="40" fill="#b91c1c" />
        <text
          x="260"
          y="40"
          text-anchor="middle"
          font-family="sans-serif"
          font-weight="900"
          font-size="28"
          fill="#fff"
          letter-spacing="8"
        >
          START · FINISH
        </text>
      </symbol>
    </svg>
  );
}
