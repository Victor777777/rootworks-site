const tags = [
  "Telecoms", "Fintech", "Healthcare", "E-Commerce", "SaaS",
  "Education", "Real Estate", "AI", "Hospitality", "Legal",
  "Next.js", "React", "TypeScript", "Tailwind", "Vercel",
  "Supabase", "OpenAI", "Node.js",
];

function TagList() {
  return (
    <>
      {tags.map((tag, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="text-[15px] font-medium text-text-muted">{tag}</span>
          <span className="mx-6 text-text-muted/50 md:mx-8" aria-hidden="true">&middot;</span>
        </span>
      ))}
    </>
  );
}

export default function IndustryMarquee() {
  return (
    <section
      id="marquee"
      aria-label="Industries and technologies"
      className="border-y border-border overflow-hidden py-8"
    >
      <div className="flex animate-marquee">
        <div className="flex shrink-0">
          <TagList />
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          <TagList />
        </div>
      </div>
    </section>
  );
}
