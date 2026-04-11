import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import SiteBackground from "@/components/SiteBackground";
import ScrollToTop from "@/components/ScrollToTop";
import {
  FileText,
  Send,
  Database,
  MessageCircle,
  Settings,
  Plug,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Automate — Root Works",
  description:
    "Automate what slows you down. Custom AI pipelines and workflow automations that free your time and multiply your output.",
};

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

const whereAutomationFits = [
  {
    icon: FileText,
    title: "Content Production",
    body: "You need consistent content but writing takes hours. We build AI pipelines that generate blog posts, social media content, product descriptions, and newsletters. On brand, on schedule, with zero manual work.",
  },
  {
    icon: Send,
    title: "Client Outreach",
    body: "You're leaving leads on the table because follow-ups are manual. We automate email sequences, LinkedIn outreach, CRM updates, and lead scoring so no opportunity slips through.",
  },
  {
    icon: Database,
    title: "Data Processing",
    body: "You copy-paste between spreadsheets, tools, and databases. We connect your systems so data flows automatically. Invoices, reports, inventory sync, client records, all handled.",
  },
  {
    icon: MessageCircle,
    title: "Customer Support",
    body: "Your team answers the same questions repeatedly. We build AI-powered support workflows that handle common requests, route complex ones, and keep your customers happy around the clock.",
  },
  {
    icon: Settings,
    title: "Internal Operations",
    body: "Onboarding, approvals, scheduling, reporting. Every repetitive process in your business can be automated. We design workflows that run without you thinking about them.",
  },
  {
    icon: Plug,
    title: "Custom Integrations",
    body: "Your tools don't talk to each other. We connect everything: Stripe to Slack, CRM to email, analytics to dashboards. If it has an API, we can automate it.",
  },
];

const process = [
  {
    step: "01",
    title: "Audit your workflows",
    body: "We map your current processes. Where does time leak? What is repetitive? What is error-prone? We identify the highest-impact automations first.",
  },
  {
    step: "02",
    title: "Design the pipeline",
    body: "We architect the workflow: triggers, actions, conditions, error handling. You see the full flow before we build it. No black boxes.",
  },
  {
    step: "03",
    title: "Build and connect",
    body: "We build using the right tool for the job. n8n for visual workflow automation, custom Python scripts for complex logic, API integrations for everything else. From no-code to full custom, whatever your case requires.",
  },
  {
    step: "04",
    title: "Test and validate",
    body: "Every workflow is tested end-to-end with your real data. Edge cases, error scenarios, volume tests. It works before we hand it over.",
  },
  {
    step: "05",
    title: "Deploy and monitor",
    body: "Your automation goes live. We set up monitoring and alerts so you know it's running. If something breaks, you know immediately. The system runs on its own after setup.",
  },
];

const stack = [
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "OpenAI", slug: "openai", color: "412991" },
  { name: "Claude", slug: "anthropic", color: "D97757" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Stripe", slug: "stripe", color: "635BFF" },
  { name: "Slack", slug: "slack", color: "4A154B" },
  { name: "Resend", slug: "resend", color: "000000" },
  { name: "Zapier", slug: "zapier", color: "FF4A00" },
  { name: "Make", slug: "make", color: "6D00CC" },
];

const before = [
  "Hours spent on repetitive tasks",
  "Manual data entry",
  "Inconsistent follow-ups",
  "Missed opportunities",
  "Team overwhelmed",
];

const after = [
  "Systems that run on their own",
  "Data flows automatically",
  "Every lead gets followed up",
  "Every process is consistent",
  "Team focuses on strategy, not operations",
];

export default function AutomatePage() {
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
              Automate
            </span>
            <h1 className="mt-6 font-heading text-[clamp(40px,9vw,112px)] leading-[1.02] tracking-[-3px] text-text">
              Automate what slows you down
            </h1>
            <p className="mx-auto mt-8 max-w-[720px] text-[16px] font-light leading-[1.65] text-text-dim md:text-[clamp(17px,1.6vw,20px)]">
              Your business is running. You&rsquo;re generating revenue. But
              your team spends hours on tasks that machines could handle in
              seconds. We build the systems that free your time and multiply
              your output.
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

        {/* Where automation fits */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                Where automation fits
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Six ways to reclaim your time
              </h2>
            </ScrollReveal>

            <ScrollReveal
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              stagger={0.08}
            >
              {whereAutomationFits.map(({ icon: Icon, title, body }) => (
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

        {/* How we automate */}
        <section className="bg-transparent px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[900px]">
            <ScrollReveal className="mb-16 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                How we automate
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                From audit to autopilot
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

        {/* Stack */}
        <section className="px-6 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="text-center">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                Our automation stack
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Tools that do the work
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
                We use the right tool for each workflow. Visual builders for
                speed, custom code for complexity.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* What changes after automation */}
        <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-20">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, #F5F3EF 0%, #EFECE4 50%, #F5F3EF 100%)",
            }}
          />
          <div
            className="absolute inset-0 -z-10 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 25% 30%, rgba(29,78,137,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(15,61,46,0.08) 0%, transparent 55%)",
            }}
          />
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-16">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                What changes
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Before and after
              </h2>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.15}>
              <div className="rounded-2xl border border-border bg-card/70 p-8 backdrop-blur-sm md:p-10">
                <span className="text-[11px] font-medium uppercase tracking-[3px] text-text-muted">
                  Before
                </span>
                <h3 className="mt-3 font-heading text-[28px] leading-[1.2] text-text-dim">
                  Business as usual
                </h3>
                <ul className="mt-6 space-y-3">
                  {before.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] font-light leading-[1.6] text-text-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-text bg-card p-8 shadow-[0_12px_48px_rgba(0,0,0,0.08)] md:p-10">
                <span className="text-[11px] font-medium uppercase tracking-[3px] text-text">
                  After
                </span>
                <h3 className="mt-3 font-heading text-[28px] leading-[1.2] text-text">
                  Systems in motion
                </h3>
                <ul className="mt-6 space-y-3">
                  {after.map((item) => (
                    <li
                      key={item}
                      className="text-[15px] font-light leading-[1.6] text-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pt-4 pb-20 md:px-10 md:pt-6 md:pb-24">
          <ScrollReveal className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-heading text-[clamp(32px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
              Ready to automate?
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
      </div>
    </SmoothScroll>
  );
}
