(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WHATSAPP = "12149307707";
  let lang = "es";

  /* ---------------- language ---------------- */
  const store = (k, v) => { try { v === undefined ? (v = localStorage.getItem(k)) : localStorage.setItem(k, v); } catch (e) { v = null; } return v; };
  $$("[data-en]").forEach((el) => (el.dataset.es = el.innerHTML));
  $$("[data-en-html]").forEach((el) => (el.dataset.esHtml = el.innerHTML));
  $$("[data-en-ph]").forEach((el) => (el.dataset.esPh = el.placeholder));
  const setLang = (l) => {
    lang = l;
    document.documentElement.lang = l;
    $$(".lang button").forEach((b) => b.classList.toggle("is-on", b.dataset.lang === l));
    $$("[data-en]").forEach((el) => (el.innerHTML = l === "en" ? el.dataset.en : el.dataset.es));
    $$("[data-en-html]").forEach((el) => (el.innerHTML = l === "en" ? el.dataset.enHtml : el.dataset.esHtml));
    $$("[data-en-ph]").forEach((el) => (el.placeholder = l === "en" ? el.dataset.enPh : el.dataset.esPh));
    updateWaLinks();
    store("tecmeca-lang", l);
  };
  $$(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* WhatsApp quick links: the pre-filled message is always in Spanish so Jesús reads every request the same way */
  const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  const smsUrl = (text) => `sms:+${WHATSAPP}?&body=${encodeURIComponent(text)}`;
  function updateWaLinks() {
    $$("[data-wa]").forEach((a) => (a.href = waUrl(a.dataset.wa)));
  }
  updateWaLinks();
  if (store("tecmeca-lang") === "en") setLang("en");

  /* ---------------- nav + mobile menu ---------------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 10);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $(".burger"), menu = $("#mmenu");
  const toggleMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
    document.documentElement.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });
  addEventListener("resize", () => { if (innerWidth > 1080) toggleMenu(false); });

  const links = $$(".nav__links a");
  const navIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["servicios", "como-funciona", "por-que", "zona", "preguntas"].forEach((id) => navIO.observe(document.getElementById(id)));

  /* ---------------- reveal on scroll ---------------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  $$(".rv").forEach((el) => io.observe(el));

  /* glow under the circuit pulses (static stroke, cheaper than a filter) */
  $$(".circuit .pulse").forEach((p) => { const g = p.cloneNode(); g.classList.add("pulse--glow"); p.before(g); });

  /* how-it-works: highlight steps in turn while visible */
  (() => {
    const steps = $$("#steps .step"); let i = 0, timer = null;
    const tick = () => { steps.forEach((s, k) => s.classList.toggle("is-hot", k === i)); i = (i + 1) % steps.length; };
    new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) { tick(); timer = setInterval(tick, reduced ? 4000 : 1500); }
    }, { threshold: 0.3 }).observe($("#steps"));
  })();

  /* ---------------- booking form ---------------- */
  const form = $("#bookForm"), service = $("#f-service"), date = $("#f-date");
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  date.min = today.toISOString().slice(0, 10);
  $("#year").textContent = new Date().getFullYear();

  // "Agendar" buttons on service cards preselect the service and jump to the form
  $$("[data-service]").forEach((b) => b.addEventListener("click", () => {
    service.value = b.dataset.service;
    $("#agendar").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    setTimeout(() => $("#f-name").focus({ preventScroll: true }), reduced ? 0 : 700);
  }));

  $$("input, select", form).forEach((el) => el.addEventListener("input", () => el.closest(".field")?.classList.remove("has-error")));

  // English problem descriptions are translated so the request always arrives in Spanish.
  // Free MyMemory API; if it fails or is slow, the original text is sent unchanged.
  const toSpanish = async (text) => {
    if (!text || lang !== "en") return text;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 3500);
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?langpair=en|es&q=${encodeURIComponent(text.slice(0, 480))}`, { signal: ctrl.signal });
      const t = (await r.json())?.responseData?.translatedText;
      return t && !/MYMEMORY WARNING|INVALID/i.test(t) ? `${t} (original: "${text}")` : text;
    } catch (e) {
      return text;
    } finally {
      clearTimeout(timer);
    }
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const required = $$("[required]", form);
    let first = null;
    required.forEach((el) => {
      const bad = !el.value.trim();
      el.closest(".field").classList.toggle("has-error", bad);
      if (bad && !first) first = el;
    });
    if (first) { first.focus(); return; }

    const via = e.submitter?.value === "sms" ? "sms" : "wa";
    // open the WhatsApp tab right away (inside the click) so pop-up blockers allow it, then fill it in
    const win = via === "wa" ? window.open("", "_blank") : null;

    const v = (id) => $("#" + id).value.trim();
    const vehicle = [v("f-year"), v("f-make"), v("f-model")].filter(Boolean).join(" ");
    let day = v("f-date");
    if (day) day = new Date(day + "T12:00").toLocaleDateString("es-US", { weekday: "long", day: "numeric", month: "long" });
    const details = await toSpanish(v("f-details"));
    const lines = [
      `• Nombre: ${v("f-name")}`,
      `• Teléfono: ${v("f-phone")}`,
      `• Vehículo: ${vehicle}`,
      `• Servicio: ${service.value}`,
      details && `• Problema: ${details}`,
      `• Ubicación del vehículo: ${v("f-where")}`,
      `• Día preferido: ${day || "Flexible"}`,
      `• Horario: ${$("input[name=time]:checked", form).value}`,
      lang === "en" && "• Idioma del cliente: inglés",
    ].filter(Boolean);
    const text = ["¡Hola Tecmeca! Quiero agendar un servicio.", "", ...lines].join("\n");

    if (via === "sms") {
      location.href = smsUrl(text);
    } else if (win) {
      win.opener = null;
      win.location.href = waUrl(text);
    } else {
      location.href = waUrl(text);
    }
    $("#formOk").hidden = false;
  });
})();
