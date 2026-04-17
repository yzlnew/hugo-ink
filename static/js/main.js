document.addEventListener("DOMContentLoaded", function () {
  var container = document.documentElement;
  var toggles = Array.prototype.slice.call(document.querySelectorAll(".scheme-link"));

  if (!toggles.length) {
    return;
  }

  var savedScheme = null;
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var scheme = prefersDark ? "dark" : "light";

  try {
    savedScheme = localStorage.getItem("scheme");
  } catch (error) {
    savedScheme = null;
  }

  if (savedScheme === "dark" || savedScheme === "light") {
    scheme = savedScheme;
  }

  applyScheme(scheme, container, toggles);

  toggles.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      var nextScheme = toggle.getAttribute("data-scheme");

      if (nextScheme !== "light" && nextScheme !== "dark") {
        return;
      }

      applyScheme(nextScheme, container, toggles);
    });
  });
});

function applyScheme(scheme, container, toggles) {
  try {
    localStorage.setItem("scheme", scheme);
  } catch (error) {
    // Ignore browsers that block storage in privacy mode.
  }

  container.classList.toggle("dark", scheme === "dark");

  toggles.forEach(function (toggle) {
    var isActive = toggle.getAttribute("data-scheme") === scheme;

    toggle.classList.toggle("is-active", isActive);
    toggle.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  document.dispatchEvent(
    new CustomEvent("site-scheme-change", {
      detail: { scheme: scheme }
    })
  );
}
