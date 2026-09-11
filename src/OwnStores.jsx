// First-party proof. Every claim here is checkable: these are Interactive
// Ecommerce's own brands, and the funnel in the showreel above is a live page
// anyone can open. No invented metrics, no borrowed logos, no testimonials.
const brands = [
  { name: "Cosara" },
  { name: "Meo Nutrition" },
  { name: "VitaNord" },
  { name: "NomoBark" },
  { name: "Linjer" },
  { name: "Dermao" },
  { name: "Gamo" },
  { name: "BuyCosari" },
  { name: "Meoburn" },
  { name: "Millory" },
  { name: "Tillskottfakta" },
  { name: "Rosabella" },
];

export default function OwnStores() {
  return (
    <section className="own" id="own-stores" aria-labelledby="own-title">
      <div className="own-head" data-reveal="out">
        <span className="fsh-eyebrow">
          <i aria-hidden="true" /> Who it was built for
        </span>
        <h2 id="own-title">
          No case studies.
          <br />
          <span>Our own stores.</span>
        </h2>
        <p>
          FunnelStudio wasn’t built to be sold. It was built because we run
          these brands, and the page could never keep up with the creative.
          Every landing page, checkout, order bump and upsell across them runs
          on it — which means we find what’s broken before you do.
        </p>
      </div>

      <ul className="own-pills" data-reveal="out">
        {[
          "Supplements",
          "Skincare",
          "Devices",
          "Pet",
          "Accessories",
          "Digital",
        ].map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <ul className="own-wall" data-reveal="out">
        {brands.map((b) => (
          <li key={b.name}>
            <span>{b.name}</span>
          </li>
        ))}
      </ul>

      <p className="own-proof" data-reveal="out">
        <span className="own-live" aria-hidden="true" />
        {"The funnel in the clip above isn’t a mockup — "}
        <a
          href="https://sale.meonutrition.com/berberine-pdp-a"
          target="_blank"
          rel="noopener noreferrer"
        >
          open it yourself
        </a>
        {", it takes real orders today."}
      </p>
    </section>
  );
}
