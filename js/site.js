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

  /* WhatsApp quick links with a pre-filled message in the current language */
  const waUrl = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  function updateWaLinks() {
    $$("[data-wa]").forEach((a) => (a.href = waUrl(lang === "en" ? a.dataset.waEn : a.dataset.wa)));
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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const required = $$("[required]", form);
    let first = null;
    required.forEach((el) => {
      const bad = !el.value.trim();
      el.closest(".field").classList.toggle("has-error", bad);
      if (bad && !first) first = el;
    });
    if (first) { first.focus(); return; }

    const v = (id) => $("#" + id).value.trim();
    const timeEl = $("input[name=time]:checked", form);
    const time = lang === "en" ? timeEl.dataset.enVal : timeEl.value;
    const vehicle = [v("f-year"), v("f-make"), v("f-model")].filter(Boolean).join(" ");
    const opt = service.selectedOptions[0];
    const svc = lang === "en" && opt.dataset.en ? opt.textContent : service.value;
    let day = v("f-date");
    if (day) day = new Date(day + "T12:00").toLocaleDateString(lang === "en" ? "en-US" : "es-US", { weekday: "long", day: "numeric", month: "long" });
    const L = lang === "en"
      ? { hi: "Hi Tecmeca! I'd like to book a service.", name: "Name", phone: "Phone", vehicle: "Vehicle", service: "Service", details: "Problem", where: "Vehicle location", day: "Preferred day", time: "Time", anyDay: "Flexible" }
      : { hi: "¡Hola Tecmeca! Quiero agendar un servicio.", name: "Nombre", phone: "Teléfono", vehicle: "Vehículo", service: "Servicio", details: "Problema", where: "Ubicación del vehículo", day: "Día preferido", time: "Horario", anyDay: "Flexible" };
    const lines = [
      `• ${L.name}: ${v("f-name")}`,
      `• ${L.phone}: ${v("f-phone")}`,
      `• ${L.vehicle}: ${vehicle}`,
      `• ${L.service}: ${svc}`,
      v("f-details") && `• ${L.details}: ${v("f-details")}`,
      `• ${L.where}: ${v("f-where")}`,
      `• ${L.day}: ${day || L.anyDay}`,
      `• ${L.time}: ${time}`,
    ].filter(Boolean);
    window.open(waUrl([L.hi, "", ...lines].join("\n")), "_blank", "noopener");
    $("#formOk").hidden = false;
  });
})();
