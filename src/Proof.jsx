// Pixel-for-pixel clones of two BabyLoveGrowth sections, built from measured
// geometry (their DOM, read at 1440+): the "Actively growing 4,000+ companies"
// logo wall and the "Proven across industries, trusted by leaders" marquee.
//
// ⚠️ PLACEHOLDER CONTENT AND ASSETS. Every logo, portrait, chart, quote and
// number here is BabyLoveGrowth's, served from public/proof/. This is a layout
// reference for Markus to sign off; it must be swapped for FunnelStudio's own
// proof before the page is public. Nothing here is a FunnelStudio claim.
const root = `${import.meta.env.BASE_URL}proof/`;

const industries = [
  "SaaS & Tech",
  "Marketing & Media",
  "Finance & Business",
  "Travel & Hospitality",
  "Retail & Ecommerce",
  "Home & Industrial",
];

// width/height are their rendered sizes, so the cells sit exactly as theirs do.
const logos = [
  ["consentstack", "ConsentStack", 151, 24],
  ["nls", "NILS", 77, 24],
  ["concept-ventures", "Concept Ventures", 151, 24],
  ["4endurance", "4Endurance", 83, 24],
  ["PAIRFUM", "Pairfum", 94, 24],
  ["right-at-home-uk", "Right at Home", 152, 24],
  ["yardstick", "Yardstick", 104, 24],
  ["gen-z", "GenZ Shop", 75, 32],
  ["cyberseer", "Cyberseer", 112, 24],
  ["anatae", "Anatae", 83, 24],
  ["chic-canin", "Chic Canin", 61, 32],
  ["brickhouse-security", "Brickhouse Security", 89, 24],
];

export function TrustWall() {
  return (
    <section className="tw" aria-labelledby="tw-title">
      <h2 className="tw-lead" id="tw-title">
        Actively growing <span>4,000+ companies across industries</span>
      </h2>
      <ul className="tw-pills">
        {industries.map((c) => (
          <li key={c}>
            <span>{c}</span>
          </li>
        ))}
      </ul>
      <ul className="tw-grid">
        {logos.map(([file, name, w, h]) => (
          <li key={file}>
            <img
              src={`${root}logos/${file}.svg`}
              alt={`${name} logo`}
              width={w}
              height={h}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

const metric = (chart, tag, kicker, lead, brand, tail, stats) => ({
  kind: "metric",
  chart,
  tag,
  kicker,
  lead,
  brand,
  tail,
  stats,
});
const quote = (photo, logo, logoW, logoH, tag, text, who, role) => ({
  kind: "quote",
  photo,
  logo,
  logoW,
  logoH,
  tag,
  text,
  who,
  role,
});

const rowA = [
  metric(
    "tulip_chart",
    "Marketing & Media",
    "Video production",
    "How ",
    "Tulip Films",
    " made a 10x leap in domain rating",
    [
      ["10x", "DR growth"],
      ["88.9k", "Impressions"],
    ],
  ),
  metric(
    "hotelimpulse_chart",
    "Marketing & Media",
    "Video production",
    "How ",
    "Hotelimpulse",
    " grew its domain authority by 65%",
    [
      ["65%", "Domain authority"],
      ["3x", "Organic traffic"],
    ],
  ),
  quote(
    "emily",
    "popcornaa",
    65,
    65,
    "Retail & Ecommerce",
    "After our rebrand, we wanted a fresh approach to SEO and AI-driven search visibility, and that's exactly what BabyLoveGrowth delivered.",
    "Emily Tse",
    "Founder, PopCornAA",
  ),
  metric(
    "samwell_chart",
    "SaaS & Tech",
    "AI-powered edtech",
    "How ",
    "Samwell",
    " reached +1.4M impressions",
    [
      ["1.4M", "Impressions"],
      ["DR 41", "Domain rating"],
    ],
  ),
];

const rowB = [
  quote(
    "pieter",
    "tulip",
    170,
    38,
    "Marketing & Media",
    "I started with very low authority, but within months I was outperforming competitors and seeing steady ranking improvements.",
    "Pieter Nijssen",
    "Founder, Tulip Films",
  ),
  metric(
    "andrea_chart",
    "Marketing & Media",
    "Digital marketing · Web development",
    "How ",
    "Andrea Freelance",
    " went from 2.1K → 12.6K monthly impressions",
    [
      ["500%", "Impression growth"],
      ["37", "Monthly clicks"],
    ],
  ),
  quote(
    "matt",
    "tatem",
    65,
    65,
    "Marketing & Media",
    "Organic traffic increased from 120 visits per month to over 12,000 within 12 months — consistent upward growth across authority, visibility, and traffic.",
    "Matt Tatem",
    "Founder Of Tatem Web Design",
  ),
  metric(
    "campervan_chart",
    "Travel & Hospitality",
    "Campervan rental · Travel",
    "How ",
    "Campervan.si",
    " grew search impressions to 41.7K in 6 months",
    [
      ["1.14k", "Total clicks"],
      ["7.7", "Avg. position"],
    ],
  ),
];

function Card({ c }) {
  if (c.kind === "metric") {
    return (
      <li className="pf-card pf-metric">
        <div className="pf-chart">
          <div className="pf-chart-in">
            <img
              src={`${root}cards/${c.chart}.webp`}
              alt=""
              width="348"
              height="185"
              loading="lazy"
              decoding="async"
            />
          </div>
          <span className="pf-tag">{c.tag}</span>
        </div>
        <div className="pf-body">
          <p className="pf-kicker">{c.kicker}</p>
          <h3>
            {c.lead}
            <b>{c.brand}</b>
            {c.tail}
          </h3>
          <dl className="pf-stats">
            {c.stats.map(([v, l]) => (
              <div key={l}>
                <dd>{v}</dd>
                <dt>{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </li>
    );
  }
  return (
    <li className="pf-card pf-quote">
      <div className="pf-photo">
        <img
          src={`${root}cards/${c.photo}.webp`}
          alt={`${c.who}, ${c.role}`}
          width="247"
          height="373"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pf-said">
        <img
          className="pf-colog"
          src={`${root}cards/${c.logo}.svg`}
          alt=""
          width={c.logoW}
          height={c.logoH}
          loading="lazy"
          decoding="async"
        />
        <blockquote>“{c.text}”</blockquote>
        <div className="pf-who">
          <p className="pf-name">{c.who}</p>
          <p className="pf-role">{c.role}</p>
        </div>
      </div>
      <span className="pf-tag">{c.tag}</span>
    </li>
  );
}

// Each row is a marquee: the deck is rendered twice so translateX(-50%) loops
// seamlessly. Paused on hover and under prefers-reduced-motion.
function Row({ cards, dir }) {
  const deck = [...cards, ...cards];
  return (
    <div className="pf-row">
      <ul className={`pf-track${dir === "rtl" ? " is-rtl" : ""}`}>
        {deck.map((c, i) => (
          <Card c={c} key={`${c.who || c.brand}-${i}`} />
        ))}
      </ul>
    </div>
  );
}

export function ProofRail() {
  return (
    <section className="pf" aria-labelledby="pf-title">
      <div className="pf-head">
        <h2 id="pf-title">Proven across industries, trusted by leaders</h2>
        <a className="pf-all" href="#what-you-get">
          See All
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12h14M12 6l6 6-6 6" />
          </svg>
        </a>
      </div>
      <Row cards={rowA} />
      <Row cards={rowB} dir="rtl" />
    </section>
  );
}
