// Turns scripts/reels-raw.json (scraped from the Instagram profile) into src/data/reels.json.
// Run: node scripts/build-reels.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const raw = JSON.parse(readFileSync(new URL('./reels-raw.json', import.meta.url), 'utf8'));

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]/gu;
const strip = (s) => s.replace(EMOJI, '').replace(/[ \t]+/g, ' ').replace(/ +\n/g, '\n').trim();

const cleanCaption = (text) =>
  strip(text)
    .split('\n')
    .filter((line) => !/^\s*follow me @amyzingfinds_/i.test(line))       // Instagram-only CTA
    .filter((line) => !/^\s*(#\w+\s*)+(\*\w+( \w+)?)?\s*$/.test(line))     // hashtag-only lines
    .map((line) => line.replace(/\s*#\w+/g, '').replace(/\s*\*(pr )?invite\s*$/i, '').trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const titleOf = (text) => {
  const first = cleanCaption(text).split('\n').find((l) => l.trim().length > 3) || 'Untitled';
  let t = first.replace(/[.!…:]+$/, '').trim();
  if (t.length > 80) t = t.slice(0, 77).replace(/\s+\S*$/, '') + '…';
  return t;
};

const toISO = (d) => new Date(d + ' 12:00 UTC').toISOString().slice(0, 10);

const reels = raw
  .filter((r) => !r.hidden)
  .map((r) => ({
    code: r.c,
    url: `https://www.instagram.com/reel/${r.c}/`,
    date: toISO(r.date),
    views: r.v || null,
    title: titleOf(r.caption),
    caption: cleanCaption(r.caption),
    gifted: /\*(pr )?invite/i.test(r.caption),
  }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

writeFileSync(new URL('../src/data/reels.json', import.meta.url), JSON.stringify(reels, null, 2) + '\n');
console.log(`Wrote ${reels.length} reels.`);
