/* HappyArtForYou — site behaviour. No libraries. */

// ---- Settings ---------------------------------------------------------------
// Paste the Behold feed ID (or the full https://feeds.behold.so/... URL) here.
// Until it's set, the Instagram section shows the saved posts already in the page.
const BEHOLD_FEED_ID = '';
const FEED_COUNT = 8;
// Victoria's email, once she confirms one. Empty = the form hands the message to Instagram DMs.
const CONTACT_EMAIL = '';
// Optional form service (Formspree, Web3Forms, a Worker…). Takes priority over email when set.
const FORM_ENDPOINT = '';
const IG_HANDLE = 'happpyart4u';
// -----------------------------------------------------------------------------

document.documentElement.classList.add('js');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- header + nav ---------- */
const header = $('[data-header]');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 20);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
const toggle = $('[data-nav-toggle]'), list = $('[data-nav-list]');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', open); list.classList.toggle('open', open);
});
$$('a', list).forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); list.classList.remove('open'); }));

/* ---------- hero: gold flakes + gentle parallax ---------- */
const flakes = $('[data-flakes]');
if (flakes) {
  const rnd = (a, b) => a + Math.random() * (b - a);
  // gold-leaf flakes drifting around the paintings (right half of the hero)
  flakes.innerHTML = Array.from({ length: 9 }, () =>
    `<i style="left:${rnd(52, 98)}%;top:${rnd(6, 92)}%;--s:${rnd(12, 28)}px;--t:${rnd(7, 14)}s;--x:${rnd(-30, 30)}px;--y:${rnd(-40, 40)}px;--r:${rnd(-120, 120)}deg;transform:rotate(${rnd(0, 360)}deg)"></i>`).join('');
}
const salon = $('[data-salon]');
if (salon && !reduce && matchMedia('(pointer:fine)').matches) {
  const hangs = $$('.hang', salon), depth = [10, 18, 14, 16, 12];
  $('.hero').addEventListener('pointermove', e => {
    const r = salon.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    hangs.forEach((h, i) => { h.style.translate = `${(-dx * depth[i]).toFixed(1)}px ${(-dy * depth[i]).toFixed(1)}px`; });
  });
}

/* ---------- reveal on scroll ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
$$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* ---------- gallery filters ---------- */
const pieces = $$('.piece');
const state = { type: 'all', colour: null };
const status = $('[data-filter-status]');
function applyFilters() {
  let n = 0;
  pieces.forEach(p => {
    const ok = (state.type === 'all' || p.dataset.type === state.type) && (!state.colour || p.dataset.colours.split(' ').includes(state.colour));
    p.hidden = !ok; if (ok) n++;
  });
  const typeBtn = $(`[data-type="${state.type}"]`), colBtn = state.colour && $(`[data-colour="${state.colour}"]`);
  if (state.type === 'all' && !state.colour) { status.textContent = ''; return; }
  status.textContent = n
    ? `Showing ${n} ${n === 1 ? 'piece' : 'pieces'}${state.type !== 'all' ? ' · ' + typeBtn.textContent : ''}${colBtn ? ' · ' + colBtn.title : ''}`
    : 'Nothing in that combination yet. Try another colour.';
}
$$('[data-type-filter] .chip').forEach(b => b.addEventListener('click', () => {
  state.type = b.dataset.type;
  $$('[data-type-filter] .chip').forEach(c => { c.classList.toggle('is-on', c === b); c.setAttribute('aria-pressed', c === b); });
  applyFilters();
}));
$$('[data-colour-filter] .swatch').forEach(b => b.addEventListener('click', () => {
  state.colour = state.colour === b.dataset.colour ? null : b.dataset.colour;
  $$('[data-colour-filter] .swatch').forEach(c => c.setAttribute('aria-pressed', c.dataset.colour === state.colour));
  applyFilters();
}));

/* ---------- lightbox ---------- */
const lb = $('[data-lightbox]');
const details = pieces.map(p => JSON.parse($('template', p).innerHTML));
let current = 0;
function show(i) {
  current = i;
  const d = details[i];
  const img = $('[data-lb-img]', lb);
  img.src = `assets/img/art/${d.file}.webp`; img.width = d.w; img.height = d.h; img.alt = d.alt;
  $('[data-lb-title]', lb).textContent = d.title;
  $('[data-lb-meta]', lb).textContent = d.meta;
  $('[data-lb-words]', lb).textContent = d.words ? `“${d.words}”` : '';
  $('[data-lb-palette]', lb).innerHTML = d.palette.map(c => `<i style="--c:${c}" title="${c}"></i>`).join('');
  $('[data-lb-ig]', lb).href = d.ig;
  $('[data-lb-ask]', lb).dataset.ask = d.title;
}
function openPiece(i) { show(i); if (typeof lb.showModal === 'function') lb.showModal(); else lb.setAttribute('open', ''); }
const visibleIdx = () => pieces.map((p, i) => p.hidden ? -1 : i).filter(i => i >= 0);
function step(dir) { const v = visibleIdx(); if (!v.length) return; const k = v.indexOf(current); show(v[(k + dir + v.length) % v.length]); }
$$('[data-open]').forEach(b => b.addEventListener('click', () => openPiece(+b.dataset.open)));
$('[data-lb-close]', lb).addEventListener('click', () => lb.close());
$('[data-lb-prev]', lb).addEventListener('click', () => step(-1));
$('[data-lb-next]', lb).addEventListener('click', () => step(1));
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });

/* ---------- "Ask about this piece" prefill ---------- */
const form = $('[data-form]');
function ask(title) {
  const sel = form.elements.piece;
  if ([...sel.options].some(o => o.value === title)) sel.value = title;
  if (!form.elements.message.value) form.elements.message.value = `Hi Victoria, I'd love to know more about "${title}". `;
}
document.addEventListener('click', e => {
  const a = e.target.closest('[data-ask]');
  if (!a) return;
  ask(a.dataset.ask);
  if (lb.open) lb.close();
  setTimeout(() => form.elements.name.focus({ preventScroll: true }), 600);
});

/* ---------- Pour a bloom ---------- */
const cv = $('[data-pour]');
if (cv) {
  const palettes = JSON.parse($('[data-palette-data]').textContent);
  const ctx = cv.getContext('2d');
  const hint = $('[data-pour-hint]');
  const box = $('[data-palettes]');
  let pal = palettes[0], W = 0, H = 0, dpr = 1, ready = false;
  box.innerHTML = palettes.map((p, k) => `<button class="pal" type="button" role="radio" aria-checked="${k === 0}" aria-label="${esc(p.t)} palette" data-k="${k}"><img src="assets/img/art/${p.f}-sm.webp" alt="" loading="lazy"></button>`).join('');
  const size = () => {
    const r = cv.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
    const snap = W ? ctx.getImageData(0, 0, cv.width, cv.height) : null;
    W = Math.round(r.width * dpr); H = Math.round(r.height * dpr);
    if (cv.width === W && cv.height === H) return;
    cv.width = W; cv.height = H; fill();
    if (snap) { try { const t = document.createElement('canvas'); t.width = snap.width; t.height = snap.height; t.getContext('2d').putImageData(snap, 0, 0); ctx.drawImage(t, 0, 0, W, H); } catch (_) {} }
  };
  const fill = () => {
    ctx.fillStyle = pal.bg; ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, H * 1.1);
    g.addColorStop(0, 'rgba(255,240,210,.22)'); g.addColorStop(1, 'rgba(0,0,0,.12)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  };
  const lum = h => { const n = parseInt(h.slice(1), 16); return (0.3 * (n >> 16) + 0.59 * ((n >> 8) & 255) + 0.11 * (n & 255)) / 255; };
  const rgba = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
  const R = (a, b) => a + Math.random() * (b - a);
  function bloom(x, y) {
    const cols = [...pal.p].sort((a, b) => lum(a) - lum(b));
    // never paint the flower in the background colour itself
    const petalsCols = cols.filter(c => Math.abs(lum(c) - lum(pal.bg)) > .08 || cols.length < 3);
    const dark = cols[0];
    const main = petalsCols[Math.floor(R(petalsCols.length * .35, petalsCols.length))] || cols[cols.length - 1];
    const radius = Math.min(W, H) * R(.2, .34), n = Math.round(R(5, 8)), rot = R(0, Math.PI * 2);
    // ruffled outline: petal lobes + a few random waves, like her poured poppies
    const waves = Array.from({ length: 5 }, (_, k) => [Math.round(R(7, 23)), R(0, 6.28), R(.015, .045) / (k * .5 + 1)]);
    const rAt = th => {
      let r = .74 + .26 * Math.pow(Math.abs(Math.cos(n * (th - rot) / 2)), .55);
      for (const [fq, ph, am] of waves) r += am * Math.sin(fq * th + ph);
      return r;
    };
    const path = (s, k = 1) => {
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) { const th = i / 200 * Math.PI * 2, r = radius * s * k * rAt(th); i ? ctx.lineTo(x + Math.cos(th) * r, y + Math.sin(th) * r) : ctx.moveTo(x + Math.cos(th) * r, y + Math.sin(th) * r); }
      ctx.closePath();
    };
    const body = (s, c1, c2, k = 1) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius * s * k * 1.05);
      g.addColorStop(0, rgba(dark, 1)); g.addColorStop(.18, rgba(c2, 1)); g.addColorStop(.75, rgba(c1, 1)); g.addColorStop(1, rgba(c2, 1));
      ctx.fillStyle = g; path(s, k); ctx.fill();
    };
    const second = petalsCols[Math.floor(R(0, petalsCols.length))] || main;
    let f = 0; const frames = reduce ? 1 : 34;
    (function frame() {
      const t = reduce ? 1 : Math.min(1, (f + 1) / frames), s = 1 - Math.pow(1 - t, 3);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 18 * dpr * s; ctx.shadowOffsetY = 6 * dpr * s;
      body(s, main, second); ctx.restore();
      if (t < 1) { f++; requestAnimationFrame(frame); return; }
      // poured streaks inside the petals
      ctx.save(); path(1); ctx.clip(); ctx.lineCap = 'round';
      for (let k = 0; k < 340; k++) {
        const th = R(0, Math.PI * 2), r1 = radius * rAt(th) * R(.75, 1.05), bend = R(-.35, .35);
        const c = Math.random() < .14 ? '#ffffff' : petalsCols[Math.floor(Math.random() * petalsCols.length)] || main;
        ctx.strokeStyle = rgba(c, R(.18, .55)); ctx.lineWidth = R(.8, 4.5) * dpr;
        ctx.beginPath(); ctx.moveTo(x + Math.cos(th) * radius * .1, y + Math.sin(th) * radius * .1);
        ctx.quadraticCurveTo(x + Math.cos(th + bend) * r1 * .55, y + Math.sin(th + bend) * r1 * .55, x + Math.cos(th) * r1, y + Math.sin(th) * r1); ctx.stroke();
      }
      ctx.restore();
      // inner ring of petals for depth, then a soft light edge
      ctx.globalAlpha = .55; body(1, second, main, .52); ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.4 * dpr; path(1, .995); ctx.stroke();
      // centre: dark eye + gold speckles
      const cr = radius * R(.13, .18);
      const g = ctx.createRadialGradient(x, y, 0, x, y, cr);
      g.addColorStop(0, rgba(dark, .95)); g.addColorStop(1, rgba(dark, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, cr, 0, Math.PI * 2); ctx.fill();
      for (let s = 0; s < 60; s++) {
        const a = R(0, Math.PI * 2), d = Math.sqrt(Math.random()) * cr * 1.1;
        ctx.fillStyle = rgba(Math.random() < .7 ? '#e7c46a' : '#fff4d0', R(.5, .95));
        ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, R(.8, 2.4) * dpr, 0, Math.PI * 2); ctx.fill();
      }
    })();
  }
  const choose = k => {
    pal = palettes[k];
    $$('.pal', box).forEach(b => b.setAttribute('aria-checked', +b.dataset.k === k));
    fill(); bloom(W / 2, H / 2);
  };
  box.addEventListener('click', e => { const b = e.target.closest('.pal'); if (b) choose(+b.dataset.k); });
  cv.addEventListener('pointerdown', e => {
    const r = cv.getBoundingClientRect();
    bloom((e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr);
    hint.classList.add('gone');
  });
  $('[data-pour-clear]').addEventListener('click', () => { fill(); hint.classList.remove('gone'); });
  $('[data-pour-see]').addEventListener('click', e => { e.preventDefault(); openPiece(pal.i); });
  const start = () => { if (ready) return; ready = true; size(); bloom(W / 2, H / 2); };
  if (io) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { start(); o.disconnect(); } }, { rootMargin: '200px' }).observe(cv); else start();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => ready && size(), 200); });
}

/* ---------- Instagram feed (Behold) ---------- */
const caption = p => (p.prunedCaption || p.caption || '').replace(/\s+/g, ' ').trim();
const imgOf = p => p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.mediaUrl || '';
const feedId = BEHOLD_FEED_ID.trim().replace(/^https?:\/\/feeds\.behold\.so\//, '');
if (feedId) {
  fetch('https://feeds.behold.so/' + encodeURIComponent(feedId))
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const posts = (Array.isArray(data) ? data : data.posts || []).filter(p => p.permalink && imgOf(p)).slice(0, FEED_COUNT);
      if (!posts.length) return;
      $('[data-feed-list]').innerHTML = posts.map(p => {
        const cap = caption(p);
        const vid = /video|reel/i.test(p.mediaType || '') || p.isReel;
        const when = p.timestamp ? new Date(p.timestamp) : null;
        return `<li><a class="ig-tile" href="${esc(p.permalink)}" target="_blank" rel="noopener"><img src="${esc(imgOf(p))}" alt="${esc(cap ? cap.slice(0, 120) : 'Instagram post by @' + IG_HANDLE)}" loading="lazy">${vid ? '<span class="ig-reel" aria-label="Reel">&#9654;</span>' : ''}<span class="ig-cap">${when ? `<time datetime="${when.toISOString().slice(0, 10)}">${when.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</time>` : ''}${esc(cap.slice(0, 110))}</span></a></li>`;
      }).join('');
    })
    .catch(() => { /* keep the saved posts */ });
}

/* ---------- enquiry form ---------- */
form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = form.elements, st = $('[data-form-status]', form);
  const say = (msg, cls = '') => { st.textContent = msg; st.className = 'form-status ' + cls; };
  const data = { name: f.name.value.trim(), email: f.email.value.trim(), piece: f.piece.value, message: f.message.value.trim() };
  if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !data.message) return say('Please add your name, a valid email and a short message.', 'bad');
  const text = `Hi Victoria, I'm ${data.name} (${data.email}).\nAbout: ${data.piece}\n\n${data.message}`;
  if (FORM_ENDPOINT) {
    say('Sending…');
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw 0;
      form.reset(); return say('Sent! Victoria will be in touch soon.', 'ok');
    } catch (_) { /* fall through to email / Instagram */ }
  }
  if (CONTACT_EMAIL) {
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Art enquiry: ' + data.piece)}&body=${encodeURIComponent(text)}`;
    return say('Your email app should open with the message ready to send.', 'ok');
  }
  let copied = false;
  try { await navigator.clipboard.writeText(text); copied = true; } catch (_) {}
  window.open(`https://ig.me/m/${IG_HANDLE}`, '_blank', 'noopener');
  say(copied ? 'Your message is copied. Instagram is opening: paste it into the chat with Victoria.' : `Instagram is opening. Send Victoria your message at @${IG_HANDLE}.`, 'ok');
});

const yr = $('[data-year]');
if (yr) yr.textContent = new Date().getFullYear();
