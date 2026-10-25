(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const DGP_WHATSAPP = "12398231738";
  const PROYECTO = 865;
  const PAGO1 = 519; // 60%
  const PAGO2 = 346; // 40%
  const DOMINIO = 25;
  const PLANES = {
    anual: { nombre: "plan anual", precio: 145, label: "Primer año", then: "$145 al año de hosting" },
    mensual: { nombre: "plan mensual", precio: 25, label: "Primer mes", then: "$25 al mes de hosting" },
  };
  const money = (n) => "$" + n.toLocaleString("en-US");
  const SVGNS = "http://www.w3.org/2000/svg";

  /* ---------------- preloader ---------------- */
  const loader = $("#loader");
  const startPage = () => {
    document.body.classList.remove("is-loading");
    document.body.classList.add("is-ready");
    heroGaugeStart();
  };
  (() => {
    const arc = $("#loaderArc"), needle = $("#loaderNeedle"), num = $("#loaderNum"), ticks = $("#loaderTicks");
    const len = arc.getTotalLength();
    arc.style.strokeDasharray = len; arc.style.strokeDashoffset = len;
    for (let i = 0; i <= 10; i++) {
      const a = (-120 + i * 24) * Math.PI / 180;
      const l = document.createElementNS(SVGNS, "line");
      l.setAttribute("x1", 160 + Math.sin(a) * 108); l.setAttribute("y1", 170 - Math.cos(a) * 108);
      l.setAttribute("x2", 160 + Math.sin(a) * 96); l.setAttribute("y2", 170 - Math.cos(a) * 96);
      l.setAttribute("class", "tick"); ticks.appendChild(l);
    }
    let seen = false;
    try { seen = sessionStorage.getItem("tecmeca-intro") === "1"; sessionStorage.setItem("tecmeca-intro", "1"); } catch (e) {}
    if (reduced || seen) { loader.classList.add("is-gone"); setTimeout(startPage, 0); return; }
    const dur = 900, t0 = performance.now();
    const ease = (p) => 1 - Math.pow(1 - p, 3);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = ease(p);
      const wobble = p < 1 ? Math.sin(p * 30) * 4 * (1 - p) : 0;
      arc.style.strokeDashoffset = len * (1 - e);
      needle.style.transform = `rotate(${-120 + 240 * e + wobble}deg)`;
      num.textContent = Math.round(e * 100);
      if (p < 1) requestAnimationFrame(step);
      else {
        setTimeout(() => {
          loader.classList.add("is-out");
          setTimeout(startPage, 280);
          setTimeout(() => loader.classList.add("is-gone"), 1150);
        }, 60);
      }
    };
    requestAnimationFrame(step);
  })();

  /* ---------------- hero gauge ---------------- */
  const G = { cx: 280, cy: 280, r: 230 };
  const pt = (a, r) => [G.cx + r * Math.sin(a * Math.PI / 180), G.cy - r * Math.cos(a * Math.PI / 180)];
  const hvArc = $("#hvArc"), hvNeedle = $("#hvNeedle"), hvRead = $("#hvRead");
  (() => {
    const [sx, sy] = pt(-135, G.r), [ex, ey] = pt(135, G.r);
    hvArc.setAttribute("d", `M${sx} ${sy} A${G.r} ${G.r} 0 1 1 ${ex} ${ey}`);
    const ticks = $("#hvTicks"), nums = $("#hvNums");
    for (let i = 0; i <= 40; i++) {
      const a = -135 + i * 6.75, major = i % 5 === 0;
      const [x1, y1] = pt(a, 214), [x2, y2] = pt(a, major ? 192 : 204);
      const l = document.createElementNS(SVGNS, "line");
      l.setAttribute("x1", x1); l.setAttribute("y1", y1); l.setAttribute("x2", x2); l.setAttribute("y2", y2);
      if (i >= 33) l.setAttribute("class", "r");
      if (major) l.style.strokeWidth = 3;
      ticks.appendChild(l);
      if (major) {
        const [tx, ty] = pt(a, 170);
        const t = document.createElementNS(SVGNS, "text");
        t.setAttribute("x", tx); t.setAttribute("y", ty + 5); t.textContent = i / 5;
        nums.appendChild(t);
      }
    }
  })();
  const arcLen = G.r * Math.PI * 1.5;
  // soft glow underneath the arc and the circuit pulses (a static stroke instead of an animated filter)
  const hvGlow = hvArc.cloneNode(); hvGlow.removeAttribute("id"); hvGlow.classList.add("arc--glow");
  hvArc.before(hvGlow);
  $$(".circuit .pulse").forEach((p) => { const g = p.cloneNode(); g.classList.add("pulse--glow"); p.before(g); });
  [hvArc, hvGlow].forEach((a) => { a.style.strokeDasharray = arcLen; a.style.strokeDashoffset = arcLen; });
  let gaugeVal = 0, needleTip = null, heroVisible = true;
  new IntersectionObserver(([e]) => (heroVisible = e.isIntersecting)).observe($(".hero"));
  function heroGaugeStart() {
    if (reduced) { setGauge(3.2); return; }
    const t0 = performance.now();
    const loop = (t) => {
      if (!heroVisible || document.hidden) { requestAnimationFrame(loop); return; }
      const s = (t - t0) / 1000;
      // intro sweep to redline then settle into a revving idle
      let v;
      if (s < 1.2) v = 8 * Math.sin((s / 1.2) * Math.PI / 2);
      else if (s < 2.4) v = 8 - (s - 1.2) / 1.2 * 5;
      else {
        const k = s - 2.4, cyc = k % 5;
        v = 3 + Math.sin(k * 2.3) * 0.25 + (cyc < 0.7 ? Math.sin(cyc / 0.7 * Math.PI) * 3.6 : 0);
      }
      setGauge(v);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
  function setGauge(v) {
    gaugeVal = v;
    const a = -135 + (v / 8) * 270;
    hvNeedle.style.transform = `rotate(${a}deg)`;
    hvArc.style.strokeDashoffset = hvGlow.style.strokeDashoffset = arcLen * (1 - v / 8);
    hvRead.textContent = v.toFixed(1);
    needleTip = pt(a, 196);
  }

  /* ---------------- hero sparks ---------------- */
  (() => {
    if (reduced) return;
    const cv = $("#sparks"), ctx = cv.getContext("2d"), hero = $(".hero"), gauge = $("#hvGauge");
    let W, H, dpr; const P = [];
    const size = () => { dpr = Math.min(devicePixelRatio || 1, 2); W = cv.width = hero.clientWidth * dpr; H = cv.height = hero.clientHeight * dpr; };
    size(); addEventListener("resize", size);
    const burst = (x, y, n, power = 1) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = (1.5 + Math.random() * 5) * power * dpr;
        P.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2 * dpr, life: 1, decay: 0.015 + Math.random() * 0.025, hue: Math.random() < 0.75 ? 10 : 38 });
      }
    };
    const tipXY = () => {
      if (!needleTip) return null;
      const g = gauge.getBoundingClientRect(), h = hero.getBoundingClientRect();
      return [(g.left - h.left + needleTip[0] / 560 * g.width) * dpr, (g.top - h.top + needleTip[1] / 560 * g.height) * dpr];
    };
    let last = 0, visible = true;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);
    hero.addEventListener("pointerdown", (e) => { const h = hero.getBoundingClientRect(); burst((e.clientX - h.left) * dpr, (e.clientY - h.top) * dpr, 50, 1.2); });
    const draw = (t) => {
      requestAnimationFrame(draw);
      if (!visible) return;
      if (gaugeVal > 5.6 && t - last > 40) { const p = tipXY(); if (p) burst(p[0], p[1], 6, 0.9); last = t; }
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i];
        p.vy += 0.14 * dpr; p.vx *= 0.985; p.x += p.vx; p.y += p.vy; p.life -= p.decay;
        if (p.life <= 0) { P.splice(i, 1); continue; }
        ctx.strokeStyle = `hsla(${p.hue},100%,${55 + p.life * 35}%,${p.life})`;
        ctx.lineWidth = 2 * dpr * p.life;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 2.2, p.y - p.vy * 2.2); ctx.stroke();
      }
    };
    requestAnimationFrame(draw);
  })();

  /* ---------------- hero parallax ---------------- */
  (() => {
    if (reduced || !fine) return;
    const hv = $("#hv"), card = $("#hvCard"), chips = $$(".hv__chip");
    addEventListener("pointermove", (e) => {
      if (scrollY > innerHeight) return;
      const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
      card.style.transform = `rotate(6deg) translate(${dx * -24}px, ${dy * -24}px) rotateY(${dx * 16}deg) rotateX(${-dy * 12}deg)`;
      chips.forEach((c, i) => (c.style.transform = `translate(${dx * (14 + i * 10)}px, ${dy * (14 + i * 10)}px)`));
      hv.style.setProperty("--dx", dx);
    }, { passive: true });
  })();

  /* ---------------- cursor ---------------- */
  (() => {
    if (!fine || reduced) return;
    const dot = $(".cursor"), ring = $(".cursor-ring");
    let x = -100, y = -100, rx = x, ry = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; dot.classList.add("is-on"); ring.classList.add("is-on"); }, { passive: true });
    const loop = () => { rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; dot.style.transform = `translate(${x}px, ${y}px)`; ring.style.transform = `translate(${rx}px, ${ry}px)`; requestAnimationFrame(loop); };
    loop();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, label, .tab, [data-cursor]");
      ring.classList.toggle("is-hover", !!t && !t.matches("[data-cursor]"));
      ring.classList.toggle("is-drag", !!t && t.matches("[data-cursor]"));
      ring.textContent = t && t.dataset.cursor ? t.dataset.cursor : "";
    });
  })();

  /* ---------------- scroll: bar, volt, mbar, nav ---------------- */
  const bar = $("#bar"), volt = $("#volt"), mbar = $("#mbar"), price = $("#inversion");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    volt.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    bar.classList.toggle("is-solid", scrollY > 40);
    const r = price.getBoundingClientRect();
    mbar.classList.toggle("is-visible", scrollY > innerHeight * 0.8 && (r.top > innerHeight || r.bottom < 0));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const navLinks = $$(".bar__nav a");
  const navIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["sitio", "crm", "entrega", "inversion"].forEach((id) => navIO.observe(document.getElementById(id)));

  /* ---------------- split words ---------------- */
  $$(".split").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
            const outer = document.createElement("span"); outer.className = "w";
            const inner = document.createElement("span"); inner.textContent = w; inner.style.setProperty("--i", i++);
            outer.appendChild(inner); frag.appendChild(outer);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  });

  /* ---------------- reveal + counters ---------------- */
  const countUp = (el) => {
    if (el.dataset.done) return; el.dataset.done = 1;
    const to = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduced) { el.textContent = pre + to.toLocaleString("en-US") + suf; return; }
    const t0 = performance.now(), dur = 1600;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = pre + Math.round(to * e).toLocaleString("en-US") + suf; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    $$("[data-count]", e.target).forEach((c) => { if (!c.closest(".screen")) countUp(c); });
    if (e.target.matches("[data-count]")) countUp(e.target);
    io.unobserve(e.target);
  }), { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$(".rv, .rv-x, .rv-s, .split, .value, .stats, .deal__num").forEach((el) => io.observe(el));

  /* ---------------- tilt, spotlight, magnet ---------------- */
  if (fine && !reduced) {
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-4px)`;
        el.style.setProperty("--cx", e.clientX - r.left + "px"); el.style.setProperty("--cy", e.clientY - r.top + "px");
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
    $$("[data-magnet]").forEach((el) => {
      el.addEventListener("pointermove", (e) => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`; });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ---------------- pause looping CSS animations off-screen ---------------- */
  (() => {
    const po = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("is-paused", !e.isIntersecting)), { rootMargin: "200px 0px" });
    $$("main > section, .marquee, .foot").forEach((el) => po.observe(el));
  })();

  /* ---------------- pipeline cycle ---------------- */
  (() => {
    const steps = $$("#pipe .pipe__step"); let i = 0;
    const tick = () => { steps.forEach((s, k) => s.classList.toggle("is-hot", k === i)); i = (i + 1) % steps.length; };
    tick(); setInterval(tick, reduced ? 4000 : 1300);
  })();

  /* ---------------- zoomed mock screens ---------------- */
  const fit = (el) => {
    const base = +el.dataset.base;
    const inner = el.firstElementChild;
    if (base && inner) inner.style.setProperty("--s", (el.clientWidth / base).toFixed(4));
  };
  const ro = new ResizeObserver((es) => es.forEach((e) => fit(e.target)));
  $$("[data-base]").forEach((el) => { fit(el); ro.observe(el); });

  /* ---------------- auto-scroll inside screens ---------------- */
  const autoScrollers = [];
  $$("[data-autoscroll]").forEach((el) => {
    const st = { el, pausedUntil: 0, dir: 1, hold: 0, visible: false, pos: 0 };
    const pause = () => (st.pausedUntil = performance.now() + 7000);
    ["wheel", "touchstart", "pointerdown", "keydown"].forEach((ev) => el.addEventListener(ev, pause, { passive: true }));
    new IntersectionObserver(([e]) => (st.visible = e.isIntersecting), { threshold: 0.4 }).observe(el);
    autoScrollers.push(st);
  });
  if (!reduced) {
    let lt = performance.now();
    const run = (t) => {
      const dt = Math.min(64, t - lt); lt = t;
      autoScrollers.forEach((st) => {
        const el = st.el;
        if (!st.visible || t < st.pausedUntil || document.hidden) { st.pos = el.scrollTop; return; }
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 4) return;
        if (st.hold > 0) { st.hold -= dt; return; }
        const speed = el.clientHeight / 9000; // px per ms
        st.pos += st.dir * speed * dt * (st.dir < 0 ? 4 : 1);
        if (st.pos >= max) { st.pos = max; st.dir = -1; st.hold = 1800; }
        if (st.pos <= 0) { st.pos = 0; st.dir = 1; st.hold = 2200; }
        el.scrollTop = st.pos;
      });
      requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  /* ---------------- showcase tabs ---------------- */
  $$("[data-show]").forEach((show) => {
    const tabs = $$(".tab", show), views = $$(".view", show), screen = $(".screen", show), url = $("[data-url]", show);
    const info = show.dataset.show === "crm" ? $("#crmInfo") : null;
    const st = autoScrollers.find((a) => a.el === screen);
    const activate = (key, first) => {
      tabs.forEach((t) => { const on = t.dataset.view === key; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", on); });
      views.forEach((v) => v.classList.toggle("is-on", v.dataset.view === key));
      const v = views.find((x) => x.dataset.view === key);
      if (url && v) url.textContent = v.dataset.url;
      screen.scrollTop = 0;
      if (st) { st.pos = 0; st.dir = 1; st.hold = 1500; }
      if (info && v) { const src = $(".view__info", v); info.innerHTML = src ? src.innerHTML : ""; if (!first) { info.classList.remove("is-in"); void info.offsetWidth; info.classList.add("is-in"); } }
      if (screen.classList.contains("screen--crm")) {
        screen.classList.remove("is-anim"); void screen.offsetWidth; screen.classList.add("is-anim");
        $$("[data-count]", v).forEach((c) => { delete c.dataset.done; countUp(c); });
      }
    };
    tabs.forEach((t) => t.addEventListener("click", () => activate(t.dataset.view)));
    activate(tabs[0].dataset.view, true);
  });
  // start CRM counters only when the CRM is first seen
  (() => {
    const s = $(".screen--crm");
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      s.classList.remove("is-anim"); void s.offsetWidth; s.classList.add("is-anim");
      $$(".view.is-on [data-count]", s).forEach((c) => { delete c.dataset.done; countUp(c); });
      o.disconnect();
    }, { threshold: 0.3 });
    o.observe(s);
  })();
  // replay WhatsApp conversation whenever it scrolls into view
  (() => {
    const wa = $("#waPhone");
    new IntersectionObserver(([e]) => { if (e.isIntersecting) { wa.classList.remove("is-anim"); void wa.offsetWidth; wa.classList.add("is-anim"); } }, { threshold: 0.4 }).observe(wa);
  })();
  // technician timer
  (() => {
    const el = $("#techTimer"); let s = 1 * 3600 + 24 * 60 + 8;
    setInterval(() => { s++; const h = String(Math.floor(s / 3600)).padStart(2, "0"), m = String(Math.floor(s / 60) % 60).padStart(2, "0"), x = String(s % 60).padStart(2, "0"); el.textContent = `${h}:${m}:${x}`; }, 1000);
  })();

  /* ---------------- timeline road ---------------- */
  (() => {
    const tl = $("#tl"), days = $$(".day", tl);
    const upd = () => {
      const r = tl.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (innerHeight * 0.8 - r.top) / (r.height * 0.9)));
      tl.style.setProperty("--p", (p * 100).toFixed(1) + "%");
      days.forEach((d, i) => d.classList.toggle("is-done", p >= (i + 0.5) / days.length));
    };
    addEventListener("scroll", upd, { passive: true }); addEventListener("resize", upd); upd();
  })();

  /* ---------------- pricing ---------------- */
  const els = {
    domain: $("#domain"), hostName: $("#sumHostName"), host: $("#sumHost"), domainRow: $("#sumDomainRow"),
    pay1: $("#pay1"), pay2: $("#pay2"), pay1note: $("#pay1note"), pay2note: $("#pay2note"),
    total: $("#total"), then: $("#then"), mbarTotal: $("#mbarTotal"),
  };
  const tweens = new Map();
  const tweenTo = (el, to, fmt) => {
    const from = +(el.dataset.v || to);
    el.dataset.v = to;
    if (reduced || from === to) { el.textContent = fmt(to); return; }
    cancelAnimationFrame(tweens.get(el));
    const t0 = performance.now(), dur = 700;
    const step = (t) => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(from + (to - from) * e)); if (p < 1) tweens.set(el, requestAnimationFrame(step)); };
    tweens.set(el, requestAnimationFrame(step));
  };
  const state = () => {
    const plan = PLANES[$("input[name=hosting]:checked").value];
    const dom = els.domain.checked;
    const p1 = PAGO1 + (dom ? DOMINIO : 0);
    const p2 = PAGO2 + plan.precio;
    return { plan, dom, p1, p2, total: p1 + p2 };
  };
  const render = () => {
    const s = state();
    els.hostName.innerHTML = `Hosting · ${s.plan.nombre}<small>${s.plan.label}</small>`;
    els.host.textContent = money(s.plan.precio);
    els.domainRow.hidden = !s.dom;
    els.pay1note.textContent = s.dom ? `Proyecto $519 + dominio $25` : `Proyecto $519`;
    els.pay2note.textContent = `Proyecto $346 + hosting ${money(s.plan.precio)}`;
    tweenTo(els.pay1, s.p1, money);
    tweenTo(els.pay2, s.p2, money);
    tweenTo(els.total, s.total, (n) => n.toLocaleString("en-US"));
    tweenTo(els.mbarTotal, s.total, money);
    els.then.textContent = `Después: ${s.plan.then}${s.dom ? " + $25 al año de dominio" : ""}.`;
  };
  $$("input[name=hosting]").forEach((r) => r.addEventListener("change", render));
  els.domain.addEventListener("change", render);
  render();

  /* ---------------- accept ---------------- */
  const form = $("#acceptForm"), nameIn = $("#name"), agree = $("#agree"), btn = $("#acceptBtn");
  const valid = () => nameIn.value.trim().length > 1 && agree.checked;
  [nameIn, agree].forEach((el) => el.addEventListener("input", () => { btn.disabled = !valid(); $("#nameField").classList.remove("has-error"); }));
  agree.addEventListener("change", () => (btn.disabled = !valid()));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!valid()) { $("#nameField").classList.add("has-error"); return; }
    const s = state();
    const msg = [
      "Hola DGP Global Group 👋",
      `Soy ${nameIn.value.trim()} de Tecmeca Auto Electrical Engineering y acepto la propuesta de Sitio web + Panel CRM.`,
      "",
      `• Proyecto (sitio + CRM): ${money(PROYECTO)}`,
      `• Hosting: ${s.plan.nombre} (${money(s.plan.precio)}${s.plan === PLANES.anual ? "/año" : "/mes"})`,
      `• Dominio .com: ${s.dom ? "Sí ($25)" : "No, ya tenemos dominio"}`,
      "",
      `Pago 1 al aprobar (60%): ${money(s.p1)}`,
      `Pago 2 al entregar (40%): ${money(s.p2)}`,
      `Inversión total: ${money(s.total)}`,
      "",
      "Entrega en máximo 5 días. Quedo atento a la factura del primer pago.",
    ].join("\n");
    window.open(`https://wa.me/${DGP_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    $("#acceptOk").hidden = false;
    confetti();
  });

  /* ---------------- confetti ---------------- */
  function confetti() {
    if (reduced) return;
    const cv = $("#confetti"), ctx = cv.getContext("2d"), dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    const colors = ["#ee3322", "#ffffff", "#ffb347", "#22c55e", "#ff5a3c"];
    const P = Array.from({ length: 220 }, () => ({
      x: innerWidth * dpr * (0.3 + Math.random() * 0.4), y: innerHeight * dpr * 0.7,
      vx: (Math.random() - 0.5) * 22 * dpr, vy: -(10 + Math.random() * 18) * dpr,
      w: (6 + Math.random() * 8) * dpr, h: (8 + Math.random() * 10) * dpr,
      r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, c: colors[(Math.random() * colors.length) | 0],
    }));
    const t0 = performance.now();
    const step = (t) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      P.forEach((p) => { p.vy += 0.45 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.r * 2))); ctx.restore(); });
      if (t - t0 < 4000) requestAnimationFrame(step); else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    requestAnimationFrame(step);
  }
})();
