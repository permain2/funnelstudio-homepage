// The funnel as a drawn diagram — the piece Markus singled out, now carrying
// the full chain: advertorial → PDP → checkout with bumps → upsell, downsell
// on decline → thank you. Edges stroke themselves in, nodes land in sequence,
// and a pulse runs the accepted path. No images.
const nodes = [
  { x: 8, y: 150, label: "Advertorial", meta: "the angle" },
  { x: 170, y: 150, label: "PDP", meta: "offer tiers" },
  { x: 332, y: 150, label: "Checkout", meta: "+ order bumps", tall: true },
  { x: 560, y: 72, label: "Upsell", meta: "1-click, accepted" },
  { x: 560, y: 228, label: "Downsell", meta: "declined" },
  { x: 800, y: 150, label: "Thank you", meta: "receipt" },
];

const edges = [
  "M140,150 L170,150",
  "M302,150 L332,150",
  "M464,150 C510,150 515,72 560,72",
  "M464,150 C510,150 515,228 560,228",
  "M692,72 C745,72 755,150 800,150",
  "M692,228 C745,228 755,150 800,150",
];

const PULSE =
  "M140,150 L170,150 L302,150 L332,150 C440,150 515,72 560,72 C692,72 755,150 800,150";

export default function FunnelFlow({ id = "flow" }) {
  return (
    <figure className="flw" data-reveal="out">
      <svg
        viewBox="0 0 940 300"
        role="img"
        aria-label="A FunnelStudio funnel: an advertorial leads to the product page, then a checkout carrying order bumps. Accepting the one-click upsell goes straight to the thank-you page; declining routes through a downsell first."
      >
        {edges.map((d, i) => (
          <path key={d} className="flw-edge" d={d} style={{ "--i": i }} />
        ))}
        <circle className="flw-pulse" r="4.5">
          <animateMotion dur="4.6s" repeatCount="indefinite" path={PULSE} />
        </circle>
        {nodes.map((n, i) => (
          <g key={n.label} className="flw-node" style={{ "--i": i }}>
            <rect x={n.x} y={n.y - 27} width="132" height="54" rx="12" />
            <text
              x={n.x + 66}
              y={n.y - 4}
              textAnchor="middle"
              className="flw-label"
            >
              {n.label}
            </text>
            <text
              x={n.x + 66}
              y={n.y + 14}
              textAnchor="middle"
              className="flw-meta"
            >
              {n.meta}
            </text>
          </g>
        ))}
        <text x={398} y={232} textAnchor="middle" className="flw-branch">
          declined
        </text>
        <text x={398} y={92} textAnchor="middle" className="flw-branch">
          accepted
        </text>
      </svg>
      <figcaption>
        Every box is a real page you can open, edit and publish — and every
        branch is wired before you ship it.
      </figcaption>
    </figure>
  );
}
