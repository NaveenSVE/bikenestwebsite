/**
 * Bikenest static site config
 * Update APP_LINKS when your apps are live on the stores.
 */
const APP_LINKS = {
  appStore: "#",
  playStore: "https://play.google.com/store/apps/details?id=com.sveyo.app",
};

document.querySelectorAll("[data-store]").forEach((el) => {
  const store = el.dataset.store;
  if (APP_LINKS[store]) el.href = APP_LINKS[store];
});

["hero-app-store", "download-app-store"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = APP_LINKS.appStore;
});

["hero-play-store", "download-play-store"].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.href = APP_LINKS.playStore;
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}
