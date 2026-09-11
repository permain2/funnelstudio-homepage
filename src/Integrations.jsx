import { BrandIcon } from "./MarketingHome";

// Two honest tiers. "Wired in" is what ships today and is claimed as such.
// Everything under "connect anything" is reachable through the REST API and
// webhooks rather than a built integration — which is the actual promise, and
// is stronger than a wall of logos implying native support for all of them.
const wired = [
  {
    k: "payments",
    label: "Payments",
    copy: "Your merchant account, your payouts. The gateway pool routes and fails over between them.",
    names: ["Stripe", "PayPal", "NMI"],
  },
  {
    k: "tax",
    label: "Tax",
    copy: "Tax calculated at the checkout step, per market, before the buyer pays.",
    names: ["Zamp"],
  },
  {
    k: "commerce",
    label: "Catalog & marketing",
    copy: "Bring the products you already sell and the list you already own.",
    names: ["Shopify", "Klaviyo"],
  },
  {
    k: "tracking",
    label: "Attribution",
    copy: "Per-funnel tracking, server-side where the platform supports it.",
    names: ["Meta", "HYROS", "ClickMagick", "Google"],
  },
];

// Grouped only so the row reads; every one of these connects the same way.
const anything = [
  {
    g: "Payments",
    names: [
      "checkout",
      "adyen",
      "braintreepayments",
      "klarna",
      "affirm",
      "authorize",
    ],
  },
  { g: "Tax", names: ["numeral", "avalara", "taxjar", "anrok"] },
  { g: "Fulfilment", names: ["shiphero", "shipbob", "easypost"] },
  { g: "Storefronts", names: ["woocommerce", "bigcommerce", "recharge"] },
  {
    g: "Retention & support",
    names: ["postscript", "attentive", "triplewhale", "gorgias"],
  },
];

const niceName = {
  checkout: "Checkout.com",
  adyen: "Adyen",
  braintreepayments: "Braintree",
  klarna: "Klarna",
  affirm: "Affirm",
  authorize: "Authorize.net",
  numeral: "Numeral",
  avalara: "Avalara",
  taxjar: "TaxJar",
  anrok: "Anrok",
  shiphero: "ShipHero",
  shipbob: "ShipBob",
  easypost: "EasyPost",
  woocommerce: "WooCommerce",
  bigcommerce: "BigCommerce",
  recharge: "Recharge",
  postscript: "Postscript",
  attentive: "Attentive",
  triplewhale: "Triple Whale",
  gorgias: "Gorgias",
};

function RawIcon({ slug }) {
  return (
    <img
      className="fsh-mark"
      src={`${import.meta.env.BASE_URL}icons/${slug}.webp`}
      alt=""
      width="20"
      height="20"
      decoding="async"
    />
  );
}

export default function Integrations() {
  return (
    <section
      className="itg fsw-section"
      id="integrations"
      aria-labelledby="itg-title"
    >
      <div className="itg-head" data-reveal="out">
        <span className="fsh-eyebrow">
          <i aria-hidden="true" /> Connected to how you sell
        </span>
        <h2 id="itg-title">
          Your processors. Your tax stack.
          <br />
          <span>Your rules.</span>
        </h2>
        <p>
          FunnelStudio never sits between you and your money. Keep the accounts
          you already have, and connect anything else through the API.
        </p>
      </div>

      <div className="itg-grid">
        {wired.map((c, i) => (
          <article key={c.k} data-reveal="out" style={{ "--i": i }}>
            <span className="itg-label">
              {c.label}
              <b>Wired in</b>
            </span>
            <p>{c.copy}</p>
            <ul>
              {c.names.map((n) => (
                <li key={n}>
                  <BrandIcon name={n} />
                  {n}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="itg-any" data-reveal="out">
        <div className="itg-any-copy">
          <h3>Everything else is an API call away</h3>
          <p>
            The whole commerce stack is a REST API with webhooks on every order,
            upsell and refund. If a service has an API, your funnel can talk to
            it — these are simply the ones merchants ask for most.
          </p>
          <a className="fsw-text-link" href="https://funnelstudio.ai/api-docs">
            Read the API docs <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="itg-any-grid">
          {anything.map((row) => (
            <div key={row.g}>
              <span>{row.g}</span>
              <ul>
                {row.names.map((slug) => (
                  <li key={slug}>
                    <RawIcon slug={slug} />
                    {niceName[slug]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="itg-note">
        Availability depends on your provider and merchant configuration.
        Anything outside the wired-in set connects through the API rather than a
        built integration.
      </p>
    </section>
  );
}
