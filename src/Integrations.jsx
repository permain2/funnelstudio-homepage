// One grid, every app, grouped by what it does. Markus is building the front
// end first and wiring backends after, so nothing here is tier-labelled.
const groups = [
  {
    g: "Payments",
    copy: "Your merchant account, your payouts.",
    apps: [
      ["stripe", "Stripe"],
      ["paypal", "PayPal"],
      ["nmi", "NMI"],
      ["checkout", "Checkout.com"],
      ["adyen", "Adyen"],
      ["braintreepayments", "Braintree"],
      ["klarna", "Klarna"],
      ["affirm", "Affirm"],
      ["authorize", "Authorize.net"],
    ],
  },
  {
    g: "Tax",
    copy: "Calculated at the checkout step, per market.",
    apps: [
      ["zamp", "Zamp"],
      ["numeral", "Numeral"],
      ["avalara", "Avalara"],
      ["taxjar", "TaxJar"],
      ["anrok", "Anrok"],
    ],
  },
  {
    g: "Catalog & storefront",
    copy: "Bring the products you already sell.",
    apps: [
      ["shopify", "Shopify"],
      ["woocommerce", "WooCommerce"],
      ["bigcommerce", "BigCommerce"],
      ["recharge", "Recharge"],
    ],
  },
  {
    g: "Attribution",
    copy: "Per-funnel tracking, server-side where it exists.",
    apps: [
      ["facebook", "Meta"],
      ["google", "Google"],
      ["hyros", "HYROS"],
      ["clickmagick", "ClickMagick"],
      ["triplewhale", "Triple Whale"],
    ],
  },
  {
    g: "Retention & support",
    copy: "Own the list and the inbox after the sale.",
    apps: [
      ["klaviyo", "Klaviyo"],
      ["postscript", "Postscript"],
      ["attentive", "Attentive"],
      ["gorgias", "Gorgias"],
    ],
  },
  {
    g: "Fulfilment",
    copy: "Hand the order to whoever ships it.",
    apps: [
      ["shiphero", "ShipHero"],
      ["shipbob", "ShipBob"],
      ["easypost", "EasyPost"],
    ],
  },
];

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
          you already have — and if a service has an API, your funnel can talk
          to it.
        </p>
      </div>

      <div className="itg-grid">
        {groups.map((row, i) => (
          <article key={row.g} data-reveal="out" style={{ "--i": i }}>
            <header>
              <h3>{row.g}</h3>
              <p>{row.copy}</p>
            </header>
            <ul>
              {row.apps.map(([slug, name]) => (
                <li key={slug}>
                  <img
                    src={`${import.meta.env.BASE_URL}icons/${slug}.webp`}
                    alt=""
                    width="22"
                    height="22"
                    decoding="async"
                  />
                  {name}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="itg-note">
        <a href="https://funnelstudio.ai/api-docs">
          Read the API docs <span aria-hidden="true">↗</span>
        </a>
        <span>Webhooks fire on every order, upsell and refund.</span>
      </p>
    </section>
  );
}
