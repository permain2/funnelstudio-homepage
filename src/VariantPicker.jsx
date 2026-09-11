import "./VariantPicker.css";

// Review-only switcher. Three variations ship in one build; this is how Markus
// moves between them without three deploys.
const variants = [
  { k: "a", name: "Receipts", note: "real screenshots + video" },
  { k: "b", name: "Console", note: "drawn + animated in code" },
  { k: "c", name: "Storefront", note: "editorial, image-led" },
];

export default function VariantPicker({ current }) {
  return (
    <nav className="vp" aria-label="Homepage variations">
      <span className="vp-label">Variation</span>
      {variants.map((v) => (
        <a
          key={v.k}
          href={`?v=${v.k}`}
          className={v.k === current ? "is-on" : ""}
          aria-current={v.k === current ? "page" : undefined}
        >
          <b>{v.k.toUpperCase()}</b>
          <span>{v.name}</span>
          <small>{v.note}</small>
        </a>
      ))}
    </nav>
  );
}
