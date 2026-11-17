/* Vice City Poster Maker – runs 100% in the browser. No uploads, no server.
   Built by Ahmad El Lahib – https://ahmadellahib.dev/ */
(function () {
  'use strict';

  var LANG = (document.documentElement.lang || 'en').slice(0, 2) === 'ar' ? 'ar' : 'en';

  // ---------- Text data ----------
  var DATA = {
    en: {
      first: ['Midnight', 'Neon', 'Velvet', 'Chrome', 'Golden', 'Sunset', 'Electric', 'Silent', 'Crimson',
        'Diamond', 'Lucky', 'Turbo', 'Cobalt', 'Wild', 'Ice', 'Ocean', 'Pink', 'Smooth'],
      second: ['Viper', 'Shark', 'Ghost', 'Flamingo', 'Falcon', 'Cobra', 'Hustler', 'Phantom', 'Tiger',
        'Jaguar', 'Hurricane', 'Bandit', 'Lynx', 'Storm', 'Raven', 'Prince', 'Shadow', 'Comet'],
      roles: { m: ['Getaway Driver', 'Heist Mastermind', 'Street Racer', 'Nightclub Owner', 'Con Artist', 'Hacker',
        'Smuggler', 'Bodyguard', 'Beach Boss', 'Bounty Hunter', 'Speedboat Captain', 'Car Thief'] },
      cars: ["a pink '86 convertible", 'a matte black muscle car', 'a cyan speedboat', 'a white supercar',
        'a vintage chopper', 'a gold-rimmed lowrider', 'a neon street racer', 'an armored SUV',
        'a purple sports coupe', 'a beach buggy'],
      drives: 'Rides',
      taglines: ['Never misses a sunset.', 'Owns the night, rents the day.', 'Fast cars, faster decisions.',
        'Smiles for the camera, runs from the cops.', 'The city never sleeps. Neither do I.', 'Born under neon lights.',
        'Cash first, questions later.', 'Every street knows my name.', 'Sunglasses on, problems off.',
        'Calmer than the sea, faster than the wind.'],
      stats: ['DRIVING', 'CHARISMA', 'STEALTH', 'LUCK'],
      wanted: 'WANTED LEVEL',
      yourName: 'Your Name',
      photo: 'YOUR PHOTO HERE'
    },
    ar: {
      first: ['ذئب', 'صقر', 'شبح', 'قرش', 'نمر', 'ثعلب', 'فهد', 'أسد', 'ملك', 'سلطان', 'إعصار', 'برق', 'نجم', 'ظلّ'],
      second: ['الليل', 'النيون', 'الغروب', 'المدينة', 'الشاطئ', 'الشوارع', 'السرعة', 'الميناء', 'الساحل',
        'منتصف الليل', 'الكورنيش', 'الذهب'],
      roles: {
        m: ['سائق الهروب', 'العقل المدبّر', 'متسابق شوارع', 'صاحب نادٍ ليلي', 'المحتال الأنيق', 'الهاكر', 'المهرّب',
          'الحارس الشخصي', 'زعيم الشاطئ', 'صائد الجوائز', 'قبطان القارب السريع', 'لصّ السيارات'],
        f: ['سائقة الهروب', 'العقل المدبّر', 'متسابقة شوارع', 'صاحبة نادٍ ليلي', 'المحتالة الأنيقة', 'الهاكر', 'المهرّبة',
          'الحارسة الشخصية', 'زعيمة الشاطئ', 'صائدة الجوائز', 'قبطانة القارب السريع', 'لصّة السيارات']
      },
      cars: ['كابريو وردي موديل 86', 'سيارة عضلية سوداء مطفية', 'قارب سريع سماوي', 'سيارة خارقة بيضاء',
        'دراجة نارية كلاسيكية', 'لورايدر بجنوط ذهبية', 'سيارة سباق نيون', 'جيب مصفّح', 'كوبيه رياضية بنفسجية',
        'سيارة شاطئ'],
      drives: 'تقود: ',
      taglines: ['لا أفوّت غروب الشمس أبداً.', 'أملك الليل وأستأجر النهار.', 'سيارات سريعة وقرارات أسرع.',
        'أبتسم للكاميرا وأهرب من الشرطة.', 'المدينة لا تنام… وأنا كذلك.', 'وُلدتُ تحت أضواء النيون.',
        'الكاش أولاً والأسئلة لاحقاً.', 'كل شارع يعرف اسمي.', 'نظارة شمسية وصفر مشاكل.',
        'أهدأ من البحر وأسرع من الريح.'],
      stats: ['القيادة', 'الكاريزما', 'التخفّي', 'الحظ'],
      wanted: 'مستوى المطاردة',
      yourName: 'اسمك',
      photo: 'صورتك هنا'
    }
  };

  // ---------- Themes (original palettes) ----------
  var THEMES = {
    sunset: { sky: ['#1d0b3f', '#5a1670', '#c2266f', '#ff5f6d', '#ffb36b'], sun: ['#fff07a', '#ff3d8b'],
      neon: '#ff3df0', accent: '#2ee8ff', grid: '#ff4fd8', city: '#240936', palm: '#14051f',
      grade: ['#ff2e88', '#ffb347'], photoFilter: 'contrast(1.12) saturate(1.35) brightness(1.04)' },
    night: { sky: ['#03010b', '#130433', '#2d0b63', '#0a3f78', '#1b8fb8'], sun: ['#7cf6ff', '#8a2be2'],
      neon: '#2ee8ff', accent: '#ff3df0', grid: '#2ee8ff', city: '#07021a', palm: '#020008',
      grade: ['#3a1cff', '#00e5ff'], photoFilter: 'contrast(1.15) saturate(1.25) brightness(0.98)' },
    beach: { sky: ['#0d2c6b', '#1b8fc9', '#71e3dc', '#ffd6dd', '#ff92b5'], sun: ['#fff7c2', '#ff8fb1'],
      neon: '#ff4fa3', accent: '#00e0d0', grid: '#ffffff', city: '#173a6b', palm: '#0b1f3d',
      grade: ['#00c8d6', '#ff8fb1'], photoFilter: 'contrast(1.08) saturate(1.3) brightness(1.06)' },
    noir: { sky: ['#050505', '#160606', '#3d0b0d', '#8f1518', '#e0472f'], sun: ['#ffd36b', '#e0302a'],
      neon: '#ff3b3b', accent: '#ffd166', grid: '#ff3b3b', city: '#0c0303', palm: '#050101',
      grade: ['#ff2a2a', '#200000'], photoFilter: 'grayscale(0.85) contrast(1.3) brightness(0.95)' }
  };

  var FORMATS = {
    post: { w: 1080, h: 1350, panel: [200, 80, 680, 620], horizon: 790, name: 800, nick: 932, role: 992,
      stars: 1068, stats: 1140, tag: 1232, credit: 1312 },
    story: { w: 1080, h: 1920, panel: [150, 170, 780, 880], horizon: 1120, name: 1150, nick: 1300, role: 1380,
      stars: 1480, stats: 1580, tag: 1700, credit: 1850 }
  };

  // ---------- Seeded random ----------
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }

  function identity(name, seed, lang, gender) {
    var d = DATA[lang];
    var r = rng(hash((name || '').trim().toLowerCase() + '|' + seed + '|' + lang));
    var roles = d.roles[gender] || d.roles.m;
    var nick = lang === 'ar' ? pick(r, d.first) + ' ' + pick(r, d.second) : pick(r, d.first) + ' ' + pick(r, d.second);
    var roleIdx = Math.floor(r() * roles.length);
    return {
      nick: nick,
      roleIdx: roleIdx,
      role: roles[roleIdx],
      car: pick(r, d.cars),
      tagline: pick(r, d.taglines),
      wanted: 2 + Math.floor(r() * 4),
      stats: [0, 1, 2, 3].map(function () { return 55 + Math.floor(r() * 45); })
    };
  }

  // ---------- Drawing helpers ----------
  function lingrad(ctx, x0, y0, x1, y1, colors) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    colors.forEach(function (c, i) { g.addColorStop(i / (colors.length - 1), c); });
    return g;
  }

  function fitFont(ctx, text, family, max, min, maxWidth, weight) {
    var size = max;
    do {
      ctx.font = (weight ? weight + ' ' : '') + size + 'px ' + family;
      if (ctx.measureText(text).width <= maxWidth) break;
      size -= 2;
    } while (size > min);
    return size;
  }

  function star(ctx, cx, cy, r) {
    ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var rad = i % 2 === 0 ? r : r * 0.45;
      var a = -Math.PI / 2 + i * Math.PI / 5;
      ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
    }
    ctx.closePath();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function palm(ctx, baseX, baseY, height, lean, color, flip) {
    ctx.save();
    ctx.translate(baseX, baseY);
    if (flip) ctx.scale(-1, 1);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    // trunk
    var topX = lean, topY = -height;
    ctx.lineCap = 'round';
    for (var i = 0; i < 18; i++) {
      var t0 = i / 18, t1 = (i + 1) / 18;
      var x0 = lean * t0 * t0, y0 = -height * t0, x1 = lean * t1 * t1, y1 = -height * t1;
      ctx.lineWidth = 34 - 20 * t0;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }
    // fronds
    var fronds = [[-2.7, 1.0], [-2.2, 1.15], [-1.6, 1.1], [-1.0, 1.0], [-0.45, 0.95], [-3.2, 0.8], [0.15, 0.75]];
    fronds.forEach(function (f) {
      var ang = f[0], len = height * 0.42 * f[1];
      var ex = topX + Math.cos(ang) * len, ey = topY + Math.sin(ang) * len + len * 0.35;
      var cx = topX + Math.cos(ang) * len * 0.5, cy = topY + Math.sin(ang) * len * 0.5 - len * 0.25;
      ctx.beginPath();
      ctx.moveTo(topX, topY);
      ctx.quadraticCurveTo(cx, cy - 14, ex, ey);
      ctx.quadraticCurveTo(cx, cy + 14, topX, topY + 6);
      ctx.fill();
    });
    ctx.beginPath(); ctx.arc(topX, topY + 4, 14, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawScene(ctx, W, H, th, horizon, seedR) {
    // sky
    ctx.fillStyle = lingrad(ctx, 0, 0, 0, horizon, th.sky);
    ctx.fillRect(0, 0, W, horizon);

    // stars in upper sky
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    for (var s = 0; s < 70; s++) {
      var sx = seedR() * W, sy = seedR() * horizon * 0.45, sr = seedR() * 1.8 + 0.4;
      ctx.globalAlpha = 0.25 + seedR() * 0.6;
      ctx.beginPath(); ctx.arc(sx, sy, sr, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // striped sun
    var sunR = W * 0.3, sunX = W * 0.72, sunY = horizon - sunR * 0.55;
    var off = document.createElement('canvas');
    off.width = sunR * 2 + 4; off.height = sunR * 2 + 4;
    var o = off.getContext('2d');
    o.fillStyle = lingrad(o, 0, 0, 0, sunR * 2, th.sun);
    o.beginPath(); o.arc(sunR + 2, sunR + 2, sunR, 0, Math.PI * 2); o.fill();
    o.globalCompositeOperation = 'destination-out';
    for (var k = 0; k < 7; k++) {
      var gy = sunR * 1.05 + k * k * 4.2 + k * 20;
      o.fillRect(0, gy, off.width, 4 + k * 2.6);
    }
    ctx.save();
    ctx.shadowColor = th.sun[1];
    ctx.shadowBlur = 90;
    ctx.drawImage(off, sunX - sunR - 2, sunY - sunR - 2);
    ctx.restore();

    // skyline
    ctx.fillStyle = th.city;
    var x = -10;
    var windows = [];
    while (x < W + 10) {
      var bw = 40 + seedR() * 70, bh = 60 + seedR() * 210;
      if (seedR() < 0.12) bh += 140;
      ctx.fillRect(x, horizon - bh, bw, bh + 2);
      for (var wy = horizon - bh + 14; wy < horizon - 12; wy += 18) {
        for (var wx = x + 8; wx < x + bw - 8; wx += 14) {
          if (seedR() < 0.18) windows.push([wx, wy]);
        }
      }
      x += bw + seedR() * 8;
    }
    ctx.fillStyle = th.accent;
    ctx.globalAlpha = 0.55;
    windows.forEach(function (p) { ctx.fillRect(p[0], p[1], 5, 7); });
    ctx.globalAlpha = 1;

    // floor
    ctx.fillStyle = lingrad(ctx, 0, horizon, 0, H, ['#12021f', '#050008']);
    ctx.fillRect(0, horizon, W, H - horizon);
    // perspective grid
    ctx.save();
    ctx.strokeStyle = th.grid;
    ctx.shadowColor = th.grid;
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.55;
    var vx = W / 2;
    for (var i = -14; i <= 14; i++) {
      ctx.beginPath(); ctx.moveTo(vx + i * 14, horizon); ctx.lineTo(vx + i * 150, H + 40); ctx.stroke();
    }
    for (var j = 1; j < 14; j++) {
      var yy = horizon + Math.pow(j / 13, 2.1) * (H - horizon + 30);
      ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke();
    }
    ctx.restore();
    // horizon glow line
    ctx.fillStyle = th.neon;
    ctx.shadowColor = th.neon; ctx.shadowBlur = 24;
    ctx.fillRect(0, horizon - 2, W, 3);
    ctx.shadowBlur = 0;

    // palms
    palm(ctx, W * 0.07, horizon + 40, horizon * 0.72, 70, th.palm, false);
    palm(ctx, W * 0.17, horizon + 50, horizon * 0.48, 40, th.palm, false);
    palm(ctx, W * 0.95, horizon + 40, horizon * 0.66, 60, th.palm, true);
  }

  function drawSilhouette(o, w, h, th) {
    o.fillStyle = lingrad(o, 0, 0, w, h, [th.sky[1], th.sky[3]]);
    o.fillRect(0, 0, w, h);
    var cx = w / 2;
    o.fillStyle = 'rgba(10,0,20,0.85)';
    // shoulders
    o.beginPath();
    o.moveTo(cx - w * 0.42, h);
    o.quadraticCurveTo(cx - w * 0.4, h * 0.66, cx - w * 0.12, h * 0.62);
    o.lineTo(cx + w * 0.12, h * 0.62);
    o.quadraticCurveTo(cx + w * 0.4, h * 0.66, cx + w * 0.42, h);
    o.fill();
    // neck + head
    o.fillRect(cx - w * 0.06, h * 0.5, w * 0.12, h * 0.14);
    o.beginPath(); o.ellipse(cx, h * 0.38, w * 0.15, h * 0.19, 0, 0, Math.PI * 2); o.fill();
    // sunglasses
    o.fillStyle = '#000';
    roundRect(o, cx - w * 0.135, h * 0.345, w * 0.12, h * 0.055, 10); o.fill();
    roundRect(o, cx + w * 0.015, h * 0.345, w * 0.12, h * 0.055, 10); o.fill();
    o.fillRect(cx - w * 0.02, h * 0.355, w * 0.04, h * 0.012);
    o.fillStyle = th.accent; o.globalAlpha = 0.8;
    o.fillRect(cx - w * 0.11, h * 0.355, w * 0.05, 5);
    o.fillRect(cx + w * 0.04, h * 0.355, w * 0.05, 5);
    o.globalAlpha = 1;
  }

  function drawPanel(ctx, F, th, state) {
    var p = F.panel, pw = p[2], ph = p[3];
    var off = document.createElement('canvas');
    off.width = pw; off.height = ph;
    var o = off.getContext('2d');
    if (state.img) {
      var iw = state.img.width, ih = state.img.height;
      var scale = Math.max(pw / iw, ph / ih) * (state.zoom || 1);
      var dw = iw * scale, dh = ih * scale;
      var dx = (pw - dw) / 2 + (state.ox || 0), dy = (ph - dh) / 2 + (state.oy || 0);
      o.filter = th.photoFilter;
      o.drawImage(state.img, dx, dy, dw, dh);
      o.filter = 'none';
      // color grade
      o.globalCompositeOperation = 'soft-light';
      o.globalAlpha = 0.6;
      o.fillStyle = lingrad(o, 0, 0, pw, ph, th.grade);
      o.fillRect(0, 0, pw, ph);
      o.globalAlpha = 0.25;
      o.globalCompositeOperation = 'screen';
      var leak = o.createRadialGradient(pw * 0.9, ph * 0.1, 10, pw * 0.9, ph * 0.1, pw * 0.7);
      leak.addColorStop(0, th.neon); leak.addColorStop(1, 'rgba(0,0,0,0)');
      o.fillStyle = leak; o.fillRect(0, 0, pw, ph);
      o.globalAlpha = 1;
      o.globalCompositeOperation = 'source-over';
    } else {
      drawSilhouette(o, pw, ph, th);
      if (state.placeholderText) {
        o.fillStyle = 'rgba(255,255,255,0.8)';
        o.font = '700 34px ' + (LANG === 'ar' ? 'Cairo' : 'Outfit');
        o.textAlign = 'center';
        o.fillText(state.placeholderText, pw / 2, ph * 0.9);
      }
    }
    // vignette
    var v = o.createRadialGradient(pw / 2, ph / 2, Math.min(pw, ph) * 0.35, pw / 2, ph / 2, Math.max(pw, ph) * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)');
    o.fillStyle = v; o.fillRect(0, 0, pw, ph);
    // scanlines
    o.fillStyle = 'rgba(0,0,0,0.07)';
    for (var y = 0; y < ph; y += 4) o.fillRect(0, y, pw, 1);

    ctx.save();
    ctx.translate(p[0] + pw / 2, p[1] + ph / 2);
    ctx.rotate(-2.2 * Math.PI / 180);
    // drop shadow card
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    ctx.fillStyle = '#0a0010';
    roundRect(ctx, -pw / 2 - 12, -ph / 2 - 12, pw + 24, ph + 24, 26); ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.shadowOffsetY = 0;
    ctx.save();
    roundRect(ctx, -pw / 2, -ph / 2, pw, ph, 18); ctx.clip();
    ctx.drawImage(off, -pw / 2, -ph / 2);
    ctx.restore();
    // neon border
    ctx.lineWidth = 6;
    ctx.strokeStyle = th.neon; ctx.shadowColor = th.neon; ctx.shadowBlur = 30;
    roundRect(ctx, -pw / 2 - 4, -ph / 2 - 4, pw + 8, ph + 8, 22); ctx.stroke();
    ctx.lineWidth = 2; ctx.strokeStyle = '#fff'; ctx.shadowBlur = 8;
    roundRect(ctx, -pw / 2 - 4, -ph / 2 - 4, pw + 8, ph + 8, 22); ctx.stroke();
    ctx.restore();
  }

  function glowText(ctx, text, x, y, fill, glow, blur) {
    ctx.save();
    ctx.shadowColor = glow; ctx.shadowBlur = blur;
    ctx.fillStyle = fill;
    ctx.fillText(text, x, y);
    ctx.shadowBlur = blur / 3;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawPoster(canvas, state) {
    var lang = state.lang || LANG;
    var d = DATA[lang];
    var F = FORMATS[state.format] || FORMATS.post;
    var th = THEMES[state.theme] || THEMES.sunset;
    var W = F.w, H = F.h;
    if (canvas.width !== W) canvas.width = W;
    if (canvas.height !== H) canvas.height = H;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);
    ctx.direction = lang === 'ar' ? 'rtl' : 'ltr';

    drawScene(ctx, W, H, th, F.horizon, rng(hash(state.theme + state.format)));
    drawPanel(ctx, F, th, state);

    // legibility shade under the text
    ctx.fillStyle = lingrad(ctx, 0, F.horizon - 60, 0, H, ['rgba(5,0,12,0)', 'rgba(5,0,12,0.72)', 'rgba(5,0,12,0.92)']);
    ctx.fillRect(0, F.horizon - 60, W, H - F.horizon + 60);

    var id = state.identity;
    var cx = W / 2;
    var display = lang === 'ar' ? 'Lalezar' : 'Anton';
    var script = lang === 'ar' ? 'Lalezar' : 'Pacifico';
    var body = lang === 'ar' ? 'Cairo' : 'Outfit';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // name
    var name = (state.name || '').trim() || d.yourName;
    fitFont(ctx, name, script, lang === 'ar' ? 78 : 70, 34, W - 200);
    glowText(ctx, name, cx, F.name, '#ffffff', th.neon, 28);

    // nickname
    var nick = lang === 'ar' ? '«' + id.nick + '»' : '"' + id.nick.toUpperCase() + '"';
    var ns = fitFont(ctx, nick, display, lang === 'ar' ? 132 : 128, 50, W - 110);
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#120018';
    ctx.strokeText(nick, cx, F.nick);
    ctx.shadowColor = th.neon; ctx.shadowBlur = 35;
    ctx.fillStyle = lingrad(ctx, 0, F.nick - ns * 0.85, 0, F.nick, ['#fff6a8', th.sun[1], th.neon]);
    ctx.fillText(nick, cx, F.nick);
    ctx.restore();

    // role + car
    var roleLine = lang === 'ar'
      ? id.role + '  •  ' + d.drives + id.car
      : (id.role + '  •  ' + d.drives + ' ' + id.car).toUpperCase();
    fitFont(ctx, roleLine, body, lang === 'ar' ? 34 : 30, 18, W - 120, 700);
    glowText(ctx, roleLine, cx, F.role, th.accent, th.accent, 14);

    // wanted stars
    ctx.font = '700 22px ' + body;
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText(d.wanted, cx, F.stars - 34);
    for (var i = 0; i < 5; i++) {
      var sx = cx + (i - 2) * 62 * (lang === 'ar' ? -1 : 1);
      star(ctx, sx, F.stars, 24);
      ctx.save();
      if (i < id.wanted) {
        ctx.fillStyle = '#ffffff'; ctx.shadowColor = th.accent; ctx.shadowBlur = 18; ctx.fill();
      } else {
        ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.stroke();
      }
      ctx.restore();
    }

    // stats
    var colW = 230, startX = cx - colW * 1.5;
    for (var k = 0; k < 4; k++) {
      var colX = startX + (lang === 'ar' ? (3 - k) : k) * colW;
      ctx.font = '700 20px ' + body;
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      var lbl = d.stats[k], val = id.stats[k] + '%';
      var lw = ctx.measureText(lbl).width, vw = ctx.measureText(val).width, gap = 10;
      var x0 = colX - (lw + vw + gap) / 2;
      ctx.save();
      ctx.textAlign = 'left';
      ctx.direction = 'ltr';
      if (lang === 'ar') {
        ctx.fillText(val, x0, F.stats);
        ctx.direction = 'rtl'; ctx.textAlign = 'right';
        ctx.fillText(lbl, x0 + vw + gap + lw, F.stats);
      } else {
        ctx.fillText(lbl, x0, F.stats);
        ctx.fillText(val, x0 + lw + gap, F.stats);
      }
      ctx.restore();
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      roundRect(ctx, colX - 90, F.stats + 14, 180, 10, 5); ctx.fill();
      ctx.save();
      ctx.fillStyle = lingrad(ctx, colX - 90, 0, colX + 90, 0, [th.neon, th.accent]);
      ctx.shadowColor = th.neon; ctx.shadowBlur = 10;
      var bw = 180 * id.stats[k] / 100;
      if (lang === 'ar') roundRect(ctx, colX + 90 - bw, F.stats + 14, bw, 10, 5);
      else roundRect(ctx, colX - 90, F.stats + 14, bw, 10, 5);
      ctx.fill();
      ctx.restore();
    }

    // tagline
    fitFont(ctx, id.tagline, body, lang === 'ar' ? 36 : 34, 18, W - 160, lang === 'ar' ? 700 : 'italic 600');
    ctx.fillStyle = '#ffffff';
    ctx.fillText(id.tagline, cx, F.tag);

    // credit
    ctx.direction = 'ltr';
    ctx.font = '600 22px Outfit';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('AEL Poster Studio · ahmadellahib.dev', cx, F.credit);
  }

  var fontsReady = (document.fonts && document.fonts.load)
    ? Promise.all(['Anton', 'Pacifico', 'Lalezar', 'Outfit', 'Cairo'].map(function (f) {
        return document.fonts.load('700 40px "' + f + '"', f === 'Lalezar' || f === 'Cairo' ? 'عربي' : 'Aa').catch(function () {});
      })).then(function () { return document.fonts.ready; })
    : Promise.resolve();

  window.VCP = { drawPoster: drawPoster, identity: identity, fontsReady: fontsReady, LANG: LANG };

  // ---------- Page UI ----------
  function $(id) { return document.getElementById(id); }

  function initExamples() {
    var ex = document.querySelectorAll('canvas[data-example]');
    ex.forEach(function (c) {
      var parts = c.getAttribute('data-example').split('|');
      drawPoster(c, {
        lang: LANG, theme: parts[1], format: 'post', name: parts[0],
        identity: identity(parts[0], 7, LANG, parts[2] || 'm')
      });
    });
  }

  function initTool() {
    var canvas = $('poster');
    if (!canvas) return;
    var state = {
      lang: LANG, theme: 'sunset', format: 'post', name: '', seed: 1, gender: 'm',
      img: null, zoom: 1, ox: 0, oy: 0, placeholderText: DATA[LANG].photo
    };
    var T = window.VCP_TEXT || {};
    var raf = 0;
    function render() {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = 0;
        state.identity = identity(state.name || DATA[LANG].yourName, state.seed, LANG, state.gender);
        drawPoster(canvas, state);
      });
    }

    function toast(msg) {
      var t = $('toast');
      t.textContent = msg;
      t.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
    }

    // photo upload
    var fileInput = $('file'), drop = $('drop');
    function loadFile(file) {
      if (!file) return;
      var okType = /^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) || /\.(jpe?g|png|webp|heic)$/i.test(file.name);
      if (!okType) { toast(T.badType || 'Please choose a JPG, PNG or WebP photo.'); return; }
      if (file.size > 25 * 1024 * 1024) { toast(T.tooBig || 'That photo is over 25 MB.'); return; }
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        // downscale big photos to keep things fast
        var max = 1800, s = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url);
        state.img = c; state.zoom = 1; state.ox = 0; state.oy = 0;
        $('zoom').value = 1;
        document.body.classList.add('has-photo');
        render();
      };
      img.onerror = function () { URL.revokeObjectURL(url); toast(T.badType || 'Could not read that photo.'); };
      img.src = url;
    }
    fileInput.addEventListener('change', function () { loadFile(fileInput.files[0]); fileInput.value = ''; });
    ['dragenter', 'dragover'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('over'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('over'); });
    });
    drop.addEventListener('drop', function (e) { loadFile(e.dataTransfer.files[0]); });
    $('removePhoto').addEventListener('click', function () {
      state.img = null; document.body.classList.remove('has-photo'); render();
    });

    // zoom + drag
    $('zoom').addEventListener('input', function (e) { state.zoom = parseFloat(e.target.value); render(); });
    var drag = null;
    canvas.addEventListener('pointerdown', function (e) {
      if (!state.img) { fileInput.click(); return; }
      drag = { x: e.clientX, y: e.clientY, ox: state.ox, oy: state.oy };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var k = canvas.width / canvas.getBoundingClientRect().width;
      state.ox = drag.ox + (e.clientX - drag.x) * k;
      state.oy = drag.oy + (e.clientY - drag.y) * k;
      render();
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      canvas.addEventListener(ev, function () { drag = null; });
    });
    canvas.addEventListener('wheel', function (e) {
      if (!state.img) return;
      e.preventDefault();
      state.zoom = Math.min(3, Math.max(1, state.zoom - e.deltaY * 0.0015));
      $('zoom').value = state.zoom;
      render();
    }, { passive: false });

    // name, reroll, gender
    $('name').addEventListener('input', function (e) { state.name = e.target.value.slice(0, 24); state.seed = 1; render(); });
    $('reroll').addEventListener('click', function () { state.seed++; render(); });
    document.querySelectorAll('[name="gender"]').forEach(function (r) {
      r.addEventListener('change', function () { state.gender = r.value; render(); });
    });

    // theme + format
    function bindChoice(sel, key) {
      document.querySelectorAll(sel).forEach(function (b) {
        b.addEventListener('click', function () {
          document.querySelectorAll(sel).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          state[key] = b.getAttribute('data-value');
          render();
        });
      });
    }
    bindChoice('[data-theme-btn]', 'theme');
    bindChoice('[data-format-btn]', 'format');

    // export
    var pageUrl = location.origin + location.pathname;
    function fileName() {
      var n = (state.name || 'poster').replace(/[^\w؀-ۿ-]+/g, '-').slice(0, 30);
      return 'vice-city-poster-' + n + '.jpg';
    }
    function toBlob() {
      return new Promise(function (res) { canvas.toBlob(res, 'image/jpeg', 0.92); });
    }
    function download(blob) {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName();
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    }
    $('download').addEventListener('click', function () {
      toBlob().then(function (b) { download(b); toast(T.saved || 'Poster saved!'); });
    });
    $('share').addEventListener('click', function () {
      toBlob().then(function (blob) {
        var file = new File([blob], fileName(), { type: 'image/jpeg' });
        var data = { files: [file], title: document.title, text: (T.shareText || '') + ' ' + pageUrl };
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share(data).catch(function () {});
        } else {
          download(blob);
          toast(T.shareFallback || 'Saved. Now post it anywhere!');
        }
      });
    });
    var shareText = encodeURIComponent((T.shareText || '') + ' ' + pageUrl);
    $('wa').href = 'https://wa.me/?text=' + shareText;
    $('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl);
    $('x').href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(T.shareText || '') + '&url=' + encodeURIComponent(pageUrl);
    $('copy').addEventListener('click', function () {
      var done = function () { toast(T.copied || 'Link copied!'); };
      if (navigator.clipboard) navigator.clipboard.writeText(pageUrl).then(done, done);
      else { var i = document.createElement('input'); i.value = pageUrl; document.body.appendChild(i); i.select(); document.execCommand('copy'); i.remove(); done(); }
    });

    render();
  }

  fontsReady.then(function () { initExamples(); initTool(); });
})();
