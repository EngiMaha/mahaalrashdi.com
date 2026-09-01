/* ============================================================
   The immersive project view.
   Name → Problem → Idea → Solution → Key features → Technologies
        → The result.
   The page's --world token is repointed at the project's own
   accent for as long as the view is open, so the wash, rules,
   cursor and links all shift with it.
   ============================================================ */
window.MW = window.MW || {};

(function () {
  "use strict";

  var esc = MW.esc;

  function chapter(key, body, delay) {
    return '<div class="chapter rv" data-delay="' + (delay || 0) + '">' +
      '<div class="chapter-key">' + key + '</div>' +
      '<div class="chapter-body">' + body + '</div>' +
    '</div>';
  }

  MW.renderProject = function (L, id) {
    var meta = L.creator.projects[id];
    var story = (L.dir === "rtl" ? MW.projectsAr : MW.projectsEn)[id];
    var stack = MW.stacks[id];
    var links = MW.links[id] || [];
    var K = L.ui;
    var rtl = L.dir === "rtl";

    var W = {
      problem:  rtl ? "المشكلة"  : "The problem",
      idea:     rtl ? "الفكرة"   : "The idea",
      solution: rtl ? "الحل"     : "The solution",
      features: rtl ? "المزايا"  : "Key features",
      tech:     rtl ? "التقنيات" : "Technologies",
      result:   rtl ? "النتيجة"  : "The result",
      role:     rtl ? "دوري"     : "My role"
    };

    var feats = story.features.map(function (f) {
      return '<div class="feat"><b>' + f.b + '</b><span>' + f.s + '</span></div>';
    }).join("");

    var labels = { app: K.stackApp, cloud: K.stackCloud, extra: K.stackExtra };
    var groups = stack.map(function (g) {
      var tags = g.items.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("");
      return '<div class="stack-group">' +
        '<span class="label">' + labels[g.k] + '</span>' +
        '<div class="skill-tags">' + tags + '</div></div>';
    }).join("");

    var linkBtns = links.map(function (l) {
      if (l.state === "live") {
        return '<a class="linkbtn solid" href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
          K.live + ' <span aria-hidden="true">&#8599;</span></a>';
      }
      if (l.state === "repo") {
        return '<a class="linkbtn" href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' +
          K.repo + ' <span aria-hidden="true">&#8599;</span></a>';
      }
      return '<span class="linkbtn muted">' + K.private + '</span>';
    }).join("");

    var flag = story.honest
      ? '<div style="margin-bottom:18px;"><span class="status-flag">' + story.honest + '</span></div>'
      : "";

    var order = MW.projectOrder;
    var nextId = order[(order.indexOf(id) + 1) % order.length];
    var nextName = L.creator.projects[nextId].name;

    var pull = story.resultPull ? '<p class="pull">' + story.resultPull + '</p>' : "";

    return '' +
      '<div class="pview-inner">' +
        '<div class="pview-bar">' +
          '<span class="who"><i></i>' + meta.name +
            (meta.arabicName ? ' <span style="color:var(--ink-faint);font-size:0.85em;">' + meta.arabicName + '</span>' : '') +
          '</span>' +
          '<button class="pv-close" data-close-project>' +
            '<span aria-hidden="true">&#10005;</span> ' + K.close +
          '</button>' +
        '</div>' +

        '<div class="wrap pv-hero">' +
          '<div class="pv-index rv">' +
            '<span class="pnum mono-num">' +
              ("00" + (MW.projectOrder.indexOf(id) + 1)).slice(-3) + '</span>' +
            '<span class="label">' + meta.meta.join(" &middot; ") + '</span>' +
          '</div>' +
          '<h2 class="rv" data-delay="60">' + meta.name + '</h2>' +
          (MW.projectAward[id]
            ? '<div class="award-row rv" data-delay="90"><span class="award">' +
              (L.dir === "rtl" ? MW.projectAward[id].ar : MW.projectAward[id].en) +
              '</span></div>'
            : '') +
          '<p class="pv-tag rv" data-delay="120">' + meta.tag + '</p>' +
          '<p class="pv-mission rv" data-delay="180">' + meta.mission + '</p>' +
          '<div class="rv" data-delay="240" style="margin-top:26px;">' +
            '<span class="label" style="display:block;margin-bottom:8px;">' + W.role + '</span>' +
            '<span style="font-family:var(--font-display);font-size:var(--t-d3);">' + meta.role + '</span>' +
          '</div>' +
        '</div>' +

        '<div class="wrap">' +
          flag +
          '<div class="chain">' +
            chapter(W.problem,  '<p>' + story.problem + '</p>', 0) +
            chapter(W.idea,     '<p>' + story.idea + '</p>', 40) +
            chapter(W.solution, '<p>' + story.solution + '</p>', 60) +
            chapter(W.features, '<div class="feat-grid">' + feats + '</div>', 60) +
            chapter(W.tech,     '<div class="stack-groups">' + groups + '</div>' +
                                (linkBtns ? '<div class="link-row">' + linkBtns + '</div>' : ''), 60) +
            chapter(W.result,   '<p>' + story.result + '</p>' + pull, 60) +
          '</div>' +

          '<div class="pv-nav">' +
            '<button class="pv-close linkbtn" data-close-project>' +
              '<span aria-hidden="true">&#8592;</span> ' + K.back +
            '</button>' +
            '<button class="nx" data-project="' + esc(nextId) + '">' +
              '<span class="label">' + K.nextProject + '</span>' +
              '<b>' + nextName + ' <span aria-hidden="true">&#8594;</span></b>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  };
})();
