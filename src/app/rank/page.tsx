import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import SiteBackground from "@/components/SiteBackground";
import ScrollToTop from "@/components/ScrollToTop";
import TechStack from "@/components/TechStack";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Rank — Root Works",
  description:
    "Rank where you belong. Full-stack SEO and AI search optimization for Google, ChatGPT, Perplexity, Gemini, and every major assistant.",
};

const CALENDLY = "https://calendly.com/victor-rootworks/30min";

const traditional = [
  "Audit takes weeks",
  "Recommendations delivered as a PDF",
  "Client must implement themselves",
  "Months before changes go live",
  "Monthly retainer with slow results",
  "No AI search optimization",
];

const ourApproach = [
  "Audit completed and implemented in the same session",
  "Every fix deployed directly, not just recommended",
  "Fixed project fee, no retainer",
  "Results visible on public benchmarks you can verify yourself",
  "AI Search (GEO) included as standard",
];

const capabilities = [
  {
    num: "01",
    title: "Full-Stack Technical SEO Audit",
    body: "We crawl your entire site and analyze every page across 7 categories: crawlability, indexability, Core Web Vitals (LCP, CLS, INP), mobile optimization, security headers, and structured data. Every issue is identified, prioritized, and fixed. Not recommended. Fixed.",
  },
  {
    num: "02",
    title: "Schema Markup and Structured Data",
    body: "We implement comprehensive schema markup across your site. Organization, Product, Article, FAQ, HowTo, BreadcrumbList, LocalBusiness, VideoObject, and more. This is how search engines and AI assistants understand what your pages are about. We do not add basic schema. We build a complete structured data layer that covers every entity on your site.",
  },
  {
    num: "03",
    title: "Content Architecture and E-E-A-T",
    body: "We restructure your content for Experience, Expertise, Authoritativeness, and Trustworthiness, the framework Google uses to evaluate content quality. Topic clusters, internal linking strategy, content gap analysis, and programmatic page generation. We build the architecture that scales.",
  },
  {
    num: "04",
    title: "Programmatic SEO at Scale",
    body: "We build automated content systems that generate SEO-optimized pages from your data. Product descriptions, location pages, comparison pages, and X vs Y articles, all generated with quality safeguards. One client went from 0 to 500+ indexed pages targeting unique keywords.",
  },
  {
    num: "05",
    title: "Local SEO and Maps Intelligence",
    body: "For businesses with a physical presence: Google Business Profile optimization, local schema markup, geo-grid rank tracking across your service area, review intelligence, and competitor radius mapping.",
  },
  {
    num: "06",
    title: "Backlink Analysis",
    body: "We analyze your backlink profile: domain authority, referring domains, anchor text distribution, and toxic link identification. We build a strategy for acquiring high-quality backlinks that move your rankings.",
  },
  {
    num: "07",
    title: "Reporting and Monitoring",
    body: "Everything is documented in a professional audit report. SEO Health Score (0 to 100), prioritized action plan, before and after comparisons. Public benchmarks you can run yourself to verify the results.",
  },
];

const geoPoints = [
  {
    title: "Citation-ready content formatting",
    body: "We structure your content so AI models can extract and cite it. Clear definitions, structured data, factual claims with evidence.",
  },
  {
    title: "Entity markup",
    body: "We define your brand, products, and services as machine-readable entities. When an AI assistant processes your page, it understands exactly what you offer.",
  },
  {
    title: "LLM mention tracking",
    body: "We monitor how AI assistants reference your brand and competitors. We track your visibility across ChatGPT, Perplexity, Gemini, and Claude.",
  },
  {
    title: "AI Overviews optimization",
    body: "Google's AI Overviews pull from structured, authoritative content. We optimize your pages to be selected as source material.",
  },
  {
    title: "Competitor AI visibility analysis",
    body: "We analyze which competitors show up in AI answers for your target keywords and reverse-engineer their positioning.",
  },
];

const stats = [
  { value: "24 → 91", label: "SEO Score improvement" },
  { value: "0 → 70", label: "GEO Score improvement" },
  { value: "500+", label: "Keywords ranked" },
];

export default function RankPage() {
  return (
    <SmoothScroll>
      <ScrollToTop />
      <SiteBackground />
      <div className="relative z-10">
      <Navigation />
      <main className="text-text">
        {/* Hero */}
        <section className="px-5 pt-32 pb-10 md:px-10 md:pt-44 md:pb-14">
          <ScrollReveal className="mx-auto max-w-[1000px] text-center">
            <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
              Rank
            </span>
            <h1 className="mt-6 font-heading text-[clamp(40px,9vw,112px)] leading-[1.02] tracking-[-3px] text-text">
              Rank where you belong
            </h1>
            <p className="mx-auto mt-8 max-w-[720px] text-[16px] font-light leading-[1.65] text-text-dim md:text-[clamp(17px,1.6vw,20px)]">
              People stopped searching only on Google. They now ask ChatGPT,
              Perplexity, Gemini, and every AI assistant. If your product
              does not show up there, it does not exist. We make sure it does.
            </p>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Get a Free Audit
            </a>
          </ScrollReveal>
        </section>

        {/* The shift */}
        <section className="bg-transparent px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                The shift
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                A different way to rank
              </h2>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.15}>
              <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
                <span className="text-[11px] font-medium uppercase tracking-[3px] text-text-muted">
                  Traditional SEO Agency
                </span>
                <h3 className="mt-3 font-heading text-[24px] leading-[1.2] text-text-dim">
                  The old playbook
                </h3>
                <ul className="mt-6 space-y-4">
                  {traditional.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] font-light leading-[1.5] text-text-dim"
                    >
                      <X
                        size={18}
                        strokeWidth={2}
                        className="mt-0.5 flex-shrink-0 text-text-muted"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border-2 border-text bg-card p-8 shadow-[0_12px_48px_rgba(0,0,0,0.08)] md:p-10">
                <span className="text-[11px] font-medium uppercase tracking-[3px] text-text">
                  Our Approach
                </span>
                <h3 className="mt-3 font-heading text-[24px] leading-[1.2] text-text">
                  Audit, fix, deploy
                </h3>
                <ul className="mt-6 space-y-4">
                  {ourApproach.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] font-light leading-[1.5] text-text"
                    >
                      <Check
                        size={18}
                        strokeWidth={2.5}
                        className="mt-0.5 flex-shrink-0 text-text"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* What we do — all 7 capabilities */}
        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[900px]">
            <ScrollReveal className="mb-16 text-center md:mb-20">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                What we do
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                Seven capabilities, one system
              </h2>
            </ScrollReveal>

            <ScrollReveal className="space-y-16" stagger={0.1}>
              {capabilities.map((cap) => (
                <div key={cap.num} className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                  <div className="font-heading text-[28px] leading-none text-text-muted">
                    {cap.num}
                  </div>
                  <div>
                    <h3 className="font-heading text-[clamp(26px,3.2vw,36px)] leading-[1.15] text-text">
                      {cap.title}
                    </h3>
                    <p className="mt-4 text-[16px] font-light leading-[1.75] text-text-dim">
                      {cap.body}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* GEO — standalone featured section */}
        <section className="px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[900px]">
            <ScrollReveal className="rounded-2xl border border-[rgba(0,0,0,0.06)] p-8 md:p-12">
              <div className="text-center">
                <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                  AI Search Optimization
                </span>
                <h2 className="mt-4 font-heading text-[clamp(44px,7vw,96px)] leading-[1] tracking-[-2.5px] text-text">
                  AI is the new Google
                </h2>
                <p className="mt-4 font-heading text-[clamp(22px,3vw,34px)] italic leading-[1.2] text-text-dim">
                  You need to rank there too
                </p>
              </div>

              <div className="mx-auto mt-10 max-w-[720px] space-y-5 font-heading text-[clamp(20px,2.4vw,26px)] leading-[1.45] text-text-dim">
                <p>
                  Google is no longer the only search engine that matters.
                </p>
                <p>
                  When your customers ask ChatGPT &ldquo;What is the best
                  tool for X?&rdquo;, you need to be in that answer.
                </p>
                <p>
                  This is{" "}
                  <strong className="font-semibold not-italic text-text">
                    Generative Engine Optimization (GEO)
                  </strong>
                  .
                </p>
              </div>

              <div className="mt-12 space-y-6">
                {geoPoints.map((point) => (
                  <div
                    key={point.title}
                    className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8"
                  >
                    <h4 className="font-heading text-[22px] leading-[1.2] text-text">
                      {point.title}
                    </h4>
                    <p className="mt-3 text-[15px] font-light leading-[1.7] text-text-dim">
                      {point.body}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Proven results */}
        <section className="bg-transparent px-6 py-10 md:px-10 md:py-14">
          <div className="mx-auto max-w-[1100px]">
            <ScrollReveal className="mb-14 text-center md:mb-16">
              <span className="text-[11px] font-medium uppercase tracking-[4px] text-text-muted">
                Proven results
              </span>
              <h2 className="mt-4 font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] tracking-[-2px] text-text">
                What our work looks like
              </h2>
            </ScrollReveal>

            <ScrollReveal className="grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.12}>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-10 text-center"
                >
                  <div className="font-heading text-[clamp(42px,5.5vw,64px)] leading-none tracking-[-2px] text-text">
                    {stat.value}
                  </div>
                  <div className="mt-4 text-[14px] font-medium uppercase tracking-[2px] text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* Our stack */}
        <TechStack />

        {/* CTA */}
        <section className="px-5 pt-4 pb-20 md:px-10 md:pt-6 md:pb-24">
          <ScrollReveal className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-heading text-[clamp(32px,6vw,72px)] leading-[1.05] tracking-[-2px] text-text">
              Ready to be found?
            </h2>
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex min-h-[56px] w-full items-center justify-center rounded-full bg-text px-8 text-[15px] font-medium text-white transition-all duration-[400ms] hover:opacity-90 md:mt-10 md:inline-flex md:w-auto md:hover:scale-[1.02]"
            >
              Get a Free Audit
            </a>
          </ScrollReveal>
        </section>
      </main>
      <Footer />
      </div>
    </SmoothScroll>
  );
}
