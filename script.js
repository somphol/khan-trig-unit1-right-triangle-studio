/* ==========================================================================
   Khan Trig Companion · Unit 1 Right Triangle Studio
   Vanilla ES6. No dependencies, no network calls, no build step.

   Colour contract (mirrors style.css):
     cyan   #00e5ff -> hypotenuse c
     coral  #ff5722 -> opposite a
     emerald #00e676 -> adjacent b
     yellow #ffd600 -> angle θ
   ========================================================================== */
(() => {
  'use strict';

  const STORAGE_KEY = 'khanTrigUnit1.v1';
  const STATE_VERSION = 1;
  const COLORS = { hyp: '#00e5ff', opp: '#ff5722', adj: '#00e676', theta: '#ffd600' };
  const FONT = '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Thonburi", "Noto Sans Thai", sans-serif';
  const MATH = '"Iowan Old Style", Palatino, Georgia, "Times New Roman", serif';
  const $ = (id) => document.getElementById(id);
  const rad = (d) => (d * Math.PI) / 180;
  const deg = (r) => (r * 180) / Math.PI;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const L = (en, th) => (state.lang === 'th' ? th : en);
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ------------------------------- i18n ---------------------------------- */
  const I18N = {
    en: {
      appTitle: 'Khan Trig Companion',
      unitLabel: 'Unit 1',
      appSubtitle: 'Right Triangle Studio',
      streak: 'Streak',
      best: 'Best',
      mastery: 'Mastery',
      export: 'Export Progress JSON',
      exportTitle: 'Download your saved progress',
      exportDone: 'Progress exported as khan_trig_unit1_progress.json',
      navRatio: 'SOH·CAH·TOA',
      navSpecial: 'Special Triangles',
      navReciprocal: 'Reciprocal Ratios',
      navPractice: 'Practice Sandbox',

      'm1.title': 'SOH-CAH-TOA & Ratio Constancy',
      'm1.desc': 'Drag the vertices or move the sliders. Scale the triangle and watch the ratios refuse to move.',
      'm1.goal': 'Goal: ratios depend only on θ',
      'm1.angle': 'Angle θ',
      'm1.scale': 'Scale / Zoom',
      'm1.constantBadge': 'Triangle size changed, but ratios remain 100% CONSTANT!',
      'm1.dragHint': 'Drag A to tilt · drag C to resize',
      'm1.sides': 'Live side lengths',
      'm1.ratios': 'Live ratio equations',
      'm1.scaleHint': 'Only the side lengths change with scale — the three decimals below never do.',
      oppShort: 'a · opposite',
      adjShort: 'b · adjacent',
      hypShort: 'c · hypotenuse',
      hyp: 'Hypotenuse (c)',
      opp: 'Opposite (a)',
      adj: 'Adjacent (b)',
      theta: 'Angle (θ)',

      'm2.title': 'Special Right Triangles',
      'm2.desc': 'Master exact radical relationships for 45°-45°-90° and 30°-60°-90° triangles — no calculator required.',
      'm2.goal': 'Goal: recall exact side ratios',
      'm2.iso': '45° · 45° · 90°',
      'm2.isoSub': 'Isosceles · legs x, x',
      'm2.scalene': '30° · 60° · 90°',
      'm2.scaleneSub': 'Scalene · short leg x',
      'm2.base': 'Base variable x',
      'm2.exact': 'Exact side values',
      'm2.side1': 'Short leg',
      'm2.side2': 'Other leg',
      'm2.side2Leg': 'Other leg',
      'm2.side2Long': 'Long leg',
      'm2.side3': 'Hypotenuse',
      'm2.note45': 'The legs are always in a 1 : 1 ratio, so both acute angles are 45°.',
      'm2.note30': 'The side opposite 30° is half the hypotenuse; the long leg is x√3.',
      'm3.title': 'Reciprocal Ratios & Duality',
      'm3.desc': 'Cosecant, secant and cotangent are not new magic — they are the primary ratios flipped upside down.',
      'm3.goal': 'Goal: see the flip, not a new rule',
      'm3.angle': 'Angle θ',
      'm3.undefined': 'undefined',
      'm3.sinNote': 'csc θ is just 1 ÷ sin θ — same triangle, flipped fraction.',
      'm3.cosNote': 'sec θ is just 1 ÷ cos θ. At 90° the adjacent side collapses, so sec is undefined.',
      'm3.tanNote': 'tan θ and cot θ are reciprocals. At 90° the adjacent side is 0, so both blow up.',
      'm3.degenerate0': 'θ = 0° — the opposite side vanishes',
      'm3.degenerate90': 'θ = 90° — the adjacent side vanishes',

      'm4.title': 'Khan Practice Sandbox',
      'm4.desc': 'Retrieve, check, and grow a streak. Three problem modes, worked solutions on demand.',
      'm4.goal': 'Goal: active recall & mastery',
      'm4.modeRatio': 'Find the Ratio',
      'm4.modeSide': 'Missing Side',
      'm4.modeStory': 'Story Problem',
      'm4.new': 'New problem',
      'm4.answerLabel': 'Your answer',
      'm4.placeholder': 'e.g. 0.6 or 3/5',
      'm4.check': 'Check Answer',
      'm4.answerHint': 'Decimals and fractions are both accepted (0.6 or 3/5).',
      'm4.showSteps': 'Show Step-by-Step Visual Solution',
      'm4.progress': 'Your progress',
      'm4.correct': 'Correct',
      'm4.masteryHint': '20 correct answers unlock Unit 1 mastery.',
      'm4.badges': 'Mastery badges',
      'm4.tagRatio': 'FIND THE RATIO',
      'm4.tagSide': 'SOLVE FOR A MISSING SIDE',
      'm4.tagStory': 'REAL-WORLD STORY PROBLEM',
      'm4.correctMsg': 'Correct!',
      'm4.wrongMsg': 'Not quite — check the ratio, or reveal the steps.',
      'm4.invalid': 'Enter a number or a fraction like 3/5.',
      'm4.badgeUnlocked': 'Badge unlocked',
      'm4.roundHint': 'Round to 2 decimal places.',

      'side.opp': 'opposite side',
      'side.adj': 'adjacent side',
      'side.hyp': 'hypotenuse',

      'badge.first': 'First Steps',
      'badge.streak3': 'On Fire · 3',
      'badge.streak5': 'Unstoppable · 5',
      'badge.ratio3': 'Ratio Rookie',
      'badge.side3': 'Side Sleuth',
      'badge.story3': 'Story Solver',
      'badge.master': 'Unit 1 Master',
      footerBuilt: 'Built for active learning'
    },
    th: {
      appTitle: 'คู่มือตรีโกณมิติ Khan',
      unitLabel: 'ยูนิต 1',
      appSubtitle: 'ห้องปฏิบัติการสามเหลี่ยมมุมฉาก',
      streak: 'สตรีค',
      best: 'สูงสุด',
      mastery: 'ความเชี่ยวชาญ',
      export: 'ส่งออกความคืบหน้า JSON',
      exportTitle: 'ดาวน์โหลดความคืบหน้าที่บันทึกไว้',
      exportDone: 'ส่งออกความคืบหน้าเป็น khan_trig_unit1_progress.json แล้ว',
      navRatio: 'SOH·CAH·TOA',
      navSpecial: 'สามเหลี่ยมพิเศษ',
      navReciprocal: 'อัตราส่วนส่วนกลับ',
      navPractice: 'ห้องฝึกซ้อม',

      'm1.title': 'SOH-CAH-TOA และความคงที่ของอัตราส่วน',
      'm1.desc': 'ลากจุดยอดหรือเลื่อนสไลเดอร์ ขยายสามเหลี่ยมแล้วดูว่าอัตราส่วนไม่ยอมเปลี่ยน',
      'm1.goal': 'เป้าหมาย: อัตราส่วนขึ้นกับ θ เท่านั้น',
      'm1.angle': 'มุม θ',
      'm1.scale': 'มาตราส่วน / ซูม',
      'm1.constantBadge': 'ขนาดสามเหลี่ยมเปลี่ยน แต่ค่าอัตราส่วนยังคงที่ 100%!',
      'm1.dragHint': 'ลาก A เพื่อปรับมุม · ลาก C เพื่อปรับขนาด',
      'm1.sides': 'ความยาวด้านตามจริง',
      'm1.ratios': 'สมการอัตราส่วนตามจริง',
      'm1.scaleHint': 'เฉพาะความยาวด้านที่เปลี่ยนตามมาตราส่วน — ทศนิยมสามค่าด้านล่างไม่เคยเปลี่ยน',
      oppShort: 'a · ด้านข้าม',
      adjShort: 'b · ด้านชิด',
      hypShort: 'c · ด้านตรงข้ามมุมฉาก',
      hyp: 'ด้านตรงข้ามมุมฉาก (c)',
      opp: 'ด้านข้าม (a)',
      adj: 'ด้านชิด (b)',
      theta: 'มุม (θ)',

      'm2.title': 'สามเหลี่ยมมุมฉากพิเศษ',
      'm2.desc': 'ฝึกความสัมพันธ์แบบกรณฑ์ตรงของสามเหลี่ยม 45°-45°-90° และ 30°-60°-90° โดยไม่ต้องใช้เครื่องคิดเลข',
      'm2.goal': 'เป้าหมาย: จำอัตราส่วนด้านแบบตรงได้',
      'm2.iso': '45° · 45° · 90°',
      'm2.isoSub': 'หน้าจั่ว · ด้านประกอบ x, x',
      'm2.scalene': '30° · 60° · 90°',
      'm2.scaleneSub': 'ด้านไม่เท่า · ด้านสั้น x',
      'm2.base': 'ตัวแปรฐาน x',
      'm2.exact': 'ค่าด้านแบบตรง',
      'm2.side1': 'ด้านสั้น',
      'm2.side2': 'ด้านที่เหลือ',
      'm2.side2Leg': 'ด้านที่เหลือ',
      'm2.side2Long': 'ด้านยาว',
      'm2.side3': 'ด้านตรงข้ามมุมฉาก',
      'm2.note45': 'ด้านประกอบมีอัตราส่วน 1 : 1 เสมอ มุมแหลมทั้งสองจึงเป็น 45°',
      'm2.note30': 'ด้านตรงข้ามมุม 30° ยาวเป็นครึ่งหนึ่งของด้านตรงข้ามมุมฉาก และด้านยาวเป็น x√3',
      'm3.title': 'อัตราส่วนส่วนกลับและความเป็นคู่',
      'm3.desc': 'โคซีแคนต์ ซีแคนต์ และโคแทนเจนต์ไม่ใช่เรื่องใหม่ — แค่พลิกอัตราส่วนหลักกลับด้าน',
      'm3.goal': 'เป้าหมาย: เห็นการพลิก ไม่ใช่กฎใหม่',
      'm3.angle': 'มุม θ',
      'm3.undefined': 'ไม่นิยาม',
      'm3.sinNote': 'csc θ คือ 1 ÷ sin θ — สามเหลี่ยมเดิม เศษส่วนพลิกด้าน',
      'm3.cosNote': 'sec θ คือ 1 ÷ cos θ ที่ 90° ด้านชิดยุบเหลือ 0 ดังนั้น sec จึงไม่นิยาม',
      'm3.tanNote': 'tan θ และ cot θ เป็นส่วนกลับกัน ที่ 90° ด้านชิดเป็น 0 ทั้งคู่จึงระเบิด',
      'm3.degenerate0': 'θ = 0° — ด้านข้ามหายไป',
      'm3.degenerate90': 'θ = 90° — ด้านชิดหายไป',

      'm4.title': 'ห้องฝึกซ้อม Khan',
      'm4.desc': 'ดึงความรู้ ตรวจคำตอบ และต่อสตรีค สามโหมดปัญหา พร้อมเฉลยทีละขั้น',
      'm4.goal': 'เป้าหมาย: การระลึกเชิงรุกและความชำนาญ',
      'm4.modeRatio': 'หาค่าอัตราส่วน',
      'm4.modeSide': 'หาด้านที่หายไป',
      'm4.modeStory': 'โจทย์เรื่องราว',
      'm4.new': 'โจทย์ใหม่',
      'm4.answerLabel': 'คำตอบของคุณ',
      'm4.placeholder': 'เช่น 0.6 หรือ 3/5',
      'm4.check': 'ตรวจคำตอบ',
      'm4.answerHint': 'รับทั้งทศนิยมและเศษส่วน (0.6 หรือ 3/5)',
      'm4.showSteps': 'แสดงวิธีทำทีละขั้นแบบภาพ',
      'm4.progress': 'ความคืบหน้าของคุณ',
      'm4.correct': 'ตอบถูก',
      'm4.masteryHint': 'ตอบถูก 20 ข้อเพื่อปลดล็อกความชำนาญยูนิต 1',
      'm4.badges': 'เหรียญความชำนาญ',
      'm4.tagRatio': 'หาค่าอัตราส่วน',
      'm4.tagSide': 'หาด้านที่หายไป',
      'm4.tagStory': 'โจทย์เรื่องราวในชีวิตจริง',
      'm4.correctMsg': 'ถูกต้อง!',
      'm4.wrongMsg': 'ยังไม่ถูก — ตรวจอัตราส่วนอีกครั้ง หรือกดดูวิธีทำ',
      'm4.invalid': 'กรอกตัวเลขหรือเศษส่วน เช่น 3/5',
      'm4.badgeUnlocked': 'ปลดล็อกเหรียญ',
      'm4.roundHint': 'ตอบเป็นทศนิยม 2 ตำแหน่ง',

      'side.opp': 'ด้านข้าม',
      'side.adj': 'ด้านชิด',
      'side.hyp': 'ด้านตรงข้ามมุมฉาก',

      'badge.first': 'ก้าวแรก',
      'badge.streak3': 'ต่อเนื่อง 3',
      'badge.streak5': 'หยุดไม่อยู่ 5',
      'badge.ratio3': 'นักอัตราส่วนมือใหม่',
      'badge.side3': 'นักสืบด้าน',
      'badge.story3': 'นักแก้โจทย์เรื่องราว',
      'badge.master': 'ปรมาจารย์ยูนิต 1',
      footerBuilt: 'สร้างเพื่อการเรียนรู้เชิงรุก'
    }
  };
  const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;

  /* ------------------------------- state --------------------------------- */
  const DEFAULT_STATE = {
    version: STATE_VERSION,
    lang: 'en',
    lastModule: 'ratio',
    ratio: { theta: 30, scale: 1 },
    special: { type: '45', x: 8 },
    reciprocal: { theta: 35 },
    practice: {
      mode: 'ratio',
      correct: 0,
      attempts: 0,
      streak: 0,
      best: 0,
      byMode: { ratio: 0, side: 0, story: 0 },
      badges: []
    },
    completed: { ratio: false, special: false, reciprocal: false, practice: false },
    updatedAt: null
  };

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function mergeState(base, saved) {
    if (!saved || typeof saved !== 'object') return base;
    Object.keys(base).forEach((key) => {
      const b = base[key];
      const s = saved[key];
      if (b && typeof b === 'object' && !Array.isArray(b)) base[key] = mergeState(b, s);
      else if (s !== undefined) base[key] = s;
    });
    return base;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      const merged = mergeState(clone(DEFAULT_STATE), parsed);
      if (merged.lang !== 'en' && merged.lang !== 'th') merged.lang = 'en';
      if (!['ratio', 'special', 'reciprocal', 'practice'].includes(merged.lastModule)) merged.lastModule = 'ratio';
      return merged;
    } catch (_) {
      return clone(DEFAULT_STATE);
    }
  }

  let state = loadState();
  let saveTimer = null;
  function saveState() {
    try {
      state.updatedAt = new Date().toISOString();
      state.version = STATE_VERSION;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) { /* private mode or quota: the app still works in memory */ }
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 250);
  }

  /* ----------------------------- references ------------------------------ */
  const ratioCanvas = $('ratioCanvas');
  const specialCanvas = $('specialCanvas');
  const recipCanvas = $('recipCanvas');
  const angleSlider = $('angleSlider');
  const scaleSlider = $('scaleSlider');
  const angleOut = $('angleOut');
  const scaleOut = $('scaleOut');
  const xSlider = $('xSlider');
  const xOut = $('xOut');
  const recipSlider = $('recipSlider');
  const recipOut = $('recipOut');
  const scaleBadge = $('scaleBadge');
  const answerForm = $('answerForm');
  const answerInput = $('answerInput');
  const checkBtn = $('checkBtn');
  const feedback = $('feedback');
  const stepsList = $('stepsList');
  const stepsBtn = $('stepsBtn');
  const problemText = $('problemText');
  const problemQuestion = $('problemQuestion');
  const problemTag = $('problemTag');

  /* ------------------------------ helpers -------------------------------- */
  const fmt = (n, d = 4) => {
    if (!Number.isFinite(n)) return '—';
    const v = Math.abs(n) < 1e-12 ? 0 : n;
    return v.toFixed(d);
  };
  const frac = (n, d) => `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`;
  const fracSym = (n, d) => `<span class="frac frac-sym"><span class="num">${n}</span><span class="den">${d}</span></span>`;

  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) { const r = a % b; a = b; b = r; }
    return a || 1;
  }

  function rgba(hex, alpha) {
    const n = parseInt(hex.replace('#', ''), 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
  }

  function roundRect(ctx, x, y, w, h, r) {
    if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, w, h, r); return; }
    const rr = Math.min(r, w / 2, h / 2);
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function drawGrid(ctx, w, h, step = 36) {
    ctx.save();
    ctx.strokeStyle = 'rgba(148,175,220,0.055)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = step; x < w; x += step) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
    for (let y = step; y < h; y += step) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
    ctx.stroke();
    ctx.restore();
  }

  function neonLine(ctx, x1, y1, x2, y2, color, width = 3) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  function rightAngleMark(ctx, B, ux, uy, vx, vy, size = 18) {
    ctx.save();
    ctx.strokeStyle = rgba(COLORS.theta, 0.8);
    ctx.lineWidth = 2;
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(B.x + ux * size, B.y + uy * size);
    ctx.lineTo(B.x + (ux + vx) * size, B.y + (uy + vy) * size);
    ctx.lineTo(B.x + vx * size, B.y + vy * size);
    ctx.stroke();
    ctx.restore();
  }

  function drawAngleArc(ctx, vertex, p1, p2, radius, label, color = COLORS.theta) {
    let a1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
    let a2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);
    let delta = a2 - a1;
    while (delta > Math.PI) delta -= Math.PI * 2;
    while (delta < -Math.PI) delta += Math.PI * 2;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(vertex.x, vertex.y);
    ctx.arc(vertex.x, vertex.y, radius, a1, a1 + delta, delta < 0);
    ctx.closePath();
    ctx.fillStyle = rgba(color, 0.1);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(vertex.x, vertex.y, radius, a1, a1 + delta, delta < 0);
    ctx.strokeStyle = rgba(color, 0.85);
    ctx.lineWidth = 2;
    ctx.stroke();

    if (label) {
      const mid = a1 + delta / 2;
      const lx = vertex.x + Math.cos(mid) * (radius + 20);
      const ly = vertex.y + Math.sin(mid) * (radius + 20);
      ctx.fillStyle = color;
      ctx.font = `600 12px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, lx, ly);
    }
    ctx.restore();
  }

  function chip(ctx, text, x, y, color, opts = {}) {
    ctx.save();
    ctx.font = opts.font || `600 12px ${FONT}`;
    const tw = ctx.measureText(text).width;
    const padX = 8;
    const hgt = 22;
    const wdt = tw + padX * 2;
    const bx = opts.align === 'left' ? x : opts.align === 'right' ? x - wdt : x - wdt / 2;
    const by = y - hgt / 2;
    ctx.beginPath();
    roundRect(ctx, bx, by, wdt, hgt, 7);
    ctx.fillStyle = 'rgba(5,10,20,0.86)';
    ctx.fill();
    ctx.strokeStyle = rgba(color, 0.4);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, bx + wdt / 2, y + 0.5);
    ctx.restore();
  }

  function vertex(ctx, p, color, label, dx, dy, draggable = false) {
    ctx.save();
    if (draggable) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
      ctx.fillStyle = rgba(color, 0.12);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, draggable ? 8 : 5, 0, Math.PI * 2);
    ctx.fillStyle = draggable ? '#f8fbff' : rgba(color, 0.92);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fillStyle = '#c3d3ec';
    ctx.font = `600 12px ${FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, p.x + dx, p.y + dy);
    ctx.restore();
  }

  function pointIn(event, canvas) {
    const r = canvas.getBoundingClientRect();
    return { x: event.clientX - r.left, y: event.clientY - r.top };
  }

  /* ------------------------------ stages --------------------------------- */
  function makeStage(canvas, draw) {
    const ctx = canvas.getContext('2d');
    const stage = { canvas, ctx, w: 0, h: 0, draw };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stage.w = r.width;
      stage.h = r.height;
      draw();
    };
    stage.resize = resize;
    if (typeof ResizeObserver === 'function') new ResizeObserver(resize).observe(canvas);
    else window.addEventListener('resize', resize);
    requestAnimationFrame(resize);
    return stage;
  }

  /* --------------------------- module 1 · ratio -------------------------- */
  function ratioGeometry() {
    const w = ratioStage.w;
    const h = ratioStage.h;
    if (!w || !h) return null;
    const theta = rad(state.ratio.theta);
    const unit = (Math.min(w, h) * 0.82 * state.ratio.scale) / 2.5;
    const Lb = Math.cos(theta) * unit;
    const La = Math.sin(theta) * unit;
    return {
      w, h, unit, Lb, La,
      A: { x: (w + Lb) / 2, y: (h - La) / 2 },
      B: { x: (w + Lb) / 2, y: (h + La) / 2 },
      C: { x: (w - Lb) / 2, y: (h + La) / 2 }
    };
  }

  function drawRatio() {
    const { ctx, w, h } = ratioStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    const g = ratioGeometry();
    if (!g) return;
    const { A, B, C } = g;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,229,255,0.055)';
    ctx.fill();
    ctx.restore();

    neonLine(ctx, B.x, B.y, C.x, C.y, COLORS.adj, 3);
    neonLine(ctx, A.x, A.y, B.x, B.y, COLORS.opp, 3);
    neonLine(ctx, A.x, A.y, C.x, C.y, COLORS.hyp, 3.5);

    rightAngleMark(ctx, B, 0, -1, -1, 0, Math.max(12, Math.min(20, g.Lb * 0.12)));

    const arcR = Math.max(22, Math.min(46, Math.min(g.Lb, g.unit) * 0.26));
    drawAngleArc(ctx, C, B, A, arcR, `θ ${state.ratio.theta.toFixed(1)}°`);

    // Side labels (a opposite, b adjacent, c hypotenuse)
    chip(ctx, 'a', (A.x + B.x) / 2 + 20, (A.y + B.y) / 2, COLORS.opp);
    chip(ctx, 'b', (B.x + C.x) / 2, B.y - 20, COLORS.adj);
    const mx = (A.x + C.x) / 2;
    const my = (A.y + C.y) / 2;
    const dx = C.x - A.x;
    const dy = C.y - A.y;
    let nx = -dy;
    let ny = dx;
    const len = Math.hypot(nx, ny) || 1;
    nx /= len;
    ny /= len;
    if (nx * (B.x - mx) + ny * (B.y - my) < 0) { nx = -nx; ny = -ny; }
    chip(ctx, 'c', mx + nx * 26, my + ny * 26, COLORS.hyp);

    vertex(ctx, A, COLORS.theta, 'A', 16, -14, true);
    vertex(ctx, B, COLORS.hyp, 'B', -18, 16, false);
    vertex(ctx, C, COLORS.theta, 'C', -16, 18, true);
  }

  const ratioStage = makeStage(ratioCanvas, drawRatio);

  function renderRatioReadout() {
    const th = rad(state.ratio.theta);
    const c = 8 * state.ratio.scale;
    const a = c * Math.sin(th);
    const b = c * Math.cos(th);

    $('sideA').textContent = fmt(a, 4);
    $('sideB').textContent = fmt(b, 4);
    $('sideC').textContent = fmt(c, 4);
    $('sinA').textContent = fmt(a, 4);
    $('sinC').textContent = fmt(c, 4);
    $('cosB').textContent = fmt(b, 4);
    $('cosC').textContent = fmt(c, 4);
    $('tanA').textContent = fmt(a, 4);
    $('tanB').textContent = fmt(b, 4);
    $('sinVal').textContent = fmt(a / c, 4);
    $('cosVal').textContent = fmt(b / c, 4);
    $('tanVal').textContent = fmt(a / b, 4);

    angleOut.textContent = `${state.ratio.theta.toFixed(1)}°`;
    scaleOut.textContent = `${state.ratio.scale.toFixed(2)}×`;
    angleSlider.value = String(state.ratio.theta);
    scaleSlider.value = String(state.ratio.scale);
  }

  let badgeTimer = null;
  function flashConstantBadge() {
    scaleBadge.hidden = false;
    scaleBadge.style.animation = 'none';
    void scaleBadge.offsetWidth;
    scaleBadge.style.animation = '';
    clearTimeout(badgeTimer);
    badgeTimer = setTimeout(() => { scaleBadge.hidden = true; }, 2800);
  }

  function setRatioAngle(value) {
    state.ratio.theta = clamp(Math.round(value * 2) / 2, 5, 85);
    renderRatioReadout();
    drawRatio();
    completeModule('ratio');
    scheduleSave();
  }

  angleSlider.addEventListener('input', () => {
    state.ratio.theta = Number(angleSlider.value);
    renderRatioReadout();
    drawRatio();
    completeModule('ratio');
    scheduleSave();
  });

  scaleSlider.addEventListener('input', () => {
    state.ratio.scale = Number(scaleSlider.value);
    renderRatioReadout();
    drawRatio();
    flashConstantBadge();
    completeModule('ratio');
    scheduleSave();
  });

  let ratioDrag = null;
  ratioCanvas.addEventListener('pointerdown', (event) => {
    const g = ratioGeometry();
    if (!g) return;
    const p = pointIn(event, ratioCanvas);
    let best = null;
    let bestDist = 28;
    [['A', g.A], ['C', g.C]].forEach(([id, pt]) => {
      const d = Math.hypot(pt.x - p.x, pt.y - p.y);
      if (d < bestDist) { bestDist = d; best = id; }
    });
    if (best) {
      ratioDrag = best;
      try { ratioCanvas.setPointerCapture(event.pointerId); } catch (_) { /* ignore */ }
      event.preventDefault();
    }
  });

  ratioCanvas.addEventListener('pointermove', (event) => {
    if (!ratioDrag) return;
    const g = ratioGeometry();
    if (!g) return;
    const p = pointIn(event, ratioCanvas);
    if (ratioDrag === 'A') {
      const lo = g.unit * Math.sin(rad(5));
      const hi = g.unit * Math.sin(rad(85));
      const La = clamp(g.h - 2 * p.y, lo, hi);
      setRatioAngle(deg(Math.asin(clamp(La / g.unit, -1, 1))));
    } else if (ratioDrag === 'C') {
      const lo = g.unit * Math.cos(rad(85));
      const hi = g.unit * Math.cos(rad(5));
      const Lb = clamp(g.w - 2 * p.x, lo, hi);
      setRatioAngle(deg(Math.acos(clamp(Lb / g.unit, -1, 1))));
    }
    event.preventDefault();
  });

  const endDrag = () => { ratioDrag = null; };
  ratioCanvas.addEventListener('pointerup', endDrag);
  ratioCanvas.addEventListener('pointercancel', endDrag);

  /* -------------------------- module 2 · special ------------------------- */
  function specialMetrics() {
    const { w, h } = specialStage;
    if (!w || !h) return null;
    const is45 = state.special.type === '45';
    const boxW = w - 120;
    const boxH = h - 100;
    let legX;
    let legY;
    if (is45) {
      const s = Math.min(boxW, boxH);
      legX = s;
      legY = s;
    } else {
      const s = Math.min(boxW / Math.sqrt(3), boxH);
      legX = s * Math.sqrt(3);
      legY = s;
    }
    const B = { x: (w + legX) / 2, y: (h + legY) / 2 };
    return { w, h, is45, legX, legY, A: { x: B.x, y: B.y - legY }, B, C: { x: B.x - legX, y: B.y } };
  }

  function drawSpecial() {
    const { ctx, w, h } = specialStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    const m = specialMetrics();
    if (!m) return;
    const { A, B, C, is45 } = m;
    const x = state.special.x;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,214,0,0.04)';
    ctx.fill();
    ctx.restore();

    neonLine(ctx, B.x, B.y, C.x, C.y, COLORS.adj, 3);
    neonLine(ctx, A.x, A.y, B.x, B.y, COLORS.opp, 3);
    neonLine(ctx, A.x, A.y, C.x, C.y, COLORS.hyp, 3.5);
    rightAngleMark(ctx, B, 0, -1, -1, 0, 18);

    drawAngleArc(ctx, C, B, A, 34, is45 ? '45°' : '30°');
    drawAngleArc(ctx, A, B, C, 30, is45 ? '45°' : '60°');

    const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const midBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
    const midAC = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };

    const hypLabel = is45 ? (x === 1 ? '√2' : `${x}√2`) : '2x';
    const longLabel = is45 ? String(x) : (x === 1 ? '√3' : `${x}√3`);

    chip(ctx, is45 ? String(x) : String(x), midAB.x - 30, midAB.y, COLORS.opp);
    chip(ctx, is45 ? String(x) : longLabel, midBC.x, midBC.y - 30, COLORS.adj);
    chip(ctx, hypLabel, midAC.x - 26, midAC.y + 20, COLORS.hyp, { font: `600 13px ${MATH}` });

    vertex(ctx, A, COLORS.theta, 'A', 18, -8);
    vertex(ctx, B, COLORS.hyp, 'B', 16, 18);
    vertex(ctx, C, COLORS.theta, 'C', -18, 18);
  }

  const specialStage = makeStage(specialCanvas, drawSpecial);

  function renderSpecialTable() {
    const is45 = state.special.type === '45';
    const x = state.special.x;
    const rows = is45
      ? [
          { key: 'm2.side1', rad: String(x), dec: x },
          { key: 'm2.side2Leg', rad: String(x), dec: x },
          { key: 'm2.side3', rad: x === 1 ? '√2' : `${x}√2`, dec: x * Math.SQRT2 }
        ]
      : [
          { key: 'm2.side1', rad: String(x), dec: x },
          { key: 'm2.side2Long', rad: x === 1 ? '√3' : `${x}√3`, dec: x * Math.sqrt(3) },
          { key: 'm2.side3', rad: '2x', dec: 2 * x }
        ];

    rows.forEach((row, i) => {
      const radical = $(`exact${i + 1}Rad`);
      const dec = $(`exact${i + 1}Dec`);
      const name = document.querySelector(`#exactTable .exact-row:nth-child(${i + 1}) .exact-name`);
      if (name) {
        name.dataset.i18n = row.key;
        name.textContent = t(row.key);
      }
      if (radical) radical.textContent = row.rad;
      if (dec) dec.textContent = fmt(row.dec, 2);
    });

    const note = $('specialNote');
    note.dataset.i18n = is45 ? 'm2.note45' : 'm2.note30';
    note.textContent = t(note.dataset.i18n);
    xOut.textContent = String(x);
    xSlider.value = String(x);
  }

  document.querySelectorAll('input[name="specialType"]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;
      state.special.type = input.value;
      renderSpecialTable();
      drawSpecial();
      completeModule('special');
      saveState();
    });
  });

  xSlider.addEventListener('input', () => {
    state.special.x = Number(xSlider.value);
    renderSpecialTable();
    drawSpecial();
    completeModule('special');
    scheduleSave();
  });

  /* ------------------------- module 3 · reciprocal ----------------------- */
  function recipValues() {
    const theta = state.reciprocal.theta;
    const th = rad(theta);
    const sin = theta === 0 ? 0 : theta === 90 ? 1 : Math.sin(th);
    const cos = theta === 90 ? 0 : theta === 0 ? 1 : Math.cos(th);
    const tan = cos === 0 ? Infinity : sin / cos;
    return {
      theta,
      sin,
      cos,
      tan,
      csc: sin === 0 ? Infinity : 1 / sin,
      sec: cos === 0 ? Infinity : 1 / cos,
      cot: sin === 0 ? Infinity : cos / sin
    };
  }

  function recipGeometry() {
    const { w, h } = recipStage;
    if (!w || !h) return null;
    const theta = clamp(state.reciprocal.theta, 2, 88);
    const th = rad(theta);
    const unit = Math.min(w, h) * 0.78;
    const Lb = Math.cos(th) * unit;
    const La = Math.sin(th) * unit;
    return {
      w, h, unit, Lb, La,
      A: { x: (w + Lb) / 2, y: (h - La) / 2 },
      B: { x: (w + Lb) / 2, y: (h + La) / 2 },
      C: { x: (w - Lb) / 2, y: (h + La) / 2 }
    };
  }

  function drawReciprocal() {
    const { ctx, w, h } = recipStage;
    if (!w || !h) return;
    ctx.clearRect(0, 0, w, h);
    drawGrid(ctx, w, h);

    const v = recipValues();
    if (v.theta === 0 || v.theta === 90) {
      ctx.save();
      ctx.fillStyle = rgba(COLORS.theta, 0.9);
      ctx.font = `600 14px ${FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v.theta === 0 ? t('m3.degenerate0') : t('m3.degenerate90'), w / 2, h / 2);
      ctx.restore();
      return;
    }

    const g = recipGeometry();
    if (!g) return;
    const { A, B, C } = g;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.lineTo(C.x, C.y);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0,230,118,0.04)';
    ctx.fill();
    ctx.restore();

    neonLine(ctx, B.x, B.y, C.x, C.y, COLORS.adj, 2.5);
    neonLine(ctx, A.x, A.y, B.x, B.y, COLORS.opp, 2.5);
    neonLine(ctx, A.x, A.y, C.x, C.y, COLORS.hyp, 3);
    rightAngleMark(ctx, B, 0, -1, -1, 0, 14);
    drawAngleArc(ctx, C, B, A, 30, `${state.reciprocal.theta.toFixed(1)}°`);

    chip(ctx, 'opp', (A.x + B.x) / 2 + 26, (A.y + B.y) / 2, COLORS.opp);
    chip(ctx, 'adj', (B.x + C.x) / 2, B.y - 22, COLORS.adj);
    chip(ctx, 'hyp', (A.x + C.x) / 2 - 34, (A.y + C.y) / 2, COLORS.hyp);
  }

  const recipStage = makeStage(recipCanvas, drawReciprocal);

  function renderReciprocal() {
    const v = recipValues();
    const setVal = (id, value) => {
      const el = $(id);
      el.textContent = Number.isFinite(value) ? fmt(value, 4) : '—';
      el.classList.toggle('is-undefined', value === Infinity);
    };
    setVal('recipSinVal', v.sin);
    setVal('recipCscVal', v.csc);
    setVal('recipCosVal', v.cos);
    setVal('recipSecVal', v.sec);
    setVal('recipTanVal', v.tan);
    setVal('recipCotVal', v.cot);

    const undefinedSin = v.csc === Infinity;
    const undefinedCos = v.sec === Infinity;
    const undefinedTan = v.tan === Infinity || v.cot === Infinity;

    $('warnSin').hidden = !undefinedSin;
    $('warnCos').hidden = !undefinedCos;
    $('warnTan').hidden = !undefinedTan;

    document.querySelector('[data-pair="sin"]').classList.toggle('is-undefined', undefinedSin);
    document.querySelector('[data-pair="cos"]').classList.toggle('is-undefined', undefinedCos);
    document.querySelector('[data-pair="tan"]').classList.toggle('is-undefined', undefinedTan);

    const triplet = $('recipTriplet');
    triplet.innerHTML =
      `<span style="color:${COLORS.opp}">opp <b>${fmt(v.sin, 4)}</b></span>` +
      `<span style="color:${COLORS.adj}">adj <b>${fmt(v.cos, 4)}</b></span>` +
      `<span style="color:${COLORS.hyp}">hyp <b>${fmt(1, 4)}</b></span>`;

    recipOut.textContent = `${v.theta.toFixed(1)}°`;
    recipSlider.value = String(v.theta);
  }

  recipSlider.addEventListener('input', () => {
    state.reciprocal.theta = Number(recipSlider.value);
    renderReciprocal();
    drawReciprocal();
    completeModule('reciprocal');
    scheduleSave();
  });

  /* --------------------------- module 4 · practice ----------------------- */
  const TRIPLES = [
    [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29]
  ];
  const RATIO_NAMES = ['sin', 'cos', 'tan'];

  const SIDE_CASES = [
    { theta: 30, known: 'hyp', value: 10, find: 'opp' },
    { theta: 30, known: 'hyp', value: 14, find: 'adj' },
    { theta: 30, known: 'adj', value: 9, find: 'opp' },
    { theta: 45, known: 'hyp', value: 10, find: 'opp' },
    { theta: 45, known: 'opp', value: 7, find: 'hyp' },
    { theta: 60, known: 'hyp', value: 12, find: 'adj' },
    { theta: 60, known: 'hyp', value: 12, find: 'opp' },
    { theta: 60, known: 'adj', value: 8, find: 'opp' },
    { theta: 60, known: 'adj', value: 8, find: 'hyp' }
  ];

  const STORY_TEMPLATES = [
    {
      id: 'ladder', icon: '🪜', theta: 60, value: 6, known: 'hyp',
      en: (v, a) => `A <strong>${v} m</strong> ladder leans against a wall, making a <strong>${a}°</strong> angle with the ground. How high up the wall does the ladder reach?`,
      th: (v, a) => `บันไดยาว <strong>${v} เมตร</strong>พิงกำแพง ทำมุม <strong>${a}°</strong> กับพื้น บันไดแตะกำแพงสูงจากพื้นเท่าไร`
    },
    {
      id: 'shadow', icon: '🏢', theta: 35, value: 20, known: 'adj',
      en: (v, a) => `A building casts a <strong>${v} m</strong> shadow. The sun's rays make a <strong>${a}°</strong> angle with the ground. How tall is the building?`,
      th: (v, a) => `ตึกหลังหนึ่งทอดเงายาว <strong>${v} เมตร</strong> แสงอาทิตย์ทำมุม <strong>${a}°</strong> กับพื้น ตึกสูงเท่าไร`
    },
    {
      id: 'ramp', icon: '♿', theta: 8, value: 12, known: 'adj',
      en: (v, a) => `A wheelchair ramp runs <strong>${v} m</strong> along the ground and rises at <strong>${a}°</strong>. How high is the top of the ramp?`,
      th: (v, a) => `ทางลาดสำหรับรถเข็นยาวตามพื้น <strong>${v} เมตร</strong> และลาดขึ้นทำมุม <strong>${a}°</strong> ปลายทางลาดสูงเท่าไร`
    },
    {
      id: 'kite', icon: '🪁', theta: 40, value: 25, known: 'hyp',
      en: (v, a) => `A kite string is <strong>${v} m</strong> long and makes a <strong>${a}°</strong> angle with the ground. How high is the kite?`,
      th: (v, a) => `สายว่าวยาว <strong>${v} เมตร</strong> ทำมุม <strong>${a}°</strong> กับพื้น ว่าวลอยสูงเท่าไร`
    },
    {
      id: 'drone', icon: '🛸', theta: 55, value: 80, known: 'adj',
      en: (v, a) => `A drone is <strong>${v} m</strong> horizontally from its pilot and at a <strong>${a}°</strong> angle of elevation. How high is the drone?`,
      th: (v, a) => `โดรนอยู่ห่างจากนักบินในแนวราบ <strong>${v} เมตร</strong> และทำมุมเงย <strong>${a}°</strong> โดรนสูงจากพื้นเท่าไร`
    },
    {
      id: 'slide', icon: '🛝', theta: 30, value: 8, known: 'hyp',
      en: (v, a) => `A playground slide is <strong>${v} m</strong> long and meets the ground at <strong>${a}°</strong>. How tall is the top of the slide?`,
      th: (v, a) => `สไลเดอร์ยาว <strong>${v} เมตร</strong> ทำมุม <strong>${a}°</strong> กับพื้น ปลายบนของสไลเดอร์สูงเท่าไร`
    }
  ];

  const BADGES = [
    { id: 'first', icon: '🌟', key: 'badge.first', test: (p) => p.correct >= 1 },
    { id: 'streak3', icon: '🔥', key: 'badge.streak3', test: (p) => p.best >= 3 },
    { id: 'streak5', icon: '⚡', key: 'badge.streak5', test: (p) => p.best >= 5 },
    { id: 'ratio3', icon: '📐', key: 'badge.ratio3', test: (p) => p.byMode.ratio >= 3 },
    { id: 'side3', icon: '📏', key: 'badge.side3', test: (p) => p.byMode.side >= 3 },
    { id: 'story3', icon: '🏗️', key: 'badge.story3', test: (p) => p.byMode.story >= 3 },
    { id: 'master', icon: '🏆', key: 'badge.master', test: (p) => p.correct >= 20 }
  ];

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
  const trigVal = (name, theta) => {
    const th = rad(theta);
    if (name === 'sin') return Math.sin(th);
    if (name === 'cos') return Math.cos(th);
    if (theta === 90) return Infinity;
    return Math.tan(th);
  };

  let currentProblem = null;
  let stepsShown = false;
  let problemSolved = false;
  let lastStory = null;

  function genRatioProblem() {
    const triple = pick(TRIPLES);
    const k = randInt(1, 3);
    let [a, b, c] = triple.map((n) => n * k);
    if (Math.random() < 0.5) [a, b] = [b, a]; // vary the orientation
    const ratio = pick(RATIO_NAMES);
    const answer = ratio === 'sin' ? a / c : ratio === 'cos' ? b / c : a / b;
    return { mode: 'ratio', a, b, c, ratio, answer };
  }

  function genSideProblem() {
    const c = pick(SIDE_CASES);
    const { theta, known, value, find } = c;
    let answer;
    if (find === 'opp') answer = known === 'hyp' ? value * trigVal('sin', theta) : value * trigVal('tan', theta);
    else if (find === 'adj') answer = known === 'hyp' ? value * trigVal('cos', theta) : value / trigVal('tan', theta);
    else answer = known === 'opp' ? value / trigVal('sin', theta) : value / trigVal('cos', theta);
    return { mode: 'side', theta, known, value, find, answer };
  }

  function genStoryProblem() {
    let template = pick(STORY_TEMPLATES);
    let guard = 0;
    while (template.id === lastStory && guard < 8) { template = pick(STORY_TEMPLATES); guard += 1; }
    lastStory = template.id;
    const { theta, value, known } = template;
    const answer = known === 'hyp' ? value * trigVal('sin', theta) : value * trigVal('tan', theta);
    return { mode: 'story', template, theta, value, known, find: 'opp', answer };
  }

  function ratioFraction(p) {
    return p.ratio === 'sin' ? [p.a, p.c] : p.ratio === 'cos' ? [p.b, p.c] : [p.a, p.b];
  }

  function problemPrompt(p) {
    if (p.mode === 'ratio') {
      return L(
        `You are given a right triangle with <strong>opposite = ${p.a}</strong>, <strong>adjacent = ${p.b}</strong>, and <strong>hypotenuse = ${p.c}</strong>.`,
        `กำหนดสามเหลี่ยมมุมฉากที่มี <strong>ด้านข้าม = ${p.a}</strong>, <strong>ด้านชิด = ${p.b}</strong> และ <strong>ด้านตรงข้ามมุมฉาก = ${p.c}</strong>`
      );
    }
    if (p.mode === 'side') {
      return L(
        `In a right triangle, the <strong>${t('side.' + p.known)}</strong> is <strong>${p.value}</strong>, and one acute angle is <strong>θ = ${p.theta}°</strong>.`,
        `ในสามเหลี่ยมมุมฉาก <strong>${t('side.' + p.known)}</strong> ยาว <strong>${p.value}</strong> และมุมแหลมมุมหนึ่งเป็น <strong>θ = ${p.theta}°</strong>`
      );
    }
    return p.template[state.lang === 'th' ? 'th' : 'en'](p.value, p.theta);
  }

  function problemQuestionHtml(p) {
    if (p.mode === 'ratio') {
      return L(`Find <strong>${p.ratio}(θ)</strong>.`, `จงหาค่า <strong>${p.ratio}(θ)</strong>`);
    }
    if (p.mode === 'side') {
      return L(
        `Find the <strong>${t('side.' + p.find)}</strong>. ${t('m4.roundHint')}`,
        `จงหาความยาวของ<strong>${t('side.' + p.find)}</strong> (${t('m4.roundHint')})`
      );
    }
    return L(
      `Find the <strong>height</strong>. ${t('m4.roundHint')}`,
      `จงหาความสูง (${t('m4.roundHint')})`
    );
  }

  function ratioSteps(p) {
    const names = { sin: ['opp', 'hyp'], cos: ['adj', 'hyp'], tan: ['opp', 'adj'] };
    const [numName, denName] = names[p.ratio];
    const [num, den] = ratioFraction(p);
    return [
      L(
        `Use SOH-CAH-TOA: <strong>${p.ratio} θ = ${numName} / ${denName}</strong>.`,
        `ใช้ SOH-CAH-TOA: <strong>${p.ratio} θ = ${numName} / ${denName}</strong>`
      ),
      L(
        `Substitute the given sides: <strong>${p.ratio} θ = ${num} / ${den}</strong>.`,
        `แทนค่าด้านที่กำหนด: <strong>${p.ratio} θ = ${num} / ${den}</strong>`
      ),
      L(
        `Divide: <strong>${p.ratio} θ = ${(num / den).toFixed(4)}</strong>.`,
        `หาร: <strong>${p.ratio} θ = ${(num / den).toFixed(4)}</strong>`
      )
    ];
  }

  function sideFormula(p) {
    if (p.find === 'opp') {
      return p.known === 'hyp'
        ? { name: 'sin', num: 'opp', den: 'hyp', solve: (v) => v * trigVal('sin', p.theta) }
        : { name: 'tan', num: 'opp', den: 'adj', solve: (v) => v * trigVal('tan', p.theta) };
    }
    if (p.find === 'adj') {
      return p.known === 'hyp'
        ? { name: 'cos', num: 'adj', den: 'hyp', solve: (v) => v * trigVal('cos', p.theta) }
        : { name: 'tan', num: 'opp', den: 'adj', solve: (v) => v / trigVal('tan', p.theta) };
    }
    return p.known === 'opp'
      ? { name: 'sin', num: 'opp', den: 'hyp', solve: (v) => v / trigVal('sin', p.theta) }
      : { name: 'cos', num: 'adj', den: 'hyp', solve: (v) => v / trigVal('cos', p.theta) };
  }

  function sideSteps(p) {
    const f = sideFormula(p);
    const knownName = t('side.' + p.known);
    const findName = t('side.' + p.find);
    const factor = trigVal(f.name, p.theta);

    const rearrange = p.find === 'opp'
      ? (p.known === 'hyp' ? 'opp = hyp × sin θ' : 'opp = adj × tan θ')
      : p.find === 'adj'
        ? (p.known === 'hyp' ? 'adj = hyp × cos θ' : 'adj = opp ÷ tan θ')
        : (p.known === 'opp' ? 'hyp = opp ÷ sin θ' : 'hyp = adj ÷ cos θ');

    const compute = p.find === 'opp'
      ? `${p.value} × ${f.name} ${p.theta}°`
      : p.find === 'adj'
        ? (p.known === 'hyp' ? `${p.value} × cos ${p.theta}°` : `${p.value} ÷ tan ${p.theta}°`)
        : (p.known === 'opp' ? `${p.value} ÷ sin ${p.theta}°` : `${p.value} ÷ cos ${p.theta}°`);

    return [
      L(
        `The known side is the <strong>${knownName}</strong>; the unknown is the <strong>${findName}</strong>.`,
        `ด้านที่รู้คือ<strong>${knownName}</strong> ด้านที่ต้องหาคือ<strong>${findName}</strong>`
      ),
      L(
        `Choose the ratio: <strong>${f.name} θ = ${f.num} / ${f.den}</strong>.`,
        `เลือกอัตราส่วน: <strong>${f.name} θ = ${f.num} / ${f.den}</strong>`
      ),
      L(
        `Rearrange: <strong>${rearrange}</strong>.`,
        `จัดรูปใหม่: <strong>${rearrange}</strong>`
      ),
      L(
        `Evaluate the trig value: <strong>${f.name} ${p.theta}° ≈ ${Number.isFinite(factor) ? fmt(factor, 4) : '—'}</strong>.`,
        `หาค่าตรีโกณ: <strong>${f.name} ${p.theta}° ≈ ${Number.isFinite(factor) ? fmt(factor, 4) : '—'}</strong>`
      ),
      L(
        `Substitute: <strong>${findName} ≈ ${compute} ≈ ${fmt(p.answer, 2)}</strong>.`,
        `แทนค่า: <strong>${findName} ≈ ${compute} ≈ ${fmt(p.answer, 2)}</strong>`
      )
    ];
  }

  function storySteps(p) {
    const fn = p.known === 'hyp' ? 'sin' : 'tan';
    const other = p.known === 'hyp' ? 'hyp' : 'adj';
    const factor = trigVal(fn, p.theta);
    return [
      L(
        `Match the triangle: ${p.known === 'hyp' ? 'the string/length is the <strong>hypotenuse</strong>' : 'the ground distance is the <strong>adjacent</strong> side'}; the height is the <strong>opposite</strong> side.`,
        `จับคู่สามเหลี่ยม: ${p.known === 'hyp' ? 'ความยาวเชือก/บันไดคือ<strong>ด้านตรงข้ามมุมฉาก</strong>' : 'ระยะตามพื้นคือ<strong>ด้านชิด</strong>'} ส่วนความสูงคือ<strong>ด้านข้าม</strong>`
      ),
      L(
        `Use <strong>${fn} θ = opp / ${other}</strong>.`,
        `ใช้ <strong>${fn} θ = opp / ${other}</strong>`
      ),
      L(
        `Evaluate: <strong>${fn} ${p.theta}° ≈ ${fmt(factor, 4)}</strong>.`,
        `หาค่า: <strong>${fn} ${p.theta}° ≈ ${fmt(factor, 4)}</strong>`
      ),
      L(
        `Substitute: <strong>height ≈ ${p.value} × ${fmt(factor, 4)} ≈ ${fmt(p.answer, 2)} m</strong>.`,
        `แทนค่า: <strong>ความสูง ≈ ${p.value} × ${fmt(factor, 4)} ≈ ${fmt(p.answer, 2)} เมตร</strong>`
      )
    ];
  }

  function problemSteps(p) {
    if (p.mode === 'ratio') return ratioSteps(p);
    if (p.mode === 'side') return sideSteps(p);
    return storySteps(p);
  }

  function answerText(p) {
    if (p.mode === 'ratio') {
      const [num, den] = ratioFraction(p);
      const g = gcd(num, den);
      return `${num / g}/${den / g} = ${fmt(p.answer, 4)}`;
    }
    return fmt(p.answer, 2);
  }

  function setProblem(p) {
    currentProblem = p;
    stepsShown = false;
    problemSolved = false;
    answerInput.disabled = false;
    checkBtn.disabled = false;
    answerInput.value = '';
    feedback.hidden = true;
    feedback.textContent = '';
    stepsList.innerHTML = '';
    renderProblemText();
    answerInput.focus({ preventScroll: true });
  }

  function renderProblemText() {
    if (!currentProblem) return;
    problemText.innerHTML = problemPrompt(currentProblem);
    problemQuestion.innerHTML = problemQuestionHtml(currentProblem);
    const tagKey = currentProblem.mode === 'ratio' ? 'm4.tagRatio' : currentProblem.mode === 'side' ? 'm4.tagSide' : 'm4.tagStory';
    problemTag.textContent = t(tagKey);
    if (stepsShown) renderSteps();
  }

  function newProblem(mode) {
    const m = mode || state.practice.mode;
    state.practice.mode = m;
    document.querySelectorAll('.mode-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.mode === m));
    const p = m === 'ratio' ? genRatioProblem() : m === 'side' ? genSideProblem() : genStoryProblem();
    setProblem(p);
    scheduleSave();
  }

  function parseAnswer(raw) {
    const s = String(raw).trim().replace(/[,\s]/g, '').replace(/°$/, '').replace(/^x=/i, '');
    if (!s) return NaN;
    if (/^-?\d+(\.\d+)?\/-?\d+(\.\d+)?$/.test(s)) {
      const [n, d] = s.split('/').map(Number);
      return d === 0 ? NaN : n / d;
    }
    const v = Number(s);
    return Number.isFinite(v) ? v : NaN;
  }

  function masteryPercent() {
    return Math.min(100, Math.round((state.practice.correct / 20) * 100));
  }

  function renderProgress() {
    const p = state.practice;
    $('streakValue').textContent = String(p.streak);
    $('bestValue').textContent = String(p.best);
    $('masteryValue').textContent = `${masteryPercent()}%`;
    $('practiceStreak').textContent = String(p.streak);
    $('practiceBest').textContent = String(p.best);
    $('practiceCorrect').textContent = String(p.correct);
    $('practiceMastery').textContent = `${masteryPercent()}%`;
    $('masteryFill').style.width = `${masteryPercent()}%`;
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.classList.toggle('is-done', Boolean(state.completed[tab.dataset.module]));
    });
    renderBadges();
  }

  function renderBadges() {
    const grid = $('badgeGrid');
    if (!grid) return;
    grid.innerHTML = BADGES.map((b) => {
      const earned = state.practice.badges.includes(b.id);
      return `<div class="badge ${earned ? 'is-earned' : ''}" title="${escapeHtml(t(b.key))}">
        <span class="badge-icon" aria-hidden="true">${b.icon}</span>
        <span class="badge-name">${escapeHtml(t(b.key))}</span>
      </div>`;
    }).join('');
  }

  function syncBadges() {
    const before = new Set(state.practice.badges);
    const earned = BADGES.filter((b) => b.test(state.practice)).map((b) => b.id);
    state.practice.badges = Array.from(new Set([...state.practice.badges, ...earned]));
    return earned.filter((id) => !before.has(id));
  }

  function markCorrect() {
    const p = state.practice;
    p.correct += 1;
    p.streak += 1;
    p.best = Math.max(p.best, p.streak);
    p.byMode[currentProblem.mode] = (p.byMode[currentProblem.mode] || 0) + 1;
    state.completed.practice = true;
    const fresh = syncBadges();
    renderProgress();
    saveState();
    if (fresh.length) {
      const first = BADGES.find((b) => b.id === fresh[0]);
      setTimeout(() => toast(`🏅 ${t('m4.badgeUnlocked')}: ${t(first.key)}`), 350);
    }
  }

  function handleCheck() {
    if (!currentProblem || problemSolved) return;
    const value = parseAnswer(answerInput.value);
    if (!Number.isFinite(value)) {
      feedback.hidden = false;
      feedback.className = 'feedback is-bad';
      feedback.textContent = t('m4.invalid');
      return;
    }
    state.practice.attempts += 1;
    const tolerance = currentProblem.mode === 'ratio' ? 0.001 : 0.02;
    const correct = Math.abs(value - currentProblem.answer) <= tolerance;
    feedback.hidden = false;
    if (correct) {
      feedback.className = 'feedback is-good';
      feedback.textContent = `✅ ${t('m4.correctMsg')} ${answerText(currentProblem)}`;
      markCorrect();
      problemSolved = true;
      answerInput.disabled = true;
      checkBtn.disabled = true;
      saveState();
    } else {
      state.practice.streak = 0;
      feedback.className = 'feedback is-bad';
      feedback.textContent = `❌ ${t('m4.wrongMsg')}`;
      renderProgress();
      saveState();
    }
  }

  function renderSteps() {
    if (!currentProblem) return;
    stepsShown = true;
    stepsList.innerHTML = '';
    problemSteps(currentProblem).forEach((html, i) => {
      const li = document.createElement('li');
      li.style.setProperty('--i', i);
      li.innerHTML = `<span class="step-num">${i + 1}</span><span>${html}</span>`;
      stepsList.appendChild(li);
    });
  }

  answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handleCheck();
  });

  stepsBtn.addEventListener('click', () => {
    if (!currentProblem) return;
    if (stepsShown) {
      stepsList.innerHTML = '';
      stepsShown = false;
    } else {
      renderSteps();
    }
  });

  $('newProblemBtn').addEventListener('click', () => newProblem(state.practice.mode));

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => newProblem(btn.dataset.mode));
  });

  /* ------------------------------ modules -------------------------------- */
  function completeModule(id) {
    if (!state.completed[id]) {
      state.completed[id] = true;
      renderProgress();
      scheduleSave();
    }
  }

  function showModule(id) {
    state.lastModule = id;
    document.querySelectorAll('.tab').forEach((tab) => {
      const active = tab.dataset.module === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('.panel').forEach((panel) => {
      const active = panel.id === `panel-${id}`;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
    const stage = id === 'ratio' ? ratioStage : id === 'special' ? specialStage : id === 'reciprocal' ? recipStage : null;
    if (stage) requestAnimationFrame(() => { stage.resize(); });
    scheduleSave();
  }

  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => showModule(tab.dataset.module));
    tab.addEventListener('keydown', (event) => {
      const tabs = Array.from(document.querySelectorAll('.tab'));
      const index = tabs.indexOf(tab);
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        tabs[next].focus();
        showModule(tabs[next].dataset.module);
      }
    });
  });

  /* ------------------------------- i18n wiring --------------------------- */
  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = t(el.dataset.i18n);
      if (value) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = t(el.dataset.i18nPlaceholder);
      if (value) el.placeholder = value;
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const value = t(el.dataset.i18nTitle);
      if (value) el.title = value;
    });
    $('langLabel').textContent = state.lang === 'en' ? 'EN ⇄ TH' : 'TH ⇄ EN';
    $('langToggle').setAttribute('aria-label', state.lang === 'en' ? 'Switch language to Thai' : 'เปลี่ยนภาษาเป็นอังกฤษ');
    renderSpecialTable();
    renderProblemText();
    renderProgress();
    drawRatio();
    drawSpecial();
    drawReciprocal();
  }

  $('langToggle').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'th' : 'en';
    applyI18n();
    saveState();
    toast(state.lang === 'th' ? 'เปลี่ยนภาษาเป็นภาษาไทยแล้ว' : 'Language switched to English');
  });

  /* ------------------------------ export --------------------------------- */
  function buildExport() {
    return {
      app: 'Khan Trig Companion — Unit 1 Right Triangle Studio',
      stateVersion: STATE_VERSION,
      exportedAt: new Date().toISOString(),
      language: state.lang,
      lastModule: state.lastModule,
      masteryPercent: masteryPercent(),
      progress: {
        streak: state.practice.streak,
        bestStreak: state.practice.best,
        totalCorrect: state.practice.correct,
        totalAttempts: state.practice.attempts,
        correctByMode: state.practice.byMode,
        badges: state.practice.badges.map((id) => {
          const badge = BADGES.find((b) => b.id === id);
          return { id, name: badge ? t(badge.key) : id };
        }),
        modulesCompleted: state.completed
      },
      settings: {
        theta: state.ratio.theta,
        scale: state.ratio.scale,
        specialType: state.special.type,
        specialX: state.special.x,
        reciprocalTheta: state.reciprocal.theta
      },
      credits: {
        builtWith: 'OpenCode',
        model: 'DeepSeek V4.1 Flash (opencode-go/deepseek-v4.1-flash)'
      }
    };
  }

  $('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(buildExport(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'khan_trig_unit1_progress.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
    toast(t('exportDone'));
  });

  /* ------------------------------- toast --------------------------------- */
  let toastTimer = null;
  function toast(message) {
    const el = $('toast');
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.hidden = true; }, 3200);
  }

  /* ------------------------------- boot ---------------------------------- */
  function init() {
    // Sanitize anything that came back from localStorage.
    state.ratio.theta = clamp(Number(state.ratio.theta) || 30, 5, 85);
    state.ratio.scale = clamp(Number(state.ratio.scale) || 1, 0.5, 2.5);
    state.special.type = state.special.type === '30' ? '30' : '45';
    state.special.x = clamp(Math.round(Number(state.special.x) || 8), 1, 20);
    state.reciprocal.theta = clamp(Number(state.reciprocal.theta) || 0, 0, 90);
    if (!['ratio', 'side', 'story'].includes(state.practice.mode)) state.practice.mode = 'ratio';

    // Controls from saved state
    angleSlider.value = String(state.ratio.theta);
    scaleSlider.value = String(state.ratio.scale);
    xSlider.value = String(state.special.x);
    recipSlider.value = String(state.reciprocal.theta);
    document.querySelectorAll('input[name="specialType"]').forEach((input) => {
      input.checked = input.value === state.special.type;
    });
    document.querySelectorAll('.mode-btn').forEach((b) => b.classList.toggle('is-active', b.dataset.mode === state.practice.mode));

    syncBadges();
    applyI18n();
    renderRatioReadout();
    renderSpecialTable();
    renderReciprocal();
    renderProgress();
    showModule(state.lastModule);
    newProblem(state.practice.mode);
    saveState();

    // Redraw after fonts settle, so canvas text uses the final metrics.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        drawRatio();
        drawSpecial();
        drawReciprocal();
      }).catch(() => {});
    }
  }

  window.addEventListener('beforeunload', saveState);
  document.addEventListener('visibilitychange', () => { if (document.hidden) saveState(); });

  init();
})();
