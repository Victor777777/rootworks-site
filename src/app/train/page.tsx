import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import SiteBackground from "@/components/SiteBackground";
import ScrollToTop from "@/components/ScrollToTop";
import {
  Sparkles,
  PenLine,
  ImageIcon,
  Video,
  BarChart3,
  Search,
  FileBarChart,
  Wrench,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Train — Root Works",
  description:
    "Your team, upgraded. Intensive hands-on AI training that transforms how your team works. Real tools, real data, real results.",
};

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

const principles = [
  {
    title: "100% Practical",
    body: "Every module uses your real data and actual workflows. No synthetic examples, no theoretical exercises. Your team practices on the problems they face every day.",
  },
  {
    title: "Custom Curriculum",
    body: "We build the training program around your team's needs. A shared requirements document is prepared before the first session. Every module is tailored to your industry, your tools, and your goals.",
  },
  {
    title: "Immediate ROI",
    body: "Your team walks out producing in hours what used to take them days. The value created in the first session alone makes the entire training profitable. No waiting months to see results.",
  },
];

const modules = [
  {
    icon: Sparkles,
    title: "Prompt Engineering",
    body: "Structure prompts that get consistent, high-quality results. The 4-part anatomy of a good prompt. Few-shot, chain-of-thought, context management.",
  },
  {
    icon: PenLine,
    title: "Content Generation",
    body: "Blog posts, social media, product descriptions, email campaigns. How to produce publication-ready content at scale.",
  },
  {
    icon: ImageIcon,
    title: "Image Creation",
    body: "AI image generation for marketing: product visuals, social media graphics, campaign assets. Tools: Midjourney, DALL-E, Gemini.",
  },
  {
    icon: Video,
    title: "Video Editing",
    body: "AI-assisted video creation and editing for social content, ads, and internal communications.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    body: "Use AI to process spreadsheets, generate reports, extract insights. Excel + LLM workflows that save hours of manual analysis.",
  },
  {
    icon: Search,
    title: "SEO Content",
    body: "Generate SEO-optimized descriptions, meta tags, and content at scale. One client generated 1,000+ product descriptions in a single session.",
  },
  {
    icon: FileBarChart,
    title: "Report Creation",
    body: "Automated report generation: meeting summaries, client briefs, strategic documents. Formatted, branded, ready to send.",
  },
  {
    icon: Wrench,
    title: "Tool Selection",
    body: "Which AI tool for which task? Claude for long-form, ChatGPT for conversations, Gemini for images, Perplexity for research. We teach your team when to use what.",
  },
  {
    icon: Workflow,
    title: "Workflow Integration",
    body: "How to embed AI into your daily routine. Not as a novelty, but as a permanent productivity multiplier.",
  },
];

const process = [
  {
    step: "01",
    title: "Requirements Document",
    body: "We prepare a shared document detailing your team's current skills, tools, pain points, and goals. This becomes the blueprint for every module.",
  },
  {
    step: "02",
    title: "Customized Program",
    body: "We build the curriculum. Each module is mapped to your real business challenges. Training materials are prepared with your actual data.",
  },
  {
    step: "03",
    title: "Intensive Sessions",
    body: "On-site or remote. Full days of hands-on practice. Every concept is immediately applied to a real task from your workflow. Your team practices, not watches.",
  },
  {
    step: "04",
    title: "Deliverables",
    body: "Your team leaves with: a prompt library tailored to their needs, documented workflows, templates, and a reference manual. Everything they need to keep using what they learned.",
  },
  {
    step: "05",
    title: "Follow-up",
    body: "We check in after the training. Questions, refinements, new use cases that emerged. The learning continues beyond the sessions.",
  },
];

const formats = [
  {
    title: "On-Site",
    body: "We come to you. Full immersion with your team in your environment. Best for teams of 3 to 10 people.",
  },
  {
    title: "Remote",
    body: "Live video sessions with screen sharing, real-time collaboration, and breakout exercises. Same intensity, anywhere in the world.",
  },
];

const EASE = "cubic-bezier(0.215, 0.61, 0.355, 1)";

export default function TrainPage() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <SiteBackground />
      <div className="relative z-10">
      <Navigation />
      <main className="text-text">
        {/* Hero */}
        <section className="px-5 pt-32 pb-16 md:px-10 md:pt-44 md:pb-20">
          <ScrollReveal className="mx-auto max-w-[1000px] text-center">
            <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
              Train
            </span>
            <h1 className="mt-6 font-heading text-[clamp(40px,9vw,112px)] leading-[1.02] tracking-[-3px] text-text">
              Your team, upgraded
            </h1>
            <p className="mx-auto mt-8 max-w-[720px] text-[16px] font-light leading-[1.65] text-text-dim md:text-[clamp(17px,1.6vw,20px)]">
              Your team already has the talent. They just need the right
              tools. We deliver intensive, hands-on AI training that
              transforms how your team works. No theory decks. Real tools,
              real data, real results from the first session.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Book a Training Session
            </a>
          </ScrollReveal>
        </section>

        {/* The approach */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1240px]">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                The approach
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Three non-negotiables
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
              stagger={0.12}
            >
              {principles.map((p) => (
                <article
                  key={p.title}
                  className="group rounded-2xl border border-[rgba(0,0,0,0.06)] border-l-[3px] border-l-transparent p-8 transition-all duration-500 hover:scale-[1.02] hover:border-[rgba(0,0,0,0.15)] hover:border-l-text hover:bg-[#f8f6f2] hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] md:p-10"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <h3
                    className="font-heading text-[clamp(26px,3vw,36px)] leading-[1.1] text-text transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-5 text-[16px] font-light leading-[1.7] text-text-dim">
                    {p.body}
                  </p>
                </article>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* What we cover */}
        <section className="bg-transparent px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                What we cover
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Nine modules, fully customized
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              stagger={0.06}
            >
              {modules.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:border-border-hover hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
                >
                  <Icon size={26} strokeWidth={1.5} className="text-text" />
                  <h3 className="mt-5 font-heading text-[22px] leading-[1.2] text-text">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-[1.6] text-text-dim">
                    {body}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* How a training engagement works */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[900px]">
            <ScrollReveal className="mb-16 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                How it works
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                A training engagement
              </h2>
            </ScrollReveal>

            <ScrollReveal className="relative" stagger={0.12}>
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

        {/* Training formats */}
        <section className="bg-transparent px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-16">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                Training formats
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Two ways to work together
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              stagger={0.15}
            >
              {formats.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-10 transition-all duration-500 hover:border-border-hover hover:shadow-[0_8px_40px_rgba(0,0,0,0.05)] md:p-12"
                >
                  <h3 className="font-heading text-[32px] leading-[1.15] text-text">
                    {f.title}
                  </h3>
                  <p className="mt-5 text-[16px] font-light leading-[1.7] text-text-dim">
                    {f.body}
                  </p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pt-4 pb-20 md:px-10 md:pt-6 md:pb-24">
          <ScrollReveal className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-heading text-[clamp(32px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
              Ready to upgrade your team?
            </h2>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:mt-10 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Book a Training Session
            </a>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
      </div>
    </SmoothScroll>
  );
}
