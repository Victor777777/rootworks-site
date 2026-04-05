interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 600 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="rootworks"
      role="img"
    >
      {/*
        Sprout — sits above the letter "t" in "rootworks".
        Design: two teardrop leaves pointing upward and outward
        from a thin curved stem, like a tiny seedling growing.
      */}
      <g fill="#1A1A1A" transform="translate(250, 8)">
        {/* Left leaf — teardrop, tilted upper-left */}
        <path
          d="M 0 28
             C -16 22, -22 8, -18 -2
             C -10 4, -2 14, 0 28 Z"
        />
        {/* Right leaf — teardrop, tilted upper-right */}
        <path
          d="M 0 28
             C 16 22, 22 8, 18 -2
             C 10 4, 2 14, 0 28 Z"
        />
        {/* Stem — thin vertical connecting into the top of the 't' */}
        <path
          d="M 0 28 L 0 48"
          stroke="#1A1A1A"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Wordmark — "rootworks" in Instrument Serif */}
      <text
        x="20"
        y="145"
        fill="#1A1A1A"
        fontSize="128"
        fontWeight="400"
        letterSpacing="-1"
        style={{ fontFamily: "var(--font-instrument-serif), 'Times New Roman', serif" }}
      >
        rootworks
      </text>
    </svg>
  );
}
