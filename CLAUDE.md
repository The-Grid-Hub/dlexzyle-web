# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for D'Lexzyle Enterprises, a car hire and vehicle leasing business in Asaba, Delta State, Nigeria. It is a small, fully static Next.js site: no backend, no API routes, no database, no env vars.

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
- **Tailwind CSS v4, configured in CSS.** There is no `tailwind.config.*`. Brand tokens are defined in `@theme inline` in `src/app/globals.css` and used as utilities: `brand-green`, `brand-dark`, `brand-light`, `text-primary`, `text-muted`. Two colours are hardcoded hex values rather than tokens: the gold accent `#c8a84b` in `Hero` and WhatsApp green `#25D366` in `Button`. Buttons and inputs use `rounded-[10px]`; cards use `rounded-[12px]`.
- The `@/*` path alias maps to `src/*`.
- Components are server components by default. Only add `"use client"` where state or browser APIs are needed (currently `Navbar`, `QuoteForm`, `ContactForm`).

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

- `site.ts`: business name, WhatsApp number, phone, email and address, plus the `whatsappUrl` / `mailtoUrl` / `formatLead` helpers. Never hardcode contact details in components. The exception is "Asaba, Delta State", which also appears literally in page copy and metadata (home, about), so search for it if the address changes.
- `images.ts`: registry of the photos in `src/assets/images/`, typed as `Photo` (`src`, `alt`, optional `position` used as CSS `object-position` for cropped frames, and `credit`). They are statically imported, which enables `placeholder="blur"`. `PhotoCard` and `PhotoBanner` take a `Photo`, not a raw src. `PhotoCard` also accepts a `[Photo, Photo, Photo]` tuple, rendered as a collage (large panel left, two stacked right; every cell is square, so check each photo's `position` for a square crop). Array literals infer as arrays, not tuples, so write `[...] satisfies [Photo, Photo, Photo]` at the call site. `PhotoBanner` deliberately renders it with empty alt because it's decorative. The `fleet*` photos are stock stand-ins: to replace one, keep the filename and update the alt text. The hero illustration (`/cars.png`) and logo (`/logo_.png`) are in `public/` and are not in the registry.
  - **No readable number plates.** A vehicle registration is personal data, so never add — or generate — a photo in which a plate can be read. Check the full-resolution file, front and rear, before putting it in the registry; if a plate is legible, crop it out or choose a different photo.
- `partners.ts`: homepage trust-strip logos. The files live in `public/partners/`. `width`/`height` must be the logo's intrinsic dimensions.

### Content that is duplicated across files

These lists are not shared, so change them together:
- **Nav links:** `Navbar.tsx` and `Footer.tsx`. The footer also has a Contact link.
- **Vehicle types:** `vehicleTypes` in `QuoteForm.tsx` and `fleet` in `src/app/services/page.tsx`.
- **Services:** `ServicesPreview.tsx` on the home page lists three services, including Vehicle Leasing. The services page has its own `serviceCategories` with two.

### Shared UI conventions

- `Button` renders a Next `Link` for internal `href`s, an `<a target="_blank">` for `http`/`tel:`/`mailto:` hrefs, and a `<button>` when there is no `href`. Variants: `primary`, `outline`, `whatsapp`.
- Form inputs are wrapped in `Field` and use its exported `inputBase` class string.
- `PhotoBanner` and `SectionHeading` take `as="h1" | "h2"`. When a banner is the first element on a page, pass `as="h1"`.

## Copy

Use British/Nigerian English spelling (e.g. "organisations") and the `en-NG` locale for dates. The business serves South-South and South-East Nigeria.
