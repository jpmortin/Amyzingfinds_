# amyzingfinds.co.uk

Amy's website. Built with [Astro](https://astro.build), hosted on Vercel, content kept as plain files in this repo.

## How it works

- **Pages** live in `src/pages/`. One file per page (`about.astro`, `work-with-me.astro`, …).
- **Finds** (the articles) live in `src/content/finds/`, one Markdown file each. Add a file, push, and it appears on the site. See the three `example-*.md` files for the format; delete them once real ones exist.
- **Facts that appear in several places** (email, stats, Instagram handle, form endpoint) are in `src/site.ts`. Change them there only.
- **Look and feel** (colours, fonts, spacing) is in `src/styles/global.css` and the components in `src/components/`.
- Every push to `main` rebuilds and redeploys the site on Vercel automatically, usually within a minute.

## Writing a find

Create `src/content/finds/some-slug.md` (the file name becomes the URL):

```md
---
title: "The Sunday roast that made me cancel my own"
venue: "The Fleece"
area: "Harrogate"
type: restaurant            # restaurant | cafe | bar | hotel | day-out | event | shop
date: 2026-10-05
summary: "One or two sentences shown on the card and at the top of the article."
cover: /images/finds/fleece.jpg   # optional; put the image in public/images/finds/
coverAlt: "A roast dinner on a wooden board"
partnership: none           # none | gifted | paid  (shows the label automatically)
reel: https://www.instagram.com/reel/XXXX/   # optional
---

Body text in Markdown. ## for headings, **bold**, - for lists.
```

## Reels

`src/data/reels.json` holds every reel (link, date, views, cleaned caption) and drives the Reels pages and the home-page grid. It is generated from `scripts/reels-raw.json` by `node scripts/build-reels.mjs`. To add new reels: append them to `reels-raw.json` (code, views, date, caption) and re-run the script, or ask Claude to re-scrape the profile. A reel marked `*invite` or `*pr invite` in its caption is labelled "Gifted" automatically.

## Still to do

- [ ] Replace placeholder portrait and card images with real photos (`public/images/`).
- [ ] Surname, real email address: `src/site.ts`.
- [ ] Enquiry form: create a free form at formspree.io and paste the endpoint into `formEndpoint` in `src/site.ts`.
- [ ] Instagram feed: connect the account to a feed service (e.g. Behold) and wire its JSON into `src/components/InstagramGrid.astro`.
- [ ] Buy the domain and point it at Vercel; update `site` in `astro.config.mjs`.
- [ ] Optional: add an editor (Decap CMS or Keystatic) so Amy can write finds in the browser.

## Running it locally

```
npm install
npm run dev
```
