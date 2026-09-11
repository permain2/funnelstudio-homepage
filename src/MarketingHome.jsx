import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import WhatYouGet from "./WhatYouGet";
import Integrations from "./Integrations";
import { TrustWall, ProofRail } from "./Proof";
import "./MarketingHome.css";

const previewRoot = `${import.meta.env.BASE_URL}cards/`;
export const shotRoot = `${import.meta.env.BASE_URL}shots/`;
const logoPath =
  "M18.6656 4.78218L13.8255 1.99752C12.2418 1.08416 10.3013 1.08416 8.71768 1.99752L3.85524 4.78218C2.29391 5.69554 1.3125 7.38861 1.3125 9.19307V14.7847C1.3125 16.6114 2.29391 18.2822 3.85524 19.1955L8.69538 22.0025C10.279 22.9158 12.2195 22.9158 13.8032 22.0025L18.6433 19.1955C20.2269 18.2822 21.186 16.6114 21.186 14.7847V9.19307C21.2307 7.38861 20.2492 5.69554 18.6656 4.78218ZM11.2604 16.9678C8.51694 16.9678 6.28646 14.7401 6.28646 12C6.28646 9.2599 8.51694 7.03218 11.2604 7.03218C14.0039 7.03218 16.2567 9.2599 16.2567 12C16.2567 14.7401 14.0262 16.9678 11.2604 16.9678Z";
const questions = [
  [
    "What can I build with FunnelStudio?",
    "Create ecommerce landing pages from a prompt, build product pages and advertorials, and connect them into a sales funnel. Use AI to build your funnel structure, then customize checkout, post-purchase offers, and thank-you pages.",
  ],
  [
    "How do I connect my AI assistant?",
    "Create your account, copy an API key, and follow the connection instructions in API Documentation. Use an API-capable AI assistant. Give it the docs and your brief, then review the page or funnel it builds before publishing.",
  ],
  [
    "How does FunnelStudio work with Shopify?",
    "Yes. Connect Shopify to bring your products into FunnelStudio and use them in your funnels. Configure your store and checkout connections in your account before launching.",
  ],
  [
    "Can I customize checkout and upsell flows?",
    "Build and connect checkout, upsell, and downsell steps, and customize the available checkout layouts and settings. Payment processing stays with your configured provider; hosted payment forms have their own limits.",
  ],
  [
    "Can I add a slideout cart?",
    "Yes. Connect product actions to the built-in cart drawer, including quantity, remove, and checkout controls. Its native styling is separate from page styling, so page edits do not automatically restyle the drawer.",
  ],
  [
    "Can I translate pages for new markets?",
    "Ask AI to translate your page content for a new audience, then review the language and local offer before publishing. Checkout currency, tax, and shipping are configured separately.",
  ],
  [
    "Where can I find pricing?",
    "Compare the available plans and their included features on our pricing page.",
  ],
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function Logo() {
  return (
    <Link className="fsw-logo" to="/" aria-label="FunnelStudio home">
      <span className="fsw-logo-mark">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={logoPath} fill="currentColor" fillRule="evenodd" />
        </svg>
      </span>
      <span>FunnelStudio</span>
    </Link>
  );
}
export function StartLink({ children = "Start free", light = false }) {
  return (
    <Link
      className={`fsw-button fsw-button-start${light ? " fsw-button-light" : ""}`}
      to="/register"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
export function Preview({
  image,
  className = "",
  eager = false,
  priority = false,
  alt = "Example ecommerce page design",
}) {
  const portrait = image === "framer-04.webp" || image === "framer-05.webp";
  return (
    <img
      className={className}
      src={`${previewRoot}${image}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      width={portrait ? 720 : 1500}
      height={portrait ? 1290 : 1875}
    />
  );
}
export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const REVEAL_MS = 700; // must match the [data-reveal] transition in the CSS

// Groups that reveal on scroll. Stagger runs within a group, so a row of cards
// arrives as a row rather than four unrelated elements.
const revealGroups = [
  ".fsw-section-heading",
  ".fsw-integration-grid > article",
  ".fsw-comparison-scroll",
  ".fsw-feature-banner > div",
  ".fsw-faq details",
  ".fsw-final > *",
];

// Reveal-on-scroll. Marked from JS rather than in the markup so a 1,800-line
// page opts in by selector instead of by threading a prop through every node.
export function useReveal(rescanKey) {
  useEffect(() => {
    revealGroups.forEach((selector) => {
      // Stagger counts per parent, so five section headings in five different
      // sections each start at 0 rather than the last one waiting 320ms.
      const seen = new Map();
      document.querySelectorAll(selector).forEach((el) => {
        if (el.hasAttribute("data-reveal")) return;
        const index = seen.get(el.parentElement) ?? 0;
        seen.set(el.parentElement, index + 1);
        el.setAttribute("data-reveal", "out");
        if (index) el.style.setProperty("--d", `${Math.min(index, 5) * 80}ms`);
      });
    });
    const nodes = document.querySelectorAll('[data-reveal="out"]');
    if (!nodes.length) return undefined;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((el) => el.setAttribute("data-reveal", "in"));
      return undefined;
    }
    const timers = [];
    let observerFired = false;
    const io = new IntersectionObserver(
      (entries) => {
        observerFired = true;
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-reveal", "in");
          io.unobserve(entry.target);
          // The stagger is for arrival only; leaving it set would delay the
          // element's hover transition by the same amount.
          const delay = parseFloat(entry.target.style.getPropertyValue("--d"));
          if (delay)
            timers.push(
              setTimeout(
                () => entry.target.style.setProperty("--d", "0ms"),
                REVEAL_MS + delay,
              ),
            );
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    nodes.forEach((el) => io.observe(el));
    // A working observer delivers an initial batch as soon as it observes, even
    // when nothing intersects. If none arrives, it is not running here — some
    // in-app webviews and screenshot renderers — and copy hidden behind it
    // would never come back. Reveal everything rather than lose the page.
    timers.push(
      setTimeout(() => {
        if (observerFired) return;
        io.disconnect();
        document
          .querySelectorAll('[data-reveal="out"]')
          .forEach((el) => el.setAttribute("data-reveal", "in"));
      }, 2000),
    );
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [rescanKey]);
}

// Pointer-tracked highlight for [data-spot] cards, via one passive listener.
export function useSpotlight() {
  useEffect(() => {
    document
      .querySelectorAll(".itg-grid article,.wyg-card,.fsw-faq details")
      .forEach((el) => el.setAttribute("data-spot", ""));
    if (window.matchMedia("(hover: none)").matches || reducedMotion())
      return undefined;
    const onMove = (event) => {
      const card = event.target.closest?.("[data-spot]");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}

const heroPrompt =
  "Clone our best product page, rebuild it for the travel angle, connect Stripe checkout and a berberine upsell, then send me a preview link.";
const heroSteps = [
  { name: "Landing page", meta: "travel angle" },
  { name: "Checkout", meta: "Stripe" },
  { name: "Upsell", meta: "Berberine · 1-click" },
  { name: "Thank you", meta: "order details" },
];
const TYPE_MS = 17;
const STEP_MS = 520;
const SETTLE_MS = 420;
const HOLD_MS = 2600;
const BUILD_START = { typed: 0, step: -1 };
const BUILD_END = { typed: heroPrompt.length, step: heroSteps.length };

// One rAF loop drives the whole hero. State only updates when a derived value
// actually changes, so the sequence costs ~2 renders per second, not 60.
// `showEnd` is the static path (reduced motion, no IntersectionObserver);
// `running` false just freezes wherever the sequence got to.
function useBuildTimeline(running, showEnd) {
  const [state, setState] = useState(showEnd ? BUILD_END : BUILD_START);
  const last = useRef(state);
  useEffect(() => {
    if (showEnd) {
      last.current = BUILD_END;
      setState(BUILD_END);
      return undefined;
    }
    if (!running) return undefined;
    const typeEnd = heroPrompt.length * TYPE_MS;
    const stepStart = typeEnd + SETTLE_MS;
    const loop = stepStart + (heroSteps.length + 1) * STEP_MS + HOLD_MS;
    let raf = 0;
    let start;
    last.current = { typed: -1, step: -2 };
    const tick = (now) => {
      if (start === undefined) start = now;
      const t = (now - start) % loop;
      const typed = Math.min(heroPrompt.length, Math.floor(t / TYPE_MS));
      const step =
        t < stepStart
          ? -1
          : Math.min(heroSteps.length, Math.floor((t - stepStart) / STEP_MS));
      if (typed !== last.current.typed || step !== last.current.step) {
        last.current = { typed, step };
        setState(last.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, showEnd]);
  return state;
}

export function HeroBuild() {
  const stage = useRef(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  // Decided during the first render, not in an effect, so the static path
  // paints its finished state instead of flashing an empty terminal first.
  const [showEnd] = useState(
    () => reducedMotion() || !("IntersectionObserver" in window),
  );
  useEffect(() => {
    if (showEnd) return undefined;
    const node = stage.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [showEnd]);
  const { typed, step } = useBuildTimeline(inView && !paused, showEnd);
  const built = step >= heroSteps.length;
  return (
    <div className="fsh-stage" ref={stage}>
      <div className="fsh-terminal">
        <div className="fsh-terminal-bar">
          <i />
          <i />
          <i />
          <span>your terminal</span>
          {!showEnd && (
            <button
              type="button"
              className="fsh-pause"
              onClick={() => setPaused(!paused)}
              aria-label={
                paused
                  ? "Play the funnel build animation"
                  : "Pause the funnel build animation"
              }
            >
              <span aria-hidden="true">{paused ? "▶" : "❚❚"}</span>
            </button>
          )}
        </div>
        {/* The visible line retypes on a loop, so assistive tech reads the
            static copy below it rather than a stream of partial words. The
            untyped remainder stays in flow but hidden, so the box never
            changes height mid-sequence and shifts the funnel card below it. */}
        <p className="fsh-terminal-body" aria-hidden="true">
          <span className="fsh-prompt-mark">›</span>
          <span>{heroPrompt.slice(0, typed)}</span>
          <span
            className={`fsh-caret${typed >= heroPrompt.length ? " is-idle" : ""}`}
          />
          <span className="fsh-untyped">{heroPrompt.slice(typed)}</span>
        </p>
        <p className="fsh-sr">
          Example prompt: {heroPrompt} FunnelStudio builds these steps:{" "}
          {heroSteps.map((item) => item.name).join(", ")}.
        </p>
      </div>
      <div className="fsh-funnel" aria-hidden="true">
        <span className="fsh-funnel-label">
          Your funnel
          <b className={built ? "is-live" : ""}>
            {built ? "Live" : "Building"}
          </b>
        </span>
        <ol className="fsh-steps">
          {heroSteps.map((item, index) => (
            <li
              key={item.name}
              className={
                step > index ? "is-done" : step === index ? "is-active" : ""
              }
            >
              <span className="fsh-step-dot" />
              <span className="fsh-step-name">{item.name}</span>
              <span className="fsh-step-meta">{item.meta}</span>
            </li>
          ))}
        </ol>
        <div className={`fsh-render${built ? " is-built" : ""}`}>
          <Preview image="framer-01.webp" eager priority alt="" />
        </div>
        {!built && (
          <span className="fsh-sweep" aria-hidden="true">
            <i />
          </span>
        )}
      </div>
    </div>
  );
}

// Each vendor's own icon, vendored locally rather than hotlinked. Marks remain
// their owners' trademarks; shown here only to name what a funnel connects to.
export const iconRoot = `${import.meta.env.BASE_URL}icons/`;
const iconSlug = {
  "Claude Code": "claude",
  Codex: "openai",
  Cursor: "cursor",
  Stripe: "stripe",
  PayPal: "paypal",
  NMI: "nmi",
  Shopify: "shopify",
  Klaviyo: "klaviyo",
  Zamp: "zamp",
  Meta: "facebook",
  Google: "google",
  HYROS: "hyros",
  ClickMagick: "clickmagick",
};
export function BrandIcon({ name, size = 20 }) {
  const slug = iconSlug[name];
  if (!slug) return null;
  return (
    <img
      className="fsh-mark"
      src={`${iconRoot}${slug}.webp`}
      alt=""
      width={size}
      height={size}
      decoding="async"
    />
  );
}
export function StackMark({ name }) {
  return (
    <li>
      <BrandIcon name={name} />
      {name}
    </li>
  );
}

const buildSurfaces = ["Claude Code", "Codex", "Cursor", "your terminal"];
export function Rotator() {
  const [i, setI] = useState(0);
  const [text, setText] = useState(buildSurfaces[0]);
  const [typing, setTyping] = useState(true);
  // Typewriter: type the surface, hold it long enough to read, backspace, next.
  // The icon swaps while the word is empty, so it never changes mid-word.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const word = buildSurfaces[i];
    if (typing) {
      if (text.length < word.length) {
        const t = setTimeout(() => setText(word.slice(0, text.length + 1)), 58);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 1750);
      return () => clearTimeout(t);
    }
    if (text.length) {
      const t = setTimeout(() => setText(word.slice(0, text.length - 1)), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setI((n) => (n + 1) % buildSurfaces.length);
      setTyping(true);
    }, 260);
    return () => clearTimeout(t);
  }, [text, typing, i]);
  return (
    <span className="fsh-rot">
      {/* The widest option holds the box so the line never reflows mid-swap. */}
      <span className="fsh-rot-ghost" aria-hidden="true">
        <BrandIcon name="Claude Code" size={44} />
        {buildSurfaces.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <span className="fsh-rot-live">
        <BrandIcon name={buildSurfaces[i]} size={44} />
        <span className="fsh-rot-text">{text}</span>
        <i className="fsh-rot-caret" aria-hidden="true" />
      </span>
      <span className="fsh-sr">{buildSurfaces[i]}</span>
    </span>
  );
}


export const stackLogos = [
  "Stripe",
  "PayPal",
  "NMI",
  "Shopify",
  "Klaviyo",
  "Zamp",
  "Claude Code",
];

export default function MarketingHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  useReveal(0);
  useSpotlight();
  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <div className="fsw-home">
      <Helmet>
        <title>FunnelStudio — Your ecommerce store, built with AI</title>
        <meta
          name="description"
          content="Create custom checkout pages, upsell flows, and thank-you pages with AI. Preview split-test variations and translate page content for new markets."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700&family=Wix+Madefor+Text:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </Helmet>
      <a className="fsw-skip" href="#main-content">
        Skip to content
      </a>
      <header className="fsw-header">
        <Logo />
        <button
          className="fsw-menu-toggle"
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="fsw-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav
          id="fsw-navigation"
          className={`fsw-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          <a href="#canvas">Product</a>
          <a href="#templates">Use cases</a>
          <Link to="/top-funnels">Templates</Link>
          <Link to="/pricing">Pricing</Link>
          <div className="fsw-nav-auth">
            <Link to="/login">Log in</Link>
            <Link
              className="fsw-nav-demo"
              to="https://calendly.com/markusa/markus-call-ecom"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a demo
            </Link>
            <Link className="fsw-nav-start" to="/register">
              Start free
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content">
        <section className="fsw-hero fsh-hero">
          <div className="fsh-hero-inner">
            <div className="fsh-hero-copy">
              <h1>
                Build your ecommerce store
                <br />
                <span>from</span> <Rotator />
              </h1>
              <p>
                Build advertorials, checkout pages, upsell flows and split
                tests entirely from your terminal in minutes.
              </p>
              <div className="fsh-hero-actions">
                <StartLink />
              </div>
              <p className="fsh-hero-note">
                If revenue per visitor doesn’t rise 20% in 90 days,{" "}
                <b>we refund you in full.</b>
                <span className="fsh-check" aria-hidden="true">
                  ✓
                </span>
              </p>
            </div>
          </div>
        </section>
        <TrustWall />
        <WhatYouGet />
        <Integrations />
        <section
          className="fsw-comparison fsw-section"
          id="compare"
          aria-labelledby="fsw-compare-title"
        >
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">CHOOSE YOUR WORKFLOW</span>
              <h2 id="fsw-compare-title">
                Same commerce stack.
                <br />A different way to run it.
              </h2>
            </div>
            <p>
              Compare how you build, connect, and test your funnel—not just
              which payment methods it supports.
            </p>
          </div>
          <p className="fsw-table-hint" id="fsw-table-hint">
            Compare workflows below. On smaller screens, scroll the table
            sideways.
          </p>
          <div
            className="fsw-comparison-scroll"
            role="region"
            aria-label="Funnel builder workflow comparison"
            aria-describedby="fsw-table-hint"
            tabIndex={0}
          >
            <table>
              <caption>
                Funnelish, CheckoutChamp, and FunnelStudio workflow comparison
              </caption>
              <thead>
                <tr>
                  <th scope="col">Your workflow</th>
                  <th scope="col">Funnelish</th>
                  <th scope="col">CheckoutChamp</th>
                  <th scope="col">
                    FunnelStudio<span>Prompt. Preview. Refine.</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Build a page",
                    "Visual funnel builder",
                    "Page builder and funnel visualizer",
                    "Clone URLs and edit with AI through API/MCP",
                  ],
                  [
                    "Choose a starting point",
                    "Templates or support-assisted cloning",
                    "Pages and templates",
                    "Start from a URL, then adapt it",
                  ],
                  [
                    "Connect checkout & offers",
                    "Checkout, upsells, and downsells",
                    "Checkout, upsells, and downsells",
                    "Connect pages into checkout and offer flows",
                  ],
                  [
                    "Work with your AI assistant",
                    "Integrations available",
                    "MCP and AI-assisted page building",
                    "Use page and funnel tools from Claude Code or Codex",
                  ],
                  [
                    "Adapt your brand",
                    "Edit content and styles",
                    "AI tools and page editor",
                    "Prompt copy, image and brand changes, then review",
                  ],
                ].map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fsw-comparison-notes">
            <p>
              Compare the workflow that fits your team. Features and payment
              behavior depend on configuration and provider support.
            </p>
            <p>
              References:{" "}
              <a
                href="https://community.funnelish.com/t/funnelish-quick-start-guide/9875"
                target="_blank"
                rel="noopener noreferrer"
              >
                Funnelish guide
              </a>{" "}
              ·{" "}
              <a
                href="https://community.funnelish.com/t/done-for-you-funnel-cloning-service/9961"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloning service
              </a>{" "}
              ·{" "}
              <a
                href="https://help.checkoutchamp.com/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
              >
                CheckoutChamp docs
              </a>{" "}
              · <Link to="/api-docs">FunnelStudio API</Link>
            </p>
          </div>
        </section>
        <section className="fsw-feature-banner">
          <div>
            <span className="fsw-eyebrow">BUILT WITH YOU</span>
            <h2>
              What should
              <br />
              we build next?
            </h2>
            <p>
              The best ideas come from the people using it.
              <br />
              Tell us what would make your next launch easier.
            </p>
            <Link className="fsw-button" to="/contact?subject=feature-request">
              Suggest a feature <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="fsw-feature-art" aria-hidden="true">
            <span className="fsw-feature-kicker">FUNNELSTUDIO FEATURES</span>
            <div className="fsw-idea-card">
              <span>YOUR NEXT IDEA</span>
              <strong>What if we could…</strong>
              <div>
                <i />
                <i />
                <i />
              </div>
              <span className="fsw-idea-plus">+</span>
            </div>
            <span className="fsw-feature-footnote">
              A little feedback. A better studio.
            </span>
          </div>
        </section>
        <ProofRail />
        <section className="fsw-faq fsw-section">
          <div>
            <span className="fsw-eyebrow">
              A FEW THINGS YOU MIGHT BE WONDERING
            </span>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <div>
            {questions.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  {answer}
                  {index === questions.length - 1 && (
                    <>
                      {" "}
                      <Link to="/pricing">See pricing →</Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="fsw-final">
          <span className="fsw-eyebrow">THE NEXT IDEA IS YOURS</span>
          <h2>
            Let’s put it
            <br />
            out into the world.
          </h2>
          <div className="fsw-hero-actions">
            <Link
              className="fsw-button fsw-button-demo"
              to="https://calendly.com/markusa/markus-call-ecom"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a demo
            </Link>
            <StartLink light />
          </div>
        </section>
      </main>
      <footer className="fsw-footer">
        <div className="fsw-footer-top">
          <div>
            <Logo />
            <p>
              Your products. Your prompts.
              <br />
              Your next winning variation.
            </p>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#canvas">Prompt to build</a>
            <Link to="/top-funnels">Templates</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact?subject=feature-request">
              FunnelStudio Features
            </Link>
          </div>
          <div>
            <h3>Resources</h3>
            <Link to="/docs">Documentation</Link>
            <Link to="/support">Support</Link>
          </div>
          <div>
            <h3>FunnelStudio</h3>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Get started</Link>
          </div>
        </div>
        <div className="fsw-footer-bottom">
          <span>© {new Date().getFullYear()} FunnelStudio</span>
          <div>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms-of-service">Terms of service</Link>
            <Link to="/refund">Refund policy</Link>
          </div>
          <span>Made for your next idea.</span>
        </div>
      </footer>
    </div>
  );
}
