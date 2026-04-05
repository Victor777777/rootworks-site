interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 540 140"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="rootworks"
      role="img"
    >
      {/* Sprout — centered above the letter "t" */}
      <g fill="#1A1A1A" transform="translate(178, 5)">
        {/* Left leaf */}
        <ellipse
          cx="-7"
          cy="10"
          rx="10"
          ry="4.5"
          transform="rotate(-35 -7 10)"
        />
        {/* Right leaf */}
        <ellipse
          cx="7"
          cy="10"
          rx="10"
          ry="4.5"
          transform="rotate(35 7 10)"
        />
        {/* Stem */}
        <line
          x1="0"
          y1="12"
          x2="0"
          y2="34"
          stroke="#1A1A1A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Wordmark */}
      <text
        x="10"
        y="125"
        fill="#1A1A1A"
        className="font-heading"
        fontSize="110"
        fontWeight="400"
        letterSpacing="-2"
        style={{ fontFamily: "var(--font-instrument-serif), serif" }}
      >
        rootworks
      </text>
    </svg>
  );
}
