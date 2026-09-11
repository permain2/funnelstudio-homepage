import "./VariantPicker.css";
import { featureVariantNames } from "./FeatureVariants";

// Review-only switcher. Everything ships in one build; this is how Markus
// moves between page variations (?v=) and feature-section treatments (?f=)
// without a deploy per option.
const pages = [
  { k: "a", name: "Receipts", note: "real screenshots + video" },
  { k: "b", name: "Console", note: "drawn + animated in code" },
  { k: "c", name: "Storefront", note: "editorial, image-led" },
];

export default function VariantPicker({ current }) {
  const params = new URLSearchParams(location.search);
  const f = params.get("f") || "0";
  const href = (v, feat) => {
    const q = new URLSearchParams();
    q.set("v", v);
    if (feat && feat !== "0") q.set("f", feat);
    return `?${q.toString()}${feat && feat !== "0" ? "#what-you-get" : ""}`;
  };
  return (
    <nav className="vp" aria-label="Review switcher">
      <span className="vp-group">
        {pages.map((v) => (
          <a
            key={v.k}
            href={href(v.k, "0")}
            className={v.k === current && f === "0" ? "is-on" : ""}
            aria-current={v.k === current && f === "0" ? "page" : undefined}
          >
            <b>{v.k.toUpperCase()}</b>
            <span>{v.name}</span>
            <small>{v.note}</small>
          </a>
        ))}
      </span>
      <span className="vp-sep" aria-hidden="true" />
      <span className="vp-group vp-feat">
        <small className="vp-cap">Feature section</small>
        {Object.entries(featureVariantNames).map(([n, [name, note]]) => (
          <a
            key={n}
            href={href("a", n)}
            className={current === "a" && f === n ? "is-on" : ""}
            aria-current={current === "a" && f === n ? "page" : undefined}
            title={note}
          >
            <b>F{n}</b>
            <span>{name}</span>
          </a>
        ))}
      </span>
    </nav>
  );
}
