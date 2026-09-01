/* ============================================================
   Canvas work.

   Field    — the ambient drift behind every page. Points on slow
              linear paths, joined by a line when close enough,
              nudged away from the pointer.
   Portrait — the same idea turned inward: a dense elliptical
              cloud that leans toward the cursor and settles back.
              This is the abstract portrait in the As Maha world.

   Both cap their point count by viewport area, both stop when
   off-screen or when the visitor asks for reduced motion, and
   both read their colour from the live CSS tokens, so a theme or
   world change carries through without a reload.
   ============================================================ */
window.MW = window.MW || {};

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tokens() {
    var cs = getComputedStyle(document.documentElement);
    return {
      line: cs.getPropertyValue("--silver").trim() || "#CFCAD6",
      dot:  cs.getPropertyValue("--world").trim() || "#6C4CF0",
      soft: cs.getPropertyValue("--accent-soft").trim() || "#B7A4FF"
    };
  }

  function hexToRgb(h) {
    h = (h || "").trim();
    if (h.charAt(0) !== "#") return [140, 130, 160];
    if (h.length === 4) h = "#" + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    var n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) {
    var c = hexToRgb(hex);
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }

  function Surface(canvas) {
    this.c = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = 0; this.h = 0; this.raf = 0; this.running = false;
    this.resize();
  }
  Surface.prototype.resize = function () {
    var r = this.c.getBoundingClientRect();
    this.w = Math.max(1, r.width);
    this.h = Math.max(1, r.height);
    this.c.width = Math.round(this.w * this.dpr);
    this.c.height = Math.round(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  };
  Surface.prototype.stop = function () {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  };

  /* ============================================================
     FIELD — the ambient background
     ============================================================ */
  MW.field = function (canvas) {
    var s = new Surface(canvas);
    var pts = [];
    var pointer = { x: -9999, y: -9999, on: false };
    var link = 132;

    function seed() {
      var n = Math.max(18, Math.min(96, Math.round((s.w * s.h) / 19000)));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * s.w, y: Math.random() * s.h,
          vx: (Math.random() - 0.5) * 0.16, vy: (Math.random() - 0.5) * 0.16,
          r: Math.random() * 1.5 + 0.5, ox: 0, oy: 0
        });
      }
      link = s.w < 640 ? 96 : 132;
    }

    function frame() {
      if (!s.running) return;
      var ctx = s.ctx, t = tokens();
      ctx.clearRect(0, 0, s.w, s.h);

      var i, j, p, q, dx, dy, d;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = s.w + 20;
        if (p.x > s.w + 20) p.x = -20;
        if (p.y < -20) p.y = s.h + 20;
        if (p.y > s.h + 20) p.y = -20;

        if (pointer.on) {
          dx = p.x - pointer.x; dy = p.y - pointer.y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < 170 && d > 0.01) {
            var f = (1 - d / 170) * 12;
            p.ox += (dx / d) * f * 0.06;
            p.oy += (dy / d) * f * 0.06;
          }
        }
        p.ox *= 0.92; p.oy *= 0.92;
      }

      ctx.lineWidth = 1;
      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          q = pts[j];
          dx = (p.x + p.ox) - (q.x + q.ox);
          dy = (p.y + p.oy) - (q.y + q.oy);
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            ctx.strokeStyle = rgba(t.line, (1 - d / link) * 0.42);
            ctx.beginPath();
            ctx.moveTo(p.x + p.ox, p.y + p.oy);
            ctx.lineTo(q.x + q.ox, q.y + q.oy);
            ctx.stroke();
          }
        }
      }

      for (i = 0; i < pts.length; i++) {
        p = pts[i];
        ctx.fillStyle = i % 7 === 0 ? rgba(t.dot, 0.5) : rgba(t.line, 0.55);
        ctx.beginPath();
        ctx.arc(p.x + p.ox, p.y + p.oy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      s.raf = requestAnimationFrame(frame);
    }

    function start() {
      if (reduced || s.running) return;
      s.running = true;
      s.raf = requestAnimationFrame(frame);
    }
    function drawStill() { s.running = true; frame(); s.stop(); }

    window.addEventListener("resize", function () {
      s.resize(); seed();
      if (reduced) drawStill();
    }, { passive: true });

    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
    }, { passive: true });
    window.addEventListener("pointerleave", function () { pointer.on = false; });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) s.stop(); else start();
    });

    seed();
    if (reduced) drawStill(); else start();

    return { start: start, stop: function () { s.stop(); } };
  };

})();
