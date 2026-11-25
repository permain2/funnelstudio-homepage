import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import MarketingHome from "./MarketingHome";
import VariantPicker from "./VariantPicker";

// Three variations share one build; ?v= selects. Lazy so a visitor only
// downloads the one they asked for.
const VariantConsole = lazy(() => import("./VariantConsole"));
const VariantStorefront = lazy(() => import("./VariantStorefront"));

const v = new URLSearchParams(location.search).get("v");
const Page =
  v === "b" ? VariantConsole : v === "c" ? VariantStorefront : MarketingHome;

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <Suspense
      fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}
    >
      <Page />
    </Suspense>
    <VariantPicker current={v || "a"} />
  </HelmetProvider>,
);
