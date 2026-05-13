const treatmentLinks = [
  ["Invisalign Full", "invisalign.html", "Comprehensive clear-aligner planning for bite, crowding, and refinements."],
  ["Smile Assessment", "smile-assessment.html", "A fast eligibility quiz that moves curious visitors into a lead form."],
  ["Virtual Consultation", "virtual-consultation.html", "Photo upload and remote screening for patients who are not ready to visit."],
  ["Before & After", "before-after.html", "Case proof for crowding, spacing, relapse, and teen smiles."]
];

const patientLinks = [
  ["About the Studio", "about.html"],
  ["Google Reviews", "testimonials.html"],
  ["FAQ", "faq.html"],
  ["Patient Articles", "blog.html"],
  ["Locations", "locations.html"]
];

const financeLinks = [
  ["Pricing", "pricing.html"],
  ["Financing", "financing.html"],
  ["Current Offers", "offers.html"],
  ["Book Consultation", "book-consultation.html"]
];

function renderMobileDropdown(label, links, open = false) {
  const id = `mobile-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const items = links.map(([itemLabel, href, copy]) => `
    <a class="mobile-mega-link" href="${href}">
      <span>${itemLabel}</span>
      ${copy ? `<small>${copy}</small>` : ""}
    </a>`).join("");
  return `
    <div class="mobile-mega-group" data-mobile-dropdown>
      <button class="mobile-mega-toggle" type="button" aria-expanded="${open}" aria-controls="${id}" data-mobile-dropdown-toggle>
        <span>${label}</span>
        <span aria-hidden="true">+</span>
      </button>
      <div class="mobile-mega-panel ${open ? "" : "hidden"}" id="${id}" data-mobile-dropdown-panel>
        ${items}
      </div>
    </div>`;
}

function currentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function renderHeader() {
  const mount = document.querySelector("#site-header");
  if (!mount) return;
  const active = currentPage();
  const treatmentMega = treatmentLinks.map(([label, href, copy]) => `
    <a class="mega-link" href="${href}" ${active === href ? 'aria-current="page"' : ""}>
      <span>${label}</span>
      <small>${copy}</small>
    </a>`).join("");
  const patientMenu = patientLinks.map(([label, href]) => `<a class="dropdown-link" href="${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`).join("");
  const financeMenu = financeLinks.map(([label, href]) => `<a class="dropdown-link" href="${href}" ${active === href ? 'aria-current="page"' : ""}>${label}</a>`).join("");
  const mobileMega = [
    `<a class="mobile-mega-home" href="index.html">Home</a>`,
    renderMobileDropdown("Treatments", treatmentLinks, true),
    renderMobileDropdown("Fees and offers", financeLinks),
    renderMobileDropdown("Patient hub", patientLinks),
    `<a class="mobile-mega-home" href="contact.html">Contact</a>`
  ].join("");

  mount.innerHTML = `
    <header class="fixed left-0 right-0 top-0 z-50 border-b border-white/60 bg-white/86 backdrop-blur-xl">
      <div class="wide-shell flex h-20 items-center justify-between gap-4">
        <a href="index.html" class="flex items-center gap-3" aria-label="Aura Align home">
          <span class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#155f9c] to-[#0f9f9a] text-lg font-black text-white">AA</span>
          <span>
            <span class="block text-lg font-black leading-5 text-slate-900">Aura Align</span>
            <span class="block text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Invisalign Studio</span>
          </span>
        </a>
        <nav class="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          <a class="nav-link" href="index.html" ${active === "index.html" ? 'aria-current="page"' : ""}>Home</a>
          <div class="group relative -my-3 py-3">
            <button class="nav-link inline-flex items-center gap-1" type="button" aria-haspopup="true">Treatments <span aria-hidden="true">+</span></button>
            <div class="dropdown-panel mega-panel absolute left-1/2 top-8 w-[720px] -translate-x-1/2 rounded-3xl border border-slate-100 bg-white p-4 shadow-2xl">
              <div class="grid gap-3 md:grid-cols-2">
                ${treatmentMega}
              </div>
              <div class="mt-4 grid gap-3 rounded-2xl bg-[#f5fafc] p-4 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p class="text-sm font-black text-slate-900">Not sure where to start?</p>
                  <p class="text-xs font-semibold text-slate-600">Use the assessment or book a scan and leave with a clear plan.</p>
                </div>
                <a class="btn btn-primary" href="smile-assessment.html">Start assessment</a>
              </div>
            </div>
          </div>
          <div class="group relative -my-3 py-3">
            <button class="nav-link inline-flex items-center gap-1" type="button" aria-haspopup="true">Fees <span aria-hidden="true">+</span></button>
            <div class="dropdown-panel absolute left-0 top-8 w-60 rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl">
              ${financeMenu}
            </div>
          </div>
          <a class="nav-link" href="before-after.html" ${active === "before-after.html" ? 'aria-current="page"' : ""}>Results</a>
          <div class="group relative -my-3 py-3">
            <button class="nav-link inline-flex items-center gap-1" type="button" aria-haspopup="true">Patient Hub <span aria-hidden="true">+</span></button>
            <div class="dropdown-panel absolute right-0 top-8 w-64 rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl">
              ${patientMenu}
            </div>
          </div>
        </nav>
        <div class="hidden items-center gap-3 md:flex">
          <a class="btn btn-secondary" href="tel:+15550190111">Call</a>
          <a class="btn btn-secondary" href="https://wa.me/15550190111">WhatsApp</a>
          <a class="btn btn-primary" href="book-consultation.html">Book</a>
        </div>
        <button class="icon-btn lg:hidden" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
          <span class="text-2xl leading-none" aria-hidden="true">&#9776;</span>
        </button>
      </div>
      <div id="mobile-menu" class="hidden border-t border-slate-100 bg-white lg:hidden">
        <nav class="site-shell mobile-mega-nav py-4" aria-label="Mobile navigation">
          <div class="grid grid-cols-2 gap-2">
            <a class="btn btn-primary w-full" href="book-consultation.html">Book</a>
            <a class="btn btn-secondary w-full" href="tel:+15550190111">Call</a>
          </div>
          ${mobileMega}
          <div class="grid grid-cols-2 gap-2 pt-2">
            <a class="btn btn-secondary w-full" href="https://wa.me/15550190111">WhatsApp</a>
            <a class="btn btn-secondary w-full" href="smile-assessment.html">Smile check</a>
          </div>
        </nav>
      </div>
    </header>`;
}

function renderFooter() {
  const mount = document.querySelector("#site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="border-t border-slate-100 bg-[#f5fafc]">
      <div class="site-shell grid gap-10 py-14 md:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
        <div>
          <a href="index.html" class="flex items-center gap-3">
            <span class="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#155f9c] to-[#0f9f9a] font-black text-white">AA</span>
            <span>
              <span class="block text-lg font-black text-slate-900">Aura Align</span>
              <span class="block text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Invisalign Studio</span>
            </span>
          </a>
          <p class="mt-5 max-w-sm text-sm text-slate-600">Premium Invisalign, cosmetic orthodontics, and smile planning built around comfort, clarity, and confident decisions.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span class="trust-pill">Diamond provider</span>
            <span class="trust-pill">4.9 Google rating</span>
            <span class="trust-pill">Flexible finance</span>
          </div>
        </div>
        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.16em] text-slate-900">Treatments</h2>
          <div class="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
            <a href="invisalign.html">Invisalign</a>
            <a href="smile-assessment.html">Smile assessment</a>
            <a href="virtual-consultation.html">Virtual consult</a>
            <a href="before-after.html">Before and after</a>
          </div>
        </div>
        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.16em] text-slate-900">Patient proof</h2>
          <div class="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
            <a href="testimonials.html">Google reviews</a>
            <a href="pricing.html">Pricing</a>
            <a href="financing.html">Financing</a>
            <a href="faq.html">FAQ</a>
          </div>
        </div>
        <div>
          <h2 class="text-sm font-black uppercase tracking-[0.16em] text-slate-900">Book or ask</h2>
          <div class="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
            <a href="book-consultation.html">Book consultation</a>
            <a href="contact.html">Contact form</a>
            <a href="tel:+15550190111">(555) 019-0111</a>
            <a href="https://wa.me/15550190111">WhatsApp chat</a>
            <a href="mailto:hello@auraalign.example">hello@auraalign.example</a>
          </div>
        </div>
      </div>
      <div class="site-shell flex flex-col gap-3 border-t border-slate-200 py-6 text-xs font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Aura Align Invisalign Studio. Template content for production customization.</p>
        <div class="flex gap-4"><a href="contact.html">Privacy</a><a href="contact.html">Accessibility</a><a href="contact.html">Terms</a></div>
      </div>
    </footer>`;
}

function renderGlobalConversion() {
  document.body.insertAdjacentHTML("beforeend", `
    <div class="mobile-sticky-cta" aria-label="Quick actions">
      <a class="btn btn-secondary" href="tel:+15550190111">Call</a>
      <a class="btn btn-primary" href="book-consultation.html">Book</a>
      <a class="btn btn-secondary" href="https://wa.me/15550190111">WhatsApp</a>
      <a class="btn btn-secondary" href="contact.html">Contact</a>
    </div>
    <a class="whatsapp-float" href="https://wa.me/15550190111" aria-label="Open WhatsApp chat">WA</a>
    <button class="back-top" type="button" data-back-top aria-label="Back to top">&uarr;</button>
    <div class="exit-popup" data-exit-popup role="dialog" aria-modal="true" aria-label="Consultation offer">
      <div class="lux-card max-w-xl overflow-hidden bg-white">
        <div class="grid gap-0 md:grid-cols-[.9fr_1.1fr]">
          <img class="h-full min-h-56 w-full object-cover" src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=700&q=80" alt="Patient smiling during a consultation">
          <div class="p-6">
            <button class="ml-auto block text-2xl leading-none text-slate-400" type="button" data-exit-close aria-label="Close popup">&times;</button>
            <p class="page-kicker">Limited consult bonus</p>
            <h2 class="mt-4 text-2xl font-black leading-tight">Leave with a digital smile preview.</h2>
            <p class="mt-3 text-sm text-slate-600">Book a complimentary Invisalign consultation and receive a scan-based treatment estimate.</p>
            <form class="mt-5 grid gap-3">
              <input class="form-field" type="email" placeholder="Email address" aria-label="Email address">
              <a class="btn btn-primary w-full" href="book-consultation.html">Claim consult</a>
            </form>
          </div>
        </div>
      </div>
    </div>`);
}

function initNavigation() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("mobile-menu-open", open);
  });
  document.querySelectorAll("[data-mobile-dropdown]").forEach((group) => {
    const button = group.querySelector("[data-mobile-dropdown-toggle]");
    const panel = group.querySelector("[data-mobile-dropdown-panel]");
    if (!button || !panel) return;
    button.addEventListener("click", () => {
      const open = panel.classList.toggle("hidden") === false;
      button.setAttribute("aria-expanded", String(open));
    });
  });
}

function initFaq() {
  document.querySelectorAll("[data-faq-item]").forEach((item, index) => {
    const button = item.querySelector("[data-faq-button]");
    if (!button) return;
    const panel = item.querySelector(".faq-panel");
    const id = panel?.id || `faq-panel-${index}`;
    if (panel) panel.id = id;
    button.setAttribute("aria-controls", id);
    button.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
    button.addEventListener("click", () => {
      item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
    });
  });
}

function initReveals() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  nodes.forEach((node) => observer.observe(node));
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 42));
    const tick = () => {
      current = Math.min(target, current + step);
      node.textContent = current.toLocaleString();
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

function initBackTop() {
  const button = document.querySelector("[data-back-top]");
  if (!button) return;
  window.addEventListener("scroll", () => button.classList.toggle("is-visible", window.scrollY > 620), { passive: true });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initExitPopup() {
  const popup = document.querySelector("[data-exit-popup]");
  const close = document.querySelector("[data-exit-close]");
  if (!popup || sessionStorage.getItem("auraExitSeen")) return;
  const open = () => {
    popup.classList.add("is-open");
    sessionStorage.setItem("auraExitSeen", "1");
  };
  document.addEventListener("mouseleave", (event) => {
    if (event.clientY <= 0 && window.innerWidth > 900) open();
  });
  window.setTimeout(() => {
    if (!sessionStorage.getItem("auraExitSeen") && window.innerWidth < 900) open();
  }, 28000);
  close?.addEventListener("click", () => popup.classList.remove("is-open"));
  popup.addEventListener("click", (event) => {
    if (event.target === popup) popup.classList.remove("is-open");
  });
}

function initCountdowns() {
  document.querySelectorAll("[data-countdown]").forEach((node) => {
    const days = Number(node.dataset.days || 7);
    const end = Date.now() + days * 24 * 60 * 60 * 1000;
    const update = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      node.textContent = `${d}d ${h}h ${m}m`;
    };
    update();
    window.setInterval(update, 60000);
  });
}

function initCalculator() {
  document.querySelectorAll("[data-payment-calc]").forEach((calc) => {
    const cost = calc.querySelector("[data-cost]");
    const down = calc.querySelector("[data-down]");
    const months = calc.querySelector("[data-months]");
    const output = calc.querySelector("[data-payment-output]");
    const update = () => {
      const total = Number(cost?.value || 0);
      const deposit = Number(down?.value || 0);
      const term = Math.max(1, Number(months?.value || 1));
      const payment = Math.max(0, (total - deposit) / term);
      if (output) output.textContent = `$${Math.round(payment).toLocaleString()}/mo`;
    };
    [cost, down, months].forEach((input) => input?.addEventListener("input", update));
    update();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderGlobalConversion();
  initNavigation();
  initFaq();
  initReveals();
  initCounters();
  initBackTop();
  initExitPopup();
  initCountdowns();
  initCalculator();
});
