import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Logo,
  StackMark,
  StartLink,
  reducedMotion,
  shotRoot,
  stackLogos,
  useReveal,
  useSpotlight,
} from "./MarketingHome";
import "./MarketingHome.css";
import "./VariantStorefront.css";

const shots = [
  { k: "checkout", label: "Checkout", meta: "single step" },
  { k: "bundles", label: "Offer tiers", meta: "three prices" },
  { k: "bumps", label: "Order bumps", meta: "four add-ons" },
  { k: "payment", label: "Payment", meta: "your processor" },
];

// A marquee of real funnel screens. Duplicated once so the loop is seamless;
// the copy is hidden from assistive tech.
function Marquee() {
  return (
    <div
      className="vs-marquee"
      aria-label="Screens from live FunnelStudio funnels"
    >
      <div className="vs-marquee-track">
        {[0, 1].map((pass) => (
          <ul key={pass} aria-hidden={pass === 1 ? "true" : undefined}>
            {shots.map((s) => (
              <li key={s.k}>
                <img
                  src={`${shotRoot}${s.k}.webp`}
                  alt={
                    pass === 1
                      ? ""
                      : `Live ${s.label.toLowerCase()} from a FunnelStudio funnel`
                  }
                  width="1000"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  {s.label}
                  <small>{s.meta}</small>
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// Drag/keyboard comparison between the same page on two angles.
function AngleCompare() {
  const [pos, setPos] = useState(52);
  return (
    <figure className="vs-compare" data-reveal="out">
      <div className="vs-compare-frame" style={{ "--pos": `${pos}%` }}>
        <img
          src={`${shotRoot}bundles.webp`}
          alt="The same product page priced as three bundle tiers"
          width="1000"
          height="640"
          loading="lazy"
          decoding="async"
        />
        <div className="vs-compare-top">
          <img
            src={`${shotRoot}bumps.webp`}
            alt="The same page with order bumps added"
            width="1000"
            height="640"
            loading="lazy"
            decoding="async"
          />
        </div>
        <span
          className="vs-compare-handle"
          aria-hidden="true"
          style={{ left: `${pos}%` }}
        />
      </div>
      <label className="vs-compare-input">
        <span>Compare the two angles</span>
        <input
          type="range"
          min="0"
          max="100"
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Reveal more of the second angle"
        />
      </label>
      <figcaption>One product. Two offers. Same afternoon.</figcaption>
    </figure>
  );
}

export default function VariantStorefront() {
  useReveal(0);
  useSpotlight();
  return (
    <div className="fsw-home vs">
      <Helmet>
        <title>
          FunnelStudio — Give every winning ad a page that follows through
        </title>
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
          <a href="#work">The work</a>
          <a href="#angles">Angles</a>
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
        <section className="vs-hero">
          <span className="fsh-eyebrow">
            <i aria-hidden="true" /> For operators who test to grow
          </span>
          <h1>
            Give every winning ad
            <br />
            <span>a page that follows through.</span>
          </h1>
          <p>
            Clone the page, change the angle, wire the checkout and the upsell,
            publish on your domain. The offer moves as fast as the creative
            does.
          </p>
          <div className="fsh-hero-actions">
            <StartLink />
          </div>
          <p className="vs-note">
            Free to start. <b>Your processor, your payouts.</b>
          </p>
        </section>

        <Marquee />

        <section className="fsh-wall vs-wall">
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

        <section className="vs-section" id="work">
          <div className="vs-head" data-reveal="out">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> Real funnels, not mockups
            </span>
            <h2>
              Every screen here is
              <br />
              <span>a page that took money.</span>
            </h2>
          </div>
          <div className="vs-grid">
            {shots.map((s, i) => (
              <figure key={s.k} data-reveal="out" style={{ "--i": i }}>
                <img
                  src={`${shotRoot}${s.k}.webp`}
                  alt={`Live ${s.label.toLowerCase()} step from a FunnelStudio funnel`}
                  width="1000"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <strong>{s.label}</strong>
                  <span>{s.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="vs-section vs-angles" id="angles">
          <div className="vs-head" data-reveal="out">
            <span className="fsh-eyebrow">
              <i aria-hidden="true" /> One product, many offers
            </span>
            <h2>
              Change the offer without
              <br />
              <span>rebuilding the store.</span>
            </h2>
          </div>
          <AngleCompare />
        </section>

        <section className="vs-final">
          <h2>
            Your next page is
            <br />
            <span>one prompt away.</span>
          </h2>
          <div className="fsh-hero-actions">
            <StartLink />
          </div>
        </section>
      </main>
      <footer className="fsw-footer">
        <div className="fsw-footer-bottom">
          <span>© {new Date().getFullYear()} FunnelStudio</span>
          <span>Variation C · Storefront</span>
        </div>
      </footer>
    </div>
  );
}
