/* ============================================================
   Renderers. Each function takes the active language pack and
   returns an HTML string for one region. Keeping them pure and
   separate is what makes the port to React components later a
   mechanical job rather than a rewrite.
   ============================================================ */
window.MW = window.MW || {};

(function () {
  "use strict";

  /* Content in the data files is authored text, some of it with
     intentional entities (&amp;). It is never visitor input, so it
     is interpolated as-is; esc() guards the few attribute builds. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  MW.esc = esc;

  function rv(delay) { return 'class="rv" data-delay="' + (delay || 0) + '"'; }

  /* ---------- hub ----------------------------------------- */
  /* The landing is a stage and four pillars. The greeting sits on
     the cream stage; the pillars float below it as pills, set in a
     slow wave rather than a grid, each carrying its note beneath
     it so the landing stays a place rather than a menu. */
  /* The fifth pill is an action, not a world, so it wears the
     outline rather than the fill. It opens onto the three places
     Maha can actually be reached, taken from the one contact
     record the whole site reads from. */
  function reach(L) {
    var C = MW.contact;
    var k = L.hub.reachLinks;

    function link(label, value, href, blank) {
      return '' +
        '<a class="reach-link" href="' + esc(href) + '"' +
          (blank ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
          '<span class="label">' + label + '</span>' +
          '<b dir="ltr">' + value + '</b>' +
        '</a>';
    }

    return '' +
      '<div class="reach rv" data-delay="980">' +
        '<button class="orb orb-ghost" data-reach ' +
          'aria-expanded="false" aria-controls="reachPanel">' +
          '<span class="orb-title">' + L.hub.reach + '</span>' +
          '<span class="orb-chev" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="reach-panel" id="reachPanel" hidden>' +
          link(k.linkedinK, C.linkedinLabel, C.linkedin, true) +
          link(k.emailK, C.email, "mailto:" + C.email, false) +
          link(k.githubK, C.githubLabel, C.github, true) +
        '</div>' +
      '</div>';
  }

  MW.renderHub = function (L) {
    var h = L.hub;
    var portals = h.portals.map(function (p, i) {
      return '' +
        '<div class="orb-slot rv" data-delay="' + (620 + i * 90) + '">' +
          '<button class="orb" data-goto="' + esc(p.id) + '" ' +
            'style="--pw: var(--w-' + esc(p.id) + ', var(--accent));">' +
            '<span class="orb-title">' + p.title + '</span>' +
            '<span class="orb-note" aria-hidden="true">' + p.note + '</span>' +
          '</button>' +
        '</div>';
    }).join("");

    return '' +
      '<div class="hub-stage">' +
        '<div class="wrap hub-intro">' +
          '<div class="hub-topline rv">' +
            '<span class="label">' + h.eyebrow + '</span>' +
            '<button class="lang-invite" data-lang-switch>' +
              '<span aria-hidden="true">&#9673;</span> ' + L.ui.switchTo +
            '</button>' +
          '</div>' +
          '<h1 class="hub-hello" id="hubHello"' +
            ' data-t1="' + esc(h.hello) + '" data-t2="' + esc(h.name) + '">' +
            '<span class="t1"></span><span class="name t2"></span>' +
            '<span class="caret" aria-hidden="true"></span>' +
          '</h1>' +
          '<p class="lead hub-line" id="hubLine" data-text="' + esc(h.line) + '">' +
            '<span class="line-ghost" aria-hidden="true">' + h.line + '</span>' +
            '<span class="line-typed">' +
              '<span class="tt"></span><span class="caret" aria-hidden="true"></span>' +
            '</span>' +
          '</p>' +
        '</div>' +
      '</div>' +
      '<div class="wrap hub-ground">' +
        '<div class="orbs" id="portals">' + portals + '</div>' +
        reach(L) +
      '</div>';
  };

  /* ---------- world head ---------------------------------- */
  function head(L, w) {
    return '' +
      '<div class="wrap world-head">' +
        '<span class="label rv">' + w.eyebrow + '</span>' +
        '<h2 class="rv" data-delay="60">' + w.title + '</h2>' +
        '<p class="lead rv" data-delay="130">' + w.lead + '</p>' +
      '</div>';
  }

  /* Bands are numbered inside each world. The order is real — the
     education, the internship, the skills, the certificates — so the
     numbering reports a sequence rather than decorating one. */
  function bandHead(n, label, title) {
    return '' +
      '<div class="band-head">' +
        '<span class="bn rv">' + (n < 10 ? "0" : "") + n + '</span>' +
        '<span class="label rv">' + label + '</span>' +
        '<h3 class="rv" data-delay="60">' + title + '</h3>' +
      '</div>';
  }

  /* ---------- engineer ------------------------------------ */
  MW.renderEngineer = function (L) {
    var e = L.engineer;

    var edu = e.education.map(function (it, i) {
      var pills = it.pills.map(function (p) { return '<span class="pill">' + p + '</span>'; }).join("");
      return '' +
        '<div class="tl-item rv" data-delay="' + (i * 90) + '">' +
          '<div class="tl-when mono-num">' + it.when + '</div>' +
          '<div class="tl-what">' +
            '<h4>' + it.what + '</h4>' +
            '<div class="tl-where">' + it.where + '</div>' +
            '<p class="tl-note">' + it.note + '</p>' +
            (pills ? '<div>' + pills + '</div>' : '') +
          '</div>' +
        '</div>';
    }).join("");

    var rots = e.exp.rotations.map(function (r) {
      return '<div class="rot-cell"><span class="n">' + r.n + '</span>' +
        '<h5>' + r.t + '</h5><p>' + r.d + '</p></div>';
    }).join("");

    var duties = e.exp.duties.map(function (d) {
      return '<li class="duty"><span>' + d + '</span></li>';
    }).join("");

    var skills = e.skillGroups.map(function (g, i) {
      var tags = g.items.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("");
      return '<div class="skill-group rv" data-delay="' + (i * 60) + '">' +
        '<span class="label">' + g.k + '</span>' +
        '<div class="skill-tags">' + tags + '</div></div>';
    }).join("");

    var certs = e.certs.map(function (c, i) {
      return '<div class="cert rv" data-delay="' + (i * 50) + '"><b>' + c.n + '</b><span>' + c.by + '</span></div>';
    }).join("");

    var langs = e.langs.map(function (l) {
      return '<div class="lang-card rv"><b>' + l.n + '</b><span>' + l.d + '</span></div>';
    }).join("");

    return head(L, e) +
      '<section class="band"><div class="wrap">' +
        bandHead(1, e.eduLabel, e.eduTitle) +
        '<div class="tl">' + edu + '</div>' +
      '</div></section>' +

      '<section class="band"><div class="wrap">' +
        bandHead(2, e.expLabel, e.expTitle) +
        '<div class="tl-item rv" style="border-top:0;padding-top:0;">' +
          '<div class="tl-when mono-num">' + e.exp.when + '</div>' +
          '<div class="tl-what"><h4>' + e.exp.role + '</h4>' +
            '<div class="tl-where">' + e.exp.org + '</div>' +
            '<p class="tl-note">' + e.exp.intro + '</p></div>' +
        '</div>' +
        '<div class="rot rv" data-delay="90">' + rots + '</div>' +
        '<ul class="duty-list rv" data-delay="150">' + duties + '</ul>' +
      '</div></section>' +

      '<section class="band"><div class="wrap">' +
        bandHead(3, e.skillsLabel, e.skillsTitle) +
        '<p class="prose rv" style="margin-bottom:22px;">' + e.skillsNote + '</p>' +
        '<div class="skill-grid">' + skills + '</div>' +
      '</div></section>' +

      '<section class="band"><div class="wrap">' +
        bandHead(4, e.certLabel, e.certTitle) +
        '<div class="cert-list">' + certs + '</div>' +
        '<div class="band-head" style="margin-top:52px;">' +
          '<span class="label rv">' + e.langTitle + '</span>' +
        '</div>' +
        '<div class="lang-row">' + langs + '</div>' +
      '</div></section>';
  };

  /* ---------- creator (project index) --------------------- */
  MW.renderCreator = function (L) {
    var c = L.creator;

    var cards = MW.projectOrder.map(function (id, i) {
      var p = c.projects[id];
      var st = MW.projectStatus[id] || {};
      var meta = p.meta.map(function (m) { return '<span>' + m + '</span>'; })
                       .join('<span class="sep"></span>');

      var status = '<span class="status ' + esc(st.key || "") + '">' +
        '<i></i>' + (L.ui.st[st.key] || "") +
        (st.year ? ' <b>' + st.year + '</b>' : '') + '</span>';

      var aw = MW.projectAward[id];
      var award = aw ? '<span class="award">' + (L.dir === "rtl" ? aw.ar : aw.en) + '</span>' : "";

      return '' +
        '<button class="proj-card" data-project="' + esc(id) + '" style="--pw: var(--w-' + esc(id) + ');" ' + rv(i * 90) + '>' +
          '<span class="proj-top">' +
            '<span class="pnum mono-num">' + ("00" + (i + 1)).slice(-3) + '</span>' +
            status +
          '</span>' +
          '<h4>' + p.name + '</h4>' +
          '<span class="p-tag">' + p.tag + '</span>' +
          '<span class="p-mission">' + p.mission + '</span>' +
          (award ? '<span class="award-row">' + award + '</span>' : '') +
          '<span class="proj-meta">' + meta + '</span>' +
          '<span class="proj-enter">' + L.ui.enter + ' <span class="arw" aria-hidden="true">&#8594;</span></span>' +
        '</button>';
    }).join("");

    return head(L, c) +
      '<section class="band"><div class="wrap">' +
        '<div class="proj-grid">' + cards + '</div>' +
      '</div></section>';
  };

  /* ---------- problem solving & architecture -------------- */
  /* Four breakdowns, all open. Project names stay in English in both
     languages, so a recruiter reading either version sees the same
     name they would search for. */
  MW.renderSolver = function (L) {
    var s = L.solver;
    var K = s.keys;

    var cards = s.cases.map(function (c, i) {
      return '' +
        '<article class="case rv" data-delay="' + (i * 70) + '"' +
          ' style="--csrc: var(--w-' + esc(c.id) + ');">' +
          '<div class="case-head">' +
            '<span class="src">' + ("00" + (i + 1)).slice(-3) + '</span>' +
            '<h4 dir="ltr">' + esc(c.name) + '</h4>' +
          '</div>' +
          '<div class="case-body">' +
            '<div class="step"><span class="k">' + K.problem + '</span><p>' + c.problem + '</p></div>' +
            '<div class="step"><span class="k">' + K.solution + '</span><p>' + c.solution + '</p></div>' +
            '<div class="step result"><span class="k">' + K.tech + '</span><p>' + c.tech + '</p></div>' +
          '</div>' +
        '</article>';
    }).join("");

    return head(L, s) +
      '<section class="band"><div class="wrap">' +
        '<div class="band-head">' +
          '<span class="bn rv">01</span>' +
          '<span class="label rv">' + s.casesLabel + '</span>' +
        '</div>' +
        '<div class="case-list">' + cards + '</div>' +
      '</div></section>';
  };

  /* ---------- as maha ------------------------------------- */
  MW.renderMaha = function (L) {
    var m = L.maha;

    var facts = m.facts.map(function (f, i) {
      return '<div class="fact rv" data-delay="' + (i * 70) + '">' +
        '<b>' + f.b + '</b>' +
        (f.p ? '<p>' + f.p + '</p>' : '') +
      '</div>';
    }).join("");

    return head(L, m) +
      '<section class="band"><div class="wrap">' +
        '<div class="in-short rv">' +
          '<h3>' + m.shortTitle + '</h3>' +
          '<p>' + m.shortText + '</p>' +
        '</div>' +
        '<div class="band-head" style="margin-top:clamp(40px,6vh,72px);">' +
          '<span class="label rv">' + m.factsLabel + '</span>' +
        '</div>' +
        '<div class="facts">' + facts + '</div>' +
      '</div></section>';
  };

  /* ---------- services + closer (shared tail) ------------- */
  /* ---------- the tail ------------------------------------ */
  /* The pitch — "what can I build for you" — is an ask, and an ask
     belongs once, at the end of the pillar about where Maha is
     headed. The sign-off closes every pillar. */
  MW.renderServices = function (L) {
    var sv = L.services;

    var items = sv.items.map(function (s, i) {
      return '<div class="svc rv" data-delay="' + (i * 80) + '">' +
        '<h4>' + s.t + '</h4><p>' + s.d + '</p>' +
        '<span class="evidence">' + s.e + '</span></div>';
    }).join("");

    return '' +
      '<section class="band services"><div class="wrap">' +
        '<div class="band-head">' +
          '<span class="label rv">' + sv.eyebrow + '</span>' +
          '<h3 class="rv" data-delay="60">' + sv.title + '</h3>' +
        '</div>' +
        '<p class="lead rv" style="margin-bottom:34px;">' + sv.lead + '</p>' +
        '<div class="svc-grid">' + items + '</div>' +
      '</div></section>';
  };

  MW.renderCloser = function (L, world) {
    var cl = L.closer;
    var st = cl.statements[world] || cl.statements.maha;

    return '' +
      '<section class="band closer-band"><div class="wrap closer">' +
        '<span class="label rv">' + cl.eyebrow + '</span>' +
        '<div class="closer-lines">' +
          '<span class="final">' + st.t + '<b>' + st.em + '</b></span>' +
        '</div>' +
      '</div></section>';
  };
})();
