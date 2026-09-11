import { useEffect, useRef, useState } from "react";
import { reducedMotion, shotRoot } from "./MarketingHome";

// BabyLoveGrowth's "Organic growth made simple" device: one card at a time,
// numbered, copy and chips on the left, the product on the right, a segmented
// progress bar and prev/next underneath. Auto-advances, pauses on hover or
// focus, and never auto-advances under reduced motion.
const steps = [
  {
    n: "01",
    title: "Start from a page that already works",
    copy: "Point FunnelStudio at any URL. It clones the page, keeps your brand, and hands back something you can edit rather than a blank canvas.",
    chips: ["URL clone", "Brand match"],
    shot: "checkout",
    alt: "A cloned checkout page from a live funnel",
  },
  {
    n: "02",
    title: "Price it, then stack the offer",
    copy: "Build the ladder — two, four, six — with savings badges that do the arithmetic for the shopper. Change it when the margin changes.",
    chips: ["Tiered pricing", "Savings badges"],
    shot: "bundles",
    alt: "Three bundle tiers with per-unit pricing",
  },
  {
    n: "03",
    title: "Wire the bumps and the upsell",
    copy: "Add what ships with the bundle before the pay button, and the one-click offer after it. Accept and decline both land somewhere sensible.",
    chips: ["Order bumps", "1-click upsell"],
    shot: "bumps",
    alt: "Order bumps included with a bundle",
  },
  {
    n: "04",
    title: "Publish on your domain",
    copy: "Your processor, your payouts, your domain. Run the preflight, take the preview link, and push it live when it reads right.",
    chips: ["Custom domain", "Stripe · PayPal · NMI"],
    shot: "payment",
    alt: "The card payment step of a live checkout",
  },
];

export default function HowItWorks() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  const region = useRef(null);
  useEffect(() => {
    if (held || reducedMotion()) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % steps.length), 6000);
    return () => clearInterval(id);
  }, [held, i]);
  const go = (d) => setI((n) => (n + d + steps.length) % steps.length);
  const step = steps[i];
  return (
    <section className="hiw" id="how-it-works" aria-labelledby="hiw-title">
      <div className="hiw-head" data-reveal="out">
        <span className="fsh-eyebrow">
          <i aria-hidden="true" /> How it works
        </span>
        <h2 id="hiw-title">Funnels, made simple</h2>
      </div>
      <div
        className="hiw-card"
        ref={region}
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocusCapture={() => setHeld(true)}
        onBlurCapture={() => setHeld(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(-1);
          }
        }}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="How FunnelStudio works, four steps"
      >
        <div className="hiw-copy">
          <span className="hiw-n">{step.n}</span>
          <h3 aria-live="polite">{step.title}</h3>
          <p>{step.copy}</p>
          <ul className="hiw-chips">
            {step.chips.map((c) => (
              <li key={c}>
                <span aria-hidden="true">✓</span>
                {c}
              </li>
            ))}
          </ul>
          <div className="hiw-controls">
            <div className="hiw-bars" role="presentation">
              {steps.map((s, n) => (
                <button
                  key={s.n}
                  type="button"
                  className={n === i ? "is-on" : ""}
                  onClick={() => setI(n)}
                  aria-label={`Step ${n + 1}: ${s.title}`}
                  aria-current={n === i ? "true" : undefined}
                />
              ))}
            </div>
            <div className="hiw-arrows">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous step"
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next step"
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>
        </div>
        <div className="hiw-art">
          {steps.map((s, n) => (
            <img
              key={s.shot}
              src={`${shotRoot}${s.shot}.webp`}
              alt={n === i ? s.alt : ""}
              width="1000"
              height="640"
              loading={n === 0 ? "eager" : "lazy"}
              decoding="async"
              className={n === i ? "is-on" : ""}
              aria-hidden={n === i ? undefined : "true"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
