# HappyArtForYou — website prototype

Client prototype for **HappyArtForYou**, the art of **Rebecca Adam**, a local Ontario artist and Registered Aesthetic Nurse (Instagram [@happpyart4u](https://www.instagram.com/happpyart4u/)).

Live preview: https://jdix22.github.io/happy-art-for-you/

Everything on the page comes from her Instagram bio, her post captions and what is visible in her photos and reels. Nothing is invented: no prices, sizes, reviews, awards or years in business.

## What's on the page

- **Hero "salon wall"**: five of her floral paintings hung on nails under lamp light. They swing into place on load, drift slightly with the mouse, with gold-leaf flakes around them.
- **Materials ribbon**: clay, resin, wood, mosaic, touches of gold, found objects.
- **The work**: all 23 pieces (16 floral paintings cut out of her reels, plus pomegranates, Judaica, sculpture and ceramics). Filter by type, or **find a piece by colour** (ruby, ember, saffron, gold, rose, violet, cobalt, plaster white). Each piece shows its own colour palette. Tap a piece for a large view with her words, its palette, "Ask about this piece" and a link to the Instagram post.
- **Featured piece**: *What We Carry Within*.
- **Unlikely materials** (night gallery): dry-cleaning hangers → *The Argument and the Hug*, bark and brass → Hanukkiah, and more.
- **A Hamsa's journey**: the Kingston Hamsa story. The constable's name from her caption is left out on purpose; add it back if Rebecca wants it.
- **Pour a bloom**: a small painting toy. Pick a palette from one of her paintings and tap the canvas to pour a flower in those colours. "See the painting" opens the original.
- **About Rebecca**, **gifts by occasion**, **FAQ**, **enquiry form**, **Instagram feed**, footer.

## Instagram feed (Behold)

The feed shows 8 of her recent posts saved into the site as placeholders. To make it live:

1. Create a free Behold.so feed connected to @happpyart4u (JSON feed type).
2. Open `assets/js/site.js` and paste the feed ID (or the whole `https://feeds.behold.so/...` link) into `BEHOLD_FEED_ID`.
3. Bump `V` in `_src/build.mjs`, run `node _src/build.mjs`, and push.

If the feed ever fails to load, the saved posts stay on the page.

## Enquiry form

She has no public email or phone, so the form copies the visitor's message and opens an Instagram DM to @happpyart4u. Once she gives an email, put it in `CONTACT_EMAIL` in `assets/js/site.js` (opens the visitor's email app), or a form service URL in `FORM_ENDPOINT` (sends directly).

## Editing

- Artwork list, titles, colours and Instagram posts live in `_src/art.mjs`. Page text is in `_src/index.src.html`.
- Run `node _src/build.mjs` to regenerate `index.html` (gallery, structured data, feed placeholders, palettes).
- Images are in `assets/img/art/` (`name.webp` full size, `name-sm.webp` for the grid).

## Questions for Rebecca before launch

1. **Titles**: the 16 floral paintings use descriptive working titles ("Red Poppy on Midnight", "Violet Iris"…). What are their real names?
2. **Sizes, media and prices**: canvas sizes, paint/medium (acrylic? resin pour?) and prices or price ranges for each piece. Which are still available, and which are sold?
3. **Contact**: an email (and phone, if she wants one) for enquiries.
4. **Location**: which city or area of Ontario she'd like listed. A city helps Google and AI search a lot.
5. **Commissions**: does she take custom pieces (e.g. Hamsas, Hanukkiahs, pomegranates as gifts)?
6. **Shipping / pickup**: does she ship, deliver locally, or is it pickup only?
7. **Clinic**: the site shows her as "Rebecca Adam" (decided 2026-11-07). Should Beauty Medical Clinic be named in her bio, or just "Registered Aesthetic Nurse"?
8. **The Hamsa story**: okay to tell it? Name the constable or keep it anonymous (as now)?
9. **Group photo**: okay to show the June 2026 photo with fellow artists? (The others in it may need to agree.)
10. **Domain**: does she want her own domain (e.g. happyartforyou.ca)?

The page is set to `noindex` until she approves it and it moves to her own domain.

Website designed by [jdix.ca](https://jdix.ca).
