import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Server,
  Globe,
  LayoutDashboard,
  Image as ImageIcon,
  Smartphone,
  ShoppingBag,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Build — Root Works",
  description:
    "From idea to product. We turn your vision into a production-ready application. Custom-built, beautifully designed, and entirely yours.",
};

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

const whatWeBuild = [
  {
    icon: Server,
    title: "SaaS Platforms",
    body: "Authentication, payments, dashboards, user management. Full-stack with Stripe, Supabase, and custom APIs.",
  },
  {
    icon: Globe,
    title: "Business Websites",
    body: "Fast, SEO-optimized, unique design systems. No templates. Built with Next.js and deployed on Vercel.",
  },
  {
    icon: LayoutDashboard,
    title: "Web Applications",
    body: "Internal tools, client portals, booking systems, data dashboards. Whatever your workflow needs.",
  },
  {
    icon: ImageIcon,
    title: "Portfolio Sites",
    body: "For artists, photographers, architects. Immersive galleries with scroll animations and custom layouts.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    body: "Cross-platform with React Native or progressive web apps that work on every device.",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    body: "Headless Shopify, custom storefronts, inventory management, payment processing.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    body: "We understand your idea, audience, and constraints. We define the scope, the component architecture, and give you a fixed price. No surprises, no hidden fees.",
  },
  {
    step: "02",
    title: "Design System",
    body: "We create a unique visual identity. Typography, colors, spacing, components. No templates, no themes. Everything custom, everything intentional.",
  },
  {
    step: "03",
    title: "AI-Native Development",
    body: "We build with the latest AI-native tools alongside traditional engineering. Each component is developed, tested, and connected. You get a live preview URL from day one and see progress as it happens.",
  },
  {
    step: "04",
    title: "Review and Iterate",
    body: "You review every detail on the preview. We iterate until you are satisfied. Nothing goes live without your approval.",
  },
  {
    step: "05",
    title: "Launch and Handoff",
    body: "Deployed on your custom domain. GitHub repo, Vercel hosting, HTTPS, CDN. You own 100% of the code. We hand you the keys.",
  },
];

const stack = [
  { name: "Next.js", slug: "nextdotjs", color: "000000" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Vercel", slug: "vercel", color: "000000" },
  { name: "GSAP", slug: "greensock", color: "88CE02" },
  { name: "Framer Motion", slug: "framer", color: "0055FF" },
];

export default function BuildPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="bg-bg text-text">
        {/* Hero */}
        <section className="px-5 pt-32 pb-20 md:px-10 md:pt-48 md:pb-32">
          <ScrollReveal className="mx-auto max-w-[1000px] text-center">
            <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
              Build
            </span>
            <h1 className="mt-6 font-heading text-[clamp(40px,9vw,112px)] leading-[1.02] tracking-[-3px] text-text">
              From idea to product
            </h1>
            <p className="mx-auto mt-8 max-w-[640px] text-[16px] font-light leading-[1.65] text-text-dim md:text-[clamp(17px,1.6vw,20px)]">
              We turn your vision into a production-ready application.
              Custom-built, beautifully designed, and entirely yours.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Book a Discovery Call
            </a>
          </ScrollReveal>
        </section>

        {/* What we build */}
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                What we build
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Applications, shaped to fit
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              stagger={0.08}
            >
              {whatWeBuild.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-border-hover hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
                >
                  <Icon size={28} strokeWidth={1.5} className="text-text" />
                  <h3 className="mt-6 font-heading text-[24px] leading-[1.2] text-text">
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-[1.6] text-text-dim">
                    {body}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* How we build */}
        <section className="bg-bg-warm px-6 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-[900px]">
            <ScrollReveal className="mb-12 text-center md:mb-16">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                How we build
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Composable Architecture
              </h2>
              <p className="mx-auto mt-8 max-w-[720px] text-[17px] font-light leading-[1.75] text-text-dim">
                We use a component-based approach. Instead of building
                monolithic applications, we design isolated, reusable
                components, each handling one responsibility. Authentication,
                payments, navigation, data display, each is a self-contained
                module. We then compose these components together through
                well-defined interfaces and routes. This means every piece can
                be tested independently, replaced without breaking anything,
                and scaled on its own. It is how we move fast without cutting
                corners.
              </p>
            </ScrollReveal>

            <ScrollReveal className="relative mt-16" stagger={0.12}>
              {process.map((step, i) => (
                <div
                  key={step.step}
                  className="relative grid grid-cols-[auto_1fr] gap-6 pb-12 md:gap-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card font-heading text-[15px] text-text">
                      {step.step}
                    </div>
                    {i < process.length - 1 && (
                      <div className="mt-2 h-full w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-heading text-[26px] leading-[1.2] text-text">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[16px] font-light leading-[1.7] text-text-dim">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Our stack */}
        <section className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="text-center">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                Our stack
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Tools of the craft
              </h2>

              <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
                {stack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 opacity-70 transition-opacity duration-300 hover:opacity-100"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                      alt={tech.name}
                      className="h-7 w-7"
                    />
                    <span className="text-[14px] font-medium text-text">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mx-auto mt-12 max-w-[560px] text-[14px] font-light text-text-dim">
                We pick the right tools for each project. This is our core
                stack, but we adapt to yours.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pt-6 pb-24 md:px-10 md:pt-8 md:pb-32">
          <ScrollReveal className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-heading text-[clamp(32px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
              Ready to build?
            </h2>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:mt-10 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Book a Discovery Call
            </a>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
