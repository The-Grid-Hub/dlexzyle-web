# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for D'Lexzyle Enterprise, a car hire and vehicle leasing business in Asaba, Delta State, Nigeria. It is a small, fully static Next.js site: no backend, no API routes, no database, no env vars.

## Commands

```bash
npm run dev          # dev server at http://localhost:3000
npm run build        # production build (also type-checks)
npm run start        # serve the production build
npm run lint         # runs `eslint` directly (Next 16 removed `next lint`); flat config in eslint.config.mjs
npx tsc --noEmit     # type-check without building
```

There is no test framework. To verify a change, run `npm run lint` and `npm run build`.

## Stack notes

- **Next.js 16 App Router + React 19.** Routes are in `src/app/<route>/page.tsx`. Each sub-page exports its own `metadata`; the home page inherits from the root `layout.tsx`. The layout also wraps every page in `Navbar` / `<main>` / `Footer` and holds the site-wide OG, icon and manifest settings.
- **SEO.** The root layout sets `metadataBase` from `site.url`, so every OG/canonical URL in page metadata is written **relative** (`"/services"`) and resolves to an absolute one at build time. It also sets a title `template` of `"%s | D'Lexzyle Enterprise"`, so a sub-page title is just its own part — don't repeat the business name. Every page must set `alternates: { canonical: "/<route>" }`. `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and `/robots.txt`; `StructuredData` renders the `AutoRental` (LocalBusiness) JSON-LD once from the layout. It deliberately omits opening hours — don't add them until the real ones are confirmed.
- **Tailwind CSS v4, configured in CSS.** There is no `tailwind.config.*`. Brand tokens are defined in `@theme inline` in `src/app/globals.css` and used as utilities: `brand-green`, `brand-dark`, `brand-ink` (deep green-black for dark panels, the footer and video overlays), `brand-mist` (near-white panels, the header menu pill, inputs), `brand-light`, `brand-line` (hairline rules), `text-primary`, `text-muted`. The only hardcoded colour is WhatsApp green `#25D366` in `Button`. Buttons and inputs use `rounded-[10px]`; photo frames `rounded-[12px]`; the large home-page panels and service cards `rounded-[20px]`. There are no drop shadows: sections are separated by background changes and `brand-line` rules.
- **Type.** Two families, both loaded in `layout.tsx`: Archivo for body copy and Bebas Neue (one weight, 400) for display. The `font-display` utility in `globals.css` sets Bebas Neue, uppercase, `line-height: 0.9`, and turns off synthesised bold, so never pair it with a weight utility. Every heading, button label, menu item and section label uses it; sizes are fluid `text-[clamp(...)]` values (about 4.5rem for section titles, 7rem for page titles, up to 12.5rem for the home contact panel). Headings are written in sentence case in the source; the font uppercases them. Green is for links, buttons and small emphasised labels. Don't add letter-spaced small-caps labels.
- The `@/*` path alias maps to `src/*`.
- Components are server components by default. Only add `"use client"` where state, browser APIs or GSAP are needed (currently `Navbar`, `QuoteForm`, `ContactForm`, `LeadForm`, `HeroSlider`, `SiteMotion`, `Advantages`, `KeyAdvantages`, `ServicesStack` and everything in `src/components/motion/`).

## Motion (GSAP)

The site is animated the way the reference site (mvplogistics.eu) is: smooth scrolling, a preloader on the first visit, a curtain wipe between pages, split-character heading reveals, pinned scroll sections and background videos. GSAP 3.13+ ships ScrollTrigger, ScrollSmoother and SplitText free, so there is no Club licence to manage.

- `src/lib/gsap.ts` registers the plugins once and exports `gsap`, `ScrollTrigger`, `ScrollSmoother`, `SplitText`, `useGSAP` and `reducedMotion()`. Import from there, never from `gsap` directly. Every motion component returns early under `prefers-reduced-motion`, and `globals.css` resets the CSS starting states in the same media query, so the site is fully readable with motion off.
- **Layout order matters.** `layout.tsx` renders `SiteMotion` (preloader + curtain), `Navbar` (fixed) and then `SmoothScroll`, which wraps `<main>` and `Footer` in ScrollSmoother's `#smooth-wrapper` / `#smooth-content`. Anything `position: fixed` must live outside `SmoothScroll` or it will scroll with the page. `SmoothScroll` also jumps to the top (or the URL hash) on every route change, refreshes ScrollTrigger, and routes in-page `#anchor` clicks through the smoother with `ANCHOR_OFFSET` so the fixed header doesn't cover the target.
- **Page load.** An inline script in `layout.tsx` runs before paint: it adds the `js` class to `<html>` (only then does CSS hide the elements that will animate in) and sets `data-intro="full"` on the first load of a session or `"short"` afterwards. `SiteMotion` then animates every element with a `data-intro` attribute: `chars` (SplitText reveal), `header`, `line`, `fade`, `rise`, `slide` and `video`. Their starting states are CSS in `globals.css`. Use these on anything that should play in on page load (the hero, `AboutHero`, `PhotoBanner`); for headings that animate on scroll use `RevealText` instead. `SiteMotion` also intercepts clicks on internal links to bring the curtain down before `router.push`.
- **Primitives in `src/components/motion/`:** `RevealText` (scroll-triggered split-character heading; renders any tag via `as`), `ReadingText` (large copy whose words turn from faint to solid in order, scrubbed with scroll; wrap all the paragraphs in one so the reading runs continuously), `FadeBlock` (fades in at 92% of the viewport), `ScaleBlock` (panel scales 0.7 to 1 with scroll, once), `Ticker` (CSS marquee), `PinVideo` (full-viewport background video that pins until its `relative` parent's `end` edge; the hero's carries `intro`). A trigger inside a pinned section is measured wrongly unless it knows about the pin, so pinned sections carry `data-pinned` and the primitives pass `pinnedContainerOf(el)` from `gsap.ts`; pins also set `refreshPriority` so they refresh first. `TextHover` gives links and buttons the roll-up hover; put the `text-hover` class on the trigger.
- **Pinned sections** (`Advantages`, `KeyAdvantages`, `ServicesStack`) only pin under `DESKTOP_MOTION` (`(min-width: 1024px) and (prefers-reduced-motion: no-preference)`, exported from `motion/usePinnedList.ts` and re-exported by `Advantages`) via `gsap.matchMedia()`. `Advantages` and `KeyAdvantages` share the pin-and-scroll-the-list timeline through the `usePinnedList(section, list, fill)` hook in that file. Their Tailwind classes use the matching `motion-safe:lg:` variant so the static phone / reduced-motion layout is a plain column or a snap-scroll row.
- **Gotcha: Tailwind v4 transforms vs GSAP.** Tailwind's `translate-*`, `rotate-*` and `scale-*` utilities set the standalone `translate` / `rotate` / `scale` CSS properties, while GSAP animates `transform`. On any element GSAP moves, don't use those utilities; set the resting transform in CSS (`transform: ...`) or an arbitrary `[transform:...]` class, and let GSAP take over from there (see `.plug`, `[data-intro="video"]`).
- **Videos** are registered in `src/lib/videos.ts` and live in `public/video/` (silent H.264 MP4 under about 3 MB, plus a poster JPEG). Both current clips are Pexels stock stand-ins; keep the filenames when replacing them. The no-readable-plates rule from `images.ts` applies to every frame: the hero clip is cut at six seconds because a car with a legible plate enters after that.
- `HeroSlider` is the one use of Swiper (fade effect, autoplay, progress-bar pagination); its CSS is imported in the component.

## Gotcha: `className` props don't reliably override

`Button`, `Container` and similar components join their own classes with the `className` prop using a template string. There is no `tailwind-merge`. When two utilities set the same property, the winner is whichever Tailwind emits later in the stylesheet, not whichever comes last in the class string. For example, `max-w-[1200px]` beats `max-w-2xl`, and `hover:text-white` beats `hover:text-brand-green`. Before relying on an override, check the built CSS or the rendered page. Otherwise add a variant or prop to the component.

## Architecture

### Leads go through WhatsApp, not a server

`QuoteForm` and `ContactForm` never POST anywhere. On submit they:
1. read `FormData` and build a plain-text message with `formatLead()` (in `src/lib/site.ts`), which drops blank optional fields;
2. open `wa.me` in a new tab with that text via `whatsappUrl()`;
3. render `LeadSentNotice` with the same message body.

`LeadSentNotice` is the fallback if the browser blocks the WhatsApp tab: it offers a retry link and a `mailto:` link built from the same body, so don't remove it. Select fields send the human-readable label, not the option value (see `labelFor` in `QuoteForm`).

### Single sources of truth in `src/lib/`

- `site.ts`: business name, live `url`, WhatsApp number, phone, email and address (both the display string and the `addressLocality` / `addressRegion` / `addressCountry` parts used by the JSON-LD), plus the `whatsappUrl` / `mailtoUrl` / `formatLead` helpers. `site.url` drives `metadataBase`, canonicals, the sitemap and the JSON-LD — it is the only place the domain is written. Never hardcode contact details in components. The exception is "Asaba, Delta State", which also appears literally in page copy and metadata (home, about), so search for it if the address changes.
- `images.ts`: registry of the photos in `src/assets/images/`, typed as `Photo` (`src`, `alt`, optional `position` used as CSS `object-position` for cropped frames, and `credit`). They are statically imported, which enables `placeholder="blur"`. `PhotoCard`, `PhotoBanner`, `VehicleCard` and `Hero` take a `Photo`, not a raw src. `PhotoCard` also accepts a tuple of two or three photos, rendered as a collage: three fills a 3:2 frame with a large panel left and two stacked right (every cell square), two splits the same frame down the middle (each cell portrait), so check each photo's `position` against the cell shape. Array literals infer as arrays, not tuples, so write `[...] satisfies [Photo, Photo]` at the call site. `PhotoBanner` deliberately renders it with empty alt because it's decorative. The `fleet*` photos are stock stand-ins: to replace one, keep the filename and update the alt text. The logo is in `public/` and not in the registry, in two 296x200 versions, so render them with `h-10 w-auto`, never square: `/logo_.png`, the original on its white box, is the one the header uses; `/logo-white.png` is a white cut-out on a transparent background, used on the dark footer. `public/cars.png` is an old AI-generated hero illustration that misspells the business name; it is no longer used anywhere.
  - **No readable number plates.** A vehicle registration is personal data, so never add — or generate — a photo in which a plate can be read. Check the full-resolution file, front and rear, before putting it in the registry; if a plate is legible, crop it out or choose a different photo.
- `partners.ts`: trust-strip logos, shown on the home page (`Partners`) and the About page (`PartnerLogos`). The files live in `public/partners/`. `width`/`height` must be the logo's intrinsic dimensions. Logos render in grayscale and regain their colours on hover, focus or tap. RTI's brand guide asks for permission before third-party use and forbids recolouring, so management must confirm that permission before launch.
- `fleet.ts`: the three vehicle types with their specifications. A vehicle's `photo` is optional: while it is unset `VehicleCard` shows a `PhotoPlaceholder` and the services page falls back to the stock `fleet*` photo.
- `services.ts`: the six services on the home page (`HeroSlider`, `ServicesStack`, the footer's Services column). They are a finer split of the three categories on the Services page, so each `href` points at one of that page's section ids.
- `advantages.ts`: the eight cards in the home page's pinned "Why book with us" section. They restate the promises in `standards` and `keyAdvantages` (about.ts), so change all three together.
- `about.ts`: all copy for the About page. The page renders, in order, `intro` (hero), `statement`, `storyPanel`, `goals`, `keyAdvantages`, `mission`, `tagline` and `facts`; `intro.caption` and `storyPanel.lead` complete the business name printed above them, so they start lower-case. Everything marked PLACEHOLDER there is draft copy that management must confirm before launch. The "Figures last updated" line comes from `figuresUpdated`, so change it whenever a fact changes; `yearsOperating` is derived from `established`. `bookingSteps` is rendered on the Request a Quote page, and `established` drives the tickers in the home page's About panel and the About page's story panel. `story`, `milestones`, `team`, `standards`, `clientStories` and `faqs` are kept as copy stock but nothing renders them now (nor `PhotoMosaic`, `PartnerLogos`, `VehicleCard` on About, or `BookingSteps` on About). `keyAdvantages` restates the same promises as `advantages` (advantages.ts) and `standards`, so change them together.

### Content that is duplicated across files

These lists are not shared, so change them together:
- **Nav links:** `Navbar.tsx` (Home, About, Services, Contact, plus a "Request a quote" button) and `Footer.tsx` (the same pages including Request a quote). The footer also prints the contact details from `site.ts`.
- **Route list:** `routes` in `src/app/sitemap.ts` must list every page, alongside the nav links above.
- **Vehicle types:** `vehicleTypes` in `QuoteForm.tsx` and `fleet` in `src/lib/fleet.ts` (rendered by the services page).
- **Services:** `homeServices` in `src/lib/services.ts` links to `/services#corporate`, `#private` and `#leasing`. Those ids come from `serviceCategories` in `src/app/services/page.tsx`, which has its own copy for the three categories. The fleet section on that page is `#fleet`, linked from `FleetOverview` on the home page.

### Home page structure

`src/app/page.tsx` is two `relative isolate overflow-clip` containers, each starting with a `PinVideo` that stays fixed while the sections after it scroll over it (`isolate` keeps the `-z-10` video above the container's own background; `overflow-clip` stops the pinned video painting over the next section on phones, where that section has no stacking context of its own): the hero video behind `Hero` and `AboutPanel`; the footer video behind `Clients` and `HomeContact`. Between them sit `Advantages` (pinned list), `ServicesStack` (pinned stacking cards) and `FleetOverview`. `HomeContact` holds `LeadForm`, a three-field version of the WhatsApp lead flow below.

### Shared UI conventions

- `Button` renders a Next `Link` for internal `href`s, an `<a target="_blank">` for `http`/`tel:`/`mailto:` hrefs, and a `<button>` when there is no `href`. Variants: `primary`, `light` (pale panel colour, the reference's default), `outline`, `whatsapp`, `inverse`; sizes `md` (default) and `lg`. Labels are set in the display face and get the roll-up hover through `TextHover` (pass `roll={false}` to skip it); the background fills from the bottom on hover via the `--fill` variable set by each variant. Button labels say what happens: "Send request on WhatsApp", not "Submit".
- Form inputs are wrapped in `Field` and use its exported `inputBase` class string (pale `brand-mist` fill, no visible border until focus). `Field` takes an optional `hint` shown after the label, used for "(optional)".
- The header's logo always shows on its own white box, but the business name beside it turns white over dark surfaces. `isDarkBehind` in `Navbar` checks what is under the logo and name on every scroll update: the first element with a `data-header="dark" | "light"` attribute, a photo or video, or an at-least-half-opaque background colour decides it. Pinned `PinVideo`s are `pointer-events: none` and can't be hit, so a container whose only dark surface is a video needs `data-header="dark"` (the home hero container has it).
- The header is fixed and transparent, so every page's first section must clear it: `PhotoBanner` does with its top padding and the home hero is full-viewport. `PhotoBanner` and `SectionHeading` take `as="h1" | "h2"`. When a banner is the first element on a page, pass `as="h1"`. `PhotoBanner`'s heading, subtitle and children carry `data-intro` attributes so they play in on load; `SectionHeading` renders its title through `RevealText` and its subtitle through `FadeBlock`. Both are left-aligned by default. `PhotoBanner` sets its heading bottom-left over a green gradient; children render in a row beneath it.
- `PhotoCard` has no box: the photo frame carries the radius and the text sits on the page. `VehicleCard` (an `<li>`) renders one `fleet.ts` vehicle with its spec list and either a `Photo` or the `PhotoPlaceholder`; the services and About fleet grids both use it. `FleetOverview` is the home page's spec table for the same data. `BookingSteps` renders `bookingSteps` from `about.ts`.
- `Hero` (home only) is a full-viewport section over the pinned hero video: a small header row with a growing hairline, the headline bottom-left and, on `lg`, `HeroSlider` beside it (phones get an "Our services" button instead). The `heroDriver` photo is no longer used on the home page.
- `PhotoPlaceholder` stands in for a photo that doesn't exist yet (team portraits, real fleet photos). It takes a Tailwind `aspect` class and a `label` for screen readers, and hides its caption in frames narrower than 9rem. Replace it with a `Photo` from `images.ts` when the picture arrives.
- The `inverse` Button variant is the white outline for buttons on a brand-green or dark photo background. Use it rather than overriding `outline` with `className` (see the gotcha above).
- **About page** (`src/app/about/page.tsx`) mirrors the reference's About page: `AboutHero` (full-viewport photo, giant title, intro column offset right), a `ReadingText` statement, `AboutStory` (the two-column dark panel with ticker), three goal cards, `KeyAdvantages` (pinned), the mission with `ReadingText`, the pale tagline panel, three dark fact cards, then `ServicesStack` and `HomeContact` reused from the home page. Section titles above the card grids are the oversized `clamp(3rem,10vw,12.5rem)` size, centred on `lg`. The company-profile request that used to live here was removed with the old layout; if it returns, build the WhatsApp request with `whatsappUrl()`.

## Copy

Use British/Nigerian English spelling (e.g. "organisations") and the `en-NG` locale for dates. The business is based in the South-South and South-East and serves clients across Nigeria.
