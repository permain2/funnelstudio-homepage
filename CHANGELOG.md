# Changelog

## 1.2.0

Rebuild the hero as a live build sequence: a terminal types an operator's prompt and the funnel assembles beside it (landing page, checkout, upsell, thank-you) before the page preview resolves. Add a scroll-reveal motion system, pointer-tracked card highlights and a sliding tab indicator, all disabled under `prefers-reduced-motion`. Set terminal surfaces in JetBrains Mono, make the header adapt to the band behind it, and drop the ad-angle section that repeated the prompt-to-page story, shortening the page by roughly 1,400px.

Fix: `.fsw-hero p` was overriding hero paragraph styles by specificity, mis-aligning the terminal body. Demo links now open in a new tab.

Review fixes: arrow-key tab navigation focused the wrong tab once the sliding indicator joined the tablist; the `[data-spot]` transition shorthand was cancelling the reveal fade and stagger on every card that was both; the dark header's `color:#fff` reached the light mobile dropdown, so that panel now goes dark with the header. Seven new rules that were being outranked or were clobbering existing responsive rules are corrected — the hero re-centres above 1600px, its h1 drops to 32px at 360px, and the terminal no longer changes height while typing. Added a pause control for the looping sequence (WCAG 2.2.2), named the funnel steps for screen readers, and removed the dead ad-angle CSS.

## 1.1.3

Refine the four performance pillars with the requested headings, copy, and feature lists while preserving demo actions and provider qualifications.

## 1.1.2

Replace the journey strip with four performance-focused ecommerce pillars, illustrative checkout/cart/offer/payment layouts, and links to the interactive demos.

## 1.1.1

Initial standalone public homepage with interactive sample store, prompt previews, comparison, and integrations.
