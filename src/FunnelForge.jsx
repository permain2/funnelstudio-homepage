// The centrepiece: one prompt → the whole funnel assembles → a test order goes
// through → a variant per winning ad fans out. Everything is drawn in CSS on a
// single 18s loop, gated on [data-reveal="in"] so nothing animates off-screen.
//
// The beat map (the CSS keyframes are all written against these seconds):
//   0.0–3.0   the prompt types itself, then the Build chip presses
//   3.0–7.5   advertorial → PDP → checkout → upsell → thank-you spring in,
//             one per beat, with the connector drawing just ahead of each
//   6.6–8.4   the order bump ticks on; the decline branch drops to a downsell
//   8.4–11.0  a test purchase runs the accepted path and the order lands paid
//  11.0–14.5  three more decks fan out behind, one per winning ad angle
//  14.5–18.0  hold on the finished set

const STEPS = [
  { k: "adv", label: "Advertorial", sub: "3pm crash angle" },
  { k: "pdp", label: "Product page", sub: "bundle ladder" },
  { k: "chk", label: "Checkout", sub: "order bump" },
  { k: "ups", label: "Upsell", sub: "1-click" },
  { k: "ty", label: "Thank you", sub: "receipt" },
];

const ANGLES = ["3pm crash", "made in the EU", "ships free today"];

function Wire({ k }) {
  if (k === "adv") {
    return (
      <>
        <span className="ff-w ff-w-eyebrow" />
        <span className="ff-w ff-w-h1" />
        <span className="ff-w ff-w-h1 is-short" />
        <span className="ff-w ff-w-img" />
        <span className="ff-w ff-w-p" />
        <span className="ff-w ff-w-p" />
        <span className="ff-w ff-w-p is-short" />
      </>
    );
  }
  if (k === "pdp") {
    return (
      <>
        <span className="ff-w ff-w-hero" />
        <span className="ff-w ff-w-h2" />
        <span className="ff-tiers">
          <i />
          <i className="is-on" />
          <i />
        </span>
        <span className="ff-cta">Add to cart</span>
      </>
    );
  }
  if (k === "chk") {
    return (
      <>
        <span className="ff-w ff-w-field" />
        <span className="ff-w ff-w-field" />
        <span className="ff-bump">
          <i className="ff-box" />
          <span className="ff-w ff-w-bumpline" />
          <b>+$9</b>
        </span>
        <span className="ff-cta is-pay">Pay $78</span>
      </>
    );
  }
  if (k === "ups") {
    return (
      <>
        <span className="ff-w ff-w-hero is-sm" />
        <span className="ff-w ff-w-h2" />
        <span className="ff-yn">
          <b className="is-yes">Add for $39</b>
          <i>No thanks</i>
        </span>
      </>
    );
  }
  return (
    <>
      <span className="ff-tick" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 13l4.5 4.5L19 7" />
        </svg>
      </span>
      <span className="ff-w ff-w-h2 is-mid" />
      <span className="ff-w ff-w-p is-mid" />
      <span className="ff-w ff-w-p is-mid is-short" />
    </>
  );
}

export default function FunnelForge() {
  return (
    <article className="ff" data-reveal="out">
      <div className="ff-copy">
        <h3>One prompt. The whole funnel.</h3>
        <p>
          Advertorial, product page, checkout with order bumps, the upsell and
          its downsell, thank you. Test-purchase it, then spin a variation for
          every ad that’s winning — in the same prompt.
        </p>
      </div>

      <div className="ff-stage" aria-hidden="true">
        <div className="ff-prompt">
          <span className="ff-caret-dot" />
          <span className="ff-typed">
            Build the berberine funnel — advertorial, PDP, checkout with the
            guarantee bump, a 1-click upsell and a downsell, then a thank-you
            page.
          </span>
          <span className="ff-cursor" />
          <span className="ff-go">Build</span>
        </div>

        <div className="ff-deck">
          {ANGLES.map((a, i) => (
            <div className="ff-ghost" key={a} style={{ "--g": i + 1 }}>
              <span className="ff-ghost-tag">{a}</span>
            </div>
          ))}

          <div className="ff-row">
            <svg className="ff-links" viewBox="0 0 1000 260" preserveAspectRatio="none">
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  className="ff-link"
                  style={{ "--i": i }}
                  d={`M${58 + i * 196} 86 H${196 + i * 196}`}
                />
              ))}
              <path className="ff-link ff-link-down" style={{ "--i": 4 }} d="M646 118 V196 H716" />
              <path className="ff-link ff-link-back" style={{ "--i": 5 }} d="M844 196 H900 V118" />
              <path className="ff-pulse" d="M58 86 H842" />
            </svg>

            {STEPS.map((s, i) => (
              <div className={`ff-card ff-${s.k}`} key={s.k} style={{ "--i": i }}>
                <span className="ff-head">
                  <b>{s.label}</b>
                  <em>{s.sub}</em>
                </span>
                <span className="ff-page">
                  <Wire k={s.k} />
                </span>
              </div>
            ))}

            <div className="ff-card ff-down" style={{ "--i": 5 }}>
              <span className="ff-head">
                <b>Downsell</b>
                <em>on decline</em>
              </span>
              <span className="ff-page">
                <span className="ff-w ff-w-h2" />
                <span className="ff-yn">
                  <b className="is-yes">Take it at $19</b>
                </span>
              </span>
            </div>

            <span className="ff-paid">Test order paid · $78</span>
            <span className="ff-state">
              <i />
              <em className="is-build">Building</em>
              <em className="is-live">Live</em>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
