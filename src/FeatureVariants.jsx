// Five treatments of the same feature section, for Markus to pick from.
// What the reference sites actually do (measured 2026-09-11):
//   shopify.com      11 <video>, all muted/loop/poster, inside dark rounded
//                    panels; giant thin display type; product-UI cards float
//                    over soft gradients with real partner logos.
//   squarespace.com  full-bleed autoplay hero video, then card carousels of
//                    muted MP4s; zero CSS keyframes — motion is all video.
//   wix.com          18 video + 7 lottie/canvas + 41 CSS keyframes — mixed.
//   checkout.com     dark, mono caps eyebrows, floating product-UI mockups,
//                    one Vimeo, 324 images.
//   babylovegrowth   12 small looping MP4s of simplified UI.
// Every variation stays on our tokens: white page, Wix Madefor, #1260EB,
// JetBrains Mono for chrome, 16px radii, #E8E8E4 hairlines.
import { useEffect, useRef } from "react";
import FunnelForge from "./FunnelForge";
import {
  ArtVoice,
  ArtOffer,
  ArtPublish,
  ArtCheckout,
  ArtTest,
  languages,
} from "./WhatYouGet";

const iconRoot = `${import.meta.env.BASE_URL}icons/`;
const featRoot = `${import.meta.env.BASE_URL}feat/`;

// The six features, in the order the story runs. Same copy in every variant.
const features = [
  {
    k: "prompt",
    n: "01",
    title: "One prompt. The whole funnel.",
    copy: "Advertorial, product page, checkout with order bumps, the upsell and its downsell, thank you. Test-purchase it, then spin a variation for every winning ad.",
    Art: () => <FunnelForge />,
    clip: "assemble",
  },
  {
    k: "voice",
    n: "02",
    title: "One prompt, ten angles, ten pages",
    copy: "“Analyse our top 10 creative angles this week and rewrite our PDP for each.” That is the whole prompt. Ten product pages, each in your voice, each sold from the angle that is winning in the ads.",
    Art: ArtVoice,
    clip: "describe",
  },
  {
    k: "offer",
    n: "03",
    title: "Any offer you can describe",
    copy: "Ladders, bundles, subscriptions, free-plus-shipping, a bump before the pay button, a one-click upsell after it. If you can say the offer, FunnelStudio can price it, stack it and wire it.",
    Art: ArtOffer,
  },
  {
    k: "checkout",
    n: "04",
    title: "Any checkout you want",
    copy: "One step, three step, six step — any design, any structure, any offer. Runs on Stripe, PayPal, NMI, Checkout.com or your Shopify checkout. Your merchant account, your payouts; FunnelStudio never sits in the middle.",
    Art: ArtCheckout,
    logos: ["stripe", "paypal", "nmi", "checkout", "shopify", "adyen"],
  },
  {
    k: "publish",
    n: "05",
    title: "Live on your domain, served next to your customer",
    copy: "Your own domain, SSL issued for you, preflight run, preview link, push — no server, no deploy. Pages are served from AWS edge nodes near the buyer; a FunnelStudio product page returns its first byte in about 0.27s versus 0.41s for the same product on Shopify.",
    Art: ArtPublish,
    clip: "approve",
  },
  {
    k: "test",
    n: "06",
    title: "A split test in minutes",
    copy: "Analyse Clarity, PostHog or Google Analytics, brainstorm the next test, prompt it, review it, launch it. Split any step of the funnel and keep the winner — no second build.",
    Art: ArtTest,
  },
];

function Head({ eyebrow = "What you get", title = "Run the offer, not the plumbing", sub }) {
  return (
    <div className="wyg-head fv-head" data-reveal="out">
      <span className="fsh-eyebrow">
        <i aria-hidden="true" /> {eyebrow}
      </span>
      <h2 id="wyg-title">{title}</h2>
      {sub && <p className="fv-sub">{sub}</p>}
    </div>
  );
}

function Clip({ name, poster }) {
  // Shopify's grammar exactly: muted, looping, playsinline, poster, no chrome.
  // Chrome will not start a muted autoplay that mounted off-screen, so nudge
  // play() once the tile scrolls in.
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return undefined;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }),
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      className="fv-clip"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster={poster ? `${featRoot}${name}.webp` : undefined}
      aria-hidden="true"
    >
      <source src={`${featRoot}${name}.webm`} type="video/webm" />
      <source src={`${featRoot}${name}.mp4`} type="video/mp4" />
    </video>
  );
}

function Logos({ names }) {
  return (
    <ul className="fv-logos" aria-hidden="true">
      {names.map((n) => (
        <li key={n}>
          <img src={`${iconRoot}${n}.webp`} alt="" width="28" height="28" />
        </li>
      ))}
    </ul>
  );
}

// ── F1 · Stacked — Apple's product page: one feature per screen, panels
//    pin and stack as you scroll, type at display scale, the demo huge.
function Stacked() {
  return (
    <section className="wyg fv fv1" id="what-you-get" aria-labelledby="wyg-title">
      <Head />
      <div className="fv1-stack">
        {features.map((f, i) => (
          <article className="fv1-panel" key={f.k} style={{ "--i": i }}>
            <div className="fv1-copy">
              <span className="fv1-n">{f.n}</span>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
              {f.logos && <Logos names={f.logos} />}
            </div>
            <div className={`fv1-demo${f.k === "prompt" ? " is-wide" : ""}`}>
              <div className={f.k === "prompt" ? "fv1-forge" : "wyg-art fv1-art"}>
                <f.Art />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ── F2 · Film — Shopify / Squarespace: the section is video. A tall hero tile
//    plays the funnel assembling; the tiles below loop their own clips.
function Film() {
  const hero = features[0];
  const rest = features.slice(1);
  return (
    <section className="wyg fv fv2" id="what-you-get" aria-labelledby="wyg-title">
      <Head sub="Every tile is a real loop of the product, not a still." />
      <article className="fv2-hero" data-reveal="out">
        <div className="fv2-hero-copy">
          <h3>{hero.title}</h3>
          <p>{hero.copy}</p>
        </div>
        <div className="fv2-screen">
          <Clip name="assemble" poster />
        </div>
      </article>
      <div className="fv2-grid">
        {rest.map((f, i) => (
          <article className="fv2-tile" key={f.k} data-reveal="out" style={{ "--i": i }}>
            <div className="fv2-media">
              {f.clip ? (
                <Clip name={f.clip} poster />
              ) : (
                <div className="wyg-art fv2-art">
                  <f.Art />
                </div>
              )}
            </div>
            <h3>{f.title}</h3>
            <p>{f.copy}</p>
            {f.logos && <Logos names={f.logos} />}
          </article>
        ))}
      </div>
    </section>
  );
}

// ── F3 · Floating — Shopify Checkout's page: product-UI cards drift over a
//    soft field, real partner marks, alternating sides, giant thin headline.
function FloatCluster({ f }) {
  if (f.k === "checkout") {
    return (
      <div className="fv3-cluster">
        <div className="fv3-card fv3-c1">
          <span className="fv3-lbl">Express checkout</span>
          <span className="fv3-pay is-ink"><img src={`${iconRoot}stripe.webp`} alt="" /> Pay with Stripe</span>
          <span className="fv3-pay is-yellow"><img src={`${iconRoot}paypal.webp`} alt="" /> PayPal</span>
          <span className="fv3-pay is-outline"><img src={`${iconRoot}nmi.webp`} alt="" /> Card · NMI</span>
        </div>
        <div className="fv3-card fv3-c2">
          <span className="fv3-lbl">Payout</span>
          <b>$4,218.40</b>
          <em>to your Stripe balance · today</em>
        </div>
        <div className="fv3-card fv3-c3">
          <span className="fv3-lbl">Also routes to</span>
          <Logos names={["checkout", "shopify", "adyen", "braintreepayments"]} />
        </div>
      </div>
    );
  }
  if (f.k === "offer") {
    return (
      <div className="fv3-cluster">
        <div className="fv3-card fv3-c1 is-offer"><ArtOffer /></div>
        <div className="fv3-card fv3-c2"><span className="fv3-lbl">AOV</span><b>+22%</b><em>with the bump + upsell on</em></div>
      </div>
    );
  }
  if (f.k === "test") {
    return (
      <div className="fv3-cluster">
        <div className="fv3-card fv3-c1 is-test"><ArtTest /></div>
        <div className="fv3-card fv3-c2"><span className="fv3-lbl">Per step</span><b>Checkout 61%</b><em>Upsell take 34%</em></div>
      </div>
    );
  }
  if (f.k === "publish") {
    return (
      <div className="fv3-cluster">
        <div className="fv3-card fv3-c1 is-pub"><ArtPublish /></div>
        <div className="fv3-card fv3-c2"><span className="fv3-lbl">Preflight</span><b>4 / 4 passed</b><em>domain · SSL · gateway · tracking</em></div>
      </div>
    );
  }
  if (f.k === "voice") {
    return (
      <div className="fv3-cluster">
        <div className="fv3-card fv3-c1 is-voice"><ArtVoice /></div>
        <div className="fv3-card fv3-c2"><span className="fv3-lbl">Angle</span><b>3pm crash</b><em>rewritten in your voice</em></div>
      </div>
    );
  }
  return null;
}
function Floating() {
  return (
    <section className="wyg fv fv3" id="what-you-get" aria-labelledby="wyg-title">
      <Head />
      <div className="fv3-lead" data-reveal="out">
        <FunnelForge />
      </div>
      {features.slice(1).map((f, i) => (
        <article className={`fv3-row${i % 2 ? " is-flip" : ""}`} key={f.k} data-reveal="out">
          <div className="fv3-copy">
            <h3>{f.title}</h3>
            <p>{f.copy}</p>
          </div>
          <div className="fv3-field">
            <FloatCluster f={f} />
          </div>
        </article>
      ))}
    </section>
  );
}

// ── F4 · Deep panel — Shopify / Checkout.com's accent: one ink panel inside
//    the white page, mono caps, a horizontal rail you scroll through.
function Deep() {
  return (
    <section className="wyg fv fv4" id="what-you-get" aria-labelledby="wyg-title">
      <Head />
      <div className="fv4-panel" data-reveal="out">
        <div className="fv4-top">
          <span className="fv4-eyebrow">What you get · 06 things</span>
          <p>Scroll →</p>
        </div>
        <div className="fv4-rail" tabIndex={0}>
          {features.map((f) => (
            <article className="fv4-card" key={f.k}>
              <span className="fv4-n">{f.n}</span>
              <div className={`fv4-demo${f.k === "prompt" ? " is-forge" : ""}`}>
                {f.k === "prompt" ? <FunnelForge /> : <div className="wyg-art fv4-art"><f.Art /></div>}
              </div>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
              {f.logos && <Logos names={f.logos} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── F5 · Type-led — the most Apple of the five: one column, the feature IS
//    the headline at display size, the demo a small live glyph beside it.
function TypeLed() {
  return (
    <section className="wyg fv fv5" id="what-you-get" aria-labelledby="wyg-title">
      <Head />
      <ol className="fv5-list">
        {features.map((f) => (
          <li className="fv5-row" key={f.k} data-reveal="out">
            <span className="fv5-n">{f.n}</span>
            <div className="fv5-text">
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
              {f.logos && <Logos names={f.logos} />}
            </div>
            <div className={`fv5-glyph${f.k === "prompt" ? " is-forge" : ""}`}>
              {f.k === "prompt" ? <FunnelForge /> : <div className="wyg-art fv5-art"><f.Art /></div>}
            </div>
          </li>
        ))}
      </ol>
      <div className="fv5-markets" data-reveal="out">
        <span className="fsh-eyebrow"><i aria-hidden="true" /> 20+ markets</span>
        <ul className="wyg-flags">
          {languages.map(([flag, name], i) => (
            <li key={name} style={{ "--i": i }}>
              <span aria-hidden="true">{flag}</span>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── F6 · Film × Stacked — the Film hero's dark screen leads (the real render
//    of the funnel assembling), then the remaining five stack Apple-style, each
//    panel pinning as the next slides over it. Where a scene exists as video
//    the panel plays it; the rest keep their drawn demos.
function FilmStacked() {
  const hero = features[0];
  const rest = features.slice(1);
  return (
    <section className="wyg fv fv6" id="what-you-get" aria-labelledby="wyg-title">
      <Head />
      <article className="fv2-hero fv6-hero" data-reveal="out">
        <div className="fv2-hero-copy">
          <span className="fv6-n">{hero.n}</span>
          <h3>{hero.title}</h3>
          <p>{hero.copy}</p>
        </div>
        <div className="fv2-screen">
          <Clip name="assemble" poster />
        </div>
      </article>
      <div className="fv1-stack fv6-stack">
        {rest.map((f, i) => (
          <article className="fv1-panel fv6-panel" key={f.k} style={{ "--i": i }}>
            <div className="fv1-copy">
              <span className="fv1-n">{f.n}</span>
              <h3>{f.title}</h3>
              <p>{f.copy}</p>
              {f.logos && <Logos names={f.logos} />}
            </div>
            <div className="fv1-demo">
              {f.clip ? (
                <div className="fv6-screen">
                  <Clip name={f.clip} poster />
                </div>
              ) : (
                <div className="wyg-art fv1-art">
                  <f.Art />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const variants = { 1: Stacked, 2: Film, 3: Floating, 4: Deep, 5: TypeLed, 6: FilmStacked };
export const featureVariantNames = {
  1: ["Stacked", "Apple product page — one feature per screen"],
  2: ["Film", "Shopify / Squarespace — the section is video"],
  3: ["Floating", "Shopify Checkout — UI cards drift over a field"],
  4: ["Deep panel", "Checkout.com — one ink panel, a rail inside"],
  5: ["Type-led", "Apple — the headline is the feature"],
  6: ["Film × Stacked", "Film hero, then the rest pin and stack"],
};

export default function FeatureVariant({ n }) {
  const V = variants[n] || Stacked;
  return <V />;
}
