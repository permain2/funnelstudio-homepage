import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  HeroBuild,
  Logo,
  StackMark,
  StartLink,
  reducedMotion,
  stackLogos,
  useReveal,
  useSpotlight,
} from "./MarketingHome";
import "./MarketingHome.css";
import "./VariantConsole.css";

// Counts up once, when the number first comes into view. Skipped entirely under
// reduced motion so the figure is simply correct from the first paint.
function Counter({ to, suffix = "", prefix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(() => (reducedMotion() ? to : 0));
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window))
      return undefined;
    const node = ref.current;
    if (!node) return undefined;
    let raf = 0;
    let start;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const tick = (now) => {
          if (start === undefined) start = now;
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(to * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// The funnel as a drawn diagram: paths stroke themselves in, nodes pop, and a
// pulse travels the accept path. No images anywhere in this variant.
function FlowDiagram() {
  const nodes = [
    { x: 60, y: 130, label: "Landing", meta: "cloned" },
    { x: 250, y: 130, label: "Checkout", meta: "Stripe" },
    { x: 440, y: 60, label: "Upsell", meta: "accepted" },
    { x: 440, y: 200, label: "Downsell", meta: "declined" },
    { x: 630, y: 130, label: "Thank you", meta: "receipt" },
  ];
  const edges = [
    "M150,130 L250,130",
    "M340,130 C380,130 390,60 440,60",
    "M340,130 C380,130 390,200 440,200",
    "M530,60 C580,60 590,130 630,130",
    "M530,200 C580,200 590,130 630,130",
  ];
  return (
    <figure className="vc-flow" data-reveal="out">
      <svg
        viewBox="0 0 760 270"
        role="img"
        aria-label="A funnel: landing page to checkout, then an upsell that branches to a downsell when declined, both arriving at the thank-you page"
      >
        {edges.map((d, i) => (
          <path key={d} className="vc-edge" d={d} style={{ "--i": i }} />
        ))}
        <circle className="vc-pulse" r="4">
          <animateMotion
            dur="3.4s"
            repeatCount="indefinite"
            path="M150,130 L250,130 C300,130 390,60 440,60 C530,60 590,130 630,130"
          />
        </circle>
        {nodes.map((n, i) => (
          <g key={n.label} className="vc-node" style={{ "--i": i }}>
            <rect x={n.x} y={n.y - 26} width="90" height="52" rx="11" />
            <text
              x={n.x + 45}
              y={n.y - 4}
              textAnchor="middle"
              className="vc-node-label"
            >
              {n.label}
            </text>
            <text
              x={n.x + 45}
              y={n.y + 13}
              textAnchor="middle"
              className="vc-node-meta"
            >
              {n.meta}
            </text>
          </g>
        ))}
      </svg>
      <figcaption>
        Every branch is a page you can open, edit and publish.
      </figcaption>
    </figure>
  );
}

// A checkout that assembles itself out of rectangles — the shape of the thing
// without a screenshot of it.
function WireCheckout() {
  const rows = [
    { w: "38%", tag: "Contact" },
    { w: "100%", field: true },
    { w: "30%", tag: "Delivery" },
    { w: "100%", field: true },
    { w: "48%", field: true, inline: true },
    { w: "48%", field: true, inline: true },
    { w: "34%", tag: "Payment" },
    { w: "100%", field: true },
  ];
  return (
    <div className="vc-wire" data-reveal="out" aria-hidden="true">
      <div className="vc-wire-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="vc-wire-body">
        {rows.map((r, i) => (
          <div
            key={i}
            className={`vc-wire-row${r.field ? " is-field" : ""}${r.inline ? " is-inline" : ""}`}
            style={{ width: r.w, "--i": i }}
          >
            {r.tag}
          </div>
        ))}
        <div className="vc-wire-cta" style={{ "--i": rows.length }}>
          Pay now
        </div>
      </div>
    </div>
  );
}

const prompts = [
  {
    k: "Clone",
    body: "Clone the winning competitor page and rewrite it for our angle.",
  },
  {
    k: "Price",
    body: "Add a three-tier ladder at $19, $23 and $26 a bottle with savings badges.",
  },
  {
    k: "Bump",
    body: "Put a free shipping bump above the pay button and a 1-click upsell after it.",
  },
  {
    k: "Ship",
    body: "Point it at checkout.ourdomain.com, run the preflight, then publish.",
  },
];

export default function VariantConsole() {
  useReveal(0);
  useSpotlight();
  return (
    <div className="fsw-home vc">
      <Helmet>
        <title>FunnelStudio — Build the whole funnel from your terminal</title>
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
        <nav className="fsw-navigation" aria-label="Main navigation">
          <a href="#flow">How it works</a>
          <a href="#prompts">Prompts</a>
          <Link to="/pricing">Pricing</Link>
          <div className="fsw-nav-auth">
            <Link to="/login">Log in</Link>
            <Link className="fsw-nav-start" to="/register">
              Start free
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content">
        <section className="vc-hero">
          <div className="vc-hero-copy">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> API + MCP · no dashboard required
            </span>
            <h1>
              Your funnel is a<br />
              <span>command away.</span>
            </h1>
            <p>
              FunnelStudio exposes the whole commerce stack over an API your
              coding agent already knows how to drive. Describe the funnel, read
              back a preview link, publish when it is right.
            </p>
            <div className="fsh-hero-actions">
              <StartLink />
              <Link className="fsw-button fsh-button-ghost" to="/api-docs">
                Read the API docs
              </Link>
            </div>
            <p className="vc-hero-note">
              <b>Works from</b> Claude Code · Codex · Cursor · curl
            </p>
          </div>
          <HeroBuild />
        </section>

        <section className="vc-metrics" aria-label="What the stack covers">
          {[
            {
              n: 5,
              s: "",
              label: "steps in a funnel",
              sub: "landing → thank-you",
            },
            {
              n: 3,
              s: "",
              label: "payment providers",
              sub: "Stripe, PayPal, NMI",
            },
            {
              n: 1,
              s: "",
              label: "API key to start",
              sub: "x-api-key, that's it",
            },
            {
              n: 60,
              s: "s",
              label: "to clone a page",
              sub: "typical, not a promise",
            },
          ].map((m) => (
            <div key={m.label} data-reveal="out">
              <strong>
                <Counter to={m.n} suffix={m.s} />
              </strong>
              <span>{m.label}</span>
              <small>{m.sub}</small>
            </div>
          ))}
        </section>

        <section className="vc-section" id="flow">
          <div className="vc-head" data-reveal="out">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> The shape of it
            </span>
            <h2>
              One funnel. Every branch
              <br />
              <span>already wired.</span>
            </h2>
          </div>
          <FlowDiagram />
        </section>

        <section className="vc-section vc-split" id="prompts">
          <div className="vc-head vc-head-left" data-reveal="out">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> What you actually type
            </span>
            <h2>
              Four prompts from
              <br />
              <span>empty to published.</span>
            </h2>
            <p>
              These are the real shapes of request the API answers. Each returns
              a preview link you approve before anything goes live.
            </p>
          </div>
          <ol className="vc-prompts">
            {prompts.map((p, i) => (
              <li key={p.k} data-reveal="out" style={{ "--i": i }}>
                <span className="vc-prompt-k">{p.k}</span>
                <code>{p.body}</code>
              </li>
            ))}
          </ol>
        </section>

        <section className="vc-section vc-wire-section">
          <div className="vc-head" data-reveal="out">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> Checkout you control
            </span>
            <h2>
              Your layout, your fields,
              <br />
              <span>your merchant account.</span>
            </h2>
          </div>
          <WireCheckout />
        </section>

        <section className="fsh-wall vc-wall">
          <p className="fsh-wall-lead">
            <b>Runs on the stack you already pay for</b> — bring your own
            accounts, keep your processor
          </p>
          <ul className="fsh-wall-grid">
            {stackLogos.map((name) => (
              <StackMark key={name} name={name} />
            ))}
          </ul>
        </section>

        <section className="vc-final">
          <h2>
            Open a terminal.
            <br />
            <span>Ship a funnel.</span>
          </h2>
          <div className="fsh-hero-actions">
            <StartLink />
          </div>
        </section>
      </main>
      <footer className="fsw-footer">
        <div className="fsw-footer-bottom">
          <span>© {new Date().getFullYear()} FunnelStudio</span>
          <span>Variation B · Console</span>
        </div>
      </footer>
    </div>
  );
}
