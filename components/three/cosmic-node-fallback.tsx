/** Lightweight SVG stand-in for the cosmic hero (no WebGL in v1). */
export function CosmicNodeFallback({
  className,
  idPrefix = "cosmic",
  "aria-hidden": ariaHidden = true,
}: {
  className?: string;
  /** Unique prefix so multiple SVGs on one page do not clash on gradient IDs. */
  idPrefix?: string;
  "aria-hidden"?: boolean;
}) {
  const edgeId = `${idPrefix}-edge`;
  const glowId = `${idPrefix}-glow`;

  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
    >
      <defs>
        <linearGradient id={edgeId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d1ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d1ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="160" fill={`url(#${glowId})`} />
      {[
        [80, 120],
        [160, 90],
        [260, 110],
        [310, 200],
        [270, 290],
        [180, 310],
        [100, 260],
        [130, 200],
        [220, 180],
        [240, 230],
      ].map(([x, y], i) => (
        <circle
          key={`n-${i}-${x}-${y}`}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 3.5 : 2}
          fill={i % 3 === 0 ? "#00d1ff" : "#a78bfa"}
          fillOpacity={0.92}
        />
      ))}
      <path
        d="M80 120 L160 90 L260 110 L310 200 L270 290 L180 310 L100 260 Z"
        stroke={`url(#${edgeId})`}
        strokeWidth="1.15"
      />
      <path
        d="M130 200 L220 180 L240 230 L160 90 M260 110 L220 180 M310 200 L240 230"
        stroke={`url(#${edgeId})`}
        strokeWidth="0.85"
        opacity={0.85}
      />
    </svg>
  );
}
