import { shotRoot } from "./MarketingHome";

// Their "Grow visibility without manual work" bento, rebuilt for what
// FunnelStudio actually does. Two wide cards lead, then a row of three, then
// the markets card with its flag grid — the same rhythm as theirs.
const cards = [
  {
    k: "voice",
    wide: true,
    title: "Pages that sound like your brand",
    copy: "Clone a page that already converts, then have the copy rewritten for your angle and your voice — not generic AI filler.",
    art: "bundles",
  },
  {
    k: "offer",
    wide: true,
    title: "The offer, priced and stacked",
    copy: "Build the ladder, attach what ships free with the bundle, and put the one-click upsell after the pay button.",
    art: "bumps",
  },
  {
    k: "publish",
    title: "Publish without touching a server",
    copy: "Your own domain, SSL issued for you, live in minutes.",
    chips: ["Custom domain", "Auto SSL"],
  },
  {
    k: "checkout",
    title: "Checkout stays yours",
    copy: "Your merchant account, your payouts. FunnelStudio never sits in the middle.",
    chips: ["Stripe", "PayPal", "NMI"],
  },
  {
    k: "test",
    title: "Test without rebuilding",
    copy: "Split a funnel, send traffic, keep the winner. No second build.",
    chips: ["A/B tests", "Per-step analytics"],
  },
];

const languages = [
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

export default function WhatYouGet() {
  return (
    <section className="wyg" id="what-you-get" aria-labelledby="wyg-title">
      <div className="wyg-head" data-reveal="out">
        <span className="fsh-eyebrow">
          <i aria-hidden="true" /> What you get
        </span>
        <h2 id="wyg-title">Run the offer, not the plumbing</h2>
      </div>

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
            {c.art && (
              <div className="wyg-art">
                <img
                  src={`${shotRoot}${c.art}.webp`}
                  alt=""
                  width="1000"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
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
            {languages.map(([flag, name]) => (
              <li key={name}>
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
