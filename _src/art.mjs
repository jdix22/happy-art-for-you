// Every artwork on the site. Facts come only from Rebecca's Instagram (captions, bio, what is visible).
// Floral titles are descriptive working titles until Rebecca supplies her own (see README).
// size: [width, height] of the full WebP in assets/img/art/. kind: 'canvas' (framed painting) or 'object' (photo of a 3D piece).

export const SITE = 'https://happyart.ca/';
export const IG = 'https://www.instagram.com/happpyart4u/';

export const COLLECTION_QUOTES = {
  florals: 'A little imagination, a splash of colour, and flowers that never fade.',
};

export const COLOURS = [
  ['ruby', 'Ruby', '#b0132b'],
  ['ember', 'Ember', '#e2541f'],
  ['saffron', 'Saffron', '#f2b632'],
  ['gold', 'Gold', '#c39a3e'],
  ['rose', 'Rose', '#e0488f'],
  ['violet', 'Violet', '#6a3fb5'],
  ['cobalt', 'Cobalt', '#2342b0'],
  ['plaster', 'Plaster white', '#efe9df'],
];

export const TYPES = [
  ['florals', 'Floral paintings'],
  ['pomegranates', 'Pomegranates'],
  ['judaica', 'Judaica'],
  ['sculpture', 'Sculpture & ceramics'],
];

const FL = { type: 'florals', kind: 'canvas', medium: 'Original painting', collection: 'Floral collection, 2026' };
export const ART = [
  { ...FL, file: 'red-poppy-on-midnight-teal', size: [554, 552], title: 'Red Poppy on Midnight', alt: 'Painting of a large scarlet poppy with a speckled dark centre on a midnight-teal canvas, gold leaf in the corners', colours: ['ruby', 'ember', 'gold'], palette: ['#0b2230', '#d61707', '#f2401c', '#de6d39', '#c9a043'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'cobalt-bloom-on-lemon', size: [582, 558], title: 'Cobalt Bloom on Lemon', alt: 'Painting of a cobalt and violet bloom with a yellow heart, poured across a lemon-yellow canvas', colours: ['cobalt', 'violet', 'saffron'], palette: ['#060e87', '#2831a8', '#6c76cd', '#f3d23c', '#f7ec9c'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'magenta-bloom-on-blush', size: [540, 528], title: 'Magenta Bloom on Blush', alt: 'Painting of a ruffled magenta and coral flower on a soft blush-pink canvas', colours: ['rose', 'ruby'], palette: ['#a11a45', '#cf2962', '#dd479a', '#f27377', '#f6c6dc'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'violet-iris-on-lilac', size: [618, 624], title: 'Violet Iris', alt: 'Painting of a deep violet iris with streaks of white and a flash of yellow on a lilac canvas', colours: ['violet'], palette: ['#0e0556', '#251295', '#4e10c9', '#9342cf', '#d3b3ee'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, file: 'sunburst-bloom-on-red', size: [580, 576], title: 'Sunburst on Red', alt: 'Painting of a round cream, saffron and turquoise-streaked bloom on a bright red canvas', colours: ['ruby', 'saffron', 'ember'], palette: ['#e3281d', '#f26f3c', '#f4c84a', '#e8cc91', '#5ba3b0'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'golden-forest', size: [574, 708], title: 'Golden Forest', alt: 'Textured painting of tall golden-brown tree trunks under a canopy of tiny multicoloured dots', colours: ['gold'], palette: ['#360e04', '#612913', '#915121', '#c89341', '#e7c46a'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, file: 'lilac-bloom-gold-leaf-on-pink', size: [588, 464], title: 'Lilac Bloom with Gold', alt: 'Painting of a lilac and plum bloom with a golden centre on a pale pink canvas scattered with gold leaf', colours: ['violet', 'rose', 'gold'], palette: ['#562447', '#93606f', '#b37ea3', '#e9c7de', '#d4a943'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'ember-bloom-on-gold', size: [556, 562], title: 'Ember Bloom on Gold', alt: 'Painting of a fiery orange-red flower with a raised gold centre on a textured gold background', colours: ['ember', 'gold', 'ruby'], palette: ['#4e280b', '#b42a08', '#de2e05', '#f49512', '#b08a2a'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, file: 'blue-garden-with-gold', size: [550, 730], title: 'Blue Garden', alt: 'Painting of overlapping turquoise and cobalt flowers with gold starburst centres, edged in gold', colours: ['cobalt', 'gold'], palette: ['#0d1965', '#223b83', '#2c5aa2', '#4fb3d0', '#e2c070'], ig: 'reel/DeI9fU4x-6H' },
  { ...FL, file: 'saffron-bloom-on-violet', size: [496, 372], title: 'Saffron Bloom on Violet', alt: 'Painting of a saffron-yellow and coral flower on a violet canvas', colours: ['saffron', 'ember', 'violet'], palette: ['#884dae', '#e54228', '#eb9555', '#f6b13a', '#f5d84a'], ig: 'reel/DfOoNMdxr1Y' },
  { ...FL, file: 'magenta-poppies-on-silver-leaf', size: [560, 706], title: 'Magenta Poppies', alt: 'Painting of two magenta poppies and a bud on green stems over a pale silver ground edged with gold', colours: ['rose', 'plaster'], palette: ['#682233', '#9e3d5b', '#c867c5', '#c9ced4', '#4e8a3e'], ig: 'reel/DeI9fU4x-6H' },
  { ...FL, file: 'violet-blooms-on-cobalt', size: [556, 400], title: 'Violet Blooms on Cobalt', alt: 'Painting of lilac, peach and yellow blooms against a deep cobalt-blue canvas', colours: ['violet', 'cobalt', 'rose'], palette: ['#1719a7', '#7448b4', '#cd77ae', '#e3b08e', '#f2c94c'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, file: 'red-poppy-on-silver', size: [582, 552], title: 'Red Poppy on Silver', alt: 'Painting of a single oversized red poppy with a green stem on a swirling silver background', colours: ['ruby', 'plaster'], palette: ['#591103', '#d31709', '#fa2a0a', '#9a9a96', '#4f8a3a'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, file: 'four-sun-blooms', size: [500, 496], title: 'Four Suns', alt: 'Painting of four overlapping flowers in lemon, saffron and orange filling a square canvas', colours: ['saffron', 'ember'], palette: ['#d34717', '#e46225', '#e6932b', '#f4d34a', '#fbe9a8'], ig: 'reel/DeI9fU4x-6H' },
  { ...FL, file: 'violet-and-saffron-bloom-on-gold', size: [596, 446], title: 'Violet & Saffron on Gold', alt: 'Painting of a lavender, white and saffron flower with a dark centre on a gold and bronze background', colours: ['violet', 'saffron', 'gold'], palette: ['#361f15', '#8f6bc4', '#c7a6e0', '#f1d05a', '#b08a2a'], ig: 'reel/DfEYlJSxISe' },
  { ...FL, kind: 'object', file: 'orange-poppy-pair', size: [716, 938], title: 'Orange Poppies, a Pair', alt: 'Two paintings hung together: an orange poppy on black, and a canvas crowded with orange, coral and pink flowers', colours: ['ember', 'rose'], palette: ['#12161a', '#de5b28', '#e0944d', '#f2b25c', '#f2a0a8'], ig: 'reel/DeI9fU4x-6H' },

  { type: 'pomegranates', kind: 'object', file: 'what-we-carry-within-pomegranates', size: [1282, 1268], title: 'What We Carry Within', medium: 'Sculptural wall art', collection: '2026', alt: 'White textured wall piece with three sculpted pomegranates, each split open to show deep red and gold seeds', colours: ['plaster', 'ruby', 'gold'], palette: ['#f2ede4', '#c8baa8', '#a10f1e', '#6a0a12', '#c9a043'], ig: 'p/Ddsa3kiRZug', words: 'White on the outside. Deep red and gold within.' },
  { type: 'pomegranates', kind: 'object', file: 'pomegranate-slices-ruby-seeds', size: [1400, 1606], title: 'Pomegranate Slices', medium: 'Handcrafted pieces', collection: '2026', alt: 'Four handcrafted pomegranate slices in amber and gold, filled with glowing ruby seeds, on a marble table', colours: ['ruby', 'gold'], palette: ['#a20f1f', '#e0213a', '#b8862e', '#f1e7d6', '#6f4124'], ig: 'p/DcxobNdx9zD', words: 'Handcrafted and filled with glowing ruby seeds, each piece is completely unique.' },
  { type: 'judaica', kind: 'object', file: 'hamsa-with-pomegranate-heart', size: [1400, 1774], title: 'Hamsa with a Pomegranate Heart', medium: 'Mosaic wall art', collection: '2026', alt: 'Hamsa hand in multicoloured mosaic glass with a red pomegranate at its heart, on a gold canvas', colours: ['gold', 'ruby', 'cobalt'], palette: ['#ba0c16', '#be9340', '#1d4fa0', '#2aa39a', '#e8c53a'], ig: 'p/Dd5Eqd_xvyH', words: 'He protected our community. Now may this Hamsa protect him.' },
  { type: 'judaica', kind: 'object', file: 'hanukkiah-wood-bark-pomegranate', size: [800, 420], title: 'Hanukkiah with a Pomegranate', medium: 'Natural wood bark', collection: '2026', alt: 'Hanukkiah made from a long piece of natural wood bark with glass candle cups and a red pomegranate holding the Shamash', colours: ['ruby', 'cobalt'], palette: ['#4a2a52', '#8c5943', '#2ea0d8', '#c8241a', '#f1e7d6'], ig: 'p/Dcxp7-NxDfS', words: 'A pomegranate at its heart holding the Shamash, a symbol of abundance, blessings and light.' },
  { type: 'judaica', kind: 'object', file: 'hanukkiah-wood-bark-brass', size: [898, 470], title: 'Hanukkiah of Bark & Brass', medium: 'Wood bark and brass cartridges', collection: '2026', alt: 'Rustic Hanukkiah made from natural wood bark with nine brass cartridge candle holders set in turquoise', colours: ['gold'], palette: ['#3a2614', '#6f5d40', '#c99a3a', '#2bb3a8', '#f1e7d6'], ig: 'p/DcxpfGLxDus', words: 'Rustic, unexpected, and full of character.' },
  { type: 'sculpture', kind: 'object', file: 'the-argument-and-the-hug-sculpture', size: [650, 512], title: 'The Argument and the Hug', medium: 'Mixed media sculpture', collection: '2026', alt: 'Two wire-figure sculptures: a black pair standing apart on a black base, and a gold pair embracing on a white base', colours: ['plaster', 'gold'], palette: ['#080407', '#292526', '#f2eee6', '#c9a043', '#8a7c75'], ig: 'reel/DZ24SsSRMd4', words: 'An unexpected transformation of dry-cleaning hangers.' },
  { type: 'sculpture', kind: 'object', file: 'ceramic-toothpick-holder', size: [1145, 1490], title: 'Toothpick Holder with Character', medium: 'Handmade ceramic', collection: '2026', alt: 'Handmade ceramic toothpick holder shaped like a red mouth with its tongue out, on a blue base', colours: ['ruby', 'cobalt'], palette: ['#b0141d', '#cc523b', '#2a4f8c', '#e3c48f', '#f2ede4'], ig: 'p/Dcxo-WoxwF8', words: 'A little character for your table, guaranteed to make you smile!' },
];

// Saved posts shown in the Instagram section until the Behold feed is connected (newest first).
export const IG_POSTS = [
  { ig: 'reel/DfOoNMdxr1Y', img: 'red-poppy-on-midnight-teal', date: '2026-11-01', cap: 'My latest floral collection, no watering required! Original artworks available for purchase.' },
  { ig: 'reel/DfEYlJSxISe', img: 'red-poppy-on-silver', date: '2026-10-28', cap: 'A little more colour in my world… flowers that never fade.' },
  { ig: 'reel/DeI9fU4x-6H', img: 'blue-garden-with-gold', date: '2026-10-05', cap: 'A little dance of colours that unexpectedly turns into flowers.' },
  { ig: 'p/Dd5Eqd_xvyH', img: 'hamsa-with-pomegranate-heart', date: '2026-09-29', cap: 'This Hamsa made her way all the way to Kingston.' },
  { ig: 'p/Ddsa3kiRZug', img: 'what-we-carry-within-pomegranates', date: '2026-09-24', cap: 'What We Carry Within. White on the outside, deep red and gold within.' },
  { ig: 'p/Dcxp7-NxDfS', img: 'hanukkiah-wood-bark-pomegranate', date: '2026-09-02', cap: 'A handcrafted Hanukkiah from natural wood bark, with a pomegranate at its heart.' },
  { ig: 'p/DcxobNdx9zD', img: 'pomegranate-slices-ruby-seeds', date: '2026-09-01', cap: 'Elegant slices of pomegranate, a symbol of abundance, beauty and new beginnings.' },
  { ig: 'reel/DZ24SsSRMd4', img: 'the-argument-and-the-hug-sculpture', date: '2026-06-21', cap: 'The Argument and the Hug. An unexpected transformation of dry-cleaning hangers.' },
];
