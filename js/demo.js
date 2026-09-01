/**
 * Particle field + theme switching.
 *
 * particleground bakes its colours in at init, so a theme change means tearing
 * the field down and building it again with the other palette.
 */
(function () {
  "use strict";

  var PALETTE = {
    light: { dotColor: "#0C6663", lineColor: "#C2A469" },
    dark:  { dotColor: "#3FBDB6", lineColor: "#9A7530" }
  };

  var host = document.getElementById("particles");
  var toggle = document.getElementById("theme-toggle");
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  var field = null;

  function resolvedTheme() {
    var stamped = document.documentElement.getAttribute("data-theme");
    if (stamped === "dark" || stamped === "light") return stamped;
    return mql.matches ? "dark" : "light";
  }

  function paint() {
    if (!host || typeof particleground !== "function") return;
    if (field && typeof field.destroy === "function") field.destroy();
    host.innerHTML = "";
    var p = PALETTE[resolvedTheme()];
    field = particleground(host, {
      dotColor: p.dotColor,
      lineColor: p.lineColor,
      density: 13000,
      particleRadius: 6,
      lineWidth: 0.7,
      proximity: 95,
      parallaxMultiplier: 12
    });
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = resolvedTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { }
      paint();
    });
  }

  // only follow the OS while the reader has not made an explicit choice
  var onSystemChange = function () {
    if (!document.documentElement.getAttribute("data-theme")) paint();
  };
  if (mql.addEventListener) mql.addEventListener("change", onSystemChange);
  else if (mql.addListener) mql.addListener(onSystemChange);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", paint);
  else paint();
})();
