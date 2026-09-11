// Their "Grow visibility without manual work" bento, rebuilt for what
// FunnelStudio actually does — and, like theirs, every card carries a looping
// motion demo rather than a screenshot. Their grammar (auto-publish.mp4,
// geo.mp4): a literal, simplified UI drawn in code, one state change per beat,
// hairlines and whitespace, nothing decorative. All motion is CSS keyframes
// gated on [data-reveal="in"], so nothing animates off-screen.

import FunnelForge from "./FunnelForge";
import FeatureVariant from "./FeatureVariants";

export const languages = [
  ["🇺🇸", "English"],
  ["🇩🇪", "German"],
  ["🇫🇷", "French"],
  ["🇪🇸", "Spanish"],
  ["🇲🇽", "Mex. Spanish"],
  ["🇮🇹", "Italian"],
  ["🇵🇹", "Portuguese"],
  ["🇧🇷", "Brazilian"],
  ["🇳🇱", "Dutch"],
  ["🇸🇪", "Swedish"],
  ["🇳🇴", "Norwegian"],
  ["🇩🇰", "Danish"],
  ["🇫🇮", "Finnish"],
  ["🇵🇱", "Polish"],
  ["🇨🇿", "Czech"],
  ["🇷🇴", "Romanian"],
  ["🇭🇺", "Hungarian"],
  ["🇬🇷", "Greek"],
  ["🇹🇷", "Turkish"],
  ["🇯🇵", "Japanese"],
  ["🇰🇷", "Korean"],
  ["🇦🇪", "Arabic"],
];

// A page of copy rewriting itself: the caret sweeps down and each grey
// placeholder line is replaced by the branded line underneath it.
export function ArtVoice() {
  const lines = [
    ["Stop guessing at your angle", 78],
    ["Built for the 3pm crash, not the gym", 94],
    ["Third-party tested, made in the EU", 86],
    ["Ships free today", 52],
  ];
  return (
    <div className="wa wa-voice" aria-hidden="true">
      <div className="wa-page">
        <div className="wa-page-bar">
          <i />
          <i />
          <i />
        </div>
        {lines.map(([text, w], i) => (
          <div className="wa-line" key={text} style={{ "--i": i }}>
            <span className="wa-ghost" style={{ width: `${w}%` }} />
            <span className="wa-real">{text}</span>
          </div>
        ))}
        <span className="wa-caret" />
      </div>
    </div>
  );
}

// The ladder: three tiers, the middle one gets picked, the bump ticks on and
// the total steps up — their geo.mp4 counter beat, applied to an offer.
export function ArtOffer() {
  const tiers = [
    ["1 bottle", "$29"],
    ["3 bottles", "$69"],
    ["6 bottles", "$119"],
  ];
  return (
    <div className="wa wa-offer" aria-hidden="true">
      <div className="wa-tiers">
        {tiers.map(([name, price], i) => (
          <div className="wa-tier" key={name} style={{ "--i": i }}>
            <b>{name}</b>
            <span>{price}</span>
            {i === 1 && <em className="wa-pop">Most popular</em>}
          </div>
        ))}
      </div>
      <div className="wa-bump">
        <span className="wa-check" />
        Add the 90-day guarantee
        <b>+$9</b>
      </div>
      <div className="wa-total">
        Order total
        <span className="wa-roll">
          <i>$69</i>
          <i>$78</i>
        </span>
      </div>
    </div>
  );
}

// Domain lands, SSL padlock draws, the step flips to Live.
export function ArtPublish() {
  return (
    <div className="wa wa-publish" aria-hidden="true">
      <div className="wa-url">
        <svg className="wa-lock" viewBox="0 0 24 24">
          <path d="M7 11V8a5 5 0 0 1 10 0v3" />
          <rect x="5" y="11" width="14" height="9" rx="2.5" />
        </svg>
        <span className="wa-type">yourbrand.com</span>
        <i className="wa-cursor" />
      </div>
      <div className="wa-status">
        <span className="wa-dot" />
        Live
      </div>
    </div>
  );
}

// The hub, straight out of auto-publish.mp4: rings, dashed spokes, and one
// charge travelling out to each processor in turn. The stage is a fixed px box
// so the ring geometry and the chip offsets are the same numbers — percentage
// positioning would drift against the SVG's letterbox.
const HUB = { w: 236, h: 168, r: 66, nodes: [["Stripe", -90], ["PayPal", 34], ["NMI", 146]] };

export function ArtCheckout() {
  const cx = HUB.w / 2;
  const cy = HUB.h / 2;
  return (
    <div className="wa wa-hub" aria-hidden="true">
      <div className="wa-stage">
        <svg className="wa-rings" viewBox={`0 0 ${HUB.w} ${HUB.h}`}>
          {[30, 48, HUB.r].map((r) => (
            <circle key={r} cx={cx} cy={cy} r={r} />
          ))}
          {HUB.nodes.map(([name, deg], i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={name}
                className="wa-spoke"
                style={{ "--i": i }}
                x1={cx}
                y1={cy}
                x2={cx + Math.cos(rad) * HUB.r}
                y2={cy + Math.sin(rad) * HUB.r}
              />
            );
          })}
        </svg>
        <span className="wa-core">
          <svg viewBox="0 0 24 24">
            <path
              d="M18.67 4.78 13.83 2a4.9 4.9 0 0 0-5.11 0L3.86 4.78A4.6 4.6 0 0 0 1.31 9.19v5.6a4.6 4.6 0 0 0 2.55 4.4l4.84 2.81a4.9 4.9 0 0 0 5.1 0l4.85-2.81a4.6 4.6 0 0 0 2.54-4.4v-5.6a4.6 4.6 0 0 0-2.52-4.41ZM11.26 16.97A4.97 4.97 0 1 1 16.26 12a4.97 4.97 0 0 1-5 4.97Z"
              fill="currentColor"
            />
          </svg>
        </span>
        {HUB.nodes.map(([name, deg], i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <span
              className="wa-node"
              key={name}
              style={{
                "--i": i,
                left: `${((cx + Math.cos(rad) * HUB.r) / HUB.w) * 100}%`,
                top: `${((cy + Math.sin(rad) * HUB.r) / HUB.h) * 100}%`,
              }}
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// A/B: traffic splits, B's number climbs, B takes the badge.
export function ArtTest() {
  return (
    <div className="wa wa-test" aria-hidden="true">
      <div className="wa-ab">
        <div className="wa-var">
          <b>A</b>
          <span className="wa-rate">2.1%</span>
        </div>
        <div className="wa-var wa-var-win">
          <b>B</b>
          <span className="wa-rate wa-roll">
            <i>2.1%</i>
            <i>3.4%</i>
          </span>
          <em className="wa-badge">Winner</em>
        </div>
      </div>
      <div className="wa-split">
        <span />
      </div>
    </div>
  );
}

const cards = [
  {
    k: "voice",
    wide: true,
    title: "Pages that sound like your brand",
    copy: "Clone a page that already converts, then have the copy rewritten for your angle and your voice — not generic AI filler.",
    Art: ArtVoice,
  },
  {
    k: "offer",
    wide: true,
    title: "The offer, priced and stacked",
    copy: "Build the ladder, attach what ships free with the bundle, and put the one-click upsell after the pay button.",
    Art: ArtOffer,
  },
  {
    k: "publish",
    title: "Publish without touching a server",
    copy: "Your own domain, SSL issued for you, live in minutes.",
    chips: ["Custom domain", "Auto SSL"],
    Art: ArtPublish,
  },
  {
    k: "checkout",
    title: "Checkout stays yours",
    copy: "Your merchant account, your payouts. FunnelStudio never sits in the middle.",
    chips: ["Stripe", "PayPal", "NMI"],
    Art: ArtCheckout,
  },
  {
    k: "test",
    title: "Test without rebuilding",
    copy: "Split a funnel, send traffic, keep the winner. No second build.",
    chips: ["A/B tests", "Per-step analytics"],
    Art: ArtTest,
  },
];

export default function WhatYouGet() {
  // ?f=1..5 swaps the feature section body; the head stays so the variations
  // are compared like for like.
  const f = new URLSearchParams(location.search).get("f");
  if (f && /^[1-5]$/.test(f)) return <FeatureVariant n={Number(f)} />;
  return (
    <section className="wyg" id="what-you-get" aria-labelledby="wyg-title">
      <div className="wyg-head" data-reveal="out">
        <span className="fsh-eyebrow">
          <i aria-hidden="true" /> What you get
        </span>
        <h2 id="wyg-title">Run the offer, not the plumbing</h2>
      </div>

      <FunnelForge />

      <div className="wyg-grid">
        {cards.map((c, i) => (
          <article
            key={c.k}
            className={`wyg-card${c.wide ? " is-wide" : ""}`}
            data-reveal="out"
            style={{ "--i": i }}
          >
            <h3>{c.title}</h3>
            <p>{c.copy}</p>
            {c.chips && (
              <ul className="wyg-chips">
                {c.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            )}
            <div className={`wyg-art${c.wide ? "" : " is-small"}`}>
              <c.Art />
            </div>
          </article>
        ))}

        <article
          className="wyg-card wyg-lang"
          data-reveal="out"
          style={{ "--i": 5 }}
        >
          <h3>Sell the same funnel in 20+ markets</h3>
          <p>
            Translate the page, the checkout copy and the offer, then review the
            local wording before it goes live. Currency, tax and shipping stay
            configured per market.
          </p>
          <ul className="wyg-flags">
            {languages.map(([flag, name], i) => (
              <li key={name} style={{ "--i": i }}>
                <span aria-hidden="true">{flag}</span>
                {name}
              </li>
            ))}
          </ul>
          <p className="wyg-lang-note">
            Missing a market? Ask and we’ll add it.
          </p>
        </article>
      </div>
    </section>
  );
}
