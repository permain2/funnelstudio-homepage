import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./MarketingHome.css";

const previewRoot = `${import.meta.env.BASE_URL}cards/`;
const logoPath =
  "M18.6656 4.78218L13.8255 1.99752C12.2418 1.08416 10.3013 1.08416 8.71768 1.99752L3.85524 4.78218C2.29391 5.69554 1.3125 7.38861 1.3125 9.19307V14.7847C1.3125 16.6114 2.29391 18.2822 3.85524 19.1955L8.69538 22.0025C10.279 22.9158 12.2195 22.9158 13.8032 22.0025L18.6433 19.1955C20.2269 18.2822 21.186 16.6114 21.186 14.7847V9.19307C21.2307 7.38861 20.2492 5.69554 18.6656 4.78218ZM11.2604 16.9678C8.51694 16.9678 6.28646 14.7401 6.28646 12C6.28646 9.2599 8.51694 7.03218 11.2604 7.03218C14.0039 7.03218 16.2567 9.2599 16.2567 12C16.2567 14.7401 14.0262 16.9678 11.2604 16.9678Z";
const buildExamples = [
  {
    key: "landing",
    label: "Landing page",
    heading: "Match the page to the ad that earned the click.",
    description:
      "Give each offer and audience a focused destination. Use AI to build the variation, then review and test it.",
    prompt:
      "Using my connected FunnelStudio account, create a draft landing page variation for [product URL]. Match this winning ad angle: [angle]. Keep our brand styling, lead with the same promise as the ad, and make the offer clear. Return a preview link for review before publishing.",
  },
  {
    key: "checkout",
    label: "Checkout",
    heading: "Make the buying journey feel like your brand.",
    description:
      "Shape the checkout layout around your offer. Keep payment processing with your configured checkout provider.",
    prompt:
      "Help me improve the checkout experience for [funnel]. Review the available FunnelStudio checkout controls and propose a branded layout with clear order details and concise reassurance copy. Keep the configured payment integration intact. Show me the supported changes for review.",
  },
  {
    key: "upsell",
    label: "Upsell flow",
    heading: "Build the next offer into the journey.",
    description:
      "Connect upsells and downsells to a thank-you page that completes the purchase journey. Review every offer and next step before launch.",
    prompt:
      "Using FunnelStudio, draft an upsell and downsell flow for [product]. After checkout, offer [complementary product]. If declined, offer [alternative]. Connect the accept and decline paths to a thank-you page, use my existing pages where possible, and show me the flow for review.",
  },
  {
    key: "cart",
    label: "Slideout cart",
    heading: "Design your cart experience.",
    description:
      "Give shoppers clear quantities, a relevant add-on, and a path to checkout. Custom cart behavior may require API integration.",
    prompt:
      "Design a branded slide-out cart with clear quantities, a relevant add-on, and a checkout CTA for [store]. Review the cart and checkout integration before publishing.",
  },
];
const questions = [
  [
    "What can I build with FunnelStudio?",
    "Create ecommerce landing pages from a prompt, build product pages and advertorials, and connect them into a sales funnel. Use AI to build your funnel structure, then customize checkout, post-purchase offers, and thank-you pages.",
  ],
  [
    "How do I connect my AI assistant?",
    "Create your account, copy an API key, and follow the connection instructions in API Documentation. Use an API-capable AI assistant. Give it the docs and your brief, then review the page or funnel it builds before publishing.",
  ],
  [
    "How does FunnelStudio work with Shopify?",
    "Yes. Connect Shopify to bring your products into FunnelStudio and use them in your funnels. Configure your store and checkout connections in your account before launching.",
  ],
  [
    "Can I customize checkout and upsell flows?",
    "Build and connect checkout, upsell, and downsell steps, and customize the available checkout layouts and settings. Payment processing stays with your configured provider; hosted payment forms have their own limits.",
  ],
  [
    "Can I add a slideout cart?",
    "Yes. Connect product actions to the built-in cart drawer, including quantity, remove, and checkout controls. Its native styling is separate from page styling, so page edits do not automatically restyle the drawer.",
  ],
  [
    "Can I translate pages for new markets?",
    "Ask AI to translate your page content for a new audience, then review the language and local offer before publishing. Checkout currency, tax, and shipping are configured separately.",
  ],
  [
    "Where can I find pricing?",
    "Compare the available plans and their included features on our pricing page.",
  ],
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Logo() {
  return (
    <Link className="fsw-logo" to="/" aria-label="FunnelStudio home">
      <span className="fsw-logo-mark">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={logoPath} fill="currentColor" fillRule="evenodd" />
        </svg>
      </span>
      <span>FunnelStudio</span>
    </Link>
  );
}
function StartLink({ children = "Start free", light = false }) {
  return (
    <Link
      className={`fsw-button fsw-button-start${light ? " fsw-button-light" : ""}`}
      to="/register"
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
function Preview({
  image,
  className = "",
  eager = false,
  priority = false,
  alt = "Example ecommerce page design",
}) {
  const portrait = image === "framer-04.webp" || image === "framer-05.webp";
  return (
    <img
      className={className}
      src={`${previewRoot}${image}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      width={portrait ? 720 : 1500}
      height={portrait ? 1290 : 1875}
    />
  );
}
const demoMagnesium =
  "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Magnesium_Glycinate.webp?v=1733915016&width=700";
const demoBerberine =
  "https://cdn.shopify.com/s/files/1/0694/3840/6879/files/Berberine.webp?v=1733914580&width=700";
function StoreDemo({ view, onNavigate }) {
  const [pack, setPack] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [addOn, setAddOn] = useState(false);
  const [payment, setPayment] = useState("card");
  const [offer, setOffer] = useState("upsell");
  const [accepted, setAccepted] = useState(null);
  const [detail, setDetail] = useState(false);
  useEffect(() => {
    setOffer("upsell");
    setAccepted(null);
  }, [pack, quantity, addOn]);
  const unitPrice = pack === 1 ? 29 : 49;
  const subtotal = unitPrice * quantity + (addOn ? 19 : 0);
  const money = (value) => `$${value.toFixed(2)}`;
  const finish = (item) => {
    setAccepted(item);
    setOffer("thanks");
  };
  const goToCheckout = () => {
    setOffer("upsell");
    setAccepted(null);
    onNavigate(1);
  };
  const summary = (
    <>
      <div className="fsd-order-product">
        <img
          src={demoMagnesium}
          alt="Meo Nutrition Magnesium Glycinate bottle"
          loading="lazy"
          decoding="async"
        />
        <div>
          <strong>Magnesium Glycinate</strong>
          <span>
            {pack === 1 ? "Single bottle" : "Two-bottle set"} · Qty {quantity}
          </span>
        </div>
        <b>{money(unitPrice * quantity)}</b>
      </div>
      {addOn && (
        <div className="fsd-order-product">
          <img
            src={demoBerberine}
            alt="Meo Nutrition Berberine bottle"
            loading="lazy"
            decoding="async"
          />
          <div>
            <strong>Berberine</strong>
            <span>Added to your routine</span>
          </div>
          <b>$19.00</b>
        </div>
      )}
      <div className="fsd-total-row">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      <div className="fsd-total-row">
        <span>Demo delivery</span>
        <span>Included</span>
      </div>
      <div className="fsd-total-row fsd-total">
        <strong>Total</strong>
        <strong>{money(subtotal)}</strong>
      </div>
    </>
  );
  return (
    <figure className={`fsw-build-art fsd-art fsd-art-${view}`}>
      <figcaption>
        Interactive store demo · Sample products &amp; prices
      </figcaption>
      <div className="fsd-store">
        <header className="fsd-header">
          <span className="fsd-brand">
            meo<span>nutrition</span>
          </span>
          <span>THE DAILY COLLECTION</span>
          <button
            type="button"
            onClick={() => onNavigate(3)}
            aria-label="Open demo shopping bag"
          >
            Bag <b>{quantity + (addOn ? 1 : 0)}</b>
          </button>
        </header>
        {view === "landing" && (
          <div className="fsd-product-page">
            <div className="fsd-announcement">
              THE DAILY COLLECTION · ONE-TIME PURCHASES · SAMPLE USD PRICING
            </div>
            <div className="fsd-product-layout">
              <div className="fsd-product-gallery">
                <span className="fsd-photo-tag">
                  MAGNESIUM GLYCINATE / THE DAILY COLLECTION
                </span>
                <img
                  className={detail ? "fsd-photo-detail" : ""}
                  src={demoMagnesium}
                  alt="Meo Nutrition Magnesium Glycinate product bottle"
                  loading="lazy"
                  decoding="async"
                />
                <div className="fsd-photo-controls">
                  <button
                    type="button"
                    aria-pressed={!detail}
                    onClick={() => setDetail(false)}
                  >
                    Product
                  </button>
                  <button
                    type="button"
                    aria-pressed={detail}
                    onClick={() => setDetail(true)}
                  >
                    Detail
                  </button>
                </div>
              </div>
              <div className="fsd-product-copy">
                <span className="fsd-kicker">MAKE SPACE FOR YOUR ROUTINE</span>
                <h4>
                  Magnesium
                  <br />
                  Glycinate.
                </h4>
                <p>
                  Meo Nutrition Magnesium Glycinate. Choose one bottle or build
                  a two-bottle set, with clear one-time pricing.
                </p>
                <div className="fsd-price">
                  {money(unitPrice)}
                  {pack === 2 && <del>$58.00</del>}
                </div>
                <div className="fsd-purchase-type">
                  <span aria-hidden="true">✓</span> One-time purchase{" "}
                  <small>No subscription in this demo</small>
                </div>
                <span className="fsd-field-title">CHOOSE YOUR SET</span>
                <div className="fsd-pack-options">
                  <button
                    type="button"
                    aria-pressed={pack === 1}
                    onClick={() => setPack(1)}
                  >
                    <span className="fsd-bundle-photos">
                      <img
                        src={demoMagnesium}
                        width="2000"
                        height="2000"
                        alt="One bottle"
                        loading="lazy"
                      />
                    </span>
                    <span className="fsd-bundle-description">
                      <b>One bottle</b>
                      <small>A single addition to your collection</small>
                    </span>
                    <span className="fsd-bundle-price">
                      <strong>$29</strong>
                      <small>$29.00 / bottle</small>
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-pressed={pack === 2}
                    onClick={() => setPack(2)}
                  >
                    <span className="fsd-bundle-photos">
                      <img
                        src={demoMagnesium}
                        width="2000"
                        height="2000"
                        alt="Two-bottle set"
                        loading="lazy"
                      />
                      <img
                        src={demoMagnesium}
                        width="2000"
                        height="2000"
                        alt=""
                        loading="lazy"
                      />
                    </span>
                    <span className="fsd-bundle-description">
                      <b>Two-bottle set</b>
                      <small>Save $9 compared with two singles</small>
                    </span>
                    <span className="fsd-bundle-price">
                      <strong>$49</strong>
                      <small>$24.50 / bottle</small>
                    </span>
                  </button>
                </div>
                <button
                  className="fsd-primary"
                  type="button"
                  onClick={() => {
                    setQuantity(Math.max(1, quantity));
                    onNavigate(3);
                  }}
                >
                  Add to bag — {money(unitPrice)} <span>→</span>
                </button>
                <p className="fsd-small-note">
                  Sample offer · No purchase will be made
                </p>
                <details className="fsd-product-details">
                  <summary>What’s in the set?</summary>
                  <p>
                    {pack} bottle{pack === 2 ? "s" : ""} of Meo Nutrition
                    Magnesium Glycinate. Product details and pricing shown here
                    are for this interactive demo.
                  </p>
                </details>
                <details className="fsd-product-details">
                  <summary>Compare the options</summary>
                  <p>
                    One bottle is $29. Two bottles are $49 in this sample offer,
                    or $24.50 each. Select a set above, then adjust the number
                    of sets in your bag.
                  </p>
                </details>
                <details className="fsd-product-details">
                  <summary>About this product preview</summary>
                  <p>
                    Real Meo Nutrition product photography. The prices and
                    delivery details are examples for this demo. No real order
                    is placed.
                  </p>
                </details>
              </div>
            </div>
            <div className="fsd-product-footer">
              <span>ONE-TIME PURCHASE</span>
              <span>CHOOSE YOUR BUNDLE</span>
              <span>REVIEW BEFORE CHECKOUT</span>
            </div>
          </div>
        )}
        {view === "checkout" && (
          <form
            className="fsd-checkout"
            onSubmit={(event) => {
              event.preventDefault();
              if (quantity < 1) return;
              setOffer("upsell");
              setAccepted(null);
              onNavigate(2);
            }}
          >
            <div className="fsd-checkout-heading">
              <span className="fsd-kicker">BAG / INFORMATION / PAYMENT</span>
              <h4>Complete your routine.</h4>
              <p>Try the checkout. All details are sample data.</p>
            </div>
            <div className="fsd-checkout-grid">
              <div className="fsd-checkout-fields">
                <h5>
                  <span className="fsd-step-number">1</span> Contact
                </h5>
                <label>
                  Email address
                  <input readOnly value="alex@example.com" />
                </label>
                <h5>
                  <span className="fsd-step-number">2</span> Delivery
                </h5>
                <label>
                  Country / region
                  <input readOnly value="United States (sample)" />
                </label>
                <div className="fsd-field-pair">
                  <label>
                    First name
                    <input readOnly value="Alex" />
                  </label>
                  <label>
                    Last name
                    <input readOnly value="Taylor" />
                  </label>
                </div>
                <label>
                  Delivery address
                  <input readOnly value="123 Example Lane" />
                </label>
                <div className="fsd-field-pair">
                  <label>
                    City
                    <input readOnly value="Sample City" />
                  </label>
                  <label>
                    Postal code
                    <input readOnly value="10001" />
                  </label>
                </div>
                <div className="fsd-shipping-method">
                  <span>Sample delivery</span>
                  <strong>Included</strong>
                  <small>For illustration only. No shipment is created.</small>
                </div>
                <h5>
                  <span className="fsd-step-number">3</span> Payment method
                </h5>
                <div className="fsd-payment-options">
                  <label>
                    <input
                      type="radio"
                      name="demo-payment"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                    />{" "}
                    Card demo
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="demo-payment"
                      checked={payment === "wallet"}
                      onChange={() => setPayment("wallet")}
                    />{" "}
                    Wallet demo
                  </label>
                </div>
                <div className="fsd-payment-note">
                  {payment === "card"
                    ? "Test card •••• 4242 · No card details needed"
                    : "Demo wallet selected · No account connection"}
                </div>
              </div>
              <aside className="fsd-order-summary">
                <h5>Your order summary</h5>
                {summary}
                <button
                  className="fsd-primary"
                  type="submit"
                  disabled={quantity < 1}
                >
                  Place demo order →
                </button>
                {quantity < 1 && (
                  <button
                    type="button"
                    className="fsd-text-button"
                    onClick={() => onNavigate(0)}
                  >
                    Add a product to continue
                  </button>
                )}
                <p className="fsd-small-note">
                  Nothing is charged. Continue to the offer preview.
                </p>
              </aside>
            </div>
          </form>
        )}
        {view === "upsell" && quantity === 0 && (
          <div className="fsd-empty" style={{ padding: 28 }}>
            <h5>Add a product to try the offer flow.</h5>
            <button
              type="button"
              className="fsd-primary"
              onClick={() => onNavigate(0)}
            >
              Explore the product →
            </button>
          </div>
        )}
        {view === "upsell" &&
          quantity > 0 &&
          (offer === "thanks" ? (
            <div className="fsd-thanks">
              <span className="fsd-checkmark" aria-hidden="true">
                ✓
              </span>
              <span className="fsd-kicker">DEMO ORDER COMPLETE</span>
              <h4>Thank you, Alex.</h4>
              <p>
                {accepted
                  ? `${accepted.name} was added to your sample order.`
                  : "Your original sample order is ready."}
              </p>
              <div className="fsd-thanks-order">
                {summary}
                {accepted && (
                  <div className="fsd-total-row">
                    <span>{accepted.name}</span>
                    <b>{money(accepted.price)}</b>
                  </div>
                )}
                {accepted && (
                  <div className="fsd-total-row fsd-total">
                    <strong>Updated total</strong>
                    <strong>{money(subtotal + accepted.price)}</strong>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="fsd-primary"
                onClick={() => {
                  setOffer("upsell");
                  setAccepted(null);
                }}
              >
                Try the offer again →
              </button>
              <button
                type="button"
                className="fsd-text-button"
                onClick={() => onNavigate(0)}
              >
                Back to the product
              </button>
            </div>
          ) : (
            <div className="fsd-offer">
              <div className="fsd-offer-status">
                <span>✓ Demo checkout complete</span>
                <span>One more thing for your routine</span>
              </div>
              <span className="fsd-kicker">
                {offer === "upsell"
                  ? "COMPLETE YOUR COLLECTION"
                  : "A SMALLER NEXT STEP"}
              </span>
              <h4>
                {offer === "upsell"
                  ? "Make room for one more."
                  : "One extra. Just for your routine."}
              </h4>
              <p>
                {offer === "upsell"
                  ? "Add Berberine to this sample order with a single click."
                  : "Prefer to keep it simple? Add one extra Magnesium Glycinate bottle."}
              </p>
              <div className="fsd-offer-product">
                <img
                  src={offer === "upsell" ? demoBerberine : demoMagnesium}
                  alt={
                    offer === "upsell"
                      ? "Meo Nutrition Berberine bottle"
                      : "Meo Nutrition Magnesium Glycinate bottle"
                  }
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h5>
                    {offer === "upsell" ? "Berberine" : "Magnesium Glycinate"}
                  </h5>
                  <span className="fsd-offer-price">
                    <del>$29.00</del> {offer === "upsell" ? "$19.00" : "$15.00"}
                  </span>
                  <p>One bottle · Sample offer</p>
                </div>
              </div>
              <button
                type="button"
                className="fsd-primary"
                onClick={() =>
                  finish(
                    offer === "upsell"
                      ? { name: "Berberine", price: 19 }
                      : { name: "Extra Magnesium Glycinate", price: 15 },
                  )
                }
              >
                Yes, add it to my demo order →
              </button>
              <button
                type="button"
                className="fsd-text-button"
                onClick={() =>
                  offer === "upsell" ? setOffer("downsell") : finish(null)
                }
              >
                {offer === "upsell"
                  ? "No thanks, show another option"
                  : "No thanks, finish without adding"}
              </button>
            </div>
          ))}
        {view === "cart" && (
          <div className="fsd-cart-scene">
            <div className="fsd-cart-backdrop">
              <span>THE DAILY COLLECTION</span>
              <img src={demoMagnesium} alt="" loading="lazy" decoding="async" />
              <h4>
                Your routine,
                <br />
                thoughtfully chosen.
              </h4>
            </div>
            <section className="fsd-cart-drawer" aria-label="Demo shopping bag">
              <div className="fsd-cart-title">
                <h4>
                  Your bag <span>({quantity + (addOn ? 1 : 0)})</span>
                </h4>
                <button
                  type="button"
                  onClick={() => onNavigate(0)}
                  aria-label="Close demo shopping bag"
                >
                  ×
                </button>
              </div>
              {quantity > 0 ? (
                <>
                  <div className="fsd-cart-line">
                    <img
                      src={demoMagnesium}
                      alt="Meo Nutrition Magnesium Glycinate bottle"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h5>Magnesium Glycinate</h5>
                      <p>{pack === 1 ? "Single bottle" : "Two-bottle set"}</p>
                      <div className="fsd-quantity">
                        <button
                          type="button"
                          aria-label="Decrease demo quantity"
                          disabled={quantity <= 1}
                          onClick={() => setQuantity(quantity - 1)}
                        >
                          −
                        </button>
                        <span aria-live="polite">{quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase demo quantity"
                          disabled={quantity >= 9}
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="fsd-remove"
                        onClick={() => {
                          setQuantity(0);
                          setAddOn(false);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <b>{money(unitPrice * quantity)}</b>
                  </div>
                  <div className="fsd-cart-addon">
                    <img
                      src={demoBerberine}
                      alt="Meo Nutrition Berberine bottle"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <span>COMPLETE THE COLLECTION</span>
                      <h5>Berberine</h5>
                      <p>$19.00 sample add-on</p>
                    </div>
                    <button
                      type="button"
                      aria-pressed={addOn}
                      onClick={() => setAddOn(!addOn)}
                    >
                      {addOn ? "Added ✓" : "+ Add"}
                    </button>
                  </div>
                  <div className="fsd-cart-bottom">
                    <div className="fsd-total-row fsd-total">
                      <strong>Subtotal</strong>
                      <strong aria-live="polite">{money(subtotal)}</strong>
                    </div>
                    <p>Sample prices. No shipping or payment is processed.</p>
                    <button
                      type="button"
                      className="fsd-primary"
                      onClick={goToCheckout}
                    >
                      Continue to checkout →
                    </button>
                    <button
                      type="button"
                      className="fsd-text-button"
                      onClick={() => onNavigate(0)}
                    >
                      Continue shopping
                    </button>
                  </div>
                </>
              ) : (
                <div className="fsd-empty">
                  <h5>Your demo bag is empty.</h5>
                  <p>Choose a set to try the buying journey.</p>
                  <button
                    type="button"
                    className="fsd-primary"
                    onClick={() => onNavigate(0)}
                  >
                    Explore the product →
                  </button>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
      <p className="fsd-demo-note">
        Local preview only. Nothing is ordered or charged.
      </p>
    </figure>
  );
}

export default function MarketingHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [promptCopied, setPromptCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const [playing, setPlaying] = useState(false);
  const exampleTabs = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  const example = buildExamples[exampleIndex];
  function selectExample(index) {
    setExampleIndex(index);
    setPromptCopied(false);
    setManualCopy(false);
  }
  async function copyExample() {
    try {
      await navigator.clipboard.writeText(example.prompt);
      setPromptCopied(true);
    } catch {
      setManualCopy(true);
    }
  }
  function navigateExamples(event) {
    const offsets = { ArrowRight: 1, ArrowLeft: -1 };
    let next;
    if (event.key in offsets)
      next =
        (exampleIndex + offsets[event.key] + buildExamples.length) %
        buildExamples.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = buildExamples.length - 1;
    else return;
    event.preventDefault();
    selectExample(next);
    exampleTabs.current?.children[next]?.focus();
  }
  return (
    <div className="fsw-home">
      <Helmet>
        <title>FunnelStudio — Your ecommerce store, built with AI</title>
        <meta
          name="description"
          content="Create custom checkout pages, upsell flows, and thank-you pages with AI. Preview split-test variations and translate page content for new markets."
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700&family=Wix+Madefor+Text:wght@400;500;600&display=swap"
        />
      </Helmet>
      <a className="fsw-skip" href="#main-content">
        Skip to content
      </a>
      <header className="fsw-header">
        <Logo />
        <button
          className="fsw-menu-toggle"
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="fsw-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav
          id="fsw-navigation"
          className={`fsw-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          <a href="#canvas">Product</a>
          <a href="#use-cases">Use cases</a>
          <Link to="/top-funnels">Templates</Link>
          <Link to="/pricing">Pricing</Link>
          <div className="fsw-nav-auth">
            <Link to="/login">Log in</Link>
            <Link
              className="fsw-nav-demo"
              to="https://calendly.com/markusa/markus-call-ecom"
            >
              Schedule a demo
            </Link>
            <Link className="fsw-nav-start" to="/register">
              Start free
            </Link>
          </div>
        </nav>
      </header>
      <main id="main-content">
        <section className="fsw-hero">
          <div className="fsw-hero-copy">
            <span className="fsw-eyebrow fsw-hero-eyebrow">
              <span aria-hidden="true" /> FOR ECOMMERCE TEAMS THAT TEST TO GROW
            </span>
            <h1>
              Your ecommerce store.
              <br />
              <span>Built with AI.</span>
            </h1>
            <p>
              Create custom checkout pages, upsell flows, and thank-you pages{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                through your terminal.
              </span>
              <br className="fsw-desktop-break" /> Test new ideas to improve
              average order value and conversion.
            </p>
            <div className="fsw-hero-actions">
              <Link
                className="fsw-button fsw-button-demo"
                to="https://calendly.com/markusa/markus-call-ecom"
              >
                Schedule a demo
              </Link>
              <StartLink />
            </div>
            <div className="fsw-hero-note">
              <span>Prompt to build</span>
              <i />
              <span>Shopify connected</span>
              <i />
              <span>Your own domain</span>
            </div>
          </div>
          <div
            className="fsw-showcase"
            aria-label="Ecommerce page designs created with FunnelStudio"
          >
            <div className="fsw-glow" />
            <div className="fsw-floating-page fsw-floating-left">
              <Preview
                image="framer-03.webp"
                eager
                alt="Long-form ecommerce product story"
              />
            </div>
            <div className="fsw-editor-preview">
              <div className="fsw-editor-top">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={logoPath} fill="currentColor" fillRule="evenodd" />
                </svg>
                <span>Summer product launch</span>
                <span className="fsw-editor-state">Page preview</span>
              </div>
              <div className="fsw-editor-body">
                <Preview
                  image="framer-01.webp"
                  eager
                  priority
                  alt="Product page with product imagery, purchase options, and customer reviews"
                />
              </div>
            </div>
            <div className="fsw-floating-page fsw-floating-right">
              <Preview
                image="framer-02.webp"
                eager
                alt="Campaign landing page example"
              />
            </div>
            <div className="fsw-showcase-caption">
              <span className="fsw-caption-dot" /> YOUR PRODUCT. YOUR BRAND.
              YOUR NEXT LAUNCH.
            </div>
          </div>
        </section>
        <section className="fsw-intro fsw-section" id="how">
          <span className="fsw-eyebrow">
            YOUR NEXT VARIATION STARTS WITH A PROMPT
          </span>
          <h2>
            Move from insight
            <br />
            to your next split test.
          </h2>
          <div className="fsw-intro-steps">
            <div>
              <span>01 / DATA</span>
              <h3>Review your data.</h3>
              <p>
                Find the next opportunity in your campaign and store data. Use
                the insight to brief AI on a focused variation.
              </p>
            </div>
            <div>
              <span>02 / PREVIEW</span>
              <h3>Build it. Preview it.</h3>
              <p>
                Create a new page or buying journey from your brief. Preview the
                checkout, upsell, and thank-you experience before it goes live.
              </p>
            </div>
            <div>
              <span>03 / LAUNCH</span>
              <h3>Launch your split test.</h3>
              <p>
                Compare your variation with the original. Measure the result,
                learn what connects, and choose what to test next.
              </p>
            </div>
          </div>
        </section>
        <section
          className="fsw-growth-journey fsw-section"
          id="campaign-toolkit"
          aria-labelledby="fsw-trust-title"
        >
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">EVERY STEP HAS A JOB TO DO</span>
              <h2 id="fsw-trust-title">
                Your store.
                <br />
                Built for performance.
              </h2>
            </div>
            <p>
              Custom checkouts. Branded carts. Relevant offers. Connect your
              payment setup and shape the experience after every ad click.
            </p>
          </div>
          <div className="fsw-performance-grid">
            {[
              {
                key: "checkout",
                index: 1,
                title: "A clearer path to checkout.",
                copy: "Bring the buying decision into focus with a clear, considered checkout layout.",
                benefits: [
                  "Single-page layouts and clear order summaries",
                  "Mobile-first design, previewed before launch",
                ],
                action: "Explore the checkout",
              },
              {
                key: "cart",
                index: 3,
                title: "Full control of the buying experience.",
                copy: "Carry your brand from the page into your cart, bundle offers, and the variations you want to test.",
                benefits: [
                  "Page branding, bundle offers, and variations",
                  "Connected API tools to shape your workflow",
                ],
                action: "Explore the shopping bag",
              },
              {
                key: "offer",
                index: 2,
                title: "Build the next offer into every order.",
                copy: "Use optional cart add-ons, one-click upsells, and downsells to build a relevant next step around what your customer chose.",
                benefits: [
                  "Optional cart add-ons and custom offer pages",
                  "Upsell and downsell paths you can preview",
                ],
                action: "Explore the offer flow",
              },
              {
                key: "payments",
                index: 1,
                title: "Your payment providers. Connected.",
                copy: "Bring Stripe, PayPal, or NMI into your funnel and keep your merchant connections in your control.",
                benefits: [
                  "Stripe, PayPal, and NMI connections",
                  "Provider and merchant settings stay in your control",
                ],
                action: "Explore the payment preview",
              },
            ].map((pillar, index) => (
              <article className="fsw-performance-card" key={pillar.key}>
                <div className="fsw-performance-copy">
                  <span className="fsw-performance-number">0{index + 1}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                  <ul>
                    {pillar.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => {
                      selectExample(pillar.index);
                      document.getElementById("templates")?.scrollIntoView({
                        behavior: window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches
                          ? "instant"
                          : "smooth",
                        block: "start",
                      });
                    }}
                  >
                    {pillar.action} <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <div
                  className={`fsw-performance-art fsw-performance-${pillar.key}`}
                  aria-label={`${pillar.key} layout illustration`}
                >
                  <span className="fsw-performance-art-label">
                    LAYOUT EXAMPLE
                  </span>
                  {pillar.key === "checkout" && (
                    <div className="fsw-mini-checkout">
                      <strong>Your checkout</strong>
                      <span>Contact</span>
                      <div>name@example.com</div>
                      <span>Delivery</span>
                      <div>Shipping address</div>
                      <footer>
                        <span>Order summary</span>
                        <b>→</b>
                      </footer>
                    </div>
                  )}
                  {pillar.key === "cart" && (
                    <div className="fsw-mini-cart">
                      <header>
                        <strong>Your bag</strong>
                        <span>2</span>
                      </header>
                      <div className="fsw-mini-cart-item">
                        <i aria-hidden="true">01</i>
                        <span>
                          Product bundle<small>Two-bottle set</small>
                        </span>
                      </div>
                      <div className="fsw-mini-quantity">
                        <span>−</span>
                        <b>1</b>
                        <span>+</span>
                      </div>
                      <div className="fsw-mini-cart-addon">
                        <span>Optional add-on</span>
                        <b>+</b>
                      </div>
                      <footer>
                        Review checkout <span>→</span>
                      </footer>
                    </div>
                  )}
                  {pillar.key === "offer" && (
                    <div className="fsw-mini-offer">
                      <strong>After checkout</strong>
                      <div>Relevant upsell</div>
                      <span className="fsw-mini-offer-branches">
                        <span>Accept → Thank you</span>
                        <span>Decline → Alternative</span>
                      </span>
                      <div className="fsw-mini-downsell">Alternative offer</div>
                      <footer>Thank-you page</footer>
                    </div>
                  )}
                  {pillar.key === "payments" && (
                    <div className="fsw-mini-payments">
                      <strong>Your connections</strong>
                      {["Stripe", "PayPal", "NMI"].map((provider) => (
                        <div key={provider}>
                          <span>{provider}</span>
                          <i aria-hidden="true">↗</i>
                        </div>
                      ))}
                      <small>Configure for your funnel</small>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="fsw-performance-note">
            Payment and one-click offer availability depend on your provider and
            merchant setup. Custom cart behavior may require API integration.
          </p>
        </section>
        <section
          className="fsw-build-showcase fsw-section"
          id="templates"
          aria-labelledby="build-next-title"
        >
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">
                ONE CONNECTION. MORE ROOM TO EXPERIMENT.
              </span>
              <h2 id="build-next-title">
                Shop the experience.
                <br />
                Then make it yours.
              </h2>
            </div>
            <p>
              Try a complete product journey, from the first choice to the next
              offer. Then copy a starting prompt and build your own.
            </p>
          </div>
          <div
            className="fsw-build-tabs"
            role="tablist"
            aria-label="Build examples"
            ref={exampleTabs}
            onKeyDown={navigateExamples}
          >
            {buildExamples.map((item, index) => (
              <button
                key={item.key}
                type="button"
                id={`build-tab-${item.key}`}
                role="tab"
                aria-selected={exampleIndex === index}
                aria-controls={`build-panel-${item.key}`}
                tabIndex={exampleIndex === index ? 0 : -1}
                onClick={() => selectExample(index)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            className={`fsw-build-panel fsw-build-${example.key}`}
            id={`build-panel-${example.key}`}
            role="tabpanel"
            aria-labelledby={`build-tab-${example.key}`}
            tabIndex={0}
          >
            <div className="fsw-build-brief">
              <span className="fsw-eyebrow">
                EXAMPLE PROMPT / {example.label.toUpperCase()}
              </span>
              <h3>{example.heading}</h3>
              <p>{example.description}</p>
              <div className="fsw-build-prompt">{example.prompt}</div>
              <div className="fsw-build-actions">
                <button
                  type="button"
                  className="fsw-button fsw-button-start"
                  onClick={copyExample}
                >
                  {promptCopied ? "Prompt copied ✓" : "Copy prompt"}
                </button>
                <Link to="/api-docs" className="fsw-text-link">
                  Connect your AI <Arrow />
                </Link>
              </div>
              <span className="fsw-build-status" aria-live="polite">
                {promptCopied
                  ? "Paste this into your connected AI assistant."
                  : "Connect with an API key and the documentation in your account."}
              </span>
              {manualCopy && (
                <label className="fsw-manual-prompt">
                  Clipboard unavailable. Select and copy this prompt.
                  <textarea
                    readOnly
                    value={example.prompt}
                    onFocus={(event) => event.target.select()}
                    rows={5}
                  />
                </label>
              )}
            </div>
            <StoreDemo view={example.key} onNavigate={selectExample} />
          </div>
        </section>
        <section className="fsw-ad-angles fsw-section" id="use-cases">
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">
                ONE PRODUCT. THREE REASONS TO CLICK.
              </span>
              <h2>
                Give every winning ad a page
                <br />
                that follows through.
              </h2>
            </div>
            <p>
              Keep the product. Change the angle, headline, and offer. Build a
              focused variation for the audience you’re reaching.
            </p>
          </div>
          <div className="fsw-angle-grid">
            {[
              {
                tag: "THE TRAVEL ANGLE",
                title: "Your routine. Ready to go.",
                detail:
                  "A product story built around packing your everyday essentials.",
                label: "Travel routine",
                count: 1,
              },
              {
                tag: "THE EVERYDAY ANGLE",
                title: "Make room for your daily routine.",
                detail:
                  "An editorial introduction with space for the product details.",
                label: "Daily routine",
                count: 1,
              },
              {
                tag: "THE BUNDLE ANGLE",
                title: "Your next two bottles. One set.",
                detail:
                  "A clear two-bottle offer, with the price at the heart of the page.",
                label: "Bundle offer",
                count: 2,
              },
            ].map((angle) => (
              <article className="fsw-angle-card" key={angle.tag}>
                <div className="fsw-angle-browser">
                  <span aria-hidden="true">● ● ●</span>
                  <small>Illustrative page variation</small>
                </div>
                <div className="fsw-angle-content">
                  <span>{angle.tag}</span>
                  <h3>{angle.title}</h3>
                  <div
                    className={`fsw-angle-photos fsw-angle-photos-${angle.count}`}
                  >
                    {Array.from({ length: angle.count }, (_, index) => (
                      <img
                        key={index}
                        src={demoMagnesium}
                        width="2000"
                        height="2000"
                        alt="Meo Nutrition Magnesium Glycinate sample product"
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                  <p>{angle.detail}</p>
                  <button
                    type="button"
                    onClick={() => {
                      selectExample(0);
                      document.getElementById("templates")?.scrollIntoView({
                        behavior: window.matchMedia(
                          "(prefers-reduced-motion: reduce)",
                        ).matches
                          ? "instant"
                          : "smooth",
                        block: "start",
                      });
                    }}
                  >
                    Explore the product demo <span aria-hidden="true">↗</span>
                  </button>
                </div>
                <div className="fsw-angle-caption">
                  {angle.label}
                  <span>Same product. A different brief.</span>
                </div>
              </article>
            ))}
          </div>
          <div className="fsw-angle-action">
            <p>
              Pick the next hypothesis. Preview your variation. Launch an A/B
              test.
            </p>
            <Link className="fsw-button fsw-button-start" to="/register">
              Build your next test <Arrow />
            </Link>
          </div>
        </section>
        <section className="fsw-benefits fsw-section" id="canvas">
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">
                FROM YOUR TERMINAL TO YOUR STORE
              </span>
              <h2>
                Brief the change.
                <br />
                Keep control of the result.
              </h2>
            </div>
            <p>
              Give your AI assistant a clear brief. Review the result, refine
              it, and publish when you’re ready.
            </p>
          </div>
          <div className="fsw-bento">
            {[
              {
                kind: "variation",
                tag: "01 / CAMPAIGN VARIATIONS",
                title: "A new angle. A new page.",
                copy: "Describe the change in your terminal. Preview a page that picks up exactly where your ad left off.",
                prompt:
                  "Create a landing page variation for our travel campaign. Lead with the two-bottle pack and keep our existing brand style.",
                result: "Campaign page preview",
                headline: "Your routine. Ready to go.",
                detail: "A focused offer. A matching message.",
                wide: true,
              },
              {
                kind: "translation",
                tag: "02 / TRANSLATION",
                title: "New markets. One prompt.",
                copy: "Ask AI to translate your page content. Review the language and local offer before you publish.",
                prompt:
                  "Translate this page into French. Keep the product names and adapt the headline for a French-speaking audience.",
                result: "French content preview",
                headline: "Votre routine, partout avec vous.",
                detail: "Découvrez votre nouvelle routine.",
              },
              {
                kind: "journey",
                tag: "03 / CHECKOUT & OFFERS",
                title: "Prompt the next step.",
                copy: "Describe your checkout layout and post-purchase offer flow. Preview the journey before connecting and testing payments.",
                prompt:
                  "Simplify the checkout layout. Add an upsell after purchase, a downsell if declined, and a clear thank-you page.",
                result: "Buying journey preview",
                wide: true,
              },
              {
                kind: "brand",
                tag: "04 / BRAND & MOBILE",
                title: "Your brand. Every screen.",
                copy: "Ask for your colors, typography, and mobile layout in one brief. Review the details at every size.",
                prompt:
                  "Apply our blue palette and typography. Stack the product details on mobile and make the main CTA easy to reach.",
                result: "Mobile design preview",
                headline: "Made for your everyday.",
                detail: "Explore the collection",
              },
            ].map((item) => (
              <article
                key={item.kind}
                className={`fsw-benefit fsw-prompt-benefit ${item.wide ? "fsw-benefit-wide" : ""}`}
              >
                <div className="fsw-benefit-copy">
                  <span>{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <div className="fsw-workflow-example">
                  <div className="fsw-terminal-example">
                    <div>
                      <span aria-hidden="true">›_</span> YOUR TERMINAL{" "}
                      <small>Example prompt</small>
                    </div>
                    <p>{item.prompt}</p>
                  </div>
                  <div className="fsw-workflow-transition" aria-hidden="true">
                    ↓
                  </div>
                  <div className={`fsw-prompt-result fsw-result-${item.kind}`}>
                    <div className="fsw-result-label">
                      <span>{item.result}</span>
                      <span>Illustrative</span>
                    </div>
                    {item.kind === "journey" ? (
                      <div className="fsw-journey-result">
                        <div>
                          <span>01</span>
                          <strong>Checkout</strong>
                          <small>Focused layout</small>
                        </div>
                        <i aria-hidden="true">→</i>
                        <div>
                          <span>02</span>
                          <strong>Upsell offer</strong>
                          <small>Accept or decline</small>
                        </div>
                        <i aria-hidden="true">→</i>
                        <div>
                          <span>03</span>
                          <strong>Thank you</strong>
                          <small>Order details</small>
                        </div>
                        <p>Declined offer → Downsell → Thank you</p>
                      </div>
                    ) : (
                      <div className="fsw-result-store">
                        <div className="fsw-result-store-copy">
                          <small>
                            {item.kind === "translation"
                              ? "FR / FRANÇAIS"
                              : "MEO NUTRITION"}
                          </small>
                          <strong>{item.headline}</strong>
                          <p>{item.detail}</p>
                          <span className="fsw-result-cta">
                            {item.kind === "translation"
                              ? "Découvrir"
                              : "Explore the collection"}{" "}
                            <span aria-hidden="true">↗</span>
                          </span>
                        </div>
                        <img
                          src={demoMagnesium}
                          width="2000"
                          height="2000"
                          alt="Meo Nutrition magnesium bottle in an illustrative page preview"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="fsw-capabilities">
            <span>AI-assisted copy</span>
            <span>Prompt to build</span>
            <span>Shopify products</span>
            <span>Custom domains</span>
            <span>A/B testing</span>
          </div>
        </section>
        <section
          className="fsw-comparison fsw-section"
          id="compare"
          aria-labelledby="fsw-compare-title"
        >
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">CHOOSE YOUR WORKFLOW</span>
              <h2 id="fsw-compare-title">
                Same commerce stack.
                <br />A different way to run it.
              </h2>
            </div>
            <p>
              Compare how you build, connect, and test your funnel—not just
              which payment methods it supports.
            </p>
          </div>
          <p className="fsw-table-hint" id="fsw-table-hint">
            Compare workflows below. On smaller screens, scroll the table
            sideways.
          </p>
          <div
            className="fsw-comparison-scroll"
            role="region"
            aria-label="Funnel builder workflow comparison"
            aria-describedby="fsw-table-hint"
            tabIndex={0}
          >
            <table>
              <caption>
                Funnelish, CheckoutChamp, and FunnelStudio workflow comparison
              </caption>
              <thead>
                <tr>
                  <th scope="col">Your workflow</th>
                  <th scope="col">Funnelish</th>
                  <th scope="col">CheckoutChamp</th>
                  <th scope="col">
                    FunnelStudio<span>Prompt. Preview. Refine.</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    "Build a page",
                    "Visual funnel builder",
                    "Page builder and funnel visualizer",
                    "Clone URLs and edit with AI through API/MCP",
                  ],
                  [
                    "Choose a starting point",
                    "Templates or support-assisted cloning",
                    "Pages and templates",
                    "Start from a URL, then adapt it",
                  ],
                  [
                    "Connect checkout & offers",
                    "Checkout, upsells, and downsells",
                    "Checkout, upsells, and downsells",
                    "Connect pages into checkout and offer flows",
                  ],
                  [
                    "Work with your AI assistant",
                    "Integrations available",
                    "MCP and AI-assisted page building",
                    "Use page and funnel tools from Claude Code or Codex",
                  ],
                  [
                    "Adapt your brand",
                    "Edit content and styles",
                    "AI tools and page editor",
                    "Prompt copy, image and brand changes, then review",
                  ],
                ].map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((cell, index) => (
                      <td key={index}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fsw-comparison-notes">
            <p>
              Compare the workflow that fits your team. Features and payment
              behavior depend on configuration and provider support.
            </p>
            <p>
              References:{" "}
              <a
                href="https://community.funnelish.com/t/funnelish-quick-start-guide/9875"
                target="_blank"
                rel="noopener noreferrer"
              >
                Funnelish guide
              </a>{" "}
              ·{" "}
              <a
                href="https://community.funnelish.com/t/done-for-you-funnel-cloning-service/9961"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloning service
              </a>{" "}
              ·{" "}
              <a
                href="https://help.checkoutchamp.com/llms.txt"
                target="_blank"
                rel="noopener noreferrer"
              >
                CheckoutChamp docs
              </a>{" "}
              · <Link to="/api-docs">FunnelStudio API</Link>
            </p>
          </div>
        </section>
        <section
          className="fsw-integrations fsw-section"
          id="integrations"
          aria-labelledby="fsw-integrations-title"
        >
          <div className="fsw-section-heading">
            <div>
              <span className="fsw-eyebrow">CONNECTED TO HOW YOU SELL</span>
              <h2 id="fsw-integrations-title">
                Your processors.
                <br />
                Your tax stack. Your rules.
              </h2>
            </div>
            <p>
              Connect supported payment providers, tax services, and commerce
              tools. Configure your accounts and choose the setup that fits your
              funnel.
            </p>
          </div>
          <div className="fsw-integration-grid">
            <article>
              <span className="fsw-integration-number">01 / PAYMENTS</span>
              <h3>Keep your payment connections.</h3>
              <p>
                Connect supported processors to your checkout. Configure your
                merchant account and choose the payment options that fit your
                funnel.
              </p>
              <div className="fsw-integration-names">
                <span>Stripe</span>
                <span>PayPal</span>
                <span>NMI</span>
              </div>
            </article>
            <article>
              <span className="fsw-integration-number">02 / TAX</span>
              <h3>Make tax part of the checkout.</h3>
              <p>
                Connect Zamp for tax calculation. Set up the service and review
                your checkout configuration before launch.
              </p>
              <div className="fsw-integration-names">
                <span>Zamp</span>
              </div>
            </article>
            <article>
              <span className="fsw-integration-number">03 / COMMERCE</span>
              <h3>Bring the rest of your stack.</h3>
              <p>
                Connect your Shopify catalog and Klaviyo customer marketing to
                the funnel experience you’re building.
              </p>
              <div className="fsw-integration-names">
                <span>Shopify</span>
                <span>Klaviyo</span>
              </div>
            </article>
          </div>
          <div className="fsw-integrations-footer">
            <span>
              Availability depends on provider and merchant configuration.
            </span>
            <Link
              className="fsw-text-link"
              to="https://calendly.com/markusa/markus-call-ecom"
            >
              Talk through your integrations <Arrow />
            </Link>
          </div>
        </section>
        <section className="fsw-demo fsw-section" id="demo">
          <div>
            <span className="fsw-eyebrow">A LOOK INSIDE THE STUDIO</span>
            <h2>
              Less explaining. <br />
              More “oh, I can do that.”
            </h2>
            <p>See how a page comes together in FunnelStudio.</p>
            <a
              className="fsw-demo-link"
              href="https://www.youtube.com/watch?v=I-rXTyKySsY"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", marginTop: 20, minHeight: 44 }}
            >
              Watch on YouTube ↗
            </a>
          </div>
          <div className="fsw-demo-video">
            {playing ? (
              <iframe
                src="https://www.youtube.com/embed/I-rXTyKySsY?autoplay=1&rel=0"
                title="FunnelStudio product demo"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play FunnelStudio product demo"
              >
                <img
                  src="https://img.youtube.com/vi/I-rXTyKySsY/maxresdefault.jpg"
                  alt="FunnelStudio product demo preview"
                  loading="lazy"
                  decoding="async"
                  width="1280"
                  height="720"
                />
                <span className="fsw-play">
                  <span aria-hidden="true">▶</span> Watch the demo
                </span>
              </button>
            )}
          </div>
        </section>
        <section className="fsw-feature-banner">
          <div>
            <span className="fsw-eyebrow">BUILT WITH YOU</span>
            <h2>
              What should
              <br />
              we build next?
            </h2>
            <p>
              The best ideas come from the people using it.
              <br />
              Tell us what would make your next launch easier.
            </p>
            <Link className="fsw-button" to="/contact?subject=feature-request">
              Suggest a feature <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="fsw-feature-art" aria-hidden="true">
            <span className="fsw-feature-kicker">FUNNELSTUDIO FEATURES</span>
            <div className="fsw-idea-card">
              <span>YOUR NEXT IDEA</span>
              <strong>What if we could…</strong>
              <div>
                <i />
                <i />
                <i />
              </div>
              <span className="fsw-idea-plus">+</span>
            </div>
            <span className="fsw-feature-footnote">
              A little feedback. A better studio.
            </span>
          </div>
        </section>
        <section className="fsw-faq fsw-section">
          <div>
            <span className="fsw-eyebrow">
              A FEW THINGS YOU MIGHT BE WONDERING
            </span>
            <h2>
              Good questions.
              <br />
              Straight answers.
            </h2>
          </div>
          <div>
            {questions.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  {answer}
                  {index === questions.length - 1 && (
                    <>
                      {" "}
                      <Link to="/pricing">See pricing →</Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="fsw-final">
          <span className="fsw-eyebrow">THE NEXT IDEA IS YOURS</span>
          <h2>
            Let’s put it
            <br />
            out into the world.
          </h2>
          <div className="fsw-hero-actions">
            <Link
              className="fsw-button fsw-button-demo"
              to="https://calendly.com/markusa/markus-call-ecom"
            >
              Schedule a demo
            </Link>
            <StartLink light />
          </div>
        </section>
      </main>
      <footer className="fsw-footer">
        <div className="fsw-footer-top">
          <div>
            <Logo />
            <p>
              Your products. Your prompts.
              <br />
              Your next winning variation.
            </p>
          </div>
          <div>
            <h3>Product</h3>
            <a href="#canvas">Prompt to build</a>
            <Link to="/top-funnels">Templates</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact?subject=feature-request">
              FunnelStudio Features
            </Link>
          </div>
          <div>
            <h3>Resources</h3>
            <a href="#demo">Watch demo</a>
            <Link to="/docs">Documentation</Link>
            <Link to="/support">Support</Link>
          </div>
          <div>
            <h3>FunnelStudio</h3>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Log in</Link>
            <Link to="/register">Get started</Link>
          </div>
        </div>
        <div className="fsw-footer-bottom">
          <span>© {new Date().getFullYear()} FunnelStudio</span>
          <div>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/terms-of-service">Terms of service</Link>
            <Link to="/refund">Refund policy</Link>
          </div>
          <span>Made for your next idea.</span>
        </div>
      </footer>
    </div>
  );
}
