import ScrollReveal from "@/components/ScrollReveal";
import StackLogo from "@/components/StackLogo";

const stackRow1 = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Vercel", slug: "vercel", color: "000000" },
];

const stackRow2 = [
  { name: "GSAP", slug: "greensock", color: "88CE02" },
  { name: "Framer Motion", slug: "framer", color: "0055FF" },
  { name: "GitHub", slug: "github", color: "181717" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Figma", slug: "figma", color: "F24E1E" },
];

const stackRow3 = [
  { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Cloudflare", slug: "cloudflare", color: "F38020" },
  { name: "Resend", slug: "resend", color: "000000" },
];

export default function TechStack() {
  return (
    <section className="bg-transparent px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
            Our stack
          </span>
          <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
            Tools of the craft
          </h2>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
            {stackRow1.map((tech) => (
              <StackLogo key={tech.name} {...tech} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
            {stackRow2.map((tech) => (
              <StackLogo key={tech.name} {...tech} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
            {stackRow3.map((tech) => (
              <StackLogo key={tech.name} {...tech} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-[560px] text-[14px] font-light text-text-dim">
            We pick the right tools for each project. This is our core stack,
            but we adapt to yours.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
