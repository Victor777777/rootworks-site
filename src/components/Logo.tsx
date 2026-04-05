interface LogoProps {
  className?: string;
}

/**
 * Sprout SVG — two teardrop leaves in a Y shape above a thin stem.
 * Drawn in a small viewBox, sized via className, positioned absolutely
 * above the second "o" in the wordmark.
 */
function Sprout({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 44"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left leaf — teardrop pointing upper-left */}
      <path
        d="M 20 26
           C 10 22, 4 14, 6 4
           C 14 8, 20 16, 20 26 Z"
        fill="#1A1A1A"
      />
      {/* Right leaf — teardrop pointing upper-right */}
      <path
        d="M 20 26
           C 30 22, 36 14, 34 4
           C 26 8, 20 16, 20 26 Z"
        fill="#1A1A1A"
      />
      {/* Stem — thin line from the leaves down to the letter */}
      <path
        d="M 20 26 L 20 42"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`inline-flex items-center font-heading leading-none text-text ${className}`}
      style={{
        fontFamily: "var(--font-instrument-serif), 'Times New Roman', serif",
        letterSpacing: "-0.02em",
      }}
      aria-label="rootworks"
      role="img"
    >
      <span>ro</span>
      <span style={{ position: "relative", display: "inline-block" }}>
        o
        {/* Sprout sits above this letter, horizontally centered */}
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: "100%",
            transform: "translateX(-50%)",
            marginBottom: "-0.05em",
            width: "0.55em",
            height: "0.6em",
            pointerEvents: "none",
          }}
        >
          <Sprout className="h-full w-full" />
        </span>
      </span>
      <span>tworks</span>
    </span>
  );
}
