// Builds index.html from _src/index.src.html + _src/art.mjs. Run: node _src/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { ART as RAW_ART, TYPES, COLOURS, IG_POSTS, SITE, IG, COLLECTION_QUOTES } from './art.mjs';

// Gallery order: weave the objects in between the paintings so every column mixes both.
const ART = (() => {
  const fl = RAW_ART.filter(a => a.type === 'florals'), ob = RAW_ART.filter(a => a.type !== 'florals'), out = [];
  while (fl.length || ob.length) { out.push(...fl.splice(0, 2)); if (ob.length) out.push(ob.shift()); }
  return out;
})();

const V = '3';
const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty', 'Twenty-one', 'Twenty-two', 'Twenty-three', 'Twenty-four', 'Twenty-five'];
const typeName = Object.fromEntries(TYPES);
const smW = ([w, h]) => w > 560 ? [560, Math.round(h * 560 / w / 2) * 2] : [w, h];

const gallery = ART.map((a, i) => {
  const [w, h] = smW(a.size);
  const words_ = a.words || COLLECTION_QUOTES[a.type] || '';
  return `<figure class="piece ${a.kind}" data-type="${a.type}" data-colours="${a.colours.join(' ')}" data-i="${i}">
      <button class="piece-open" type="button" data-open="${i}" aria-label="View ${esc(a.title)} larger">
        <span class="piece-frame"><img src="assets/img/art/${a.file}-sm.webp" width="${w}" height="${h}" loading="lazy" alt="${esc(a.alt)}"></span>
      </button>
      <figcaption><span class="piece-title">${esc(a.title)}</span><span class="piece-meta">${a.type === 'florals' ? 'Original painting' : esc(a.medium)}</span>
        <span class="piece-palette" aria-hidden="true">${a.palette.map(c => `<i style="--c:${c}"></i>`).join('')}</span></figcaption>
      <template data-detail>${JSON.stringify({ title: a.title, file: a.file, w: a.size[0], h: a.size[1], alt: a.alt, meta: `${a.medium} · ${a.collection}`, words: words_, palette: a.palette, ig: IG + a.ig.replace(/^/, '') + '/' })}</template>
    </figure>`;
}).join('\n    ');

const typeChips = TYPES.map(([k, l]) => `<button class="chip" data-type="${k}" aria-pressed="false">${esc(l)}</button>`).join('\n      ');
const colourChips = COLOURS.map(([k, l, c]) => `<button class="swatch" data-colour="${k}" style="--c:${c}" aria-pressed="false" title="${esc(l)}"><span class="sr">${esc(l)}</span></button>`).join('\n        ');
const options = ART.map(a => `<option>${esc(a.title)}</option>`).join('\n        ');

const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' });
const igFeed = IG_POSTS.map(p => {
  const a = ART.find(x => x.file === p.img);
  const vid = p.ig.startsWith('reel/');
  const [w, h] = smW(a.size);
  return `<li><a class="ig-tile" href="${IG}${p.ig}/" target="_blank" rel="noopener"><img src="assets/img/art/${p.img}-sm.webp" alt="${esc(a.alt)}" loading="lazy" width="${w}" height="${h}">${vid ? '<span class="ig-reel" aria-label="Reel">&#9654;</span>' : ''}<span class="ig-cap"><time datetime="${p.date}">${fmtDate(p.date)}</time>${esc(p.cap)}</span></a></li>`;
}).join('\n    ');

const person = {
  '@type': 'Person', '@id': SITE + '#rebecca', name: 'Rebecca Adam', jobTitle: 'Artist',
  description: 'Local Ontario artist and Registered Aesthetic Nurse creating one-of-a-kind art from clay, resin, wood and mosaic.',
  url: SITE, image: SITE + 'assets/img/art/rebecca-adam-with-fellow-artists.webp',
  address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' },
  knowsAbout: ['Floral painting', 'Mosaic', 'Ceramics', 'Resin art', 'Wood art', 'Mixed media sculpture', 'Judaica'],
  sameAs: [IG],
};
const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': SITE + '#site', url: SITE, name: 'HappyArtForYou', inLanguage: 'en-CA', publisher: { '@id': SITE + '#brand' } },
    { '@type': 'Organization', '@id': SITE + '#brand', name: 'HappyArtForYou', alternateName: 'Happy Art For You', url: SITE, logo: SITE + 'apple-touch-icon.png', founder: { '@id': SITE + '#rebecca' }, description: 'One-of-a-kind art by Rebecca Adam: floral paintings, sculptural pomegranates, Judaica, sculpture and ceramics.', areaServed: { '@type': 'AdministrativeArea', name: 'Ontario' }, sameAs: [IG] },
    person,
    {
      '@type': 'ItemList', name: 'Artwork by Rebecca Adam', numberOfItems: ART.length,
      itemListElement: ART.map((a, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'VisualArtwork', name: a.title, image: SITE + `assets/img/art/${a.file}.webp`, description: a.alt, artform: a.medium, dateCreated: '2026', creator: { '@id': SITE + '#rebecca' } },
      })),
    },
  ],
};

// palettes for the "Pour a bloom" studio: the florals only
const BG = {
  'red-poppy-on-midnight-teal': '#0d2532', 'cobalt-bloom-on-lemon': '#f5e47c', 'magenta-bloom-on-blush': '#f6c6dc', 'violet-iris-on-lilac': '#c8a6ea',
  'sunburst-bloom-on-red': '#d8261c', 'golden-forest': '#3a1606', 'lilac-bloom-gold-leaf-on-pink': '#ebcbe0', 'ember-bloom-on-gold': '#8a6a24',
  'blue-garden-with-gold': '#c9a65c', 'saffron-bloom-on-violet': '#7a4bb0', 'magenta-poppies-on-silver-leaf': '#d3d7dc', 'violet-blooms-on-cobalt': '#1a1ca8',
  'red-poppy-on-silver': '#9c9c98', 'four-sun-blooms': '#f6e9c8', 'violet-and-saffron-bloom-on-gold': '#6b4e1e',
};
const pal = ART.filter(a => a.type === 'florals' && a.kind === 'canvas').map(a => ({ t: a.title, f: a.file, p: a.palette, bg: BG[a.file] || '#f5efe6', i: ART.indexOf(a) }));

let html = readFileSync(join(here, 'index.src.html'), 'utf8');
const rep = { SITE, IG, V, JSONLD: JSON.stringify(jsonld, null, 1), GALLERY: gallery, TYPE_CHIPS: typeChips, COLOUR_CHIPS: colourChips, OPTIONS: options, IGFEED: igFeed, COUNT: words[ART.length], PALETTES: JSON.stringify(pal) };
html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => (k in rep ? rep[k] : m));
writeFileSync(join(root, 'index.html'), html);
console.log('built index.html with', ART.length, 'pieces');
