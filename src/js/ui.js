/* ============================================================
   UI behaviours not tied to any one section: the cursor, scroll
   reveals, the theme switch, text splitting, portal gravity.
   ============================================================ */
window.MW = window.MW || {};

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");

  /* ---------- cursor -------------------------------------- */
  MW.cursor = function () {
    if (!fine.matches || reduced) return;

    var ring = document.getElementById("cursor");
    var dot = document.getElementById("cursor-dot");
    if (!ring || !dot) return;

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    var rx = tx, ry = ty, raf = 0;

    document.body.classList.add("has-cursor");

    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });

    function loop() {
      /* the ring trails the dot — that lag is the whole effect */
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      if (Math.abs(tx - rx) > 0.4 || Math.abs(ty - ry) > 0.4) {
        raf = requestAnimationFrame(loop);
      } else { raf = 0; }
    }

    var HOT = "a,button,summary,[data-hot],input,select,textarea";
    document.addEventListener("pointerover", function (e) {
      if (e.target.closest && e.target.closest(HOT)) document.body.classList.add("cursor-hot");
    });
    document.addEventListener("pointerout", function (e) {
      if (e.target.closest && e.target.closest(HOT)) document.body.classList.remove("cursor-hot");
    });
    document.addEventListener("pointerdown", function () { ring.style.opacity = "0.5"; });
    document.addEventListener("pointerup", function () { ring.style.opacity = ""; });
  };

  /* ---------- scroll reveals ------------------------------ */
  var io = null;

  MW.reveal = function (root) {
    var nodes = (root || document).querySelectorAll(".rv:not(.in)");
    if (reduced || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(nodes, function (n) { n.classList.add("in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          var d = parseInt(el.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { el.classList.add("in"); }, d);
          io.unobserve(el);
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    }
    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  };

  /* ---------- theme --------------------------------------- */
  MW.theme = {
    KEY: "mw-theme",
    read: function () { try { return localStorage.getItem(this.KEY); } catch (e) { return null; } },
    apply: function (v) {
      if (v === "dark" || v === "light") document.documentElement.setAttribute("data-theme", v);
      else document.documentElement.removeAttribute("data-theme");
    },
    /* system -> light -> dark -> system */
    cycle: function () {
      var cur = this.read();
      var next = cur === "light" ? "dark" : cur === "dark" ? null : "light";
      try {
        if (next) localStorage.setItem(this.KEY, next);
        else localStorage.removeItem(this.KEY);
      } catch (e) { /* private mode — the choice just won't persist */ }
      this.apply(next);
      return next;
    },
    current: function () { return this.read(); },
    init: function () { this.apply(this.read()); }
  };

  /* ---------- the closer's line-by-line warm up ----------- */
  MW.closerLines = function (scope) {
    var lines = (scope || document).querySelectorAll(".closer-lines span");
    if (!lines.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(lines, function (l) { l.classList.add("hot"); });
      return;
    }
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var idx = parseInt(en.target.getAttribute("data-i") || "0", 10);
        setTimeout(function () { en.target.classList.add("hot"); }, idx * 260);
        ob.unobserve(en.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(lines, function (l, i) {
      l.setAttribute("data-i", String(i));
      ob.observe(l);
    });
  };

  /* ---------- the landing types itself -------------------- */
  /* Typed by slicing the string and reassigning textContent, never by
     wrapping characters in their own elements: Arabic is cursive, and
     a letter in its own box loses the joins to its neighbours. Slicing
     lets the browser reshape the whole run on every frame, so Arabic
     types correctly too. */
  function typeInto(node, text, pace, done) {
    var i = 0;
    (function next() {
      node.textContent = text.slice(0, ++i);
      if (i < text.length) {
        /* a pause after punctuation reads as a breath, and the pause
           is a multiple of the pace so it stays in proportion whether
           the run is a headline or a paragraph */
        var c = text.charAt(i - 1);
        var extra = 0;
        if (c === "،" || c === ",") extra = pace.step * 3.2;
        else if (c === "." || c === "؛") extra = pace.step * 5;
        setTimeout(next, pace.step + Math.random() * pace.jitter + extra);
      } else if (done) {
        setTimeout(done, 180);
      }
    })();
  }

  /* the caret blinks while a run is being typed and retires when the
     whole landing has finished, so it reads as one hand moving down */
  function retire(caret) { if (caret) caret.classList.add("done"); }

  MW.typewriter = function (el, done) {
    /* Boot calls showView twice — once from render, once from the
       hash — and the language switch calls it again. A run already
       under way must not hand off a second time, or the paragraph
       starts over the top of the headline instead of after it. */
    if (!el || el.getAttribute("data-typed") === "1") return;
    el.setAttribute("data-typed", "1");

    var t1 = el.querySelector(".t1");
    var t2 = el.querySelector(".t2");
    var caret = el.querySelector(".caret");
    var s1 = el.getAttribute("data-t1") || "";
    var s2 = el.getAttribute("data-t2") || "";
    if (!t1 || !t2) { if (done) done(); return; }

    if (reduced) {
      t1.textContent = s1;
      t2.textContent = s2;
      retire(caret);
      if (done) done();
      return;
    }

    var pace = { step: 68, jitter: 46 };   /* the resting cadence, in ms */

    setTimeout(function () {
      typeInto(t1, s1, pace, function () {
        typeInto(t2, s2, pace, function () {
          /* the caret leaves the headline and picks up on the line
             below, rather than two carets blinking at once */
          retire(caret);
          if (done) setTimeout(done, 260);
        });
      });
    }, 420);
  };

  /* The lead types at a hand's pace for prose rather than a headline.
     Its full text is already in the box as a hidden twin, so the
     paragraph occupies its final height from the first frame and
     nothing below it moves while the line fills in. */
  MW.typeLine = function (el) {
    if (!el || el.getAttribute("data-typed") === "1") return;
    el.setAttribute("data-typed", "1");

    var tt = el.querySelector(".tt");
    var caret = el.querySelector(".caret");
    var text = el.getAttribute("data-text") || "";
    if (!tt) return;

    if (reduced) {
      tt.textContent = text;
      retire(caret);
      return;
    }

    typeInto(tt, text, { step: 16, jitter: 12 }, function () {
      setTimeout(function () { retire(caret); }, 1200);
    });
  };

  /* ---------- pointer-gravity on the hub portals ---------- */
  MW.portalGravity = function (container) {
    if (!fine.matches || reduced || !container) return;
    var cards = container.querySelectorAll(".orb");

    container.addEventListener("pointermove", function (e) {
      Array.prototype.forEach.call(cards, function (c) {
        var r = c.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var d = Math.sqrt(dx * dx + dy * dy);
        var reach = 260;
        if (d > reach || d === 0) {
          c.style.setProperty("--gx", "0px");
          c.style.setProperty("--gy", "0px");
          return;
        }
        var pull = (1 - d / reach) * 9;
        c.style.setProperty("--gx", (dx / d) * pull + "px");
        c.style.setProperty("--gy", (dy / d) * pull + "px");
      });
    }, { passive: true });

    container.addEventListener("pointerleave", function () {
      Array.prototype.forEach.call(cards, function (c) {
        c.style.setProperty("--gx", "0px");
        c.style.setProperty("--gy", "0px");
      });
    });
  };

  /* ---------- the binary margins -------------------------- */
  /* Filled once from a fixed pattern rather than Math.random on
     every row, so the columns look composed instead of noisy, and
     so they never reflow differently between renders. */
  MW.binary = function () {
    var cols = [document.getElementById("binL"), document.getElementById("binR")];
    var rows = Math.ceil(window.innerHeight / 15) + 40;
    var seed = 0x2f6e2b1;

    cols.forEach(function (col, c) {
      if (!col) return;
      var out = [], i, j, line;
      for (i = 0; i < rows; i++) {
        line = "";
        for (j = 0; j < 2; j++) {
          /* a small xorshift keeps the pattern varied but stable */
          seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
          line += (seed >>> (c + 1)) & 1 ? "1" : "0";
        }
        out.push("<span>" + line + "</span>");
      }
      col.innerHTML = '<div class="bin-col">' + out.join("") + out.join("") + "</div>";
    });
  };

})();
