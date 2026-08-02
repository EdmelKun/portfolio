# Portfolio

Personal site for **Edmel John Linaugo** — Full Stack Software Engineer. One static page, dark only, built to be read in about a minute.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS v4 · Zod

No router, no CMS, no backend. Deployed as static files.

## Running it

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run lint       # eslint
```

## How it is put together

**Content is data.** Every string on the page lives in [`src/content.ts`](src/content.ts) behind a Zod schema that parses at module scope. Bad content fails `dev` and `build` rather than shipping — a work entry without a URL, for example, cannot be marked `live`. Components read from the parsed object and never hold copy of their own.

**Design tokens are CSS variables.** The palette, type stack and hairline are declared once in an `@theme` block in [`src/index.css`](src/index.css), which makes them Tailwind utilities and custom properties simultaneously. No component contains a hex value.

**Layers carry meaning.** Each tech chip declares a `layer` of `client`, `server` or `platform`. Cyan means client, amber means server, outline means cross-cutting — the same logic the hero animation uses, so the colours mean one thing everywhere.

## The hero animation

A request travels client → api → data in cyan and a response returns in amber, on a rail that runs horizontally above 640px and vertically below it. Built in CSS ([`src/components/Motif.css`](src/components/Motif.css)) with no animation library, moving only `translate` and `opacity` so it stays off the main thread.

It is the only thing on the page that moves on its own. Under `prefers-reduced-motion: reduce` the pulses park at their endpoints and the rail renders as a static cyan-to-amber gradient — the idea still reads with nothing animating.

## Brand assets

The favicon and Open Graph image are generated, not hand-exported:

```bash
node generate-assets.mjs preview     # contact sheet of favicon candidates
node generate-assets.mjs monogram    # favicon.svg, apple-touch-icon.png, favicon-96.png
node generate-assets.mjs og          # og.png at 1200x630
```

Text is set in the same IBM Plex Mono the site ships, decompressed from WOFF2 to TrueType at generation time, so output does not depend on which fonts a machine happens to have installed.

## Accessibility

Semantic landmarks and a real heading hierarchy, a skip link ahead of the nav, visible focus rings on every interactive element, and layout down to 320px. Lighthouse scores 100 across Performance, Accessibility, Best Practices and SEO on the production build.

## Deployment

Vercel, Hobby plan. Build command `npm run build`, output directory `dist`. Pushes to `main` deploy automatically.
