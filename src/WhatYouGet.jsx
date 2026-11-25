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
  // The same PDP, rewritten for four of this week's winning ad angles.
  const lines = [
    ["Built for the 3pm crash, not the gym", 94],
    ["The sleep stack that doesn’t leave you groggy", 98],
    ["Third-party tested, made in the EU", 86],
    ["For the week your focus falls off a cliff", 96],
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

// Any checkout: the same form re-flows between 1, 3 and 6 steps on a loop,
// with the processors it can run on as a quiet row underneath.
export function ArtCheckout() {
  const procs = ["stripe", "paypal", "nmi", "checkout", "shopify"];
  return (
    <div className="wa wa-steps" aria-hidden="true">
      <div className="wa-stepbar">
        {["1 step", "3 step", "6 step"].map((l, i) => (
          <span className="wa-stepchip" key={l} style={{ "--i": i }}>{l}</span>
        ))}
      </div>
      <div className="wa-form">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <span className="wa-frow" key={n} style={{ "--n": n }}>
            <i className="wa-fnum">{n + 1}</i>
            <i className="wa-fline" />
            <i className="wa-fline is-short" />
          </span>
        ))}
        <span className="wa-fpay">Pay</span>
      </div>
      <ul className="wa-procs">
        {procs.map((n) => (
          <li key={n}><img src={`${import.meta.env.BASE_URL}icons/${n}.webp`} alt="" width="18" height="18" /></li>
        ))}
      </ul>
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
    title: "One prompt, ten angles, ten pages",
    copy: "“Analyse our top 10 creative angles this week and rewrite our PDP for each.” That is the whole prompt. Ten product pages, each in your voice, each sold from the angle that is winning in the ads.",
    Art: ArtVoice,
  },
  {
    k: "offer",
    wide: true,
    title: "Any offer you can describe",
    copy: "Ladders, bundles, subscriptions, free-plus-shipping, a bump before the pay button, a one-click upsell after it. If you can say the offer, FunnelStudio can price it, stack it and wire it.",
    Art: ArtOffer,
  },
  {
    k: "publish",
    title: "Live on your domain, served next to your customer",
    copy: "Your own domain, SSL issued for you, preflight run, preview link, push — no server, no deploy. Pages are served from AWS edge nodes near the buyer; a FunnelStudio product page returns its first byte in about 0.27s versus 0.41s for the same product on Shopify.",
    chips: ["Custom domain", "Auto SSL", "AWS edge"],
    Art: ArtPublish,
  },
  {
    k: "checkout",
    title: "Any checkout you want",
    copy: "One step, three step, six step — any design, any structure, any offer. Runs on Stripe, PayPal, NMI, Checkout.com or your Shopify checkout. Your merchant account, your payouts; FunnelStudio never sits in the middle.",
    chips: ["Stripe", "PayPal", "NMI"],
    Art: ArtCheckout,
  },
  {
    k: "test",
    title: "A split test in minutes",
    copy: "Analyse Clarity, PostHog or Google Analytics, brainstorm the next test, prompt it, review it, launch it. Split any step of the funnel and keep the winner — no second build.",
    chips: ["Clarity", "PostHog", "Google Analytics", "A/B tests"],
    Art: ArtTest,
  },
];

export default function WhatYouGet() {
  // ?f=1..5 swaps the feature section body; the head stays so the variations
  // are compared like for like.
  const f = new URLSearchParams(location.search).get("f");
  if (f && /^[1-6]$/.test(f)) return <FeatureVariant n={Number(f)} />;
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
