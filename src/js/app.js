/* ============================================================
   App — language, routing between worlds, and the project view.
   State lives in one object; every change goes through render().
   ============================================================ */
window.MW = window.MW || {};

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = {
    lang: "en",
    view: "hub",      // hub | engineer | creator | solver | maha
    project: null
  };

  var el = {};

  function L() { return state.lang === "ar" ? MW.ar : MW.en; }

  /* ---------- language ------------------------------------ */
  function readLang() {
    try {
      var s = localStorage.getItem("mw-lang");
      if (s === "ar" || s === "en") return s;
    } catch (e) { /* private mode */ }
    return (navigator.language || "").toLowerCase().indexOf("ar") === 0 ? "ar" : "en";
  }

  function setLang(v) {
    state.lang = v;
    try { localStorage.setItem("mw-lang", v); } catch (e) { /* ignore */ }
    document.documentElement.lang = v;
    document.documentElement.dir = v === "ar" ? "rtl" : "ltr";
    render();
    if (state.project) openProject(state.project, true);
  }

  /* ---------- chrome -------------------------------------- */
  function paintChrome() {
    var K = L().ui;
    el.brandName.textContent = K.brand;
    el.brandSub.textContent = K.brandSub;
    el.skip.textContent = K.skip;

    /* Name the language you'd be switching TO — an Arabic reader who
       lands on the English page should see the word "العربية", not a
       two-letter code they have to decode. */
    el.langLabel.textContent = K.otherLang;
    el.langBtn.setAttribute("aria-label", K.switchTo);

    var t = MW.theme.current();
    el.themeBtn.textContent = t === "dark" ? "◑" : t === "light" ? "◐" : "◒";
    el.themeBtn.setAttribute("aria-label", K.theme);

    var order = ["hub"].concat(MW.worlds);
    el.spine.innerHTML = order.map(function (id) {
      var name = id === "hub" ? K.hub : L()[id].title;
      return '<button class="spine-tick" data-goto="' + id + '" ' +
        'aria-current="' + (state.view === id) + '" ' +
        'aria-label="' + MW.esc(name) + '"><i></i><span class="tip">' + name + '</span></button>';
    }).join("");
  }

  /* ---------- render -------------------------------------- */
  function render() {
    var l = L();
    paintChrome();

    el.hub.innerHTML = MW.renderHub(l);
    el.engineer.innerHTML = MW.renderEngineer(l) + MW.renderCloser(l, "engineer");
    el.creator.innerHTML = MW.renderCreator(l) + MW.renderCloser(l, "creator");
    el.solver.innerHTML = MW.renderSolver(l) + MW.renderCloser(l, "solver");
    /* the pitch rides only with the pillar about where she's headed */
    el.maha.innerHTML = MW.renderMaha(l) + MW.renderServices(l) + MW.renderCloser(l, "maha");

    showView(state.view, true);
  }

  function showView(id, silent) {
    state.view = id;
    document.documentElement.setAttribute("data-world", id === "hub" ? "" : id);

    ["hub", "engineer", "creator", "solver", "maha"].forEach(function (k) {
      el[k].classList.toggle("is-open", k === id);
    });

    Array.prototype.forEach.call(el.spine.querySelectorAll(".spine-tick"), function (b) {
      b.setAttribute("aria-current", String(b.getAttribute("data-goto") === id));
    });

    stopGlide();
    window.scrollTo(0, 0);

    var scope = el[id];
    MW.reveal(scope);
    MW.closerLines(scope);

    if (id === "hub") {
      var hello = scope.querySelector("#hubHello");
      var line = scope.querySelector("#hubLine");
      if (hello) MW.typewriter(hello, function () { MW.typeLine(line); });
      else MW.typeLine(line);
      MW.portalGravity(scope.querySelector("#portals"));
    }

    /* carry the visitor into the world instead of leaving them at the top */
    if (!silent && id !== "hub") autoEnter(scope);

    var hash = id === "hub" ? "#/" : "#/" + id;
    if (location.hash !== hash) history.replaceState(null, "", hash);
  }

  /* ---------- cinematic auto-scroll ----------------------- */
  /* Entering a world should carry you into it rather than parking
     you at the top. This glides down to the first content band on
     its own, and gets out of the way the moment the visitor
     touches the wheel, a key or the screen. */
  var glideRaf = 0;

  function stopGlide() {
    if (glideRaf) cancelAnimationFrame(glideRaf);
    glideRaf = 0;
  }

  function glideTo(y, dur) {
    stopGlide();
    if (reduced) { window.scrollTo(0, y); return; }
    var start = window.pageYOffset;
    var delta = y - start;
    if (Math.abs(delta) < 8) return;
    var t0 = 0;

    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      /* ease-in-out cubic — slow to leave, slow to arrive */
      var e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      window.scrollTo(0, start + delta * e);
      if (p < 1) glideRaf = requestAnimationFrame(step);
      else glideRaf = 0;
    }
    glideRaf = requestAnimationFrame(step);
  }

  ["wheel", "touchstart", "keydown", "pointerdown"].forEach(function (ev) {
    window.addEventListener(ev, stopGlide, { passive: true });
  });

  function autoEnter(scope) {
    var band = scope.querySelector("section.band");
    if (!band) return;
    setTimeout(function () {
      var top = band.getBoundingClientRect().top + window.pageYOffset;
      glideTo(Math.max(0, top - 72), 1500);
    }, 700);
  }

  /* ---------- pop-out on press ---------------------------- */
  /* Returns true when the animation actually runs, so the caller
     knows whether to wait for it. */
  function pop(node) {
    if (reduced || !node.classList) return false;
    node.classList.remove("is-pop");
    void node.offsetWidth;            /* restart the animation */
    node.classList.add("is-pop");
    setTimeout(function () { node.classList.remove("is-pop"); }, 600);
    return true;
  }

  /* ---------- the wipe transition ------------------------- */
  function wipeTo(id, origin, worldVar) {
    if (reduced) { showView(id); return; }

    var v = el.veil;
    var x = origin ? origin.x : window.innerWidth / 2;
    var y = origin ? origin.y : window.innerHeight / 2;
    v.style.setProperty("--vx", x + "px");
    v.style.setProperty("--vy", y + "px");
    v.style.setProperty("--vw", worldVar || "var(--accent)");

    v.classList.remove("is-wiping");
    void v.offsetWidth;               /* restart the animation */
    v.classList.add("is-wiping");

    /* swap almost at once, so the click lands rather than waits */
    setTimeout(function () { showView(id); }, 150);
    setTimeout(function () { v.classList.remove("is-wiping"); }, 940);
  }

  /* ---------- project view -------------------------------- */
  function openProject(id, silent) {
    state.project = id;
    el.pview.innerHTML = MW.renderProject(L(), id);
    el.pview.classList.add("is-open");
    el.pview.setAttribute("data-project", id);
    document.documentElement.setAttribute("data-project", id);
    document.body.classList.add("is-locked");
    stopGlide();
    el.pview.scrollTop = 0;
    MW.reveal(el.pview);
    if (!silent) {
      var close = el.pview.querySelector("[data-close-project]");
      if (close) close.focus({ preventScroll: true });
    }
    var hash = "#/creator/" + id;
    if (location.hash !== hash) history.replaceState(null, "", hash);
  }

  function closeProject() {
    state.project = null;
    el.pview.classList.remove("is-open");
    el.pview.removeAttribute("data-project");
    document.documentElement.removeAttribute("data-project");
    el.pview.innerHTML = "";
    document.body.classList.remove("is-locked");
    history.replaceState(null, "", "#/creator");
  }

  /* ---------- the reach panel ----------------------------- */
  /* Open state lives on the button's aria-expanded, so the
     accessible name and the visual state can never disagree. */
  function setReach(open) {
    var btn = el.hub.querySelector("[data-reach]");
    var panel = el.hub.querySelector("#reachPanel");
    if (!btn || !panel) return;
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  function reachIsOpen() {
    var btn = el.hub.querySelector("[data-reach]");
    return !!btn && btn.getAttribute("aria-expanded") === "true";
  }

  /* ---------- routing ------------------------------------- */
  function fromHash() {
    var h = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean);
    var view = h[0] || "hub";
    if (["engineer", "creator", "solver", "maha"].indexOf(view) === -1) view = "hub";
    showView(view, true);
    if (view === "creator" && h[1] && MW.projectOrder.indexOf(h[1]) !== -1) {
      openProject(h[1], true);
    }
  }

  /* ---------- events -------------------------------------- */
  function wire() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-lang-switch]")) {
        setLang(state.lang === "en" ? "ar" : "en");
        return;
      }

      var reach = e.target.closest("[data-reach]");
      if (reach) {
        pop(reach);
        setReach(!reachIsOpen());
        return;
      }
      /* a click anywhere else on the page puts it away again */
      if (!e.target.closest(".reach-panel")) setReach(false);

      var goto = e.target.closest("[data-goto]");
      if (goto) {
        var id = goto.getAttribute("data-goto");
        if (id === state.view) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        var r = goto.getBoundingClientRect();
        var wv = id === "hub" ? "var(--accent)" : "var(--w-" + id + ", var(--accent))";
        var origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        /* land immediately: the veil still sweeps, but the section is
           already there behind it rather than arriving after it */
        pop(goto);
        wipeTo(id, origin, wv);
        return;
      }

      var proj = e.target.closest("[data-project]");
      if (proj && proj.tagName === "BUTTON") {
        var pid = proj.getAttribute("data-project");
        if (pop(proj)) setTimeout(function () { openProject(pid); }, 260);
        else openProject(pid);
        return;
      }

      if (e.target.closest("[data-close-project]")) {
        closeProject();
        return;
      }
    });

    el.langBtn.addEventListener("click", function () {
      setLang(state.lang === "en" ? "ar" : "en");
    });

    el.themeBtn.addEventListener("click", function () {
      MW.theme.cycle();
      paintChrome();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (state.project) closeProject();
        else if (state.view === "hub" && reachIsOpen()) setReach(false);
        else if (state.view !== "hub") wipeTo("hub", null, "var(--accent)");
      }
    });

    window.addEventListener("hashchange", fromHash);
  }

  /* ---------- boot ---------------------------------------- */
  function boot() {
    el.hub      = document.getElementById("view-hub");
    el.engineer = document.getElementById("view-engineer");
    el.creator  = document.getElementById("view-creator");
    el.solver   = document.getElementById("view-solver");
    el.maha     = document.getElementById("view-maha");
    el.pview    = document.getElementById("pview");
    el.veil     = document.getElementById("veil");
    el.spine    = document.getElementById("spine");
    el.brandName = document.getElementById("brandName");
    el.brandSub  = document.getElementById("brandSub");
    el.skip      = document.getElementById("skipLink");
    el.langBtn   = document.getElementById("langBtn");
    el.langLabel = document.getElementById("langLabel");
    el.themeBtn  = document.getElementById("themeBtn");

    MW.theme.init();

    state.lang = readLang();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";

    render();
    wire();
    MW.cursor();

    MW.binary();

    var fc = document.getElementById("field");
    if (fc) {
      MW.field(fc);
      requestAnimationFrame(function () { fc.classList.add("is-lit"); });
    }

    fromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
